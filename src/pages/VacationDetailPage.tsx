import { ChangeEvent, useEffect, useState } from "react";
import Datepicker from "../components/common/DatePicker";
import Input from "../components/common/Input";
import SelectBox from "../components/common/SelectBox";
import Button from "../components/common/Button";
import axios from "axios";
import { useParams } from "react-router-dom";

const VacationDetailPage = () => {
  const [isOption, setIsOption] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [reason, setReason] = useState("");

  const loginUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const startDateString = startDate?.toLocaleDateString("ko-KR");
  const endDateString = endDate?.toLocaleDateString("ko-KR");
  const [userName, setUserName] = useState<{
    id: string;
    email: string;
    username: string;
  }>({ id: "", email: "", username: "" });
  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setIsOption(e.target.value);
    console.log(e.target.value);
  };
  const handleChangeReason = (e: ChangeEvent<HTMLInputElement>) => {
    setReason(e.target.value);
  };

  const param = useParams(); // 6749977732e657c9a75da74d
  console.log("param.vacationId ", param.vacationId);
  const getUserInfo = async () => {
    try {
      const request = await axios.get(`/api/vacation/${param.vacationId}`, {
        headers: {
          Authorization: token,
        },
      });
      const vacation = request.data.data.vacation;
      console.log("getUser data ", vacation);

      setIsOption(vacation.vacationType);
      setReason(vacation.reason);
      const [year, month, day] = vacation.startDate
        .split(". ")
        .map((part: string) => parseInt(part, 10));
      const startDateObject = new Date(year, month - 1, day);
      const [year1, month1, day1] = vacation.endDate
        .split(". ")
        .map((part: string) => parseInt(part, 10));
      const endDateObject = new Date(year1, month1 - 1, day1);
      setStartDate(startDateObject);
      setEndDate(endDateObject);
    } catch (err) {
      console.log("Error getUserInfo ", err);
    }
  };

  const handleClickFix = async () => {
    const data = {
      username: userName.username,
      userId: userName.id,
      startDate: startDateString,
      endDate: endDateString,
      vacationType: isOption,
      reason: reason,
    };

    try {
      const request = await axios.put(
        `/api/vacation/${param.vacationId}`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Fix vacationDetail data ", request.data);
    } catch (err) {
      console.log("Error vacationDetail Fix ", err);
    }
  };

  const handleClickDelete = async () => {
    try {
      const request = await axios.delete(`/api/vacation/${param.vacationId}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("Delte vacationDetail data ", request.data);
    } catch (err) {
      console.log("Error vacationDetail delete ", err);
    }
  };

  useEffect(() => {
    getUserInfo();

    if (loginUser) {
      const user = JSON.parse(loginUser);
      setUserName(user);
      console.log("user 토큰 ", user.id);
    }
  }, []);
  return (
    <>
      <div className="w-full flex flex-col space-y-5 items-center">
        <p className="mt-20">휴가 신청 상세 페이지</p>
        <div className="w-1/6">
          <Input
            placeholder="이름"
            id={"이름"}
            value={userName.username}
            readOnly
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
          <Input
            placeholder="사유"
            id={"사유"}
            value={reason}
            onChange={handleChangeReason}
          />
        </div>
        <div className="w-1/6 flex justify-between">
          <div className="w-1/3">
            <Button btnText="수정" onClick={handleClickFix} />
          </div>
          <div className="w-1/3">
            <Button btnText="삭제" onClick={handleClickDelete} />
          </div>
        </div>
      </div>
    </>
  );
};

export default VacationDetailPage;
