import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true, trim: true, select: 0 },
    email: { type: String, required: true, trim: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export const User = model("User", userSchema);
