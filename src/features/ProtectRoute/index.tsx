import Loading from "@/app/loading";
import { ROLES } from "@/constants/roles";
import { useAuthStore } from "@/state/useAuthStore";
import { ReactNode } from "react";
import { about, applies, comments, faq, privacy, qurum, staff } from "@/assets/imgs";

interface IProtectRoute {
  children: ReactNode;
}

export const sidebarMenu = [
  {
    path: "/dashboard",
    label: "Müraciətlər",
    permissions: [ROLES.STAFF],
    icon: applies,
  },
  {
    path: "/dashboard/comments",
    label: "Şərhlərim",
    permissions: [ROLES.STAFF],
    icon: comments,
  },
  {
    path: "/dashboard/about",
    label: "Platforma haqqında",
    permissions: [ROLES.STAFF],
    icon: about,
  },
  {
    path: "/dashboard/faq",
    label: "Tez-tez verilən suallar",
    permissions: [ROLES.STAFF],
    icon: faq,
  },
  {
    path: "/dashboard/privacy",
    label: "Məxfilik siyasəti",
    permissions: [ROLES.STAFF],
    icon: privacy,
  },
  {
    path: "/dashboard/organizations",
    label: "Qurumlar",
    permissions: [ROLES.ADMIN],
    icon: qurum,
  },
  {
    path: "/dashboard/staff",
    label: "Əməkdaşlar",
    permissions: [ROLES.ADMIN],
    icon: staff,
  },
];

const ProtectRoute = ({ children }: IProtectRoute) => {
  const token = useAuthStore(state => state.authData?.token);
  const isLoading = useAuthStore(state => state.loading);

    if (isLoading || !token) {
        return <Loading />;
    };

  return children;
};

export default ProtectRoute;

export const checkPermission = (permissions: string[], userPermissions: string[]) => {
  return permissions?.some(p => userPermissions?.includes(p));
};