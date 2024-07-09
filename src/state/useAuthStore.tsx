import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IAuthData {
  token: string;
  refreshToken?: string;
};

interface IState {
  authData: IAuthData | null;
  loading?: boolean;
};

interface IAction {
  setAuth: (authData: IAuthData | null) => void;
};

export const useAuthStore = create<IState & IAction>()(
  persist(
    set => ({
      authData: null,
      setAuth: (authData: IAuthData | null) =>
        set(() => ({ authData: authData ? { ...authData } : null })),
    }),
    {
      name: "__auth",
    },
  ),
);