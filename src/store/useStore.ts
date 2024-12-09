import { create } from "zustand";

// 사용자 정보 타입 정의
type User = {
  id?: string;
  email?: string;
  name?: string;
  username?: string;
  userImage?: string;
};

// Zustand 상태 타입 정의
type UserStore = {
  user: User; // 사용자 상태
  setUser: (user: User) => void; // 사용자 정보 설정 함수
  setProfileImage: (imageUrl: string) => void; // 프로필 이미지 설정 함수
};

// Zustand 스토어 생성
export const useStore = create<UserStore>((set) => ({
  // 초기값은 로컬스토리지에서 불러옴
  user: JSON.parse(localStorage.getItem("user") || "{}"),

  // 사용자 정보 설정 함수
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user)); // 로컬스토리지에 저장
    set({ user }); // 상태 업데이트
  },

  // 프로필 이미지 설정 함수
  setProfileImage: (imageUrl) => {
    set((state) => {
      const updatedUser = { ...state.user, userImage: imageUrl }; // 기존 사용자 정보에 프로필 이미지 추가
      localStorage.setItem("user", JSON.stringify(updatedUser)); // 로컬스토리지에 저장
      return { user: updatedUser }; // 상태 업데이트
    });
  },
}));
