import { IReassgin } from "./Reassign.interface";
import { Reassign } from "./reassign.model";

const postReassginIntoDB = async (payload: IReassgin) => {
  return await Reassign.create(payload);
};

const getAllReassignFromDB = async () => {
  return await Reassign.find().populate([
    {
      path: "taskId",
      select: "title",
    },
    {
      path: "fromMemberId",
      select: "name",
    },
    {
      path: "toMemberId",
      select: "name",
    },
  ]);
};

export const reassginServices = {
  postReassginIntoDB,
  getAllReassignFromDB,
};
