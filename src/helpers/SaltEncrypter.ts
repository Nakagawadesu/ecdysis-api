import bcrypt from "bcrypt";
class SaltEncrypter {
  static saltRounds: 12;

  static hashPassword = async (password: string) => {
    const hashed = bcrypt.hash(password, this.saltRounds);
    return hashed;
  };
  static comparePasswords = async (password: string, passwordDB: string) => {
    return bcrypt.compare(password, passwordDB);
  };
}

export default SaltEncrypter;
