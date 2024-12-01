import homeImg from "/img/addressImg.png";
import phoneImg from "/img/phone.png";
import birthImg from "/img/birthImg.png";
import Button from "../common/Button";
import axios from "axios";
import Input from "../common/Input";
import { ChangeEvent, useEffect, useState } from "react";

type UserInfo = {
  phone: string;
  birth: string;
  address: string;
};

type InfoCardProps = {
  title?: string;
};

const UserInfoCard: React.FC<InfoCardProps> = ({ title }) => {
  const [addInfo, setAddInfo] = useState<UserInfo>({
    phone: "",
    birth: "",
    address: "",
  });

  const [editUserId, setEditUserId] = useState("");

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setAddInfo((prev) => ({ ...prev, [name]: value }));
  };

  /* 전화번호 수정 하기*/
  /* const handleClickPhone = async () => {
    try {
      const response = await axios.patch(
        "/api/user/profile/phone",
        { phone: addInfo.phone, id: editUserId },
        {
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 204) {
        console.log("전화번호 수정 성공", addInfo.phone);
        setAddInfo((prev) => ({
          ...prev,
          phone: addInfo.phone,
        }));
      } else {
        console.log("전화번호 수정 실패");
      }
    } catch (err) {
      console.error(err);
    }
  }; */
  /* useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const userData = JSON.parse(storedUser);

      setEditUserId(userData.id);
    }
  }, []); */
  return (
    <div>
      <p className="font-bold pb-2">{title}</p>
      <div className="border border-[#DFDFDF] bg-white rounded-md p-6">
        <div className="w-full flex gap-2 mb-1 flex justify-between items-center border-b border-gray-300 last:border-none py-2">
          <img src={phoneImg} alt="휴대폰이미지" />
          <Input
            onChange={handleChange}
            value={addInfo.phone}
            placeholder="010-0000-0000"
            name="phone"
          />
          <Button
            btnText="수정"
            className="!w-[20%]"
            // onClick={handleClickPhone}
          />
        </div>
        <div className="w-full flex gap-2 mb-1 flex justify-between items-center border-b border-gray-300 last:border-none py-2">
          <img src={birthImg} alt="케이크이미지" />
          <Input
            onChange={handleChange}
            value={addInfo.birth}
            placeholder="2000.12.23"
            name="birth"
          />
          <Button btnText="수정" className="!w-[20%]" />
        </div>
        <div className="w-full flex gap-2 mb-1 flex justify-between items-center border-b border-gray-300 last:border-none py-2">
          <img src={homeImg} alt="홈이미지" />
          <Input
            onChange={handleChange}
            value={addInfo.address}
            placeholder="경기도 수원시 장안구"
            name="address"
          />
          <Button btnText="수정" className="!w-[20%]" />
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
