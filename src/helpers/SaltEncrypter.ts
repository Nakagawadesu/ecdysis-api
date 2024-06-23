import bcrypt from "bcrypt";
class SaltEncrypter {
  static hashPassword = async (password: string) => {
    const hashed = bcrypt.hash(password, 12);
    return hashed;
  };
  static comparePasswords = async (password: string, passwordDB: string) => {
    return bcrypt.compare(password, passwordDB);
  };
}

export default SaltEncrypter;
