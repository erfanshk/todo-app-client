import { MouseEventHandler } from "react";

interface ButtonInterface {
  children: any;
  onClick: MouseEventHandler;
  classList?: string;
  disabled?: boolean
}

export const Button = (props: ButtonInterface) => {
  const classList = props.classList + (props.disabled ? " !bg-gray-300 hover:!bg-gray-300 !cursor-not-allowed !text-gray-900" : "")
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={"p-2 bg-gray-600 text-white rounded-md cursor-pointer hover:bg-gray-800 " + classList }
    >
      {props.children}
    </button>
  );
};
