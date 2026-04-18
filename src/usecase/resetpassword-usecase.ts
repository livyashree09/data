
import { ResetPasswordSchema } from "../auth/validators/auth-schema";
import { AuthBase } from "../services/auth-base";



export class ResetPasswordUseCase {
  constructor(private authService: AuthBase) {}

  async execute(data: any) {
    const parsed = ResetPasswordSchema.parse(data);

    return this.authService.resetpassword(
      parsed.email,
      parsed.newPassword,
      parsed.confirmPassword
    );
  }
}