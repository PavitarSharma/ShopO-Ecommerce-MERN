import { CreateUser } from "../dto";
import { User } from "../models";

export const findUser = async (id: string, email?: string) => {
  if (email) {
    return await User.findOne({ email });
  } else {
    return await User.findById(id);
  }
};

export const createUser = async (body: CreateUser) => {
  return await User.create(body);
};
