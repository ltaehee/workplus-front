type InputProps = {
  type?: string;
  value?: string;
  onChange?: () => void;
  placeholder?: string;
  className?: string;
  id?: string;
};

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  className,
  id,
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
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 ${className}`}
      />
    </div>
  );
};

export default Input;
