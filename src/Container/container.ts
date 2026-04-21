import { UserRepository } from "../repository/user-repository";
import { AuthService } from "../services/auth-service";
import { LoginUseCase } from "../usecase/login-usecase";
import { RegisterUseCase } from "../usecase/register-usecase";
import { ResetPasswordUseCase } from "../usecase/resetpassword-usecase";

const userRepository = UserRepository.getInstance();
const authService = new AuthService(userRepository);
export const loginUC = new LoginUseCase(authService);
export const registerUC = new RegisterUseCase(authService);
export const resetUC = new ResetPasswordUseCase(authService);