import React from "react";
import { Link } from "react-router-dom";

// 타입 정의 (유저 정보)
type UserInfo = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

type ListWrapProps = {
  title?: string; // 리스트 제목
  userData: UserInfo[]; // 유저 정보 배열
};

const ListWrap: React.FC<ListWrapProps> = ({ title, userData }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {/* 리스트가 없으면 메시지 출력 */}
      {userData.length === 0 ? (
        <p className="text-gray-500">현재 등록된 유저가 없습니다.</p>
      ) : (
        <table className="min-w-full table-auto text-gray-800">
          <thead>
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">이름</th>
              <th className="p-4">전화번호</th>
              <th className="p-4">이메일</th>
              <th className="p-4">상세보기</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-4">{user.id}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.phone}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <Link
                    to={`/user/${user.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    상세보기
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListWrap;
