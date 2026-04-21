import { User } from "../types/user-types";

export class UserRepository {
  private static instance: UserRepository;
  private users: User[] = [];

  private constructor() {}

  static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.email === email) || null;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async updatePassword(email: string, newPassword: string): Promise<void> {
    const user = this.users.find(u => u.email === email);

    if (!user) {
      throw new Error("User not found");
    }

    user.password = newPassword;
  }
}


