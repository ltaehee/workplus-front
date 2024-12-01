import { ChangeEvent } from "react";

type InputProps = {
  type?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  name?: string;
  readonly?: boolean;
};

const Input: React.FC<InputProps> = ({
  type,
  value,
  defaultValue,
  onChange,
  placeholder,
  className,
  id,
  name,
  readonly,
}) => {
  return (
    <div>
      {id ? (
        <label className={"text-sm"} htmlFor={id}>
          {id}
        </label>
      ) : null}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readonly}
        className={`px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 ${className}`}
      />
    </div>
  );
};

export default Input;
