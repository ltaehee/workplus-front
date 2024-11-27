import { useState } from "react";
import Modal from "../components/common/Modal";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <h1>프로필 페이지</h1>
      <div>
        <button className="bg-blue-500 text-white" onClick={openModal}>
          모달 열기
        </button>
        <Modal isOpen={isModalOpen} onClose={closeModal} title="모달 제목" />
      </div>
    </>
  );
};

export default ProfilePage;
