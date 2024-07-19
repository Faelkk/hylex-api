import prisma from "../../config/db";
import {
  UserCreateDataModel,
  UserGetInfoModel,
  UserLoginDataModel,
} from "../../types/user";

export const userRepository = {
  async createUser({ email, username, password, name }: UserCreateDataModel) {
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password,
        name,
      },
    });
    return newUser;
  },

  async getUserInfo({ userId }: UserGetInfoModel) {
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });
    return user;
  },

  async loginUser({ email, password }: UserLoginDataModel) {
    const user = await prisma.user.findFirst({
      where: { email },
    });
    return user;
  },

  async findUniqueUserByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    return user;
  },
  async findUniqueUserByUsername(username: string) {
    const user = await prisma.user.findFirst({
      where: { username },
    });

    return user;
  },
};

export default userRepository;
