import { useState } from "react";
import CheckInOut from "../components/main/CheckInOut";
import moment from "moment";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../components/main/calendarStyle.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const MainPage = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="flex justify-center bg-slate-100">
      <div
        style={{ height: "calc(100vh - 65px)" }}
        className="grid grid-cols-[1fr_2fr] w-[1280px] gap-4 p-8"
      >
        <div className=" flex flex-col gap-4">
          <div className="bg-white border border-slate-400 rounded-lg shadow-lg h-2/3">
            <div className="bg-slate-300 h-14"></div>
          </div>
          <CheckInOut />
        </div>
        <div className="calendarStyle">
          <Calendar
            onChange={onChange}
            value={value}
            formatDay={(locale, date) => moment(date).format("D")} // 일 제거 숫자만 보이게
            formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
            formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
            calendarType="gregory" // 일요일 부터 시작
            showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
            next2Label={null} // +1년 & +10년 이동 버튼 숨기기
            prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
            minDetail="year" // 10년단위 년도 숨기기
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
