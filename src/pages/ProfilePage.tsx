import ProfileSection from "../components/profile/ProfileSection";
import UserInfoCard from "../components/profile/UserInfoCard";
import MainProfile from "../components/profile/MainProfile";
import { useEffect, useState } from "react";
import axios from "axios";

/*  */
type UserInfo = {
  phone: string;
  birth: string;
  address: string;
};

const ProfilePage = () => {
  /*  */
  const initialUserInfo: UserInfo = {
    phone: "",
    birth: "",
    address: "",
  };
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
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

  return (
    <div className="flex justify-center bg-[#F9FBFC] min-h-screen overflow-y-hidden">
      <div className="flex pr-8 w-1280">
        <div className="w-4/12 bg-white px-8 py-12 shadow-[10px_0_10px_-10px_rgba(0,0,0,0.1)] relative z-10">
          <MainProfile />
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
