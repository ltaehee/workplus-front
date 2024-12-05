import { ChangeEvent, useEffect, useState } from "react";
import Datepicker from "../components/common/DatePicker";
import Input from "../components/common/Input";
import SelectBox from "../components/common/SelectBox";
import Button from "../components/common/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import { ENDPOINT } from "../utils/endpoints";

const VacationDetailPage = () => {
  const [isOption, setIsOption] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [reason, setReason] = useState("");
  const [requesterId, setRequesterId] = useState("");
  const [requesterUsername, setRequesterUsername] = useState("");
  const navigate = useNavigate();

  const loginUser = localStorage.getItem("user");
  // const startDateString = startDate?.toLocaleDateString("ko-KR");
  // const endDateString = endDate?.toLocaleDateString("ko-KR");
  const [userName, setUserName] = useState<{
    userId: string;
    email: string;
    username: string;
    token: string;
  }>({ userId: "", email: "", username: "", token: "" });
  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setIsOption(e.target.value);
    console.log(e.target.value);
  };
  const handleChangeReason = (e: ChangeEvent<HTMLInputElement>) => {
    setReason(e.target.value);
  };

  const param = useParams(); // 674ff4768001e362ac93297d
  // console.log("param.vacationId ", param.vacationId);
  // console.log("userName.token ", userName.token);

  // 페이지 들어갔을때 입력했던 데이터 받아오기
  const getUserInfo = async () => {
    try {
      // const request = await axios.get(`/api/vacation/${param.vacationId}`, {
      //   headers: {
      //     authorization: token,
      //   },
      // });
      const request = await api.get(`${ENDPOINT.VACATION}/${param.vacationId}`);

      const vacation = request.data.data.vacation;
      console.log("getUser data ", vacation);

      setIsOption(vacation.vacationType);
      setReason(vacation.reason);
      setStartDate(vacation.startDate);
      setEndDate(vacation.endDate);
      setRequesterId(vacation.requesterId);
      setRequesterUsername(vacation.username);
    } catch (err) {
      console.log("Error getUserInfo ", err);
    }
  };
  // 수정버튼
  const handleClickFix = async () => {
    const data = {
      username: userName.username,
      userId: userName.userId,
      startDate: startDate,
      endDate: endDate,
      vacationType: isOption,
      reason: reason,
    };

    try {
      // const request = await axios.put(
      //   `/api/vacation/${param.vacationId}`,
      //   data,
      //   {
      //     headers: {
      //       Authorization: userName.token,
      //     },
      //   }
      // );
      const request = await api.put(
        `${ENDPOINT.VACATION}/${param.vacationId}`,
        data
      );
      if (reason === "") {
        alert("휴가 수정 실패: 사유를 입력해주세요");
      } else {
        console.log("Fix vacationDetail data ", request.data);
        alert("휴가신청 수정완료");
        navigate("/");
      }
    } catch (err) {
      console.log("Error vacationDetail Fix ", err);
      alert("휴가 수정 실패");
    }
  };

  // 삭제버튼
  const handleClickDelete = async () => {
    try {
      // const request = await axios.delete(`/api/vacation/${param.vacationId}`, {
      //   headers: {
      //     Authorization: userName.token,
      //   },
      // });
      const request = await api.delete(
        `${ENDPOINT.VACATION}/${param.vacationId}`
      );
      console.log("Delete vacationDetail data ", request.data);
      alert("삭제완료");
      navigate("/");
    } catch (err) {
      console.log("Error vacationDetail delete ", err);
      alert("삭제실패");
    }
  };

  useEffect(() => {
    if (loginUser) {
      const user = JSON.parse(loginUser);
      setUserName(user);
      getUserInfo();
    }
  }, []);

  // useEffect(() => {
  //   // console.log("userName ", userName.token);
  // }, [userName]);
  return (
    <>
      <div className="w-full flex flex-col space-y-5 items-center">
        <p className="mt-20">휴가 신청 상세 페이지</p>
        <div className="w-1/6">
          <Input
            placeholder="이름"
            id={"이름"}
            value={requesterUsername}
            readOnly
          />
        </div>
        <div className="w-1/6">
          {requesterId !== userName.userId ? (
            <Datepicker
              id={"시작 날짜"}
              className="w-full px-4 py-2 border rounded-md"
              dateFormat="yyyy/MM/dd"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              readOnly
            />
          ) : (
            <Datepicker
              id={"시작 날짜"}
              className="w-full px-4 py-2 border rounded-md"
              dateFormat="yyyy/MM/dd"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          )}
        </div>
        <div className="w-1/6">
          {requesterId !== userName.userId ? (
            <Datepicker
              id={"종료 날짜"}
              className="w-full px-4 py-2 border rounded-md"
              dateFormat="yyyy/MM/dd"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              readOnly
            />
          ) : (
            <Datepicker
              id={"종료 날짜"}
              className="w-full px-4 py-2 border rounded-md"
              dateFormat="yyyy/MM/dd"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          )}
        </div>
        <div className="w-1/6">
          {requesterId !== userName.userId ? (
            <SelectBox
              id={"종류"}
              className=""
              value={isOption}
              optionText1="연차"
              optionText2="반차"
              onChange={handleChangeSelect}
              disabled={true}
            />
          ) : (
            <SelectBox
              id={"종류"}
              className=""
              value={isOption}
              optionText1="연차"
              optionText2="반차"
              onChange={handleChangeSelect}
              disabled={false}
            />
          )}
        </div>
        <div className="w-1/6">
          {requesterId !== userName.userId ? (
            <Input
              placeholder="사유"
              id={"사유"}
              value={reason}
              onChange={handleChangeReason}
              readOnly
            />
          ) : (
            <Input
              placeholder="사유"
              id={"사유"}
              value={reason}
              onChange={handleChangeReason}
            />
          )}
        </div>
        <div className="w-1/6 flex justify-between">
          <div className="w-1/3">
            {requesterId !== userName.userId ? null : (
              <Button btnText="수정" onClick={handleClickFix} />
            )}
          </div>
          <div className="w-1/3 ">
            {requesterId !== userName.userId ? null : (
              <Button
                className="px-4 py-3 bg-[#f00] text-white rounded-md hover:bg-[#ba0000] transition duration-10"
                btnText="삭제"
                onClick={handleClickDelete}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VacationDetailPage;
