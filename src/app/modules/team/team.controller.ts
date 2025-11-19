import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { teamServices } from "./team.service";

const createTeam = catchAsync(async (req: Request, res: Response) => {
  const result = await teamServices.createTeamIntoDB(req.body);
  sendResponse(res, {
    success: true,
    message: "team created",
    statusCode: 200,
    data: result,
  });
});

const updateTeam = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await teamServices.updateTeaIntoDB(id, req.body);
  sendResponse(res, {
    success: true,
    message: "team updated",
    statusCode: 200,
    data: result,
  });
});

export const teamControllers = {
  createTeam,
  updateTeam,
};
