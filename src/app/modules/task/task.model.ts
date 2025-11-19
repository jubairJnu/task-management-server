import { model, Schema } from "mongoose";
import { ITask } from "./task.interface";

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Task description is required"],
      trim: true,
    },
    assignedMemberId: {
      type: Schema.Types.ObjectId,
      ref: "Team.members",
      default: null,
    },
    priority: {
      type: String,
      enum: {
        values: ["Low", "Medium", "High"],
        message: "{VALUE} is not a valid priority",
      },
      default: "Medium",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["Pending", "In Progress", "Done"],
        message: "{VALUE} is not a valid status",
      },
      default: "Pending",
      required: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Project reference is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster filtering
taskSchema.index({ project: 1, status: 1 });
taskSchema.index({ assignedMember: 1 });
taskSchema.index({ project: 1, assignedMember: 1 });

export const Task = model("Task", taskSchema);
