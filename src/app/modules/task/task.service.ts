import mongoose, { startSession } from "mongoose";
import { ITask } from "./task.interface";
import { Task } from "./task.model";
import { Team } from "../team/team.model";

const createTaskIntoDB = async (payload: ITask) => {
  const session = await startSession();
  try {
    session.startTransaction();

    const { assignedMemberId } = payload;

    if (assignedMemberId) {
      await Team.findOneAndUpdate(
        {
          "members._id": new mongoose.Types.ObjectId(assignedMemberId),
        },
        {
          $inc: { "members.$.currentTasks": 1 },
        },
        { session, new: true }
      );
    }

    // Create task inside transaction
    const [task] = await Task.create([payload], { session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    return task;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
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
