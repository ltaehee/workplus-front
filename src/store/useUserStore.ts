import { create } from "zustand";
import { UserData } from "../types";

interface UserState {
  filteredData: UserData[];
  setFilteredData: (data: UserData[]) => void;
}

interface SelectedUserState {
  selectedUsers: UserData[];
  setSelectedUsers: (user: UserData) => void;
}

export const useUserStore = create<UserState>((set) => ({
  filteredData: [],
  setFilteredData: (data) => set({ filteredData: data }),
}));

export const useSelectedUserStore = create<SelectedUserState>((set) => ({
  selectedUsers: [],
  setSelectedUsers: (user) =>
    set((state) => ({ selectedUsers: [...state.selectedUsers, user] })),
}));
