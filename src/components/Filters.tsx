import React, { useContext } from "react";
import { FiltersContext } from "../context/MyContext";
import { ButtonType } from "../types/types";

const Filters = () => {
  const { buttons, setButtons, setCurrentFilter } = useContext(FiltersContext);

  const handleClick = (value: string) => {
    setButtons((prev: ButtonType[]) =>
      prev.map((button: ButtonType) => {
        return {
          ...button,
          isSelected: button.value === value && true,
        };
      })
    );

    setCurrentFilter(value);
  };

  return (
    <div className="flex gap-4">
      {buttons.map((button: ButtonType, index: number) => (
        <button
          key={`button_${index}`}
          className={`bg-gray-400 rounded px-2.5 text-white ${
            button.isSelected && "bg-green-500"
          }`}
          onClick={() => handleClick(button.value)}
        >
          {button.title}
        </button>
      ))}
    </div>
  );
};

export default Filters;
