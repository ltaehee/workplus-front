import { useEffect, useState } from "react";
import SideMenu from "../components/admin/SideMenu";
import ListWrap from "../components/admin/ListWrap";
import { ENDPOINT } from "../utils/endpoints";
import api from "../utils/api";

interface User {
  id: number;
  name: string;
  phone?: string;
  birth?: string;
  vacationType?: string;
  start?: string;
  end?: string;
  clockIn?: string;
  clockOut?: string;
}
const AdminPage = () => {
  const [activePage, setActivePage] = useState<string>("home");
  const [vacationData, setVacationData] = useState<any>([]);

  // 더미 데이터
  const userList = [
    {
      id: 1,
      name: "엘리스1",
      email: "elice123@naver.com",
      phone: "010-1234-5678",
      birth: "1990-01-01",
      address: "수원시 장안구",
    },
    {
      id: 2,
      name: "엘리스2",
      email: "elice123@naver.com",
      phone: "010-1234-5678",
      birth: "1990-01-01",
      address: "안양시 동안구",
    },
    {
      id: 3,
      name: "엘리스3",
      email: "elice123@naver.com",
      phone: "010-1234-5678",
      birth: "1990-01-01",
      address: "서울시 강남구",
    },
  ];

  const attendanceList = [
    { id: 1, user: "엘리스4", clockIn: "09:00", clockOut: "18:00" },
  ];

  const headers = {
    home: ["이름", "이메일", "전화번호", "생년월일", "주소"],
    attendance: ["이름", "출근 시간", "퇴근 시간"],
    vacation: ["이름", "휴가종류", "휴가 시작", "휴가 끝", "사유", "상태"],
  };

  // 테이블 헤더와 각 페이지에 맞는 행 렌더링 함수
  const renderUserRow = (user: {
    name: string;
    phone: string;
    birth: string;
    email: string;
    address: string;
  }) => (
    <>
      <td className="p-2 pl-4">{user.name}</td>
      <td className="p-2 pl-4">{user.email}</td>
      <td className="p-2 pl-4">{user.phone}</td>
      <td className="p-2 pl-4">{user.birth}</td>
      <td className="p-2 pl-4">{user.address}</td>
    </>
  );

  const renderAttendanceRow = (att: {
    user: string;
    clockIn: string;
    clockOut: string;
  }) => (
    <>
      <td className="p-2 pl-4">{att.user}</td>
      <td className="p-2 pl-4">{att.clockIn}</td>
      <td className="p-2 pl-4">{att.clockOut}</td>
    </>
  );

  const renderVacationRow = (vacation: {
    username: string;
    startDate: string;
    endDate: string;
    vacationType: string;
    reason: string;
    status: string;
  }) => (
    <>
      <td className="p-2 pl-4">{vacation.username}</td>
      <td className="p-2 pl-4">{vacation.vacationType}</td>
      <td className="p-2 pl-4">{vacation.startDate}</td>
      <td className="p-2 pl-4">{vacation.endDate}</td>
      <td className="p-2 pl-4">{vacation.reason}</td>
      <td className="p-2 pl-4">
        <button
          className={`px-3 py-2 rounded-md text-sm cursor-pointer ${
            vacation.status === "승인" ? "bg-blue-500" : "bg-gray-500"
          } text-white`}
          disabled
        >
          {vacation.status}
        </button>
      </td>
    </>
  );

  /* 모든 회원 연차 내역 불러오기 */
  const vacationFetchData = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const response = await api.get(`${ENDPOINT.VACATION_POST_SUBMIT}`);
      if (response.status === 200 || response.status === 204) {
        const vacations = response.data.vacations;
        console.log({ vacations });
        setVacationData(vacations);
        console.log("휴가목록 확인용", vacationData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      /* 새로고침 했을 때 순서 */
      await vacationFetchData();
    };
    fetchData();
  }, []);
  return (
    <div className="w-full flex justify-center">
      <div className="flex w-[1280px] h-screen px-8">
        <SideMenu setActivePage={setActivePage} />
        <div className="w-[80%]">
          {activePage === "home" && (
            <ListWrap
              headers={headers.home}
              data={userList}
              renderRow={renderUserRow}
            />
          )}
          {activePage === "attendance" && (
            <ListWrap
              headers={headers.attendance}
              data={attendanceList}
              renderRow={renderAttendanceRow}
            />
          )}
          {activePage === "vacation" && (
            <ListWrap
              headers={headers.vacation}
              data={vacationData}
              renderRow={renderVacationRow}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
