import { ITask } from "./task.interface";
import { Task } from "./task.model";

const createTaskIntoDB = async (payload: ITask) => {
  return await Task.create(payload);
};
const getTaskIntoDB = async () => {
  return await Task.find();
};
const updateTaskIntoDB = async (id: string, payload: Partial<ITask>) => {
  return await Task.findByIdAndUpdate(id, payload, { new: true });
};

export const taskServices = {
  createTaskIntoDB,
  updateTaskIntoDB,
  getTaskIntoDB,
};
