import jwt from "jsonwebtoken";
import { UserRepository } from "../repository/user-repository";
import { AuthBase } from "./auth-base";
import bcrypt from "bcrypt";

export class AuthService extends AuthBase {
  constructor(private userRepository: UserRepository) {
    super();
  }

  async register(
    email: string,
    password: string,
    memorableWord?: string
  ): Promise<{ message: string }> {

    const existing = await this.userRepository.findByEmail(email);

    if (existing) {
      throw new Error("User already exists");
    }

  

 const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    email,
    password: hashedPassword, 
    memorableWord
  };

    await this.userRepository.save(newUser);

    return { message: "User registered successfully" };
  }

  async login(
    email: string,
    password: string,
    memorableWord?: string
  ): Promise<{ message: string,token?: string }> {

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid password");
    }

    if (user.memorableWord && user.memorableWord !== memorableWord) {
      throw new Error("Invalid memorable word");
    }
     const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
    

    return { message: "Login successful",token };
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

  
    return { message: "Password reset link sent" };
  }

  async resetpassword(
    email: string,
    newPassword: string,
    confirmPassword: string
  ): Promise<{ message: string }> {

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    if (newPassword !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
const hashedPassword = await bcrypt.hash(newPassword, 10);

await this.userRepository.updatePassword(email, hashedPassword);
    // await this.userRepository.updatePassword(email, newPassword);

    return { message: "Password updated successfully" };
  }
}