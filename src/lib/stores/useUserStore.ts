import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserState {
  authenticatedUser?: Omit<User, "password">;
  login: (newUser: Omit<User, "password">) => void;
  logout: () => void;
}

const defaultUser = {
  username: "",
  email: "",
};

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      authenticatedUser: undefined,
      login: (newUser) => set((state) => ({ authenticatedUser: newUser })),
      logout: () => set({ authenticatedUser: defaultUser }),
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export { useUserStore };
