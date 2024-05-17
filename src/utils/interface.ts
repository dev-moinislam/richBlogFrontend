import { ChangeEvent,FormEvent } from "react"

export type InputChange = ChangeEvent<
  | HTMLInputElement 
  | HTMLTextAreaElement 
  | HTMLSelectElement
>

export type FormSubmit = FormEvent<HTMLFormElement>

// we use index signeture
export interface IParams{
    [key: string]: string | undefined,

}





export interface IUser{
    account?: string | null;
    avatar?: string | null | undefined;
    role?: string | null;
    type?: string | null;
    username?: string | null;
    _id?: string | null;
  }

 export interface IBlogCategory{
    [x: string]: any;
    _id:string,
    name:string,
    createdAt:string,
    updatedAt:string
  
  }

  
  export interface IBlog {
    _id?: string
    user: string | IUser
    title: string
    content: string
    description: string
    thumbnail: string | File
    category: string
    createdAt: string
  }
