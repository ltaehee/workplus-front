import homeImg from "/img/addressImg.png";
import phoneImg from "/img/phone.png";
import birthImg from "/img/birthImg.png";
import Button from "../common/Button";
import axios from "axios";
import Input from "../common/Input";

type InfoCardProps = {
  onClick?: () => void;
  className?: string;
  title?: string;
  userInfo?: {
    phone: string;
    birth: string;
    address: string;
  };
};

const UserInfoCard: React.FC<InfoCardProps> = ({ title, userInfo }) => {
  return (
    <div>
      <p className="font-bold pb-2">{title}</p>
      <div className="border border-[#DFDFDF] bg-white rounded-md p-6">
        <div className="w-full flex gap-2 mb-1 flex justify-between items-center border-b border-gray-300 last:border-none py-2">
          <img src={phoneImg} alt="휴대폰이미지" />
          <Input value={userInfo?.phone} placeholder="010-0000-0000" />
          <Button btnText="수정" className="!w-[20%]" />
        </div>
        <div className="w-full flex gap-2 mb-1 flex justify-between items-center border-b border-gray-300 last:border-none py-2">
          <img src={birthImg} alt="케이크이미지" />
          <Input value={userInfo?.birth} placeholder="2000.12.23" />
          <Button btnText="수정" className="!w-[20%]" />
        </div>
        <div className="w-full flex gap-2 mb-1 flex justify-between items-center border-b border-gray-300 last:border-none py-2">
          <img src={homeImg} alt="홈이미지" />
          <Input value={userInfo?.address} placeholder="경기도 수원시 장안구" />
          <Button btnText="수정" className="!w-[20%]" />
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
