import UserModel from "../../models/User/UserModel";
import { Request, Response, NextFunction } from "express";
import Logger from "../../helpers/Logger";
import { UserType } from "../../types/UserType";
import Filter from "../../helpers/Filter";
import { userFields } from "../../helpers/Filter";
import RegexHandler from "../../helpers/RegexHandler";
import Encrypter from "../../helpers/SaltEncrypter";
const log = new Logger();

class UserController {
  private userModel!: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }
}

export default UserController;
