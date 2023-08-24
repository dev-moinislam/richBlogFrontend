import { ChangeEvent,FormEvent } from "react"

export type InputChange=ChangeEvent<HTMLInputElement>

export type FormSubmit = FormEvent<HTMLFormElement>

// we use index signeture
export interface IParams{
    [key: string]: string | undefined,

}


export interface IUser{
    account?: string | null;
    avatar?: string | null | undefined;
    role?: number | null;
    type?: string | null;
    username?: string | null;
    _id?: string | null;
  }

