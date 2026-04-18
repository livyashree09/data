
import { registerSchema } from "../auth/validators/auth-schema";
import { AuthBase } from "../services/auth-base";
import { AuthService } from "../services/auth-service"; 

export class RegisterUseCase {
  constructor(private service: AuthBase) {}

  execute(data: any) {

   
    const parsed = registerSchema.parse(data);

    
    return this.service.register(
      parsed.email,
      parsed.password,
      parsed.memorableWord
    );
  }
}