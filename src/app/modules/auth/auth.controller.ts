/* eslint-disable no-undef */

import status from "http-status";

import { backendAuthServices } from "./auth.Service";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { Request, Response } from "express";
import { IAuthenticatedRequest } from "../../interface/authenticate";

const loginUser = catchAsync(async (req: any, res: any) => {
  const result = await backendAuthServices.login(req.body);
  // destructure result to send frontend

  const { refreshToken, accessToken, needsPasswordChange } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "User Login Successfully",
    data: { accessToken, needsPasswordChange },
  });
});

// change pasword

const changeUserPassword = catchAsync(
  async (req: IAuthenticatedRequest, res: Response) => {
    const { id } = req.user as any;

    const result = await backendAuthServices.changePassword(req.body, id);

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Password is Updated successfully",
      data: result,
    });
  }
);

// refreshToken

// const refreshToken = async (req, res) => {
//   try {
//     const { refreshToken } = req.cookies;

//     const result = await authServices.refreshToken(refreshToken);
//     res.status(200).json({
//       success: true,
//       message: "Access token is retrived successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error?.message,
//     });
//   }
// };

// // forgot pasword

// const forgotPassword = async (req, res) => {
//   try {
//     const { phone } = req.body;

//     const result = await authServices.forgotPassword(phone);
//     res.status(200).json({
//       success: true,
//       message: "OTP Sent  successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error?.message,
//     });
//   }
// };

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { role } = req.user as any;

  const result = await backendAuthServices.resetAdminPasswordFromDB(
    req.body,
    role
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password reset successfully",
    data: result,
  });
});

// exports

export const backendAuthControllers = {
  loginUser,
  changeUserPassword,
  resetPassword,
};
