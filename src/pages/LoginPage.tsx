import Logo from "../components/common/Logo";
import Input from "../components/common/Input";

const LoginPage = () => {
  return (
    <>
      <div className={"grid grid-cols-2"}>
        <div className={"flex justify-center items-center  h-screen"}>
          <Logo className={"w-6/12"} />
        </div>
        <div className={"flex justify-center items-center  h-screen"}>
          <div className={"flex flex-col gap-3"}>
            <h2>로그인</h2>

            <Input placeholder={"이메일을 입력해주세요"} id={"이메일"}></Input>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
