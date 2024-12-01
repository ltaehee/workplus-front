import homeImg from "/img/addressImg.png";
import phoneImg from "/img/phone.png";
import birthImg from "/img/birthImg.png";
import Button from "../common/Button";
import axios from "axios";
import Input from "../common/Input";
import { ChangeEvent, useEffect, useState } from "react";

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
  const [editPhone, setEditPhone] = useState(user.phone || "");
  const [editBirth, setEditBirth] = useState(user.birth || "");
  const [editAddress, setEditAddress] = useState(user.address || "");

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.name === "phone") {
      setEditPhone(target.value);
    } else if (target.name === "birth") {
      setEditBirth(target.value);
    } else if (target.name === "address") {
      setEditAddress(target.value);
    }
  };

  /* 전화번호 수정 하기*/
  const handleClickPhone = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const { id } = JSON.parse(storedUser);
      const response = await axios.patch(
        "/api/user/profile/phone",
        { phone: editPhone, id: id },
        {
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 204) {
        onEdit({ ...user, phone: editPhone });
        console.log("수정 성공", editPhone);
      }
    } catch (err) {
      console.error("Error updating phone:", err);
    }
  };

  /* 생일 수정 하기 */
  const handleClickBirth = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const { id } = JSON.parse(storedUser);
      const response = await axios.patch(
        "/api/user/profile/birth",
        { birth: editBirth, id: id },
        {
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 204) {
        onEdit({ ...user, birth: editBirth });
        console.log("수정 성공", editBirth);
      }
    } catch (err) {
      console.error("Error updating birth:", err);
    }
  };

  /* 주소 수정하기 */
  const handleClickAddress = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const { id } = JSON.parse(storedUser);
      const response = await axios.patch(
        "/api/user/profile/address",
        { address: editAddress, id: id },
        {
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 204) {
        onEdit({ ...user, address: editAddress });
        console.log("수정 성공", editAddress);
      }
    } catch (err) {
      console.error("Error updating address:", err);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setEditPhone(userData.phone || "");
      setEditBirth(userData.birth || "");
      setEditAddress(userData.address || "");
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
            value={editPhone}
            placeholder="010-0000-0000"
            name="phone"
          />
          <Button
            btnText="수정"
            className="!w-[20%]"
            onClick={handleClickPhone}
          />
        </div>
        <div className="w-full flex gap-2 mb-1 flex justify-between items-center border-b border-gray-300 last:border-none py-2">
          <img src={birthImg} alt="케이크이미지" />
          <Input
            onChange={handleChange}
            value={editBirth}
            placeholder="2000.12.23"
            name="birth"
          />
          <Button
            btnText="수정"
            className="!w-[20%]"
            onClick={handleClickBirth}
          />
        </div>
        <div className="w-full flex gap-2 mb-1 flex justify-between items-center border-b border-gray-300 last:border-none py-2">
          <img src={homeImg} alt="홈이미지" />
          <Input
            onChange={handleChange}
            value={editAddress}
            placeholder="경기도 수원시 장안구"
            name="address"
          />
          <Button
            btnText="수정"
            className="!w-[20%]"
            onClick={handleClickAddress}
          />
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
