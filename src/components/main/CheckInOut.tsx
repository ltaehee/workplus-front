import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../common/Button";

const CheckInOut = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [userId, setUserId] = useState("");
  const [isCheckIn, setIsCheckIn] = useState(false);
  const [checkinTime, setCheckinTime] = useState("");
  const [checkoutTime, setCheckoutTime] = useState("");
  const [isCheckInClick, setIsCheckInClick] = useState(false);
  const [isCheckOutClick, setIsCheckOutClick] = useState(false);

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  useEffect(() => {
    if (user) {
      setUserId(user.userId);
    }
  }, [userId]);

  const getCheckinOutTime = async () => {
    try {
      const response = await axios.get(`/api/user/attendance/${userId}`, {
        headers: {
          authorization: `${token}`,
        },
      });
      const { timestamps, status } = response.data.attendance;
      const now = new Date(timestamps).toLocaleTimeString("ko-KR", options);
      if (status) {
        setCheckinTime(now);
        setIsCheckIn(status);
      } else {
        setCheckoutTime(now);
        setIsCheckIn(status);
      }
    } catch (err) {
      console.log("getCheckinOutTime 오류", err);
      if (axios.isAxiosError(err)) {
        alert(err.response?.data.message);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      getCheckinOutTime();
    }
  }, [userId]);

  const token = user.token;

  const arrDayStr = ["일", "월", "화", "수", "목", "금", "토"];
  const dt = new Date();
  const today =
    dt.getFullYear() +
    "년 " +
    (dt.getMonth() + 1) +
    "월 " +
    dt.getDate() +
    "일 (" +
    arrDayStr[dt.getDay()] +
    ")";

  const updateCurrentTime = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString("ko-KR", options);
    setCurrentTime(timeString);
  };

  useEffect(() => {
    updateCurrentTime();
    const intervalId = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleClickCheckInOut = async () => {
    try {
      const response = await axios.patch(
        `/api/user/${userId}/attendance`,
        { status: !isCheckIn },
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      const { timestamps, status } = response.data.attendance;
      const now = new Date(timestamps).toLocaleTimeString("ko-KR", options);
      if (!isCheckIn) {
        setCheckinTime(now);
        setIsCheckIn(status);
        setIsCheckInClick(true);
      } else {
        setCheckoutTime(now);
        setIsCheckIn(status);
        setIsCheckOutClick(true);
      }
    } catch (err) {
      console.log("handleClickCheckInOut 오류", err);
      if (axios.isAxiosError(err)) {
        alert(err.response?.data.messsage);
      }
    }
  };

  const handleClickCheckOut = async () => {
    try {
      const response = await axios.post(
        `/api/user/checkout/${userId}`,
        {},
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      const { timestamps, status } = response.data.data.attendance;
      const now = new Date(timestamps).toLocaleTimeString("ko-KR", options);
      setCheckoutTime(now);
      setIsCheckIn(status);
    } catch (err) {
      console.log("handleClickCheckOut 오류", err);
      if (axios.isAxiosError(err)) {
        alert(err.response?.data.messsage);
      }
    }
  };

  return (
    <div className="bg-white flex items-center border border-slate-400 rounded-lg shadow-lg px-4 h-1/3 min-h-64">
      <div className="flex flex-col justify-evenly gap-4 w-full h-4/6">
        <h2 className="text-2xl">{today}</h2>
        <div className="flex justify-evenly py-4 rounded-lg bg-slate-100">
          <div className="flex flex-col items-center">
            <p className="text-sm text-slate-500">현재시간</p>
            <h3 className="text-lg">{currentTime}</h3>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-sm text-slate-500">
              {isCheckInClick
                ? isCheckIn
                  ? "출근시간"
                  : "퇴근시간"
                : "출근시간"}
            </p>
            <h3 className="text-lg">
              {isCheckInClick
                ? isCheckIn
                  ? checkinTime
                  : checkoutTime
                : "출근 전"}
            </h3>
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            className={
              isCheckOutClick
                ? "bg-blue-100 hover:bg-blue-100 text-slate-800"
                : ""
            }
            disabled={isCheckOutClick}
            onClick={handleClickCheckInOut}
            btnText={
              isCheckOutClick ? "수고하셨습니다." : isCheckIn ? "퇴근" : "출근"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CheckInOut;
