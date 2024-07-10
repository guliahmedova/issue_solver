import Loading from "@/app/loading";
import { ROLES } from "@/constants/roles";
import { useAuthStore } from "@/state/useAuthStore";
import { ReactNode } from "react";
import { about, applies, comments, faq, privacy } from "@/assets/imgs";

interface IProtectRoute {
    children: ReactNode
};

export const sidebarMenu = [
    {
        path: "/dashboard",
        label: "Müraciətlər",
        permissions: [ROLES.STAFF],
        icon: applies
    },
    {
        path: "/dashboard/comments",
        label: "Şərhlərim",
        permissions: [ROLES.STAFF, ROLES.ADMIN],
        icon: comments
    },
    {
        path: "/dashboard/about",
        label: "Platforma haqqında",
        permissions: [ROLES.STAFF, ROLES.ADMIN],
        icon: about
    },
    {
        path: "/dashboard/faq",
        label: "Tez-tez verilən suallar",
        permissions: [ROLES.STAFF, ROLES.ADMIN],
        icon: faq
    },
    {
        path: "/dashboard/privacy",
        label: "Məxfilik siyasəti",
        permissions: [ROLES.STAFF, ROLES.ADMIN],
        icon: privacy
    }
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