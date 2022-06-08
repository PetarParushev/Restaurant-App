import { BaseState } from "../baseState";

export interface User {
    id:number,
    email:string;
    firstName: string;
    lastName: string;
    imagePath: string;
  };

export interface UserState extends Omit<BaseState,"count"> {
  user: User;
}

export interface RegisterFormInput {
  email:string;
  firstName: string;
  lastName: string;
  password:string,
  confirmPassword:string
  role:string
}