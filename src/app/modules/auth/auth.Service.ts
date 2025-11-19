/* eslint-disable no-undef */

import { Secret } from "jsonwebtoken";

import status from "http-status";

import dotenv from "dotenv";
import AppError from "../../errors/APiError";

import config from "../../config";
import { User } from "../user/user.model";
import { jwtHelpers } from "../../../helper/jwtHelpers";

dotenv.config();

const login = async (payload: any) => {
  const isExistUser = await User.findOne({
    email: payload?.email,
  })
    .select("+password")
    .populate("role", "name");

  // check if use exist or not
  if (!isExistUser) {
    throw new AppError(status.NOT_FOUND, "User is not found !");
  }

  // chekc if password is correct
  if (isExistUser.password !== payload?.password) {
    throw new AppError(status.FORBIDDEN, "Password is wrong");
  }

  const jwtPayload = {
    id: isExistUser._id,
    email: isExistUser.email,
    name: isExistUser.name,
  };

  // create jwt access token

  const accessToken = jwtHelpers.generateAccessToken(
    jwtPayload,
    config.jwt.access_secret as Secret,
    config.jwt.expire_in_back as string
  );

  // create refresh token

  const refreshToken = jwtHelpers.generateAccessToken(
    jwtPayload,
    config.jwt.refres_expire_in as Secret,
    config.jwt.refres_expire_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

// change password========================

//generate acces token usig refresh token===================

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(status.UNAUTHORIZED, "Your are not authorized");
  }

  // if token is valid or not

  const decoded = jwtHelpers.verifyToken(
    token,
    config.jwt.refresh_secret as Secret
  );

  const { email, iat } = decoded;

  const user = await User.findOne({ email });

  // check user

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found !");
  }

  const jwtPayload = {
    id: user._id,
    email: user.email,
    name: user.name,
  };

  // create jwt access token

  const accessToken = jwtHelpers.generateAccessToken(
    jwtPayload,
    config.jwt.access_secret as Secret,
    config.jwt.expire_in as string
  );

  // return

  return {
    accessToken,
  };
};

// exports

export const authServices = {
  login,
  refreshToken,
};
