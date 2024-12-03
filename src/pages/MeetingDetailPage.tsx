import { ChangeEvent, useEffect, useState } from "react";
import Datepicker from "../components/common/DatePicker";
import Input from "../components/common/Input";
import AutoComplete from "../components/common/AutoComplete";
import ReactDatePiker from "react-datepicker";
import Button from "../components/common/Button";
import { UserData } from "../types";
import { useSelectedUserStore } from "../store/useUserStore";
import { useParams } from "react-router-dom";
import axios from "axios";

const MeetingDetailPage: React.FC = () => {
  const [userName, setUserName] = useState<{
    id: string;
    email: string;
    username: string;
    token?: string;
  }>({ id: "", email: "", username: "" });
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date | null>(new Date());
  const [agenda, setAgenda] = useState("");
  const { selectedUsers, setSelectedUsers, setDeleteUsers } =
    useSelectedUserStore();
  const loginUser = localStorage.getItem("user");

  const handleUserSelect = (user: UserData) => {
    setSelectedUsers(user);
  };
  const handleClickAgenda = (e: ChangeEvent<HTMLInputElement>) => {
    setAgenda(e.target.value);
  };
  const handleClickCancel = (user: UserData) => {
    setDeleteUsers(user);
  };
  const param = useParams(); // 674e67fa398108dc4e520f93
  console.log("param.meetingId ", param.meetingId);

  const getUserInfo = async (token: string) => {
    try {
      const request = await axios.get(`/api/meeting/${param.meetingId}`, {
        headers: {
          Authorization: token,
        },
      });
      const meeting = request.data.data.meeting;
      console.log("getUser data ", meeting.attendant);
      let newSelectedUsers = [...selectedUsers];
      meeting.attendant.forEach((username: string) => {
        const user: UserData = {
          username: username,
        };
        newSelectedUsers.push(user);
      });

      // setSelectedUsers(newSelectedUsers);
      setAgenda(meeting.agenda);
      const [year, month, day] = meeting.date
        .split(". ")
        .map((part: string) => parseInt(part, 10));
      const startDateObject = new Date(year, month - 1, day);
      setStartDate(startDateObject);

      const DateTime = new Date();
      const [hours, minutes] = meeting.startTime.split(":");
      DateTime?.setHours(parseInt(hours, 10));
      DateTime?.setMinutes(parseInt(minutes, 10));
      DateTime?.setSeconds(0);
      DateTime?.setMilliseconds(0);
      setSelectedTime(DateTime);
    } catch (err) {
      console.log("Error getUserInfo ", err);
    }
  };

  useEffect(() => {
    if (loginUser) {
      const user = JSON.parse(loginUser);
      setUserName(user);
      getUserInfo(user.token);
    }
  }, []);

  console.log("selected", selectedUsers);

  return (
    <>
      <div className="w-full flex flex-col space-y-5 items-center">
        <p className="mt-20">회의 일정 상세 페이지</p>
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
            value={agenda}
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
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
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
            timeIntervals={10}
            dateFormat="hh:mm aa"
          />
        </div>
        <div className="w-1/6 flex justify-between">
          <div className="w-1/3">
            <Button btnText="수정" />
          </div>
          <div className="w-1/3">
            <Button btnText="삭제" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingDetailPage;
