export interface LoginInput {
  email: string;
  password: string;
  memorableWord ?:string;
  isLoggedIn?: boolean;
}



export interface User {
  id: number;
  email: string;
  password: string;
  memorableWord?: string | undefined; 
  isLoggedIn?: boolean;
   
}