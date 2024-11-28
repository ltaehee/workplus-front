import { ChangeEvent, useState } from "react";
import SelectBox from "../components/common/SelectBox";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Datepicker from "../components/common/datePicker";
const VacationPage = () => {
  const [isOption, setIsOption] = useState("");

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setIsOption(e.target.value);
    console.log(e.target.value);
  };

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  return (
    <>
      <div className="w-full flex flex-col space-y-5 items-center ">
        <p className="mt-20">휴가 신청 페이지</p>
        <div className="w-1/6">
          <Input placeholder="이름" />
        </div>
        <div className="w-1/6">
          <Datepicker
            className="w-full"
            dateFormat="yyyy/MM/dd"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className="w-1/6">
          <Datepicker
            className="w-full"
            dateFormat="yyyy/MM/dd"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>
        <div className="w-1/6">
          <SelectBox
            className="text-[#9ca39a]"
            value={isOption}
            optionText0="종류"
            optionText1="연차"
            optionText2="반차"
            onChange={handleChangeSelect}
          />
        </div>
        <div className="w-1/6">
          <Input placeholder="사유" />
        </div>
        <div className="w-1/6">
          <Button btnText="등록" />
        </div>
      </div>
    </>
  );
};

export default VacationPage;
