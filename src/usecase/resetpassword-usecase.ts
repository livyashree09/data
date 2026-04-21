
import { AuthBase } from "../services/auth-base";

export class ResetPasswordUseCase {
  constructor(private authService: AuthBase) {}

  async execute(data: {
  email: string;
  newPassword: string;
  confirmPassword: string;
}){
    return this.authService.resetpassword(
      data.email,
      data.newPassword,
      data.confirmPassword
    );
  }
   
  }