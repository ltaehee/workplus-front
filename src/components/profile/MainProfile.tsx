import Button from "../common/Button";
import profileImg from "/img/profileImg.png";
import Modal from "../common/Modal";
import Input from "../common/Input";
import { useState } from "react";

type MainProfileProps = {
  onClick?: () => void;
  className?: string;
  email?: string;
  password?: string;
  name?: string;
  _id?: string;
};

const MainProfile: React.FC<MainProfileProps> = ({}) => {
  const [editUser, setEditUser] = useState<MainProfileProps>({
    email: "elice123@naver.com",
    name: "",
    _id: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const dummyData = {
    title: "ooo 개발 회의",
    date: "2024.11.26",
    organizer: "김철수",
    agenda: "회의 안건 내용",
  };

  /* 이름 수정 요청 */
  const handleClickEdit = async () => {
    try {
      const request = await fetch("/api/test-update", {
        method: "PUT",
        body: JSON.stringify(editUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (request.ok) {
        const response = await request.json();

        console.log(response);
        console.log("Success Update!");
      } else {
        console.log("Fail Update!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({
      ...prev,
      [name]: value, // 동적으로 name을 기반으로 해당 필드를 업데이트
    }));
  };
  return (
    <div>
      <h2 className="font-bold text-lg">Profile</h2>
      <div className="flex flex-col justify-center items-center mt-20">
        <img src={profileImg} alt="프로필 사진" className="cursor-pointer" />
        <h3 className="text-xl font-semibold">{editUser.name}</h3>
        <p className="text-sm">{editUser.email}</p>
      </div>
      <div className="pt-14">
        <p className="text-sm">성</p>
        <Input value={editUser.name} onChange={handleChange} className="mt-2" />
        <p className="text-sm pt-4">이름</p>
        <Input
          type="text"
          value={editUser.name}
          className="mt-2"
          onChange={handleChange}
        />
        <Button
          btnText="이름 수정"
          className="mt-16"
          onClick={handleClickEdit}
        />
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
  );
};

export default MainProfile;
