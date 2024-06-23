import { Request, Response, NextFunction } from "express";
import Logger from "../../helpers/Logger";
import Filter, { userFields } from "../../helpers/Filter";
import RegexHandler from "../../helpers/RegexHandler";
import Encrypter from "../../helpers/SaltEncrypter";
import UserModel from "../../models/User/UserModel";
import requestAssembler from "../../services/RequestAssembler";
import HttpStatusCode from "../../utils/HttpStatusCode";

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

      const missingFields = Filter.validateFields(
        ["email", "password"],
        req.body
      );

      //check Regex on inputs
      if (!RegexHandler.isEmailValid(email)) {
        req.statusMessage = "Email inválido";

        const payload = {
          status: HttpStatusCode.BAD_REQUEST,
          message: "Email inválido",
          log: `Invalid email : ${email}`,
        };
        return requestAssembler.assembleRequest(req, next, payload);
      }
      if (!RegexHandler.isPasswordValid(password)) {
        const payload = {
          status: HttpStatusCode.BAD_REQUEST,
          message: "Email inválido",
          log: `Invalid password : ${password}`,
        };
        return requestAssembler.assembleRequest(req, next, payload);
      }

      const user = await this.userModelInstace.readUser(email);
      if (!user) {
        const payload = {
          status: HttpStatusCode.NOT_FOUND,
          message: "verifique suas credenciais, usuário não encontrado",
          log: `User not found : ${email}`,
        };
        return requestAssembler.assembleRequest(req, next, payload);
      }
      const passwordMatch = await Encrypter.comparePasswords(
        password,
        user.password
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

      const payload = {
        status: HttpStatusCode.OK,
        message: "Logado com sucesso",
        body: user,
        log: `successfull login for user ${email}`,
      };
      return requestAssembler.assembleRequest(req, next, payload);
    } catch (error) {
      const payload = {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message:
          "Erro interno do servidor , por favor tente novamente mais tarde",
        log: `An error occurred while creating user ${error}`,
      };
      return requestAssembler.assembleRequest(req, next, payload);
    }
  };
}

export default LoginController;
