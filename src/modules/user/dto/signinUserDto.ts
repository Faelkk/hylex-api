import { CustomError } from "../../../shared/helpers/customError";
import { UserLoginDataModel } from "../../../shared/types/user";

export interface signinUserDto {
  data: UserLoginDataModel;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function signinUserDto({ data }: signinUserDto) {
  const { email, password } = data;

  if (!email || !password) {
    throw new CustomError("All fields are required", 400);
  }

  if (!emailRegex.test(email)) {
    throw new CustomError("Email is not correct", 400);
  }

  if (password.length < 8) {
    throw new CustomError("Password must be at least 8 digits", 400);
  }

  return { email, password };
}
