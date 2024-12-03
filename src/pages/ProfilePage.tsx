import UserInfoCard from "../components/profile/UserInfoCard";
import MainProfile from "../components/profile/MainProfile";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { ENDPOINT } from "../utils/endpoints";
import Modal from "../components/common/Modal";
import VacationHistory from "../components/profile/VacationHistory";

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
  date?: string;
  label?: string;
  creator?: string;
  agenda?: string;
  attendant?: string[];
  reason?: string;
};

type MeetingInfo = {
  creatorName: string;
  attendant: string[];
  date: string;
  startTime: string;
  agenda: string;
  meetingId: string;
  vacationType?: string;
  label?: string;
  creator?: string;
  startDate: string;
  endDate: string;
  reason?: string;
};

const ProfilePage = () => {
  /* 모달 */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<VacationInfo | MeetingInfo | null>(
    null
  ); // 모달에 전달할 데이터
  const openModal = (data: any) => {
    setModalData(data); // 모달에 필요한 데이터 설정
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  /* 로딩 */
  const [isLoading, setIsLoading] = useState(false);
  const [meetingData, setMeetingData] = useState<MeetingInfo[]>([]);
  const [vacationData, setVacationData] = useState<VacationInfo[]>([]);
  const [user, setUser] = useState<UserInfo>({
    email: "",
    name: "",
    phone: "",
    birth: "",
    address: "",
  });

  /* 알림 내역 불러오기 */
  const meetingFetchData = async () => {
    setIsLoading(true);
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const { username } = JSON.parse(storedUser);
      const response = await api.get(`${ENDPOINT.METTING}/user/${username}`);
      console.log({ response });
      if (response.status === 200 || response.status === 204) {
        const meetings = response.data.data.meetings;
        setMeetingData(meetings);
        console.log("미팅 데이터:", meetings);
        console.log({ meetingData });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  /* 연차 사용 내역 불러오기 */
  const vacationFetchData = async () => {
    setIsLoading(true);
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const { userId } = JSON.parse(storedUser);
      const response = await api.get(
        `${ENDPOINT.VACATION_POST_SUBMIT}/user/${userId}`
      );
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
      console.log("현재 유저 데이터:", response.data.data.user);

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
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      /* 새로고침 했을 때 순서 */
      await fetchUserData();
      await vacationFetchData();
      await meetingFetchData();
    };
    fetchData();
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
    /* h-screen 을 두군데 넣어줫음 근데 이러면 스크롤이 생김 근데 이걸 지우면 배경색이 밑에 부분이 짤림 */
    <div className="bg-[#F9FBFC] h-screen overflow-y-hidden">
      <div className="flex justify-center">
        <div className="flex pr-8 w-1280">
          <div className="w-4/12 h-screen  bg-white px-8 py-12 shadow-[10px_0_10px_-10px_rgba(0,0,0,0.1)]  z-10">
            <MainProfile user={user} onEdit={handleEdit} />
          </div>
          <div className="flex gap-10 bg-[#F9FBFC]  w-8/12  pl-8 py-12 ">
            <div className="w-6/12">
              <VacationHistory
                title="회의 알림"
                data={meetingData.map((meeting) => ({
                  label: meeting.agenda,
                  date: `${meeting.date}-${meeting.startTime}`,
                  onClick: () => openModal(meeting),
                  creator: meeting.creator,
                  agenda: meeting.agenda,
                  attendant: meeting.attendant,
                }))}
                onListClick={openModal}
                className="min-h-[730px] max-h-[730px] overflow-y-auto "
              />
            </div>
            <div className="flex flex-col gap-10 w-6/12">
              <VacationHistory
                title="연차 사용 내역"
                className="h-[400px] overflow-y-auto"
                data={vacationData.map((vacation) => ({
                  label: vacation.vacationType,
                  date: `${vacation.startDate} ~ ${vacation.endDate}`,
                  reason: vacation.reason,
                  onClick: () => openModal(vacation),
                }))}
                onListClick={openModal}
              />
              <UserInfoCard
                title="부가 정보 관리"
                user={user}
                onEdit={handleEdit}
              />
            </div>
            {isModalOpen && modalData && (
              <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={modalData.label || ""}
                date={modalData.date || ""}
                creator={modalData.creator}
                agenda={modalData.agenda}
                reason={modalData.reason}
                attendant={modalData.attendant}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
