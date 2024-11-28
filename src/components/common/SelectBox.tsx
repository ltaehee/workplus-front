import React, { useState } from "react";

type SelectProps = {
  value: string;
  onClick: () => void;
  onClick1: () => void;
  optionText0: string;
  optionText1: string;
  optionText2: string;
  className?: string;
};

const SelectBox: React.FC<SelectProps> = ({
  value,
  onClick,
  onClick1,
  optionText0,
  optionText1,
  optionText2,
  className,
}) => {
  return (
    <>
      <form className={`max-w-sm ${className}`}>
        <select
          className={`px-4 py-2 border text-gray-900 rounded-md w-full
             focus:outline-none focus:ring-2 ${className}`}
        >
          <option disabled hidden selected>
            {optionText0}
          </option>
          <option value={value} onClick={onClick}>
            {optionText1}
          </option>
          <option value={value} onClick={onClick1}>
            {optionText2}
          </option>
        </select>
      </form>
    </>
  );
};

export default SelectBox;
