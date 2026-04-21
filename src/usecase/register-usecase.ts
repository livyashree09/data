import { AuthBase } from "../services/auth-base";
import { LoginInput } from "../types/user-types";

export class RegisterUseCase {
  constructor(private service: AuthBase) {}

  async execute(data: LoginInput) {
    return this.service.register(
      data.email,
      data.password,
      data.memorableWord
    );
  }
}

