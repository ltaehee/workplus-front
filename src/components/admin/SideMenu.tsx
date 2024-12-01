import homeImg from "/img/addressImg.png";
import phoneImg from "/img/phone.png";
import birthImg from "/img/birthImg.png";
import Button from "../common/Button";
import axios from "axios";
import Input from "../common/Input";
import { Link } from "react-router-dom";

type SideMenuProps = {
  setActivePage: (page: string) => void; // 페이지 변경을 위한 함수
};

const SideMenu: React.FC<SideMenuProps> = ({ setActivePage }) => {
  return (
    <>
      <div className="bg-[#5B84F5] w-[20%] h-screen">
        <ul>
          <li
            className="flex items-center p-4 hover:bg-[#7A9BFF] cursor-pointer text-white"
            onClick={() => setActivePage("home")}
          >
            유저목록
          </li>
          <li
            className="flex items-center p-4 hover:bg-[#7A9BFF] cursor-pointer text-white"
            onClick={() => setActivePage("attendance")}
          >
            근태관리
          </li>
          <li
            className="flex items-center p-4 hover:bg-[#7A9BFF] cursor-pointer text-white"
            onClick={() => setActivePage("vacation")}
          >
            휴가관리
          </li>
        </ul>
      </div>
      <div></div>
    </>
  );
};

export default SideMenu;
