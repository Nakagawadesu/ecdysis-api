import { Request, Response, NextFunction } from "express";
import Logger from "../../helpers/Logger";
import Filter, { userFields } from "../../helpers/Filter";
import RegexHandler from "../../helpers/RegexHandler";
import Encrypter from "../../helpers/SaltEncrypter";
import UserModel from "../../models/User/UserModel";
import requestAssembler from "../../services/RequestAssembler";
import HttpStatusCode from "../../utils/HttpStatusCode";
import jwt from "jsonwebtoken";
import SaltEncrypter from "../../helpers/SaltEncrypter";
import dotenv from "dotenv";
import moment from "moment";
import { UserType } from "../../types/UserType";
dotenv.config();
const log = new Logger();

class LoginController {
  private userModelInstace: UserModel;
  public constructor(userModelInstace: UserModel) {
    this.userModelInstace = userModelInstace;
  }

  public LoginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    log.info("Login User Controller");
    try {
      const email = req.body.email;
      const password = req.body.password;

      const missingFieldsPaylaod = Filter.validateFields(
        ["email", "password"],
        req.body
      );
      if (missingFieldsPaylaod) {
        return requestAssembler.assembleRequest(
          req,
          next,
          missingFieldsPaylaod
        );
      }
      //check Regex on inputs
      if (!RegexHandler.isEmailValid(email)) {
        const payload = {
          status: HttpStatusCode.BAD_REQUEST,
          message: "Formato do Email inválido",
          log: `Invalid email : ${email}`,
        };
        return requestAssembler.assembleRequest(req, next, payload);
      }
      if (!RegexHandler.isPasswordValid(password)) {
        const payload = {
          status: HttpStatusCode.BAD_REQUEST,
          message: "Formato da Senha inválido",
          log: `Invalid password : ${password}`,
        };
        return requestAssembler.assembleRequest(req, next, payload);
      }

      const user = await this.userModelInstace.readUserByEmail(email);
      if (!user) {
        const payload = {
          status: HttpStatusCode.NOT_FOUND,
          message: "verifique suas credenciais, usuário não encontrado",
          log: `User not found : ${email}`,
        };
        return requestAssembler.assembleRequest(req, next, payload);
      }

      const emailVerified = await this.userModelInstace.isEmailVerified(email);
      if (!emailVerified) {
        const payload = {
          status: HttpStatusCode.UNAUTHORIZED,
          message:
            "Email não verificado, de uma olhada em sua caixa de entrada",
          log: `Email not verified : ${email}`,
        };
        return requestAssembler.assembleRequest(req, next, payload);
      }

      const userJSON = JSON.parse(JSON.stringify(user));
      const passwordDB = userJSON.accountData.password;
      log.info(`password tested ${password}, password  DB: ${passwordDB}`);
      const passwordMatch = await SaltEncrypter.comparePasswords(
        password,
        passwordDB
      );
      if (!passwordMatch) {
        log.groupEnd();
        const payload = {
          status: HttpStatusCode.UNAUTHORIZED,
          message: "verifique suas credenciais, senha incorreta",
          log: `Invalid password : ${password}`,
        };
        return requestAssembler.assembleRequest(req, next, payload);
      }
      const tokenCreatedAt = new Date().toISOString();
      log.info(`Token Created At : ${tokenCreatedAt}`);

      const sessionToken = jwt.sign(
        {
          email: userJSON.accountData.email,
          _id: user._id,
          tokenCreatedAt: tokenCreatedAt,
        },
        process.env.SECRET_KEY as string
      );

      const payload = {
        status: HttpStatusCode.OK,
        message: "Login Efetuado com sucesso",
        body: sessionToken,
        log: `successfull login for user ${email}`,
      };
      return requestAssembler.assembleRequest(req, next, payload);
    } catch (error) {
      const payload = {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message:
          "Erro interno do servidor , por favor tente novamente mais tarde",
        log: `An error occurred while Login In ${error}`,
      };
      return requestAssembler.assembleRequest(req, next, payload);
    }
  };
}

export default LoginController;
