import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
export interface IAuthData {
  token: string;
}
interface IState {
  authData: IAuthData | null;
  loading?: boolean;
}
interface IAction {
  setAuth: (authData: IAuthData | null) => void;
}

export const useAuthStore = create<IState & IAction>()(
  devtools(
    persist(
      set => ({
        authData: null,
        setAuth: (authData: IAuthData | null) =>
          set(() => ({ authData: authData ? { ...authData } : null })),
      }),
      {
        name: "__auth",
        skipHydration: true,
      },
    ),
    {
      enabled: process.env.NEXT_PUBLIC_ENV === "local",
    },
  ),
);
