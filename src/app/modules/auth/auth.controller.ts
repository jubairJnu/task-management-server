/* eslint-disable no-undef */

import status from "http-status";

import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

import { authServices } from "./auth.Service";
import { Request, Response } from "express";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.login(req.body);
  // destructure result to send frontend

  const { refreshToken, accessToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "User Login Successfully",
    data: { accessToken },
  });
});

// change pasword

// refreshToken

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await authServices.refreshToken(refreshToken);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "generate token",
    data: result,
  });
});

// // forgot pasword

// exports

export const backendAuthControllers = {
  loginUser,
  refreshToken,
};
