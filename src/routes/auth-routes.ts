import express from "express";
import { UserRepository } from "../repository/user-repository";
import { AuthService } from "../services/auth-service";
import { ResetPasswordUseCase } from "../usecase/resetpassword-usecase";
import { RegisterUseCase } from "../usecase/register-usecase";
import { LoginUseCase } from "../usecase/login-usecase";
import { validate } from "../middleware/validate";
import { loginSchema, registerSchema,ResetPasswordSchema } from "../auth/validators/auth-schema";
import { logger } from "../middleware/logger";



const router = express.Router();
const users: any[] = [];
const repo = new UserRepository();
const service = new AuthService(repo);
const loginUC = new LoginUseCase(service);
const registerUC = new RegisterUseCase(service);
const resetUC = new ResetPasswordUseCase(service);


router.use(logger);

router.post("/register",validate(registerSchema), async (req, res) => {
  try {
    const result = await registerUC.execute(req.body);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login",validate(loginSchema), async (req, res) => {
    try{
        const result =await loginUC.execute(req.body);
        res.json(result);
    }
    catch(err:any){
        res.status(400).json({error:err.message});
    }
});



router.put("/reset-password",validate(ResetPasswordSchema), async(req,res)=>{
    try{
        const result = await resetUC.execute(req.body);
        res.json(result);
    }
    catch(err:any){
        res.status(400).json({error:err.message});
    }
});

export default router;