import Logo from "../components/common/Logo";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const regex =
  /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?`~\-]).{8,}$/;

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [issend, setIsSend] = useState(false);
  const [token, setToken] = useState({ value: "", expires: "" });
  const [emailInputValue, setEmailInputValue] = useState("");
  const [isclick, setIsclick] = useState(false);
  const [ifVerifyOk, setIsVerifyOk] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const emailValue = urlParams.get("email");
    const tokenValue = urlParams.get("token");
    const expiresValue = urlParams.get("expires");

    if (tokenValue && expiresValue && emailValue) {
      setIsSend(true);
      setEmailInputValue(emailValue);
      setToken({ value: tokenValue, expires: expiresValue });
    }
  }, [location]);

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleChangePasswordCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  };
  const handleClickEmailSend = async () => {
    if (!email.includes("@")) {
      alert("메일에@넣어주세요");
    } else {
      try {
        const response = await axios.post("/api/auth/send-email", {
          email,
        });
        console.log(response);
        setIsclick(true);
      } catch (err) {
        console.log("handleClickEmailVerify 오류", err);
      }
    }
  };

  const handleClickEmailVerify = async () => {
    try {
      const response = await axios.post("/api/auth/verify-email", {
        email: emailInputValue,
        token,
      });
      console.log(response);
      setIsVerifyOk(true);
    } catch (err) {
      console.log("handleClickEmailVerify 오류", err);
    }
  };

  const handleClickSignup = async () => {
    if (name.length <= 1) {
      alert("이름은 2글자 이상 적어주세요");
    } else if (!regex.test(password)) {
      alert(
        "password는 8글자 이상 + 영문, 특수문자는 꼭 하나씩 들어가야됩니다."
      );
    } else if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다");
    } else if (password === passwordCheck) {
      try {
        const response = await axios.post("/api/auth/signup", {
          email: emailInputValue,
          username: name,
          password,
        });
        console.log(response);
        navigate("/login");
      } catch (err) {
        console.log("handleClickSignup 오류", err);
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
            <h2 className={"text-xl"}>회원가입</h2>
            {!issend ? (
              <>
                <Input
                  type={"email"}
                  onChange={handleChangeEmail}
                  placeholder={"이메일을 입력해주세요"}
                  id={"이메일"}
                />

                {!isclick ? (
                  <Button
                    className={"bg-blue-400"}
                    onClick={handleClickEmailSend}
                    btnText={"이메일 보내기"}
                  />
                ) : (
                  <h3 className={"text-l"}>이메일을 확인해주세요</h3>
                )}
              </>
            ) : (
              <>
                <input
                  className={
                    "px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2"
                  }
                  readOnly
                  value={emailInputValue}
                  id={"이메일"}
                />
                <Button
                  className={ifVerifyOk ? "bg-green-800" : "bg-blue-800"}
                  onClick={handleClickEmailVerify}
                  btnText={ifVerifyOk ? "인증되었습니다" : "이메일 인증받기"}
                />
              </>
            )}
          </div>
          {issend ? (
            <>
              <div className={"flex flex-col gap-4 w-8/12 min-w-80"}>
                <Input
                  type={"text"}
                  onChange={handleChangeName}
                  placeholder={"이름을 입력해주세요"}
                  id={"이름"}
                />
                <Input
                  type={"password"}
                  onChange={handleChangePassword}
                  placeholder={"비밀번호를 입력해주세요"}
                  id={"비밀번호"}
                />
                <Input
                  type={"password"}
                  onChange={handleChangePasswordCheck}
                  placeholder={"비밀번호를 한번 더 입력해주세요"}
                  id={"비밀번호 확인"}
                />
                <Button onClick={handleClickSignup} btnText={"회원가입"} />

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
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default SignupPage;
