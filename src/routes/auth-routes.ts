import express from "express";
import { validate } from "../middleware/validate";
import { loginSchema, registerSchema,ResetPasswordSchema } from "../auth/validators/auth-schema";
import { logger } from "../middleware/logger";
import { loginUC, registerUC, resetUC } from "../Container/container";



const router = express.Router();
const users: any[] = [];



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