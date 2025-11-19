import { Types } from "mongoose";

export interface IReassgin {
  taskId: Types.ObjectId;

  fromMemberId: Types.ObjectId;

  toMemberId: Types.ObjectId;
}
