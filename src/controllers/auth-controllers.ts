import { loginUC, registerUC, resetUC } from "../Container/container";
import { Request, Response } from "express";

export const registerHandler = async(req:Request,res:Response)=>{
const result = await registerUC.execute(req.body);
  res.json(result);
}

export const loginHandler = async(req:Request,res:Response)=>{
    const result = await loginUC.execute(req.body);
    res.json(result);
}

export const resetPasswordHandler = async(req:Request,res:Response)=>{
const result = await resetUC.execute(req.body);
res.json(result);

}