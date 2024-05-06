import { FC } from "react";
import { AutoCompleteOption } from "../../../model";

interface OptionAutocompleteProps {
  option: AutoCompleteOption;
  value: string;
  handlerSelectOption: (option: AutoCompleteOption) => void;
  focused: boolean;
  index: number;
  handlerMouseEnter: (index: number) => void;
}

export const OptionAutocomplete: FC<OptionAutocompleteProps> = ({
  option,
  value,
  handlerSelectOption,
  focused,
  handlerMouseEnter,
  index,
}) => {
  const handlerClick = () => {
    handlerSelectOption(option);
  };

  const handlerMouseEnterEvent = () => {
    handlerMouseEnter(index);
  };

  const setHighlight = () => {
    const { name } = option;
    const indexOf = name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase());
    if (indexOf === -1) return <>{option.name}</>;

    return (
      <>
        {name.slice(0, indexOf)}
        <span className="highlight">
          {name.slice(indexOf, indexOf + value.length)}
        </span>
        {name.slice(indexOf + value.length, name.length)}
      </>
    );
  };

  return (
    <div
      onMouseEnter={handlerMouseEnterEvent}
      className={`option ${focused ? "focused" : ""}`}
      onClick={handlerClick}
      role="option"
    >
      {setHighlight()}
    </div>
  );
};
