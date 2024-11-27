type InputProps = {
  type?: string;
  value?: string;
  onChange?: () => void;
  placeholder?: string;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 ${className}`}
    />
  );
};

export default Input;
