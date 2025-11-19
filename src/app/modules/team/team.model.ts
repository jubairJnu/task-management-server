import { model, Schema } from "mongoose";
import { ITeam } from "./team.interface";

const teamMemberSchema = new Schema({
  name: {
    type: String,
    required: [true, "Member name is required"],
    trim: true,
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    trim: true,
  },
  capacity: {
    type: Number,
    required: [true, "Capacity is required"],
    min: [0, "Capacity cannot be negative"],
    max: [5, "Capacity cannot exceed 5"],
    default: 3,
  },
  currentTasks: {
    type: Number,
    default: 0,
    min: 0,
  },
});

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true },
    members: [teamMemberSchema],
  },
  {
    timestamps: true,
  }
);

export const Team = model("Team", teamSchema);
