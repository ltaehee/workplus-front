import homeImg from "/img/addressImg.png";
import phoneImg from "/img/phone.png";
import birthImg from "/img/birthImg.png";
import Button from "../common/Button";
import Input from "../common/Input";
import { ChangeEvent, useEffect, useState } from "react";
import api from "../../utils/api";
import { ENDPOINT } from "../../utils/endpoints";

type UserInfo = {
  phone?: string;
  birth?: string;
  address?: string;
};

type InfoCardProps = {
  title?: string;
  user: UserInfo;
  onEdit: (updatedUser: UserInfo) => void;
};

const UserInfoCard: React.FC<InfoCardProps> = ({ title, user, onEdit }) => {
  const [editInput, setEditInput] = useState({
    phone: user.phone || "",
    birth: user.birth || "",
    address: user.address || "",
  });

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setEditInput((prev) => ({ ...prev, [target.name]: target.value }));
  };

  /* 부가 정보 수정 하기*/
  const handleClickInfoChange = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const { userId } = JSON.parse(storedUser);
      const response = await api.patch(`${ENDPOINT.USER_PROFILE}/${userId}`, {
        phone: editInput.phone,
        birth: editInput.birth,
        address: editInput.address,
        id: userId,
      });

      if (response.status === 204 || response.status === 200) {
        onEdit({
          ...user,
          phone: editInput.phone,
          birth: editInput.birth,
          address: editInput.address,
        });
        console.log(
          "수정 성공",
          "휴대폰:",
          editInput.phone,
          "생일:",
          editInput.birth,
          "주소:",
          editInput.address
        );
        alert("수정 완료");
      }
    } catch (err) {
      console.error("Error updating phone:", err);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setEditInput({
        phone: userData.phone || "",
        birth: userData.birth || "",
        address: userData.address || "",
      });
    }
  }, []);
  return (
    <div>
      <p className="font-bold pb-2">{title}</p>
      <div className="border border-[#DFDFDF] bg-white rounded-md p-6">
        <div className="w-full flex gap-2 mb-1 flex justify-between items-center border-b border-gray-300 last:border-none py-2">
          <img src={phoneImg} alt="휴대폰이미지" />
          <Input
            onChange={handleChange}
            value={editInput.phone}
            placeholder="010-0000-0000"
            name="phone"
          />
          <Button
            btnText="수정"
            className="!w-[20%]"
            onClick={handleClickInfoChange}
          />
        </div>
        <div className="w-full flex gap-2 mb-1 flex justify-between items-center border-b border-gray-300 last:border-none py-2">
          <img src={birthImg} alt="케이크이미지" />
          <Input
            onChange={handleChange}
            value={editInput.birth}
            placeholder="2000.12.23"
            name="birth"
          />
          <Button
            btnText="수정"
            className="!w-[20%]"
            onClick={handleClickInfoChange}
          />
        </div>
        <div className="w-full flex gap-2 mb-1 flex justify-between items-center border-b border-gray-300 last:border-none py-2">
          <img src={homeImg} alt="홈이미지" />
          <Input
            onChange={handleChange}
            value={editInput.address}
            placeholder="경기도 수원시 장안구"
            name="address"
          />
          <Button
            btnText="수정"
            className="!w-[20%]"
            onClick={handleClickInfoChange}
          />
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
