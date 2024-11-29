import Button from "../common/Button";
import profileImg from "/img/profileImg.png";
import Modal from "../common/Modal";
import Input from "../common/Input";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";

type MainProfileProps = {
  email?: string;
  name?: string;
  userImage?: string;
  onClick?: () => void;
  className?: string;
};

const MainProfile: React.FC<MainProfileProps> = () => {
  const [user, setUser] = useState<MainProfileProps>({
    email: "",
    name: "",
  });
  const [userEditId, setEditUserId] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const dummyData = {
    title: "ooo 개발 회의",
    date: "2024.11.26",
    organizer: "김철수",
    agenda: "회의 안건 내용",
  };

  /* 회원 정보 불러오기(이메일,이름) */
  const fetchUserData = async (userId: string) => {
    try {
      const response = await axios.get(`/api/user/profile/${userId}`, {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        console.log("성공");

        const { email, username, userImage } = response.data.data.user;
        setUser({
          email: email,
          name: username,
          userImage: userImage,
        });
      } else {
        console.log("Fail Check!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("체크용", storedUser);

    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const userId = userData.id;
      setEditUserId(userId);

      fetchUserData(userId);
    }
  }, []);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  /* 이름 수정 하기*/
  const handleClickEdit = async () => {
    try {
      const response = await axios.patch(
        "/api/user/profile/username",
        { username: user.name, id: userEditId },
        {
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 204) {
        setUser((prevUser) => ({
          ...prevUser,
          username: user.name, // 새로운 이름으로만 업데이트
        }));

        console.log("이름 수정 성공", user.name);
      } else {
        console.log("이름 수정 실패");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-lg">Profile</h2>
      <div className="flex flex-col justify-center items-center mt-20">
        <img src={profileImg} alt="프로필 사진" className="cursor-pointer" />
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
          value={user.name}
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
