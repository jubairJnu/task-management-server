import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { reassginServices } from "./reaassign.services";
import sendResponse from "../../../utils/sendResponse";

const createReassgin = catchAsync(async (req: Request, res: Response) => {
  const result = await reassginServices.postReassginIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
  });
});
const getReassgin = catchAsync(async (req: Request, res: Response) => {
  const result = await reassginServices.getAllReassignFromDB();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
  });
});

export const reassignControllers = {
  createReassgin,
  getReassgin,
};
