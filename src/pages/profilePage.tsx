import { useState } from "react";
import Modal from "../components/common/Modal";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const dummyData = {
    title: "ooo 개발 회의",
    date: "2024.11.26",
    organizer: "김철수",
    agenda: "회의 안건 내용",
  };
  return (
    <>
      <h1>프로필 페이지</h1>
      <div>
        <button className="bg-blue-500 text-white" onClick={openModal}>
          모달 열기
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={dummyData.title}
          date={dummyData.date}
          organizer={dummyData.organizer}
          agenda={dummyData.agenda}
        />
      </div>
    </>
  );
};

export default ProfilePage;
