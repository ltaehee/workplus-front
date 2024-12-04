import { useEffect, useState } from "react";
import SideMenu from "../components/admin/SideMenu";
import ListWrap from "../components/admin/ListWrap";
import { ENDPOINT } from "../utils/endpoints";
import api from "../utils/api";
import Button from "../components/common/Button";

interface Vacation {
  vacationId: string; // vacationId 추가
  username: string;
  startDate: string;
  endDate: string;
  vacationType: string;
  reason: string;
  status: string;
}
interface User {
  username: string;
  phone: string;
  birth: string;
  email: string;
  address: string;
}
const AdminPage = () => {
  /* 새로고침시 현재 탭메뉴 그대로 */
  const [tabValue, setTabValue] = useState("");
  const [activePage, setActivePage] = useState<string>("home");
  const [vacationData, setVacationData] = useState<Vacation[]>([]);
  const [userData, setUserData] = useState<User[]>([]);

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
  const renderUserRow = (userData: {
    username: string;
    phone: string;
    birth: string;
    email: string;
    address: string;
  }) => (
    <>
      <td className="p-2 pl-4">{userData?.username}</td>
      <td className="p-2 pl-4">{userData.email}</td>
      <td className="p-2 pl-4">{userData.phone}</td>
      <td className="p-2 pl-4">{userData.birth}</td>
      <td className="p-2 pl-4">{userData.address}</td>
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
    vacationId: string;
  }) => {
    const startDate = vacation.startDate.split("T")[0];
    const endDate = vacation.endDate.split("T")[0];

    return (
      <>
        <td className="p-2 pl-4">{vacation.username}</td>
        <td className="p-2 pl-4">{vacation.vacationType}</td>
        <td className="p-2 pl-4">{startDate}</td>
        <td className="p-2 pl-4">{endDate}</td>
        <td className="p-2 pl-4">{vacation.reason}</td>
        <td className="p-2 pl-4">
          {vacation.status === "대기중" ? (
            <div className="w-[150px]">
              <Button
                btnText="승인"
                className="w-auto text-sm  bg-blue-500 hover:bg-blue-600 !py-2 "
                onClick={() => vacationApproveData(vacation.vacationId, "승인")}
              />
              <Button
                btnText="미승인"
                className="w-auto text-sm  bg-gray-500 ml-2 hover:bg-gray-600 !py-2"
                onClick={() => vacationApproveData(vacation.vacationId, "거부")}
              />
            </div>
          ) : (
            <button disabled>{vacation.status}</button>
          )}
        </td>
      </>
    );
  };

  /* 모든 회원 연차 내역 불러오기 */
  const vacationFetchData = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const response = await api.get(`${ENDPOINT.VACATION_POST_SUBMIT}`);
      if (response.status === 200 || response.status === 204) {
        const vacations = response.data.vacations;
        setVacationData(vacations);
      }
    } catch (err) {
      console.error(err);
    }
  };
  /* 휴가 승인,미승인 업데이트 */
  const vacationApproveData = async (vacationId: string, status: string) => {
    try {
      const storedUser = localStorage.getItem("user");
      console.log({ storedUser });
      if (!storedUser) return;
      const response = await api.patch(
        `${ENDPOINT.ADMIN}/vacation/${vacationId}/status`,
        { status }
      );
      if (response.status === 200 || response.status === 204) {
        const vacations = response.data.vacations;
        console.log({ vacations });
        setVacationData(vacations);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* 전체 유저 목록 업데이트 */
  const userTotalData = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const response = await api.get(`${ENDPOINT.ADMIN}/users`);
      if (response.status === 200) {
        const users = response.data.users;
        setUserData(users);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      /* 새로고침 했을 때 순서 */
      await vacationFetchData();
      await userTotalData();
    };
    fetchData();
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="flex w-[1280px] h-screen px-8">
        <SideMenu setActivePage={setActivePage} key={tabValue} />
        <div className="w-[80%]">
          {activePage === "home" && (
            <ListWrap
              headers={headers.home}
              data={userData}
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
