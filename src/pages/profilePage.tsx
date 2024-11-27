import { useState } from "react";
import Modal from "../components/common/Modal";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

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
    <div className=" mt-96 p-6">
      <h1>프로필 페이지</h1>
      <div>
        <Button btnText="모달 열기 버튼" onClick={openModal} />
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={dummyData.title}
          date={dummyData.date}
          organizer={dummyData.organizer}
          agenda={dummyData.agenda}
        />
      </div>
      <Input type="text" placeholder="아무거나" className="mt-5" />
    </div>
  );
};

export default ProfilePage;
