import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { getAllUserFromDB, postUserIntoDB } from "./user.service";
import sendResponse from "../../../utils/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await postUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    message: "user created",
    statusCode: 200,
    data: result,
  });
});

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await getAllUserFromDB();
  sendResponse(res, {
    success: true,
    message: "user retrieved",
    statusCode: 200,
    data: result,
  });
});

export const userControllers = {
  createUser,
  getUsers,
};
