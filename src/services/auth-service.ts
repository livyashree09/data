import { UserRepository } from "../repository/user-repository";
import { User } from "../types/user-types";
import { AuthBase } from "./auth-base";


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

    const newUser: User = {
      id: Date.now(),
      email,
      password, 
      memorableWord
    };

    await this.userRepository.save(newUser);

    return { message: "User registered successfully" };
  }

  async login(
    email: string,
    password: string,
    memorableWord?: string
  ): Promise<{ message: string }> {

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== password) {
      throw new Error("Invalid password");
    }

    if (user.memorableWord && user.memorableWord !== memorableWord) {
      throw new Error("Invalid memorable word");
    }

    return { message: "Login successful" };
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

    await this.userRepository.updatePassword(email, newPassword);

    return { message: "Password updated successfully" };
  }
}