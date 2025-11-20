import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { taskServices } from "./task.service";
import sendResponse from "../../../utils/sendResponse";

const createTask = catchAsync(async (req: Request, res: Response) => {
  const result = await taskServices.createTaskIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Task created",
    data: result,
  });
});

const getTask = catchAsync(async (req: Request, res: Response) => {
  const result = await taskServices.getTaskIntoDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Task retrived",
    data: result,
  });
});

const updateTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await taskServices.updateTaskIntoDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Task updated",
    data: result,
  });
});

export const taskControllers = {
  createTask,
  getTask,
  updateTask,
};
