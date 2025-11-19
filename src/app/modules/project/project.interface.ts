import { Types } from "mongoose";

export interface IProject {
  name: string;
  teamId: Types.ObjectId;
}
