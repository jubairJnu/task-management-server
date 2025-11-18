import { IUser } from "./user.interface";
import { User } from "./user.model";

export const postUserIntoDB = async (payload: IUser) => {
  return await User.create(payload);
};
export const getAllUserFromDB = async () => {
  return await User.find();
};
