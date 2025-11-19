import { Project } from "../project/project.model";
import { Reassign } from "../Reassign/reassign.model";
import { Task } from "../task/task.model";
import { Team } from "../team/team.model";

export const getSummeryFromDB = async () => {
  const totalProjects = await Project.countDocuments();

  const totalTasks = await Task.countDocuments();

  const teams = await Team.find({});

  const teamSummary = teams.flatMap((team) =>
    team.members.map((member) => ({
      _id: member._id,
      name: member.name,
      role: member.role,
      capacity: member.capacity,
      currentTasks: member.currentTasks,
      isOverloaded: member.currentTasks > member.capacity,
    }))
  );

  // --- Recent Reassignments ---
  const recentReassignments = await Reassign.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("taskId", "title");

  const data = {
    totalProjects,
    totalTasks,
    teamSummary,
    recentReassignments,
  };

  return data;
};
