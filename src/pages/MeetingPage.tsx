import { ChangeEvent, useEffect, useState } from "react";
import Datepicker from "../components/common/DatePicker";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import ReactDatePiker from "react-datepicker";
import AutoComplete from "../components/common/AutoComplete";
import axios from "axios";
import { UserData } from "../types";

const MeetingPage: React.FC = () => {
  const [userName, setUserName] = useState<{
    id: string;
    email: string;
    username: string;
  }>({ id: "", email: "", username: "" });
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date | null>(new Date());
  const [selectedUsers, setSelectedUsers] = useState<UserData[]>([]);
  const [agenda, setAgenda] = useState("");

  const loginUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const startDateString = startDate?.toLocaleDateString("ko-KR"); // date에서 날짜만 string변환

  // date에서 시간만 string변환
  const hours = selectedTime?.getHours().toString().padStart(2, "0");
  const minutes = selectedTime?.getMinutes().toString().padStart(2, "0");
  const selectedTimeString = `${hours}:${minutes}`;

  const UserDataList = [
    { userName: "강아지", id: "dog" },
    { userName: "강아지2", id: "dog2" },
    { userName: "고양이", id: "cat" },
    { userName: "고양이2", id: "cat2" },
    { userName: "오리", id: "duck" },
  ];

  const availableUsers = UserDataList.filter(
    (user) => !selectedUsers.some((selected) => selected.id === user.id)
  );
  const handleUserSelect = (user: UserData) => {
    setSelectedUsers((prevUsers) => [...prevUsers, user]);
  };
  const handleClickAgenda = (e: ChangeEvent<HTMLInputElement>) => {
    setAgenda(e.target.value);
  };
  const handleClickSubmit = async () => {
    const data = {
      userId: userName.id,
      date: startDateString,
      startTime: selectedTimeString,
      agenda: agenda,
    };

    try {
      const request = await axios.post("/api/meeting", data, {
        headers: {
          Authorization: token,
        },
      });
      console.log("meeting data ", request.data);
    } catch (err) {
      console.log("Error submit meeting data", err);
    }
  };

  useEffect(() => {
    if (loginUser) {
      setUserName(JSON.parse(loginUser));
      console.log("user 토큰 ", userName);
    }
  }, []);
  return (
    <>
      <div className="w-full flex flex-col space-y-5 items-center">
        <p className="mt-20">회의 일정 생성 페이지</p>
        <div className="w-1/6">
          <Datepicker
            className="w-full"
            dateFormat="yyyy/MM/dd"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            id={"날짜"}
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
          <AutoComplete
            data={availableUsers}
            onSelect={handleUserSelect}
            id={"참여자"}
          />
          <div className="mt-5">
            {selectedUsers.map((user) => (
              <span
                key={user.id}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                {user.userName}
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
            timeIntervals={10}
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
