import { useState } from "react";
import Logo from "./Logo";
import Avatar from "./Avatar";
import Bell from "../icons/Bell";
import MenuIcon from "../icons/MenuIcon";
import XIcon from "../icons/XIcon";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [idAdmin, setIsAdmin] = useState(false);
  const [isAlarm, setIsAlarm] = useState(false);
  const [AvatarImage, setAvatarImage] = useState("");

  const navigate = useNavigate();

  const handleClickMenu = () => {
    setIsMenu(!isMenu);
  };

  const alarmCheck = setInterval(async () => {
    const fetchData = await axios.get("", {});
  }, 5000);

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

          <div
            className={`${
              !idAdmin ? "md:flex hidden" : "hidden"
            }  gap-8 w-full text-slate-900 `}
          >
            <button onClick={() => navigate("/")}>메인페이지</button>
            <button onClick={() => navigate("/meeting")}>회의 일정 생성</button>
            <button onClick={() => navigate("/vacation")}>휴가 신청</button>
          </div>
          <div
            className={`${
              idAdmin ? "md:flex hidden" : "hidden"
            }  gap-8 w-full text-slate-900 `}
          >
            <button onClick={() => navigate("/admin")}>관리자페이지</button>
          </div>
          <div className={"flex gap-4"}>
            <button>
              <a className={"flex justify-between items-center"} href="">
                <Bell
                  className={`${isAlarm ? "opacity-100" : "opacity-30"}`}
                  width={"24px"}
                />
              </a>
            </button>
            <button
              className={"flex justify-between items-center"}
              onClick={() => navigate("/profile")}
            >
              <Avatar className={"md:block hidden"} width={"40px"} />
            </button>
            <button
              className={
                "md:flex hidden justify-between items-center text-slate-400 text-sm text-nowrap"
              }
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
              }}
            >
              로그아웃
            </button>
            {isMenu ? (
              <button className={"md:hidden block"} onClick={handleClickMenu}>
                <XIcon width={"24px"} />
              </button>
            ) : (
              <button className={"md:hidden block"} onClick={handleClickMenu}>
                <MenuIcon width={"24px"} />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={`${isMenu ? "flex" : "hidden"} relative h-screen`}>
        <div
          className={`${
            !idAdmin ? "flex" : "hidden"
          } bg-white flex-col items-center absolute w-full`}
        >
          <button
            className={"py-4 border-b border-slate-300 w-11/12 text-slate-900 "}
            onClick={() => navigate("/")}
          >
            메인페이지
          </button>
          <button
            className={"py-4 border-b border-slate-300 w-11/12 text-slate-900"}
            onClick={() => navigate("/meeting")}
          >
            회의 일정 생성
          </button>
          <button
            className={"py-4 border-b border-slate-300 w-11/12 text-slate-900"}
            onClick={() => navigate("/vacation")}
          >
            휴가 신청
          </button>
          <button
            className={"py-4 border-b border-slate-300 w-11/12 text-slate-900"}
            onClick={() => navigate("/profile")}
          >
            프로필
          </button>
          <button
            className={"py-4 border-b border-slate-300 w-11/12 text-slate-900"}
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            로그아웃
          </button>
        </div>

        <div
          className={`${
            idAdmin ? "flex" : "hidden"
          } bg-white flex-col items-center absolute w-full`}
        >
          <button
            className={"py-4 border-b border-slate-300 w-11/12 text-slate-900 "}
            onClick={() => navigate("/admin")}
          >
            관리자 페이지
          </button>
          <button
            className={"py-4 border-b border-slate-300 w-11/12 text-slate-900"}
            onClick={() => navigate("/profile")}
          >
            프로필
          </button>
          <button
            className={"py-4 border-b border-slate-300 w-11/12 text-slate-900"}
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
