import { ChangeEvent, useEffect, useState } from "react";
import Datepicker from "../components/common/DatePicker";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import ReactDatePiker from "react-datepicker";
import AutoComplete from "../components/common/AutoComplete";
import { UserData } from "../types";
import { useSelectedUserStore } from "../store/useUserStore";
import api from "../utils/api";
import { ENDPOINT } from "../utils/endpoints";
import { useNavigate } from "react-router-dom";

// 현재 시간을 가장 가까운 30분 단위로 반올림
const getRoundedDate = () => {
  const date = new Date();
  const minutes = date.getMinutes();
  const roundedMinutes = minutes <= 30 ? 30 : 60;
  date.setMinutes(roundedMinutes);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

const MeetingPage: React.FC = () => {
  const [userName, setUserName] = useState<{
    userId: string;
    email: string;
    username: string;
    token?: string;
  }>({ userId: "", email: "", username: "" });
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date | null>(
    getRoundedDate()
  );

  const now = new Date();
  const { selectedUsers, setSelectedUsers, setDeleteUsers } =
    useSelectedUserStore();
  const [agenda, setAgenda] = useState("");
  const navigate = useNavigate();

  const loginUser = localStorage.getItem("user");

  // date에서 시간만 string변환
  const hours = selectedTime?.getHours().toString().padStart(2, "0");
  const minutes = selectedTime?.getMinutes().toString().padStart(2, "0");
  const selectedTimeString = `${hours}:${minutes}`;

  const selectedUserName = selectedUsers.map((user) => user.username);
  console.log("selectedUsers ", selectedUsers);

  const handleUserSelect = (user: UserData) => {
    setSelectedUsers(user);
  };
  const handleClickAgenda = (e: ChangeEvent<HTMLInputElement>) => {
    setAgenda(e.target.value);
  };
  const handleClickCancel = (user: UserData) => {
    setDeleteUsers(user);
  };

  // 등록버튼
  const handleClickSubmit = async () => {
    const data = {
      creatorId: userName.userId,
      date: startDate,
      startTime: selectedTimeString,
      agenda: agenda,
      attendant: selectedUserName,
      username: userName.username,
    };

    try {
      const request = await api.post(ENDPOINT.METTING, data);
      if (agenda === "") {
        alert("회의 안건을 입력해주세요");
      } else if (selectedUserName.length === 0) {
        alert("참여자를 입력해주세요");
      } else {
        console.log("meeting data ", request.data);
        alert("회의 신청 완료");
        navigate("/");
      }
    } catch (err) {
      console.log("Error submit meeting data", err);
      alert("회의 신청 실패");
    }
  };

  useEffect(() => {
    if (loginUser) {
      setUserName(JSON.parse(loginUser));
    }
  }, []);

  // useEffect(() => {
  //   if (userName) {
  //     console.log("user 토큰 ", userName);
  //   }
  // }, [userName]);

  // console.log("selected", selectedUsers);
  return (
    <>
      <div className="w-full flex flex-col space-y-5 items-center">
        <p className="mt-20">회의 일정 생성 페이지</p>
        <div className="w-1/6">
          <Datepicker
            className="w-full px-4 py-2 border rounded-md"
            dateFormat="yyyy/MM/dd"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            id={"날짜"}
            minDate={now}
          />
        </div>
        <div className="w-1/6">
          <Input
            placeholder="회의 안건"
            id={"회의 안건"}
            onChange={handleClickAgenda}
          />
        </div>
        <div className="w-1/6">
          <Input
            placeholder="생성자"
            id={"생성자"}
            value={userName.username}
            readOnly
          />
        </div>
        <div className="w-1/6">
          <AutoComplete onSelect={handleUserSelect} id={"참여자"} />
          <div className="mt-5">
            {selectedUsers.map((user, index) => (
              <span
                key={index}
                onClick={() => handleClickCancel(user)}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-[#a3aee6] transition duration-10"
              >
                {user.username}
              </span>
            ))}
          </div>
        </div>
        <div className="w-1/6">
          <ReactDatePiker
            className="px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2"
            selected={selectedTime}
            onChange={(date: Date | null) => setSelectedTime(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            minTime={now}
            maxTime={
              new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59)
            }
            dateFormat="hh:mm aa"
          />
        </div>
        <div className="w-1/6">
          <Button btnText="등록" onClick={handleClickSubmit} />
        </div>
      </div>
    </>
  );
};

export default MeetingPage;
