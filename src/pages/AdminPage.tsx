import { useState } from "react";
import SideMenu from "../components/admin/SideMenu";
import ListWrap from "../components/admin/ListWrap";

interface User {
  id: number;
  name: string;
  phone?: string;
  birth?: string;
  typeVacation?: string;
  start?: string;
  end?: string;
  clockIn?: string;
  clockOut?: string;
}
const AdminPage = () => {
  const [activePage, setActivePage] = useState<string>("home");

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

  const vacationList = [
    {
      id: 1,
      user: "엘리스5",
      typeVacation: "연차",
      start: "2024-12-01",
      end: "2024-12-10",
      status: "승인",
    },
    {
      id: 2,
      user: "엘리스5",
      typeVacation: "연차",
      start: "2024-12-01",
      end: "2024-12-10",
      status: "미승인",
    },
  ];

  const headers = {
    home: ["ID", "이름", "이메일", "전화번호", "생년월일", "주소"],
    attendance: ["ID", "이름", "출근 시간", "퇴근 시간"],
    vacation: ["ID", "이름", "휴가종류", "휴가 시작", "휴가 끝", "상태"],
  };

  // 테이블 헤더와 각 페이지에 맞는 행 렌더링 함수
  const renderUserRow = (user: {
    id: number;
    name: string;
    phone: string;
    birth: string;
    email: string;
    address: string;
  }) => (
    <>
      <td className="p-2 pl-4">{user.id}</td>
      <td className="p-2 pl-4">{user.name}</td>
      <td className="p-2 pl-4">{user.email}</td>
      <td className="p-2 pl-4">{user.phone}</td>
      <td className="p-2 pl-4">{user.birth}</td>
      <td className="p-2 pl-4">{user.address}</td>
    </>
  );

  const renderAttendanceRow = (att: {
    id: number;
    user: string;
    clockIn: string;
    clockOut: string;
  }) => (
    <>
      <td className="p-2 pl-4">{att.id}</td>
      <td className="p-2 pl-4">{att.user}</td>
      <td className="p-2 pl-4">{att.clockIn}</td>
      <td className="p-2 pl-4">{att.clockOut}</td>
    </>
  );

  const renderVacationRow = (vacation: {
    id: number;
    user: string;
    start: string;
    end: string;
    typeVacation: string;
    status: string;
  }) => (
    <>
      <td className="p-2 pl-4">{vacation.id}</td>
      <td className="p-2 pl-4">{vacation.user}</td>
      <td className="p-2 pl-4">{vacation.typeVacation}</td>
      <td className="p-2 pl-4">{vacation.start}</td>
      <td className="p-2 pl-4">{vacation.end}</td>
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
              data={vacationList}
              renderRow={renderVacationRow}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
