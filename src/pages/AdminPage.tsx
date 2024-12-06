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
  const [activePage, setActivePage] = useState<string>();
  const [vacationData, setVacationData] = useState<Vacation[]>([]);
  const [userData, setUserData] = useState<User[]>([]);
  const [attendData, setAttendData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 페이지네이션 관련 상태 추가
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPage, setTotalPage] = useState(1); // 유저목록임 전체 페이지 수
  const [vacationTotalPage, setVacationTotalPage] = useState(1); // 휴가 페이지 수
  const [attendanceTotalPage, setAttendanceTotalPage] = useState(1); // 근태 페이지 수

  const headers = {
    home: ["이름", "이메일", "전화번호", "생년월일", "주소", ""],
    attendance: ["이름", "상태", "시간"],
    vacation: ["이름", "휴가종류", "휴가 시작", "휴가 끝", "사유", "상태"],
  };

  /* ****************** */

  /* 모든 회원 연차 내역 불러오기 */
  const vacationFetchData = async (limit: number = 15, page: number = 1) => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const response = await api.get(
        `${ENDPOINT.ADMIN}/vacations?limit=${limit}&page=${page}`
      );
      if (response.status === 200 || response.status === 204) {
        const { vacations } = response.data;
        setVacationData(vacations);

        // 전체 페이지 수 계산
        const totalCount = response.data.pageInfo.totalCount;
        const totalPages = Math.ceil(totalCount / limit);
        setVacationTotalPage(totalPages);
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
        await vacationFetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  /* 전체 유저 목록 업데이트 */
  const userTotalData = async (limit: number = 15, page: number = 1) => {
    console.log({ page });
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const response = await api.get(
        `${ENDPOINT.ADMIN_USERS}?limit=${limit}&page=${page}`
      );

      if (response.status === 200) {
        const users = response.data.users;
        const totalCount = response.data.pageInfo.totalUserCount; // 전체 데이터 갯수
        setUserData(users);

        // 전체 페이지 수 계산
        const totalPages = Math.ceil(totalCount / limit);
        setTotalPage(totalPages); // 전체 페이지 수 설정
      }
    } catch (err) {
      console.error(err);
    }
  };
  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (page: number) => {
    if (page === currentPage) return; // 현재 페이지와 같으면 아무 작업도 하지 않음

    setCurrentPage(page); // 페이지 변경

    if (page === 1) {
      if (page === currentPage) return; // 현재 페이지와 같으면 아무 작업도 하지 않음
      setCurrentPage(page); // 페이지 변경
      userTotalData(5, page); // 새로운 페이지 데이터 요청
    }
  };

  /* 전체 유저 근태 목록 업데이트 */
  const attendanceData = async (limit: number = 15, page: number = 1) => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const response = await api.get(
        `${ENDPOINT.ADMIN_USERS}/attendance?limit=${limit}&page=${page}`
      );
      if (response.status === 200) {
        const users = response.data.users;
        setAttendData(users);

        // 전체 페이지 수 계산
        const totalCount = response.data.pageInfo.totalCount;
        const totalPages = Math.ceil(totalCount / limit);
        setAttendanceTotalPage(totalPages);
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
    vacationFetchData();
    attendanceData();
  }, []);

  // 초기 데이터 로드
  useEffect(() => {
    userTotalData(13, currentPage);
  }, [currentPage]);
  useEffect(() => {
    vacationFetchData(13, currentPage);
  }, [currentPage]);
  useEffect(() => {
    attendanceData(13, currentPage);
  }, [currentPage]);

  /* useEffect(() => {
    if (activePage === "home") {
      userTotalData(13, currentPage);
    }
    else if (activePage === "attendance") {
      attendanceData(15, currentPage);
    }
    else if (activePage === "vacation") {
      vacationFetchData(15, currentPage);
    }
  }, [currentPage, activePage]); */

  /* 탭 변경 시 `localStorage`에 현재 탭 상태 저장 */
  const onChangeTab = (tab: string) => {
    setActivePage(tab);
    localStorage.setItem("activePage", tab); // 탭 상태를 localStorage에 저장
  };

  /* 로딩 */
  if (isLoading) {
    return (
      <div className="flex justify-center items-center text-3xl font-bold">
        <div className="spinner">로딩 중...</div>
      </div>
    );
  }

  return (
    <div
      className="w-full flex items-center justify-center "
      style={{ height: "calc(100vh - 65px)" }} /* 의미없음 ? */
    >
      <div className="flex flex-col w-[1280px] px-8 h-full relative">
        <div className="flex justify-between ">
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
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onPageChange={handlePageChange}
          className="absolute bottom-10 left-0 right-0"
        />
      </div>
    </div>
  );
};

export default AdminPage;
