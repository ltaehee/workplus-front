import { useState } from "react";
import profileImg from "/img/profileImg.png";
import Modal from "../components/common/Modal";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import ProfileSection from "../components/profile/ProfileSection";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  const dummyData = {
    title: "ooo 개발 회의",
    date: "2024.11.26",
    organizer: "김철수",
    agenda: "회의 안건 내용",
  };
  return (
    <div className="flex justify-center bg-[#F9FBFC] min-h-screen overflow-y-hidden">
      <div className="flex pr-8 w-1280">
        <div className="w-full md:w-4/12 bg-white px-8 py-12 shadow-[10px_0_10px_-10px_rgba(0,0,0,0.1)] relative z-10">
          <div>
            <h2 className="font-bold text-lg">Profile</h2>
            <div className="flex flex-col justify-center items-center mt-20">
              <img
                src={profileImg}
                alt="프로필 사진"
                className="cursor-pointer"
              />
              <h3 className="text-xl font-semibold">엘리스</h3>
              <p className="text-sm">elice123@naver.com</p>
            </div>
            <div className="pt-14">
              <p className="text-sm">성</p>
              <Input placeholder="엘" className="mt-2" />
              <p className="text-sm pt-4">이름</p>
              <Input type="text" placeholder="리스" className="mt-2" />
              <Button btnText="이름 수정" className="mt-16" />
              <div>
                <Button
                  btnText="모달 테스트 버튼"
                  onClick={openModal}
                  className="mt-10"
                />
                <Modal
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  title={dummyData.title}
                  date={dummyData.date}
                  organizer={dummyData.organizer}
                  agenda={dummyData.agenda}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-10 bg-[#F9FBFC] w-full md:w-8/12  pl-8 py-12 ">
          <div className="border-2 border-purple-500 w-6/12">
            <ProfileSection title="알림" data={meetingData} />
          </div>
          <div className="flex flex-col gap-10 w-6/12">
            <ProfileSection title="연차 사용 내역" data={vacationData} />
            <div className="border-2 border-purple-500">
              <p className="font-bold">부가 정보 관리</p>
              <div className="h-96"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
