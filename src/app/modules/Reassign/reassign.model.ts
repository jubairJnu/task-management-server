import { model, Schema } from "mongoose";

const reassignSchema = new Schema(
  {
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      index: true,
    },
    fromMemberId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      requiredd: true,
      index: true,
    },
    toMemberId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      requiredd: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Reassign = model("Reassign", reassignSchema);
