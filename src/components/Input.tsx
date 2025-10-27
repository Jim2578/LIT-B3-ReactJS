import type { ChangeEvent } from "react";

type InputProps ={
  value:string;
  onChange: (e: ChangeEvent<HTMLInputElement>)=>void;
}

export const Input = ({onChange, value}:InputProps) => {
  return (
    <input type="text" onChange={(e)=>onChange(e)} value={value} />
  )
}
