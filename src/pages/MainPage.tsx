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
  const [meetingList, setMeetingList] = useState([]);

  const selectDay = Array.isArray(value)
    ? dayjs(value[0]).format("YYYY년 MM월 DD일")
    : dayjs(value).format("YYYY년 MM월 DD일");

  const token = user.token;

  const fetchMeeting = async () => {
    try {
      const response = await axios.get("/api/meeting", {
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

  console.log(meetingList);

  useEffect(() => {
    fetchMeeting();
  }, []);

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
              <div></div>
            </div>
          </div>
          <CheckInOut />
        </div>
        <div
          style={{ display: "flex", height: "calc(100% - 2rem)" }}
          className="calendarStyle"
        >
          <Calendar
            onChange={onChange}
            value={value}
            formatDay={(locale, date) => dayjs(date).format("D")} // '일' 제거, 숫자만 표시
            formatYear={(locale, date) => dayjs(date).format("YYYY")} // 네비게이션에서 숫자 년도만 표시
            formatMonthYear={(locale, date) => dayjs(date).format("YYYY. MM")} // 네비게이션에서 '2023. 12' 형식으로 표시
            calendarType="gregory" // 일요일 부터 시작
            showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
            next2Label={null} // +1년 & +10년 이동 버튼 숨기기
            prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
            minDetail="year" // 10년단위 년도 숨기기
            onClickDay={(value, event) =>
              alert(`Clicked day: ${dayjs(value).format("YYYY-MM-DD")}`)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
