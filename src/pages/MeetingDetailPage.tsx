import { ChangeEvent, useEffect, useState } from "react";
import Datepicker from "../components/common/DatePicker";
import Input from "../components/common/Input";
import AutoComplete from "../components/common/AutoComplete";
import ReactDatePiker from "react-datepicker";
import Button from "../components/common/Button";
import { UserData } from "../types";
import { useSelectedUserStore } from "../store/useUserStore";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import api from "../utils/api";
import { ENDPOINT } from "../utils/endpoints";

const MeetingDetailPage: React.FC = () => {
  const [userName, setUserName] = useState<{
    userId: string;
    email: string;
    username: string;
    token?: string;
  }>({ userId: "", email: "", username: "" });
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date | null>(new Date());
  const [agenda, setAgenda] = useState("");
  const navigate = useNavigate();
  const { selectedUsers, setSelectedUsers, setDeleteUsers, setGetUsers } =
    useSelectedUserStore();
  const loginUser = localStorage.getItem("user");
  // const startDateString = startDate?.toLocaleDateString("ko-KR"); // date에서 날짜만 string변환
  const selectedUserName = selectedUsers.map((user) => user.username);

  // date에서 시간만 string변환
  const hours = selectedTime?.getHours().toString().padStart(2, "0");
  const minutes = selectedTime?.getMinutes().toString().padStart(2, "0");
  const selectedTimeString = `${hours}:${minutes}`;

  const handleUserSelect = (user: UserData) => {
    setSelectedUsers(user);
  };
  const handleClickAgenda = (e: ChangeEvent<HTMLInputElement>) => {
    setAgenda(e.target.value);
  };
  const handleClickCancel = (user: UserData) => {
    setDeleteUsers(user);
  };
  const param = useParams(); // 674effc4a19783b2f22fbbea
  // console.log("param.meetingId ", param.meetingId);

  // const newSelectedUsers = [...selectedUsers];

  // 페이지 들어갔을때 입력했던 데이터 받아오기
  const getUserInfo = async () => {
    try {
      // const request = await axios.get(`/api/meeting/${param.meetingId}`, {
      //   headers: {
      //     Authorization: token,
      //   },
      // });
      const request = await api.get(`${ENDPOINT.METTING}/${param.meetingId}`);

      const meeting = request.data.data.meeting;
      console.log("meeting data ", meeting);

      // setGetUsers((prevSelectedUsers) => {
      //   const newSelectedUsers = [...prevSelectedUsers];
      //   meeting.attendant.forEach((username: string) => {
      //     const user: UserData = { username };
      //     if (
      //       !newSelectedUsers.some(
      //         (selectedUser) => selectedUser.username === user.username
      //       )
      //     ) {
      //       newSelectedUsers.push(user);
      //     }
      //   });
      //   return newSelectedUsers;
      // });
      const newSelectedUsers = meeting.attendant.map((username: string) => ({
        username,
      }));
      setGetUsers(newSelectedUsers);

      // meeting.attendant.forEach((username: string) => {
      //   const user: UserData = { username: username };
      //   if (
      //     !newSelectedUsers.some(
      //       (selectedUser) => selectedUser.username === user.username
      //     )
      //   ) {
      //     newSelectedUsers.push(user);
      //   }
      // });
      // setGetUsers(newSelectedUsers);

      // const availablueUsers = selectedUsers.filter(
      //   (user) =>
      //     !newSelectedUsers.some((get) => get.username === user.username)
      // );

      // console.log("selectedUsers ", selectedUsers);

      setAgenda(meeting.agenda);
      // const [year, month, day] = meeting.date
      //   .split(". ")
      //   .map((part: string) => parseInt(part, 10));
      // const startDateObject = new Date(year, month - 1, day);
      setStartDate(meeting.date);

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

  // 수정버튼
  const handleClickFix = async () => {
    const data = {
      creatorId: userName.userId,
      attendant: selectedUserName,
      date: startDate,
      startTime: selectedTimeString,
      agenda: agenda,
    };

    try {
      // const request = await axios.put(`/api/meeting/${param.meetingId}`, data, {
      //   headers: {
      //     Authorization: userName.token,
      //   },
      // });
      const request = await api.put(
        `${ENDPOINT.METTING}/${param.meetingId}`,
        data
      );
      if (agenda === "") {
        alert("회의 안건을 입력해주세요");
      } else if (selectedUserName.length === 0) {
        alert("참여자를 입력해주세요");
      } else {
        console.log("Fix meetingDetail data ", request.data);
        alert("회의 수정 완료");
        navigate("/");
      }
    } catch (err) {
      console.log("Error meetingDetail Fix ", err);
      alert("회의 수정 실패");
    }
  };

  // 삭제버튼
  const handleClickDelete = async () => {
    try {
      // const request = await axios.delete(`/api/meeting/${param.meetingId}`, {
      //   headers: {
      //     Authorization: userName.token,
      //   },
      // });
      const request = await api.delete(
        `${ENDPOINT.METTING}/${param.meetingId}`
      );
      console.log("Delete meetingDetail data ", request.data);
      alert("삭제완료");
      navigate("/");
    } catch (err) {
      console.log("Error meetingDetail delete ", err);
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
  //   console.log("selectedUsers ", selectedUsers);
  // }, [selectedUsers]);
  return (
    <>
      <div className="w-full flex flex-col space-y-5 items-center">
        <p className="mt-20">회의 일정 상세 페이지</p>
        <div className="w-1/6">
          <Datepicker
            className="w-full px-4 py-2 border rounded-md"
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
            <Button btnText="수정" onClick={handleClickFix} />
          </div>
          <div className="w-1/3">
            <Button
              className="px-4 py-3 bg-[#f00] text-white rounded-md hover:bg-[#ba0000] transition duration-10"
              btnText="삭제"
              onClick={handleClickDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingDetailPage;
