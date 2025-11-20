import { Project } from "../project/project.model";
import { Reassign } from "../Reassign/reassign.model";
import { Task } from "../task/task.model";
import { Team } from "../team/team.model";

export const getSummeryFromDB = async () => {
  const totalProjects = await Project.countDocuments();

  const totalTasks = await Task.countDocuments();

  const teamSummary = await Team.aggregate([
    { $unwind: "$members" },

    {
      $lookup: {
        from: "tasks",
        localField: "members._id",
        foreignField: "assignedMemberId",
        as: "tasks",
      },
    },

    {
      $project: {
        _id: "$members._id",
        name: "$members.name",
        role: "$members.role",
        capacity: "$members.capacity",
        currentTasks: "$members.currentTasks",
        isOverloaded: {
          $gt: ["$members.currentTasks", "$members.capacity"],
        },
        tasks: 1,
      },
    },
  ]);

  const recentReassignments = await Reassign.aggregate([
    { $sort: { createdAt: -1 } },
    { $limit: 5 },

    {
      $lookup: {
        from: "tasks",
        localField: "taskId",
        foreignField: "_id",
        as: "task",
      },
    },
    { $unwind: "$task" },

    {
      $lookup: {
        from: "teams",
        let: { memberId: "$fromMemberId" },
        pipeline: [
          { $unwind: "$members" },
          { $match: { $expr: { $eq: ["$members._id", "$$memberId"] } } },
          { $project: { member: "$members" } },
        ],
        as: "from",
      },
    },
    { $unwind: "$from" },

    {
      $lookup: {
        from: "teams",
        let: { memberId: "$toMemberId" },
        pipeline: [
          { $unwind: "$members" },
          { $match: { $expr: { $eq: ["$members._id", "$$memberId"] } } },
          { $project: { member: "$members" } },
        ],
        as: "to",
      },
    },
    { $unwind: "$to" },

    {
      $project: {
        _id: 1,
        createdAt: 1,
        task: { _id: "$task._id", title: "$task.title" },
        fromMember: "$from.member",
        toMember: "$to.member",
      },
    },
  ]);

  const data = {
    totalProjects,
    totalTasks,
    teamSummary,
    recentReassignments,
  };

  return data;
};
