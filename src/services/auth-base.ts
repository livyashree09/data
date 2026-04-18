export abstract  class AuthBase{
    abstract login(
        email:string,
        password:string,
        memorableword?:string
    ): Promise<{message:string}>;
    abstract register(
        email:string,
        password:string,
        memorableword?:string
    ): Promise<{message:string}>;
    abstract forgotPassword(
    email: string
  ): Promise<{ message: string }>;

    abstract resetpassword(
        email:string,
        newpassword:string,
        confirmpassword:string
    ):Promise<{message:string}>;
}




