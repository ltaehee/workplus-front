type ProfileSectionProps = {
  onClick?: () => void;
  className?: string;
  title?: string;
  data?: { label: string; name?: string; date: string }[];
};

const ProfileSection: React.FC<ProfileSectionProps> = ({
  onClick,
  className,
  title,
  data,
}) => {
  return (
    <div>
      <p className="font-bold pb-2">{title}</p>
      <div
        onClick={onClick}
        className={`border border-[#DFDFDF] bg-white rounded-md p-6 ${className}`}
      >
        {data ? (
          <ul>
            {data.map((item, index) => (
              <li
                key={index}
                className="mb-1 flex justify-between items-center border-b border-gray-300 last:border-none py-2 cursor-pointer hover:text-gray-500"
              >
                <p>{item.label}</p>
                <p>{item.name}</p>
                <p>{item.date}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
