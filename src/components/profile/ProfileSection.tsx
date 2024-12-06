import axios from "axios";
import { useState } from "react";

type ProfileSectionProps = {
  onClick?: () => void;
  className?: string;
  meetingId?: string;
  title?: string;
  data?: { label?: string; name?: string; date?: string }[];
  onListClick?: (item: {
    label?: string;
    date?: string;
    details?: string;
  }) => void;
};

const ProfileSection: React.FC<ProfileSectionProps> = ({
  onListClick,
  className,
  title,
  data,
  meetingId,
}) => {
  const [user, _setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const token = user.token;

  const handleClickAlarm = async () => {
    try {
      const response = await axios.patch(
        `/api/meeting/check/${user.username}/${meetingId}`,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      console.log(response);
    } catch (err) {
      console.log("handleClickAlarm 오류", err);
      if (axios.isAxiosError(err)) {
        alert(err.response?.data.message);
      }
    }
  };

  return (
    <div>
      <p className="font-bold pb-2">{title}</p>
      <div
        className={`border border-[#DFDFDF] bg-white rounded-md p-6 ${className}`}
      >
        {data ? (
          <ul>
            {data.map((item, index) => (
              <li
                onClick={() => onListClick?.(item)}
                key={index}
                className="mb-1 flex justify-between items-center border-b border-gray-300 last:border-none py-2 cursor-pointer hover:text-gray-500"
              >
                <button onClick={handleClickAlarm}>
                  <p className="truncate w-[100px]">{item.label}</p>
                  <p>{item.date}</p>
                </button>
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
