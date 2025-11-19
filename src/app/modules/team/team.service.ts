import { ITeam } from "./team.interface";
import { Team } from "./team.model";

const createTeamIntoDB = async (payload: ITeam) => {
  return await Team.create(payload);
};
const getTeamFromDB = async () => {
  return await Team.find();
};

const updateTeaIntoDB = async (id: string, payload: Partial<ITeam>) => {
  return await Team.findByIdAndUpdate(id, payload, { new: true });
};

export const teamServices = {
  createTeamIntoDB,
  getTeamFromDB,
  updateTeaIntoDB,
};
