import Button from "../common/Button";
import profileImg from "/img/profileImg.png";
import Modal from "../common/Modal";
import Input from "../common/Input";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "axios";

type UserInfo = {
  id?: string;
  email?: string;
  name?: string;
  username?: string;
  userImage?: string;
};

type MainProfileProps = {
  user: UserInfo;
  onEdit: (updatedUser: UserInfo) => void;
};

const MainProfile: React.FC<MainProfileProps> = ({ user, onEdit }) => {
  /* 이미지 업로드 */
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  /* 이름 수정 */
  const [editName, setEditName] = useState(user.name || "");

  /* 모달 */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const dummyData = {
    title: "ooo 개발 회의",
    date: "2024.11.26",
    organizer: "김철수",
    agenda: "회의 안건 내용",
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setEditName(target.value);
  };
  /* 이름 수정 하기*/
  const handleClickEdit = async () => {
    console.log("이름 수정 요청 시작");

    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const { id } = JSON.parse(storedUser);
      const response = await axios.patch(
        `/api/user/profile/username`,
        {
          username: editName,
          id: id,
        },
        {
          headers: { authorization: `${localStorage.getItem("token")}` },
        }
      );

      if (response.status === 200 || response.status === 204) {
        onEdit({ ...user, name: editName });
      }
    } catch (err) {
      console.error("Error updating name:", err);
    }
  };
  /* input에도 현재 이름 보이게 */
  useEffect(() => {
    setEditName(user.name || "");
  }, [user.name]);

  /* 이미지 업로드 */
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 이미지 클릭 시 파일 선택창 열기
    }
  };

  return (
    <div>
      <h2 className="font-bold text-lg">Profile</h2>
      <div className="flex flex-col justify-center items-center mt-20">
        <img
          src={user.userImage || profileImg}
          alt="프로필 사진"
          className="cursor-pointer"
          onClick={handleImageClick}
        />
        <h3 className="text-xl font-semibold">{user.name}</h3>
        <p className="text-sm">{user.email}</p>
      </div>
      <div className="pt-14">
        {/* 잠시 주석 처리 */}
        {/* <p className="text-sm">성</p>
        <Input
          value={user.name}
          name="name"
          onChange={handleChange}
          className="mt-2"
        /> */}
        <p className="text-sm pt-4">이름</p>
        <Input
          type="text"
          name="name"
          value={editName}
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
