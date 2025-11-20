import { model, Schema } from "mongoose";

const reassignSchema = new Schema(
  {
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
      index: true,
    },

    fromMemberId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true, // <-- FIXED
      index: true,
    },

    toMemberId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true, // <-- FIXED
      index: true,
    },
  },
  { timestamps: true }
);

export const Reassign = model("Reassign", reassignSchema);
