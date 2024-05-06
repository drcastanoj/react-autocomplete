import { FC, KeyboardEventHandler } from "react";
import { SearchSVG } from "../../../assets";
import "./input.css";

interface InputProps {
  handlerChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  handleKeyDown: KeyboardEventHandler<HTMLInputElement>;
  placeholder: string;
  handlerFocus: React.FocusEventHandler<HTMLInputElement>;
}

export const Input: FC<InputProps> = ({
  handlerChange,
  value,
  handleKeyDown,
  placeholder,
  handlerFocus,
}) => (
  <div className="label">
    <input
      type="text"
      onChange={handlerChange}
      value={value}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onFocus={handlerFocus}
      placeholder={placeholder}
    />
    <img src={SearchSVG} role="image" />
  </div>
);
