import { ChangeEvent,FormEvent } from "react"

export type InputChange=ChangeEvent<HTMLInputElement>

export type FormSubmit = FormEvent<HTMLFormElement>

// we use index signeture
export interface IParams{
    [key: string]: string | undefined,

}