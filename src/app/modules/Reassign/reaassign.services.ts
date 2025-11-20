import mongoose, { startSession } from "mongoose";
import { IReassgin } from "./Reassign.interface";
import { Reassign } from "./reassign.model";
import { Team } from "../team/team.model";
import { Task } from "../task/task.model";

const postReassginIntoDB = async (payload: IReassgin[]) => {
  const session = await startSession();
  try {
    session.startTransaction();

    const results = [];

    for (const item of payload) {
      const { fromMemberId, toMemberId, taskId } = item;

      await Team.findOneAndUpdate(
        { "members._id": toMemberId },
        { $inc: { "members.$.currentTasks": 1 } },
        { session }
      );

      await Team.findOneAndUpdate(
        { "members._id": fromMemberId },
        { $inc: { "members.$.currentTasks": -1 } },
        { session }
      );

      await Task.findByIdAndUpdate(
        taskId,
        { assignedMemberId: toMemberId },
        { session }
      );

      // save reassign record
      const [saved] = await Reassign.create([item], { session });
      results.push(saved);
    }

    await session.commitTransaction();
    session.endSession();
    return results;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
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
