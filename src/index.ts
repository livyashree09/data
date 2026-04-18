import express from "express";
import { UserRepository } from "./repository/user-repository";
import { AuthService } from "./services/auth-service";

import { LoginUseCase } from "./usecase/login-usecase";
import { ResetPasswordUseCase } from "./usecase/resetpassword-usecase"; 
import { RegisterUseCase } from "./usecase/register-usecase";


const app = express();
app.use(express.json());


const users: any[] = [];


const repo = new UserRepository();
const service = new AuthService(repo);


const registerUC = new RegisterUseCase(service);
const loginUC = new LoginUseCase(service);
const resetUC = new ResetPasswordUseCase(service);




app.post("/login", async (req, res) => {
  try {
    const result = await loginUC.execute(req.body);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/register", async (req, res) => {
  try {
    const result = await registerUC.execute(req.body);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});


app.put("/reset-password", async (req, res) => {
  try {
    const result = await resetUC.execute(req.body);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});



app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});