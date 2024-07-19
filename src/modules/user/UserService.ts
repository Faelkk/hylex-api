import { compare, hashSync } from "bcrypt";
import { CustomError } from "../../shared/helpers/customError";
import {
  UserCreateDataModel,
  UserGetInfoModel,
  UserLoginDataModel,
} from "../../shared/types/user";
import { userRepository } from "../../shared/database/repositories/userRepository";
import jwt from "jsonwebtoken";
import { config } from "../../shared/config/config";

export const usersService = {
  async create({ email, username, password, name }: UserCreateDataModel) {
    const userAlreadyExists = await userRepository.findUniqueUserByEmail(email);

    if (userAlreadyExists && userAlreadyExists.email) {
      throw new CustomError(
        "Email ja esta sendo utilizado por outra conta.",
        409
      );
    }

    const userNameAlreadyExists = await userRepository.findUniqueUserByUsername(
      username
    );

    if (userNameAlreadyExists && userNameAlreadyExists.username) {
      throw new CustomError(
        "username ja esta sendo utilizado por outra conta.",
        409
      );
    }

    const hashedPassword = hashSync(password, 10);

    const user = await userRepository.createUser({
      email,
      username,
      password: hashedPassword,
      name,
    });

    if (!user) {
      throw new CustomError("Erro ao criar usuario", 500);
    }

    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      config.jwtSecret!,
      { expiresIn: "7d" }
    );

    return accessToken;
  },

  async getInfo({ userId }: UserGetInfoModel) {
    const user = await userRepository.getUserInfo({ userId });

    if (!user) {
      throw new CustomError("Erro ao pegar informações do usuario", 500);
    }

    return user;
  },
  async login({ email, password }: UserLoginDataModel) {
    const user = await userRepository.findUniqueUserByEmail(email);

    if (!user) {
      throw new CustomError("Verifique seus dados novamente", 400);
    }

    const hashedPassword = await compare(password, user.password);

    if (!hashedPassword) {
      throw new CustomError("Senha incorreta", 400);
    }

    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      config.jwtSecret!,
      { expiresIn: "7d" }
    );

    return accessToken;
  },
};
