import { applies, comments, faq, privacy, qurum, staff } from "@/assets/imgs";
import { ROLES } from "@/constants/roles";
import API from "@/http/api";
import { useRequestMutation } from "@/http/request";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface ISidebar {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

interface IGetMeResponse {
    data: {
        permissions: []
    }
};

const sidebarMenu = [
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
    }
];

const checkPermission = (permissions: string[], userPermissions: string[]) => {
    return permissions?.some(p => userPermissions?.includes(p));
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }: ISidebar) => {
    const [getMeData, setGetMeData] = useState<string[]>([]);
    const currentPath = usePathname();
    const { trigger: getMeTrigger } = useRequestMutation(API.get_me, { method: "GET" });

    const trigger = useRef<any>(null);
    const sidebar = useRef<any>(null);

    const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");

    const [sidebarExpanded, _] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
    );

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res: IGetMeResponse = await getMeTrigger();
                setGetMeData(res?.data?.permissions);
            } catch (error: any) {
                console.error(error.response?.data?.message ?? "Error fetching user data");
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!sidebar.current || !trigger.current) return;

            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setSidebarOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    }, [sidebarOpen]);

    useEffect(() => {
        const keyHandler = ({ keyCode }: KeyboardEvent) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    }, [sidebarOpen]);

    useEffect(() => {
        localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector("body")?.classList.add("sidebar-expanded");
        } else {
            document
                .querySelector("body")
                ?.classList.remove("sidebar-expanded");
        }
    }, [sidebarExpanded]);

    useEffect(() => {
        const resizeHandler = () => {
            if (window.innerWidth <= 1024 && sidebarOpen) {
                setSidebarOpen(false);
            }
        };

        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, [sidebarOpen]);

    const sidebarItems = sidebarMenu.filter((item) =>
        checkPermission(item?.permissions, getMeData)
    );

    return (
        <>
            <aside
                ref={sidebar}
                className={`absolute left-0 top-0 flex h-screen w-80 flex-col overflow-y-hidden bg-[#E0EDFF] shadow-sm duration-300 ease-linear lg:static lg:translate-x-0 lg:z-10 ${sidebarOpen ? "translate-x-0 z-30" : "-translate-x-full"}`}>
                {/* <!-- SIDEBAR HEADER --> */}
                <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                    <button
                        ref={trigger}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-controls="sidebar"
                        aria-expanded={sidebarOpen}
                        className="block lg:hidden"
                    >
                        <svg
                            className="fill-current"
                            width="20"
                            height="18"
                            viewBox="0 0 20 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                                fill=""
                            />
                        </svg>
                    </button>
                </div>
                {/* <!-- SIDEBAR HEADER --> */}

                <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                    <div className="flex items-center justify-start h-16 px-9 mt-3">
                        <h2 className="text-[#2981FF] font-bold text-3xl select-none">
                            Issue Solver
                        </h2>
                    </div>
                    <div className="mt-5 lg:mt-9 px-9">
                        <nav className="flex-1 py-4">
                            {sidebarItems?.map((item) => (
                                <Link
                                    scroll={false}
                                    prefetch={true}
                                    shallow={true}
                                    href={item.path}
                                    key={item.path}
                                    className={`${currentPath === item.path ? "bg-[#2981FF] text-white rounded-xl" : "text-[#4D96FF]"} flex items-center gap-3 font-medium text-lg mb-4 py-4 px-3`}
                                >
                                    <Image
                                        alt=""
                                        src={item.icon}
                                        className={`${currentPath === item.path ? "brightness-[6.5]" : ""} w-7 h-7`}
                                    />
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;