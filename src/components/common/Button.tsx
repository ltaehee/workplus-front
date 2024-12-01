type ButtonProps = {
  btnText: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  btnText,
  onClick,
  className,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      className={`px-4 py-3  bg-[#1C4EEA] text-white py-2 px-4 rounded-md hover:bg-[#1A46D3] transition duration-10 w-full ${className}`}
      onClick={onClick}
    >
      {btnText}
    </button>
  );
};

export default Button;
