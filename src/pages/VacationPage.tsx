import { ChangeEvent, useEffect, useState } from "react";
import SelectBox from "../components/common/SelectBox";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Datepicker from "../components/common/DatePicker";
import axios from "axios";
import { data } from "react-router-dom";
const VacationPage = () => {
  const [userName, setUserName] = useState<{
    id: string;
    email: string;
    username: string;
  }>({ id: "", email: "", username: "" });
  const [isOption, setIsOption] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [reason, setReason] = useState("");

  const loginUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const startDateString = startDate?.toLocaleDateString("ko-KR");
  const endDateString = endDate?.toLocaleDateString("ko-KR");
  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setIsOption(e.target.value);
    console.log(e.target.value);
  };
  const handleChangeReason = (e: ChangeEvent<HTMLInputElement>) => {
    setReason(e.target.value);
  };

  const handelClickSubmit = async () => {
    const data = {
      username: userName.username,
      userId: userName.id,
      startDate: startDateString,
      endDate: endDateString,
      vacationType: isOption,
      reason: reason,
    };
    try {
      const request = await axios.post("/api/vacation", data, {
        headers: {
          authorization: token,
        },
      });
      console.log("vacateion data ", request.data);
    } catch (err) {
      console.log("Error submit vacation data ", err);
    }
  };

  useEffect(() => {
    console.log("user  ", loginUser);
    console.log("userName._id ", userName.id);

    if (loginUser) {
      setUserName(JSON.parse(loginUser));
      console.log("user 토큰 ", userName);
    }
  }, []);

  // console.log("시작날짜 ", startDateString);
  // console.log("종료날짜 ", endDateString);
  // console.log("종류 ", isOption);
  // console.log("사유 ", reason);

  return (
    <>
      <div className="w-full flex flex-col space-y-5 items-center">
        <p className="mt-20">휴가 신청 페이지</p>
        <div className="w-1/6">
          <Input
            placeholder="이름"
            id={"이름"}
            value={userName.username}
            readonly
          />
        </div>
        <div className="w-1/6">
          <Datepicker
            id={"시작 날짜"}
            className="w-full"
            dateFormat="yyyy/MM/dd"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className="w-1/6">
          <Datepicker
            id={"종료 날짜"}
            className="w-full"
            dateFormat="yyyy/MM/dd"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>
        <div className="w-1/6">
          <SelectBox
            id={"종류"}
            className=""
            value={isOption}
            optionText1="연차"
            optionText2="반차"
            onChange={handleChangeSelect}
          />
        </div>
        <div className="w-1/6">
          <Input placeholder="사유" id={"사유"} onChange={handleChangeReason} />
        </div>
        <div className="w-1/6">
          <Button btnText="등록" onClick={handelClickSubmit} />
        </div>
      </div>
    </>
  );
};

export default VacationPage;
