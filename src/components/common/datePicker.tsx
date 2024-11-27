import React from "react";
import { FC, MouseEvent, useState } from "react";



const DatePicker = () => {
    const [curYear, setCurYear] = useState(new Date().getFullYear())
    const [curMonth, setCurMonth] = useState(new Date().getMonth())

    const getMonthInfo = (year: number, month: number) => {
        const firstDay = new Date(year, month).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        return {firstDay, lastDate};
    }
    const renderDateCell = () => {
        // const {firstDay, lastDate} = getMonthInfo(curYear, curMonth)
    }

    const handleClickPrev = (e:MouseEvent<HTMLButtonElement>) => {
        if(curMonth === 0){
            setCurYear(curYear - 1);
            setCurMonth(11);
        }else{
            setCurMonth(curMonth - 1);
        }
    }
    const hanldeClickNext = (e:MouseEvent<HTMLButtonElement>) => {
        if(curMonth === 11){
            setCurYear(curYear + 1);
            setCurMonth(1);
        }else{
            setCurMonth(curMonth + 1);
        }
    }
    return(
        <>
        <div className="flex items-center space-x-4">
        <button onClick={handleClickPrev}>prev</button>
        <div>{curYear}년 {curMonth}월</div>
        <button onClick={hanldeClickNext}>next</button>
        </div>
        <thead>
            <tr>
                <th className="px-1">일</th>
                <th className="px-1.5">월</th>
                <th className="px-1.5">화</th>
                <th className="px-1.5">수</th>
                <th className="px-1.5">목</th>
                <th className="px-1.5">금</th>
                <th className="px-1.5">토</th>
            </tr>
        </thead>
        </>
    )
}

export default DatePicker;