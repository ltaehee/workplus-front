import React, { ChangeEvent, useState } from "react";

type SelectProps = {
  value: string;
  id?: string;
  optionText0?: string;
  optionText1: string;
  optionText2: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const SelectBox: React.FC<SelectProps> = ({
  value,
  optionText0,
  optionText1,
  optionText2,
  className,
  onChange,
  id,
}) => {
  return (
    <>
      <form className={`${className}`}>
        {id ? (
          <label className={"text-sm"} htmlFor={id}>
            {id}
          </label>
        ) : null}
        <select
          defaultValue={optionText0}
          onChange={onChange}
          className={`px-4 py-2 border text-gray-900 rounded-md w-full
             focus:outline-none focus:ring-2 ${className}`}
        >
          <option value={optionText0} disabled hidden>
            {optionText0}
          </option>
          <option value={optionText1}>{optionText1}</option>
          <option value={optionText2}>{optionText2}</option>
        </select>
      </form>
    </>
  );
};

export default SelectBox;
