import express from "express";
import { validate } from "../middleware/validate";
import { loginSchema, registerSchema,ResetPasswordSchema } from "../auth/validators/auth-schema";
import { logger } from "../middleware/logger";
import { loginUC, registerUC, resetUC } from "../Container/container";
import { authenticate } from "../middleware/auth-middleware";
import { loginHandler, registerHandler, resetPasswordHandler } from "../controllers/auth-controllers";



const router = express.Router();




router.use(logger);

router.get("/profile", authenticate, (req, res) => {
  res.json({
    message: "Profile fetched successfully",
    user: (req as any).user
  });
});

router.post("/register",validate(registerSchema),registerHandler, async (req, res) => {
  try {
    const result = await registerUC.execute(req.body);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login",validate(loginSchema),loginHandler, async (req, res) => {
    try{
        const result =await loginUC.execute(req.body);
        res.json(result);
    }
    catch(err:any){
        res.status(400).json({error:err.message});
    }
});



router.put("/reset-password",validate(ResetPasswordSchema),resetPasswordHandler, async(req,res)=>{
    try{
        const result = await resetUC.execute(req.body);
        res.json(result);
    }
    catch(err:any){
        res.status(400).json({error:err.message});
    }
});

export default router;