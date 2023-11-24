import bcrypt from "bcrypt";

export const validatePassword = async (password: string) => {
  const salt: string = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  comparePassword: string,
  enteredPasssword: string
) => {
  return await bcrypt.compare(enteredPasssword, comparePassword);
};
