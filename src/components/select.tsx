import { ChangeEventHandler } from "react";

interface SelectOption {
  value: string | number;
  text: string;
}
interface SelectProps {
  options: SelectOption[];
  selected: string | number;
  onChange: ChangeEventHandler;
}

export const Select = (props: SelectProps) => {
  return (
    <div className="bg-white p-4 rounded-md border border-gray-300">
      <select className="w-full h-full" onChange={props.onChange}>
        {props.options.map((option) => (
          <option
            selected={props.selected === option.value}
            value={option.value}
          >
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};
