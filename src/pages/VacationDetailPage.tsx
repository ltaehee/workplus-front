import { ChangeEvent, useState } from "react";
import Datepicker from "../components/common/DatePicker";
import Input from "../components/common/Input";
import SelectBox from "../components/common/SelectBox";
import Button from "../components/common/Button";

const VacationDetailPage = () => {
  const [isOption, setIsOption] = useState("");
  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setIsOption(e.target.value);
    console.log(e.target.value);
  };
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  return (
    <>
      <div className="w-full flex flex-col space-y-5 items-center">
        <p className="mt-20">휴가 신청 상세 페이지</p>
        <div className="w-1/6">
          <Input placeholder="이름" id={"이름"} />
        </div>
        <div className="w-1/6">
          <Datepicker
            id={"시작 날짜"}
            className="w-full"
            dateFormat="yyyy/MM/dd"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className="w-1/6">
          <Datepicker
            id={"종료 날짜"}
            className="w-full"
            dateFormat="yyyy/MM/dd"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>
        <div className="w-1/6">
          <SelectBox
            id={"종류"}
            className=""
            value={isOption}
            optionText0="종류"
            optionText1="연차"
            optionText2="반차"
            onChange={handleChangeSelect}
          />
        </div>
        <div className="w-1/6">
          <Input placeholder="사유" id={"사유"} />
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

export default VacationDetailPage;
