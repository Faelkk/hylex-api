import { Request, Response } from "express";

import { handleError } from "../../shared/helpers/handleError";
import { usersService } from "./UserService";
import { createUser } from "./dto/createUserDto";
import { activeUserId } from "../../shared/helpers/activeUserId";
import { UserCreateDataModel } from "../../shared/types/user";
import { signinUserDto } from "./dto/signinUserDto";

export const userController = {
  async create(req: Request, res: Response) {
    const data = req.body as UserCreateDataModel;

    const userDto = createUser({ data });

    try {
      const { email, username, password, name } = userDto;

      const user = await usersService.create({
        email,
        username,
        password,
        name,
      });

      return res.status(200).send({ token: user });
    } catch (error) {
      return handleError(error, res);
    }
  },

  async getInfo(req: Request, res: Response) {
    const { userId } = await activeUserId(req);
    try {
      const user = await usersService.getInfo({
        userId,
      });

      return res.status(200).send({ user });
    } catch (error) {
      return handleError(error, res);
    }
  },

  async signin(req: Request, res: Response) {
    const data = req.body;

    const signinDto = signinUserDto({ data });

    try {
      const { email, password } = signinDto;

      const user = await usersService.login({ email, password });

      return res.status(200).send({ token: user });
    } catch (error) {
      return handleError(error, res);
    }
  },
};
