interface XIconProps {
  width: string;
  className?: string;
}

const XIcon = (props: XIconProps) => {
  const { width, className } = props;
  return (
    <svg
      width={width}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 18L18 6M6 6L18 18"
        stroke="#21272A"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default XIcon;
