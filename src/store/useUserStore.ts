import { create } from "zustand";
import { UserData } from "../types";

interface UserState {
  filteredData: UserData[];
  setFilteredData: (data: UserData[]) => void;
}

interface SelectedUserState {
  selectedUsers: UserData[];
  setSelectedUsers: (user: UserData) => void;
  setDeleteUsers: (user: UserData) => void;
  setGetUsers: (users: UserData[]) => void;
}

export const useUserStore = create<UserState>((set) => ({
  filteredData: [],
  setFilteredData: (data) => set({ filteredData: data }),
}));

export const useSelectedUserStore = create<SelectedUserState>((set) => ({
  selectedUsers: [],
  setSelectedUsers: (user: UserData) =>
    set((state) => ({ selectedUsers: [...state.selectedUsers, user] })),
  setDeleteUsers: (user: UserData) =>
    set((state) => ({
      selectedUsers: state.selectedUsers.filter(
        (selectedUser) => selectedUser !== user
      ),
    })),
  setGetUsers: (users: UserData[]) =>
    set((state) => ({
      selectedUsers: [
        ...state.selectedUsers,
        ...users.filter(
          (user) =>
            !state.selectedUsers.some(
              (selectedUser) => selectedUser.username === user.username
            )
        ),
      ],
    })),
  // setGetUsers: (users: UserData[]) =>
  //   set((state) => ({ selectedUsers: [...state.selectedUsers, ...users] })),
}));
