import { AuthBase } from "../services/auth-base";
import { AuthService } from "../services/auth-service";
import { LoginInput } from "../types/user-types";

export class LoginUseCase {
  private authService: AuthBase;

  constructor(authService: AuthBase) {
    this.authService = authService;
  }

  async execute(loginData: LoginInput) {
 
    const result = await this.authService.login(loginData.email, loginData.password, loginData.memorableWord);
    return result;
    
  }
}