import { useState } from "react";
import Logo from "../../assets/Logo";
import ProfileImg from "../../assets/ProfileImg";
import Bell from "../../assets/icons/Bell";
import MenuIcon from "../../assets/icons/MenuIcon";
import XIcon from "../../assets/XIcon";

const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [idAdmin, setIsAdmin] = useState(false);
  const [isAlarm, setIsAlarm] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  const handleClickMenu = () => {
    setIsMenu(!isMenu);
  };

  return (
    <header>
      <div
        className={
          "flex justify-center items-center border-b border-slate-300 sticky top-0"
        }
      >
        <div
          className={
            "flex  justify-between items-center gap-8 px-8 py-2  h-16 w-1280"
          }
        >
          <Logo className={"shrink-0"} width={"110px"} />

          <div className={"md:flex hidden gap-8 w-full text-slate-900 "}>
            <button>메인페이지</button>
            <button>회의 일정 생성</button>
            <button>휴가 신청</button>
          </div>
          <div className={"flex gap-4"}>
            <button>
              <a className={"flex justify-between items-center"} href="">
                <Bell width={"24px"} />
              </a>
            </button>
            <button>
              <a className={"flex justify-between items-center"} href="">
                <ProfileImg className={"md:block hidden"} width={"40px"} />
              </a>
            </button>
            <a
              className={
                "md:flex hidden justify-between items-center text-slate-400 text-sm text-nowrap"
              }
              href=""
            >
              로그아웃
            </a>
            <button onClick={handleClickMenu}>
              {isMenu ? (
                <XIcon className={"md:hidden block"} width={"24px"} />
              ) : (
                <MenuIcon className={"md:hidden block"} width={"24px"} />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className={`${isMenu ? "flex" : "hidden"} relative h-screen`}>
        <div className={"flex bg-white flex-col items-center absolute w-full "}>
          <button
            className={"py-4 border-b border-slate-300 w-11/12 text-slate-900 "}
          >
            <a href="">메인페이지</a>
          </button>
          <button
            className={"py-4 border-b border-slate-300 w-11/12 text-slate-900"}
          >
            <a href="">회의 일정 생성</a>
          </button>
          <button
            className={"py-4 border-b border-slate-300 w-11/12 text-slate-900"}
          >
            <a href="">휴가 신청</a>
          </button>
          <button
            className={"py-4 border-b border-slate-300 w-11/12 text-slate-900"}
          >
            <a href="">프로필</a>
          </button>
          <button
            className={"py-4 border-b border-slate-300 w-11/12 text-slate-900"}
          >
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
