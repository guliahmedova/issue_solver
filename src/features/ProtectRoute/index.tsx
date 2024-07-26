import Loading from "@/app/loading";
import { useAuthStore } from "@/state/useAuthStore";
import { ReactNode } from "react";

interface IProtectRoute {
  children: ReactNode;
};

const ProtectRoute = ({ children }: IProtectRoute) => {
  const token = useAuthStore(state => state.authData?.token);

  if (!token) {
    return <Loading />;
  };

  return children;
};

export default ProtectRoute;  