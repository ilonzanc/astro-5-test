import { create } from "zustand";

interface UserState {
  authenticatedUser?: Omit<User, "password">;
  login: (newUser: Omit<User, "password">) => void;
  logout: () => void;
}

const defaultUser = {
  username: "",
  email: "",
};

const useUserStore = create<UserState>()((set) => ({
  authenticatedUser: undefined,
  login: (newUser) => set((state) => ({ authenticatedUser: newUser })),
  logout: () => set({ authenticatedUser: defaultUser }),
}));

export { useUserStore };
