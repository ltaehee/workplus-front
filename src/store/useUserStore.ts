import { create } from "zustand";
import { UserData } from "../types";
interface QueryState {
  query: string;
  setQuery: (query: string) => void;
}
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
export const useQueryStore = create<QueryState>((set) => ({
  query: sessionStorage.getItem("query") || "",
  setQuery: (query) => {
    sessionStorage.setItem("query", query);
    set({ query });
  },
}));

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
