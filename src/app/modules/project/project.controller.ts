import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { projectServices } from "./project.service";

const createProject = catchAsync(async (req: Request, res: Response) => {
  const result = await projectServices.createProjectIntoDB(req.body);
  sendResponse(res, {
    success: true,
    message: "project created",
    statusCode: 200,
    data: result,
  });
});
const getProject = catchAsync(async (req: Request, res: Response) => {
  const result = await projectServices.getProjectFromDB();
  sendResponse(res, {
    success: true,
    message: "project retrieved",
    statusCode: 200,
    data: result,
  });
});
const updateProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await projectServices.updasteProjectIntoDB(id, req.body);
  sendResponse(res, {
    success: true,
    message: "project updated",
    statusCode: 200,
    data: result,
  });
});

export const projectControllers = {
  createProject,
  getProject,
  updateProject,
};
