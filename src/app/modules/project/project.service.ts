import { IProject } from "./project.interface";
import { Project } from "./project.model";

const createProjectIntoDB = async (payload: IProject) => {
  return await Project.create(payload);
};
const getProjectFromDB = async () => {
  return await Project.find();
};
const updasteProjectIntoDB = async (id: string, payload: Partial<IProject>) => {
  return await Project.findByIdAndUpdate(id, payload, { new: true });
};

export const projectServices = {
  createProjectIntoDB,
  getProjectFromDB,
  updasteProjectIntoDB,
};
