import ProfileSection from "../components/profile/ProfileSection";
import UserInfoCard from "../components/profile/UserInfoCard";
import MainProfile from "../components/profile/MainProfile";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { ENDPOINT } from "../utils/endpoints";

type UserInfo = {
  email?: string;
  name?: string;
  userImage?: string;
  phone?: string | undefined;
  birth?: string;
  address?: string;
};

type VacationInfo = {
  vacationType: string;
  username: string;
  startDate: string;
  endDate: string;
};

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const meetingData = [
    { label: "회의", name: "엘리스", date: "2024-12-01" },
    { label: "회의", name: "엘리스", date: "2024-12-01" },
    { label: "회의", name: "엘리스", date: "2024-12-01" },
  ];

  const [vacationData, setVacationData] = useState<VacationInfo[]>([]);
  const [user, setUser] = useState<UserInfo>({
    email: "",
    name: "",
    phone: "",
    birth: "",
    address: "",
  });

  /* 연차 사용 내역 불러오기 */
  const vacationFetchData = async () => {
    setIsLoading(true);
    try {
      const storedUser = localStorage.getItem("user");
      console.log("이게뭐임:", storedUser);
      if (!storedUser) return;
      const { id } = JSON.parse(storedUser);
      const response = await api.get(
        `${ENDPOINT.VACATION_POST_SUBMIT}/user/${id}`
      );
      console.log("연차:", response);
      if (response.status === 200 || response.status === 204) {
        const vacations = response.data.data.vacations;
        setVacationData(vacations);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  /* 회원정보 불러오기 */
  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const { userId, token, isAdmin } = JSON.parse(storedUser);
      const response = await api.get(`${ENDPOINT.USER_PROFILE}/${userId}`);
      console.log("현재 데이터:", response.data.data.user);

      if (response.status === 200 || response.status === 204) {
        const userData = response.data.data.user;
        const newData = { ...userData, token, isAdmin, userId };
        setUser({
          email: userData.email,
          name: userData.username,
          userImage: userData.userImage,
          phone: userData.phone,
          birth: userData.birth,
          address: userData.address,
        });

        // 로컬 스토리지에 최신 데이터 저장
        localStorage.setItem("user", JSON.stringify(newData));
        console.log("뉴데이터:", newData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUserData();
    vacationFetchData();
  }, []);
  const handleEdit = (updatedUser: UserInfo) => {
    setUser(updatedUser); // 수정된 사용자 정보를 상태에 반영
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-3xl font-bold">
        <div className="spinner">로딩 중...</div>
      </div>
    );
  }

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
              // data={vacationData}
              className="min-h-[400px]"
              data={vacationData.map((vacation) => ({
                label: vacation.vacationType,
                // name: vacation.username,
                date: `${vacation.startDate} ~ ${vacation.endDate}`,
              }))}
            />
            <UserInfoCard
              title="부가 정보 관리"
              user={user}
              onEdit={handleEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
