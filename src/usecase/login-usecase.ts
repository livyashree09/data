import { AuthBase } from "../services/auth-base";

import { LoginInput } from "../types/user-types";

export class LoginUseCase {
  constructor(private authService: AuthBase) {}

  async execute(loginData: LoginInput) {
    return this.authService.login(
      loginData.email,
      loginData.password,
      loginData.memorableWord
    );
  }
}