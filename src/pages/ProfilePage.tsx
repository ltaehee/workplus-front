import ProfileSection from "../components/profile/ProfileSection";
import UserInfoCard from "../components/profile/UserInfoCard";
import MainProfile from "../components/profile/MainProfile";
import { useEffect, useState } from "react";
import axios from "axios";

type UserInfo = {
  email?: string;
  name?: string;
  userImage?: string;
  phone?: string;
  birth?: string;
  address?: string;
};

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const meetingData = [
    { label: "회의", name: "엘리스", date: "2024-12-01" },
    { label: "회의", name: "엘리스", date: "2024-12-01" },
    { label: "회의", name: "엘리스", date: "2024-12-01" },
  ];

  const vacationData = [
    { label: "연차", date: "2024-12-01" },
    { label: "연차", date: "2024-12-01" },
    { label: "연차", date: "2024-12-01" },
  ];

  const [user, setUser] = useState<UserInfo>({
    email: "",
    name: "",
    phone: "",
    birth: "",
    address: "",
  });

  const fetchUserData = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const { id } = JSON.parse(storedUser);
      const response = await axios.get(`/api/user/profile/${id}`, {
        headers: { authorization: `${localStorage.getItem("token")}` },
      });

      if (response.status === 200 || response.status === 204) {
        const { email, username, userImage } = response.data.data.user;
        setUser({ email, name: username, userImage });
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  const handleEdit = (updatedUser: UserInfo) => {
    setUser(updatedUser); // 수정된 사용자 정보를 상태에 반영
  };

  return (
    <div className="flex justify-center bg-[#F9FBFC] min-h-screen overflow-y-hidden">
      <div className="flex pr-8 w-1280">
        <div className="w-4/12 bg-white px-8 py-12 shadow-[10px_0_10px_-10px_rgba(0,0,0,0.1)] relative z-10">
          <MainProfile user={user} onEdit={handleEdit} />
        </div>
        <div className="flex gap-10 bg-[#F9FBFC]  w-8/12  pl-8 py-12 ">
          <div className="w-6/12">
            <ProfileSection
              title="알림"
              data={meetingData}
              className="min-h-[730px]"
            />
          </div>
          <div className="flex flex-col gap-10 w-6/12">
            <ProfileSection
              title="연차 사용 내역"
              data={vacationData}
              className="min-h-[400px]"
            />
            <UserInfoCard title="부가 정보 관리" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
