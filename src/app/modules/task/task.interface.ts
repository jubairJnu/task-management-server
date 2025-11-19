import { Document, Types } from "mongoose";

export interface ITask extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  assignedMemberId: Types.ObjectId | null;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Done";
  projectId: Types.ObjectId;
}
