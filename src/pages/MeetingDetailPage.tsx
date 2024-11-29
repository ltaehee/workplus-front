import { useState } from "react";
import { UserData } from "./MeetingPage";
import Datepicker from "../components/common/DatePicker";
import Input from "../components/common/Input";
import AutoComplete from "../components/common/AutoComplete";
import ReactDatePiker from "react-datepicker";
import Button from "../components/common/Button";

const MeetingDetailPage: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date | null>(new Date());

  const [selectedUsers, setSelectedUsers] = useState<UserData[]>([]);

  const UserDataList = [
    { name: "강아지", id: "dog" },
    { name: "강아지2", id: "dog2" },
    { name: "고양이", id: "cat" },
    { name: "고양이2", id: "cat2" },
    { name: "오리", id: "duck" },
  ];

  const availableUsers = UserDataList.filter(
    (user) => !selectedUsers.some((selected) => selected.id === user.id)
  );
  const handleUserSelect = (user: UserData) => {
    setSelectedUsers((prevUsers) => [...prevUsers, user]);
  };

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
          <Input placeholder="회의 안건" id={"회의 안건"} />
        </div>
        <div className="w-1/6">
          <Input placeholder="생성자" id={"생성자"} />
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
                {user.name}
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
