import { useState } from "react";
import SelectBox from "../components/common/SelectBox";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Datepicker from "../components/common/Datepicker";

const VacationPage = () => {
  const [isOption, setIsOption] = useState("연차");

  const handleClickYear = () => {
    setIsOption("연차");
  };
  const handleClickMonth = () => {
    setIsOption("반차");
  };

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  return (
    <>
      <div className=" flex flex-col space-y-5 items-center w-full">
        <div className="w-1/2">
          <Input className="w-full mt-20 size-10 " placeholder="이름" />
        </div>
        <div className="w-1/2 flex justify-center">
          <Datepicker
            className="w-full"
            dateFormat="yyyy/MM/dd"
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
          />
        </div>
        <div className="w-1/2 flex justify-center">
          <Datepicker
            className="w-full"
            dateFormat="yyyy/MM/dd"
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date)}
          />
        </div>
        <div className="w-1/2 flex justify-center">
          <SelectBox
            className="w-full text-[#9ca39a]"
            value={isOption}
            optionText0="종류"
            optionText1="연차"
            optionText2="반차"
            onClick={handleClickYear}
            onClick1={handleClickMonth}
          />
        </div>
        <div className="w-1/2">
          <Input className="w-1/2" placeholder="사유" />
        </div>
        <div className="w-1/2">
          <Button className="w-1/2" btnText="등록" />
        </div>
      </div>
    </>
  );
};

export default VacationPage;
