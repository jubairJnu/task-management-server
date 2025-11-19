import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

import status from "http-status";
import AppError from "../errors/APiError";
import config from "../config";
import { User } from "../modules/user/user.model";
import { jwtHelpers } from "../../helper/jwtHelpers";

const auth = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    // check if token exist
    if (!token) {
      throw new AppError(status.UNAUTHORIZED, "Your are not authorized");
    }

    let decoded;

    try {
      decoded = jwtHelpers.verifyToken(
        token,
        config.jwt.access_secret as string
      ) as JwtPayload;
    } catch (err) {
      throw new AppError(status.FORBIDDEN, "Unauthoried access");
    }

    const { email, iat } = decoded;

    // check user

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Not Found");
    }

    // check if the token generate before chage password?

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
