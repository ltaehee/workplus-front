import homeImg from "/img/addressImg.png";
import phoneImg from "/img/phone.png";
import birthImg from "/img/birthImg.png";
import Button from "../common/Button";
import axios from "axios";
import Input from "../common/Input";
import { Link } from "react-router-dom";

type SideMenuProps = {
  onClick?: () => void;
  className?: string;
  title?: string;
  userInfo?: {
    phone: string;
    birth: string;
    address: string;
  };
};

const SideMenu: React.FC<SideMenuProps> = () => {
  return (
    <>
      <div className="bg-[#5B84F5] w-[20%] h-screen">
        <ul>
          <li className="flex items-center p-4 hover:bg-[#7A9BFF] cursor-pointer text-white">
            <Link to="/admin">홈</Link>
          </li>
          <li className="flex items-center p-4 hover:bg-[#7A9BFF] cursor-pointer text-white">
            근태관리
          </li>
          <li className="flex items-center p-4 hover:bg-[#7A9BFF] cursor-pointer text-white">
            휴가관리
          </li>
        </ul>
      </div>
      <div></div>
    </>
  );
};

export default SideMenu;
