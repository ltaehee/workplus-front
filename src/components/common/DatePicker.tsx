import React, { useState } from "react";
import { ko } from "date-fns/locale";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DatepickerProps = {
  className?: string;
  dateFormat?: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  id?: string;
  readOnly?: boolean;
};

const Datepicker: React.FC<DatepickerProps> = ({
  selected,
  onChange,
  className,
  dateFormat,
  id,
  readOnly,
}) => {
  return (
    <div>
      {id ? (
        <label className={"text-sm"} htmlFor={id}>
          {id}
        </label>
      ) : null}
      <DatePicker
        locale={ko}
        className={`border text-gray-900 focus:outline-none focus:ring-2 ${className}`}
        dateFormat={dateFormat}
        selected={selected}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );
};

export default Datepicker;
