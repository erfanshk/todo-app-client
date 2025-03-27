import { ChangeEventHandler } from "react";

type InputType = "text" | "number" | "password";
interface InputProps {
  type: InputType;
  label: string;
  value?: string;
  onChange: ChangeEventHandler
}

export const Input = (props: InputProps) => {
  return (
    <div className="bg-white border-1 border-gray-300 rounded-md p-2 px-4 flex flex-row gap-2 items-center justify-between">
      <label className="font-semibold">{props.label}</label>
      <input onChange={props.onChange} type={props.type} className="p-2 rounded-md" value={props.value} />
    </div>
  );
};
