import { useState } from "react";
import Datepicker from "../components/common/datepicker";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import ReactDatePiker from "react-datepicker";

const MeetingPage = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date | null>(new Date());
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
          />
        </div>
        <div className="w-1/6">
          <Input placeholder="회의 안건" />
        </div>
        <div className="w-1/6">
          <Input placeholder="생성자" />
        </div>
        <div className="w-1/6">
          <Input placeholder="참여자" />
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
          <Button btnText="등록" />
        </div>
      </div>
    </>
  );
};

export default MeetingPage;
