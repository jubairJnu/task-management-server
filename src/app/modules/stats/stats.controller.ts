import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { getSummeryFromDB } from "./stats.service";
import sendResponse from "../../../utils/sendResponse";

export const getSummary = catchAsync(async (req: Request, res: Response) => {
  const result = await getSummeryFromDB();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
  });
});
