import { useEffect, useState } from "react";
import CheckInOut from "../components/main/CheckInOut";
import dayjs from "dayjs";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../components/main/calendarStyle.css";
import axios from "axios";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const MainPage = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [meetingList, setMeetingList] = useState([
    {
      meeting: "",
      creatorId: "",
      attendant: [],
      date: "",
      startTime: "",
      agenda: "",
      createdAt: "",
    },
  ]);

  const [selectMeetingList, setSelectMeetingList] = useState([
    {
      meeting: "",
      creatorId: "",
      attendant: [],
      date: "",
      startTime: "",
      agenda: "",
      createdAt: "",
    },
  ]);

  const selectDay = Array.isArray(value)
    ? dayjs(value[0]).format("YYYY년 MM월 DD일")
    : dayjs(value).format("YYYY년 MM월 DD일");

  const currentMonth = dayjs(value as Date).format("YYYY-MM");

  const token = user.token;

  const fetchMeeting = async () => {
    try {
      const response = await axios.get(`/api/meeting/month/${currentMonth}`, {
        headers: {
          authorization: `${token}`,
        },
      });
      setMeetingList(response.data.meetings);
    } catch (err) {
      console.log("fetchMeeting 오류", err);
      if (axios.isAxiosError(err)) {
        alert(err.response?.data.message);
      }
    }
  };

  const handleClickDay = (value: Date) => {
    const meetingDate = meetingList.filter(
      (obj) => obj.date.split("T")[0] === dayjs(value).format("YYYY-MM-DD")
    );
    setSelectMeetingList(meetingDate);
  };

  console.log("selectMeetingList", selectMeetingList);

  const currentDayMeetingList = selectMeetingList.map((item) => {
    return (
      <li>
        <h4>{item.agenda}</h4>
        <p>{item.startTime}</p>
      </li>
    );
  });

  useEffect(() => {
    fetchMeeting();
  }, [currentMonth]);

  return (
    <div className="flex justify-center bg-slate-100">
      <div
        style={{ height: "calc(100vh - 65px)" }}
        className="grid grid-cols-[1fr_2fr] w-[1280px] gap-4 p-8"
      >
        <div className=" flex flex-col gap-4">
          <div className="bg-white border border-slate-400 rounded-lg shadow-lg h-2/3">
            <div className="bg-slate-500 flex justify-center items-center h-14">
              <div className="text-white text-lg">{selectDay}</div>
            </div>
            <ul>{currentDayMeetingList}</ul>
          </div>
          <CheckInOut />
        </div>
        <div
          style={{ display: "flex", height: "calc(100% - 3rem)" }}
          className="calendarStyle"
        >
          <Calendar
            onChange={onChange}
            value={value}
            formatDay={(_, date) => dayjs(date).format("D")} // '일' 제거, 숫자만 표시
            formatYear={(_, date) => dayjs(date).format("YYYY")} // 네비게이션에서 숫자 년도만 표시
            formatMonthYear={(_, date) => dayjs(date).format("YYYY년 MM월")} // 네비게이션에서 '2023. 12' 형식으로 표시
            calendarType="gregory" // 일요일 부터 시작
            showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
            next2Label={null} // +1년 & +10년 이동 버튼 숨기기
            prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
            minDetail="year" // 10년단위 년도 숨기기
            onClickDay={handleClickDay}
            tileContent={({ activeStartDate, date, view }) =>
              view === "month" && date.getDay() === 0 ? (
                <div className="bg-pink-500 rounded-full p-2 text-white">
                  일요일
                </div>
              ) : null
            }
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
