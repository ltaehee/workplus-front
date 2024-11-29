import Logo from "../components/common/Logo";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleClickLogin = async () => {
    try {
      const response = await axios.post("/api/auth/signin", {
        email,
        password,
      });
      localStorage.setItem("token", response.headers.token);
      navigate("/");
    } catch (err) {
      console.log("handleClickLogin 오류", err);
      if (axios.isAxiosError(err)) {
        alert(err.response?.data.message);
      }
    }
  };

  return (
    <>
      <div className={"grid grid-cols-2"}>
        <div className={"flex justify-center items-center  h-screen"}>
          <Logo className={"w-6/12"} />
        </div>
        <div
          className={"flex flex-col justify-center items-center gap-8 h-screen"}
        >
          <div className={"flex flex-col w-8/12 min-w-80 gap-4"}>
            <h2 className={"text-xl"}>로그인</h2>
            <Input
              type={"email"}
              onChange={handleChangeEmail}
              placeholder={"이메일을 입력해주세요"}
              id={"이메일"}
            />
            <Input
              type={"password"}
              onChange={handleChangePassword}
              placeholder={"비밀번호를 입력해주세요"}
              id={"비밀번호"}
            />
            <Button onClick={handleClickLogin} btnText={"이메일 로그인"} />
            <div
              className={
                "flex justify-center items-center text-sm text-slate-500"
              }
            >
              <a href="">회원가입</a>
              <p className={"px-1"}> | </p>
              <a href="">비밀번호 찾기</a>
            </div>
          </div>
          <div className={"flex flex-col gap-4 w-8/12 min-w-80"}>
            <div className={"flex items-center py-4"}>
              <div className={"flex-1 border-t border-gray-400 mr-4"}></div>
              <span className={"text-slate-600"}>SNS 간편 로그인</span>
              <div className={"flex-1 border-t border-gray-400 ml-4"}></div>
            </div>
            <Button btnText={"구글 로그인"} />
            <Button btnText={"카카오 로그인"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
