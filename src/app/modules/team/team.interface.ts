import { Types } from "mongoose";

export interface ITeamMember {
  _id: Types.ObjectId;
  name: string;
  role: string;
  capacity: number;
  currentTasks: number;
}

export interface ITeam {
  name: string;
  members: ITeamMember[];
}
