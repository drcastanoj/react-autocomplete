import { FC, KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { Input } from "../../atoms/input/input";
import "./autocomplete.css";
import { OptionAutocomplete } from "../../atoms/optionAutocomplete/optionAutocomplete";
import { AutoCompleteOption } from "../../../model";

interface AutocompleteProps {
  options: Array<AutoCompleteOption>;
  handlerChange: (str: string) => {};
  handlerSelectOption: (option: AutoCompleteOption) => void;
  value: string;
  loading: boolean;
  limit: number;
  placeholder: string;
}

export const Autocomplete: FC<AutocompleteProps> = ({
  options,
  handlerChange,
  handlerSelectOption,
  value,
  loading = false,
  limit = 10,
  placeholder,
}) => {
  const handlerChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handlerChange(e.target.value);
  };

  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        dropdownRef.current &&
        !dropdownRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "ArrowDown") {
      setFocusedIndex((prevIndex: number) =>
        prevIndex < options.length - 1 ? prevIndex + 1 : 0
      );
    }
    if (e.key === "ArrowUp") {
      setFocusedIndex((prevIndex: number) =>
        prevIndex > 0 ? prevIndex - 1 : 0
      );
    }
    if (e.key === "Enter") {
      handlerSelectOption(options[focusedIndex]);
    }
  };

  const handlerMouseEnter = (index: number) => {
    setFocusedIndex(index);
  };

  const handlerFocus = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (options) {
      setOpen(true);
    }
  }, [options]);

  return (
    <div
      className="autocomplete"
      id="autocomplete"
      aria-autocomplete="list"
      role="combobox"
      ref={dropdownRef}
    >
      <Input
        handlerChange={handlerChangeInput}
        value={value}
        handleKeyDown={handleKeyDown}
        placeholder={placeholder}
        handlerFocus={handlerFocus}
      />
      {open && !loading && options && options.length > 0 && (
        <div
          className="options"
          tabIndex={0}
          role="listbox"
          aria-labelledby="autocomplete"
        >
          {options.slice(0, limit).map((option, index) => (
            <OptionAutocomplete
              handlerMouseEnter={handlerMouseEnter}
              key={index}
              index={index}
              focused={focusedIndex === index}
              handlerSelectOption={handlerSelectOption}
              option={option}
              value={value}
            />
          ))}
        </div>
      )}
      {loading && <div className="options">Loading...</div>}

      {open && !loading && options && options.length === 0 && (
        <div className="options">Not Results</div>
      )}
    </div>
  );
};
