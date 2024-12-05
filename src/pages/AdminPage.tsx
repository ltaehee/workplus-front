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
import Pagination from "../components/common/Pagination";

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
  /* 임시 더미 데이터 */
  const dummyVacationData: Vacation[] = [
    {
      vacationId: "1",
      username: "이태희",
      startDate: "2024-12-01",
      endDate: "2024-12-10",
      vacationType: "연차",
      reason: "개인 사유",
      status: "승인",
    },
    {
      vacationId: "2",
      username: "임동건",
      startDate: "2024-12-05",
      endDate: "2024-12-08",
      vacationType: "연차",
      reason: "개인 사유",
      status: "대기",
    },
    {
      vacationId: "3",
      username: "박찬호",
      startDate: "2024-12-15",
      endDate: "2024-12-20",
      vacationType: "연차",
      reason: "개인 사유",
      status: "거부",
    },
    {
      vacationId: "4",
      username: "이세윤",
      startDate: "2024-12-15",
      endDate: "2024-12-20",
      vacationType: "연차",
      reason: "개인 사유",
      status: "거부",
    },
    {
      vacationId: "5",
      username: "이태희",
      startDate: "2024-12-01",
      endDate: "2024-12-10",
      vacationType: "연차",
      reason: "개인 사유",
      status: "승인",
    },
    {
      vacationId: "6",
      username: "이태희",
      startDate: "2024-12-05",
      endDate: "2024-12-8",
      vacationType: "연차",
      reason: "개인 사유",
      status: "승인",
    },
    {
      vacationId: "7",
      username: "이태희",
      startDate: "2024-12-01",
      endDate: "2024-12-2",
      vacationType: "연차",
      reason: "개인 사유",
      status: "승인",
    },
  ];
  const [activePage, setActivePage] = useState<string>();
  // const [vacationData, setVacationData] = useState<Vacation[]>([]);
  const [vacationData, setVacationData] =
    useState<Vacation[]>(dummyVacationData);
  const [userData, setUserData] = useState<User[]>([]);
  const [attendData, setAttendData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const headers = {
    home: ["이름", "이메일", "전화번호", "생년월일", "주소", ""],
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
        console.log("휴가 데이터", vacations);
        setVacationData(vacations);
      }
    } catch (err) {
      console.error(err);
    }
  };
  /* 휴가 승인,미승인 업데이트 */
  const vacationApproveData = async (vacationId: string, status: string) => {
    setIsLoading(true);
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const response = await api.patch(
        `${ENDPOINT.ADMIN}/vacation/${vacationId}/status`,
        { status }
      );
      if (response.status === 200) {
        console.log(response.data.message);
        // await vacationFetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  /* 전체 유저 목록 업데이트 */
  const userTotalData = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const response = await api.get(`${ENDPOINT.ADMIN_USERS}`);
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
      const { userId } = JSON.parse(storedUser);

      const response = await api.get(`${ENDPOINT.ADMIN_USERS}/attendance`);

      if (response.status === 200) {
        const users = response.data.users;
        setAttendData(users);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* 유저 삭제 */
  const userDelete = async (userId: string) => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const response = await api.delete(`${ENDPOINT.ADMIN_USERS}/${userId}`);

      if (response.status === 200 || response.status === 204) {
        const users = response.data.users;
        setAttendData(users);
        console.log("유저 삭제 완료");
        alert("유저 삭제 완료");
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
    // vacationFetchData();
    userTotalData();
    attendanceData();
  }, []);
  /* 탭 변경 시 `localStorage`에 현재 탭 상태 저장 */
  const onChangeTab = (tab: string) => {
    setActivePage(tab);
    localStorage.setItem("activePage", tab); // 탭 상태를 localStorage에 저장
  };

  /* 로딩 */
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-3xl font-bold">
        <div className="spinner">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center ">
      <div className="flex w-[1280px]  px-8">
        <SideMenu setActivePage={onChangeTab} />
        <div className="w-[80%]">
          {activePage === "home" && (
            <ListWrap
              headers={headers.home}
              data={userData}
              renderRow={(userData) => (
                <UserRow
                  userData={userData}
                  userDelete={() => {
                    userDelete(userData._id);
                  }}
                />
              )}
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
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
