import { useEffect, useState } from "react";
import SideMenu from "../components/admin/SideMenu";
import ListWrap from "../components/admin/ListWrap";
import { ENDPOINT } from "../utils/endpoints";
import api from "../utils/api";
import {
  UserRow,
  AttendanceRow,
  VacationRow,
} from "../components/admin/TableRows";

interface Vacation {
  vacationId: string;
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
  const [activePage, setActivePage] = useState<string>();
  const [vacationData, setVacationData] = useState<Vacation[]>([]);
  const [userData, setUserData] = useState<User[]>([]);
  const [attendData, setAttendData] = useState<User[]>([]);

  const headers = {
    home: ["이름", "이메일", "전화번호", "생년월일", "주소"],
    attendance: ["이름", "상태", "시간"],
    vacation: ["이름", "휴가종류", "휴가 시작", "휴가 끝", "사유", "상태"],
  };

  /* ****************** */

  /* 모든 회원 연차 내역 불러오기 */
  const vacationFetchData = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const response = await api.get(`${ENDPOINT.VACATION}`);
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

  /* 전체 유저 근태 목록 업데이트 */
  const attendanceData = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const response = await api.get(`${ENDPOINT.ADMIN}/users/attendance`);
      console.log("근태", response);
      console.log(response.data.users);

      if (response.status === 200) {
        const users = response.data.users;
        setAttendData(users);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const savedTab = localStorage.getItem("activePage");
    if (savedTab) {
      setActivePage(savedTab);
    }
    vacationFetchData();
    userTotalData();
    attendanceData();
  }, []);
  /* 탭 변경 시 `localStorage`에 현재 탭 상태 저장 */
  const onChangeTab = (tab: string) => {
    setActivePage(tab);
    localStorage.setItem("activePage", tab); // 탭 상태를 localStorage에 저장
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex w-[1280px] h-screen px-8">
        <SideMenu setActivePage={onChangeTab} />
        <div className="w-[80%]">
          {activePage === "home" && (
            <ListWrap
              headers={headers.home}
              data={userData}
              renderRow={(userData) => <UserRow userData={userData} />}
            />
          )}
          {activePage === "attendance" && (
            <ListWrap
              headers={headers.attendance}
              data={attendData}
              renderRow={(attendData) => (
                <AttendanceRow attendData={attendData} />
              )}
            />
          )}
          {activePage === "vacation" && (
            <ListWrap
              headers={headers.vacation}
              data={vacationData}
              renderRow={(vacation) => (
                <VacationRow
                  vacation={vacation}
                  vacationApproveData={vacationApproveData}
                />
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
