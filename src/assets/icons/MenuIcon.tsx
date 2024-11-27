interface MenuIconProps {
  width: string;
  className?: string;
}

const MenuIcon = (props: MenuIconProps) => {
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
        d="M4 6H20M4 12H20M4 18H20"
        stroke="#21272A"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default MenuIcon;
