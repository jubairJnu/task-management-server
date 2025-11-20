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

const getTaskIntoDB = async (query: Record<string, any>) => {
  // convert to normal object

  const { projectId, assignedMemberId } = query;
  const matchObj: Record<string, any> = {};

  if (projectId) matchObj.projectId = new mongoose.Types.ObjectId(projectId);
  if (assignedMemberId)
    matchObj.assignedMemberId = new mongoose.Types.ObjectId(assignedMemberId);

  return await Task.aggregate([
    {
      $match: matchObj,
    },
    {
      $lookup: {
        from: "teams",
        localField: "assignedMemberId",
        foreignField: "members._id",
        as: "teamInfo",
      },
    },
    {
      $unwind: {
        path: "$teamInfo",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        assignedMember: {
          $filter: {
            input: "$teamInfo.members",
            as: "m",
            cond: { $eq: ["$$m._id", "$assignedMemberId"] },
          },
        },
      },
    },
    {
      $unwind: {
        path: "$assignedMember",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        priority: 1,
        status: 1,
        projectId: 1,
        assignedMemberId: 1,
        assignedMemberName: "$assignedMember.name",
      },
    },
  ]);
};

const updateTaskIntoDB = async (id: string, payload: Partial<ITask>) => {
  const session = await startSession();
  try {
    session.startTransaction();

    const oldTask = await Task.findById(id)
      .select("assignedMemberId")
      .session(session);

    if (!oldTask) {
      throw new Error("Task not found");
    }

    const oldAssignedMemberId = oldTask.assignedMemberId;
    const newAssignedMemberId = payload.assignedMemberId;

    if (
      newAssignedMemberId &&
      oldAssignedMemberId?.toString() !== newAssignedMemberId.toString()
    ) {
      if (oldAssignedMemberId) {
        await Team.findOneAndUpdate(
          { "members._id": oldAssignedMemberId },
          { $inc: { "members.$.currentTasks": -1 } },
          { session }
        );
      }

      await Team.findOneAndUpdate(
        { "members._id": newAssignedMemberId },
        { $inc: { "members.$.currentTasks": 1 } },
        { session }
      );
    }

    const result = await Task.findByIdAndUpdate(id, payload, {
      session,
      new: true,
    });

    await session.commitTransaction();
    return result;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

const deleteTaskFromDB = async (id: string) => {
  const session = await startSession();
  try {
    session.startTransaction();

    const oldTask = await Task.findById(id)
      .select("assignedMemberId")
      .session(session);
    await Team.findOneAndUpdate(
      { "members._id": oldTask?.assignedMemberId },
      { $inc: { "members.$.currentTasks": -1 } },
      { session }
    );

    const result = await Task.findByIdAndDelete(id);
    await session.commitTransaction();
    return result;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

export const taskServices = {
  createTaskIntoDB,
  updateTaskIntoDB,
  getTaskIntoDB,
  deleteTaskFromDB,
};
