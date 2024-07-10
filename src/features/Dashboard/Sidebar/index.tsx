import { checkPermission, sidebarMenu } from "@/features/ProtectRoute";
import API from "@/http/api";
import { useRequest } from "@/http/request";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ISidebar {
    openSidebar: boolean;
};

const Sidebar = ({ openSidebar }: ISidebar) => {
    const currentPath = usePathname();
    const getMe = useRequest(API.get_me);
    const userPermissions = getMe?.data?.data?.permissions
    const sidebarItems = sidebarMenu.filter((item) => checkPermission(item?.permissions, userPermissions));

    return (
        <div className={`${openSidebar ? 'md:flex' : 'hidden'} flex-col lg:w-72 bg-[#E0EDFF] bg-no-repeat bg-fix bg-center bg-cover shadow border`}>
            <div className="flex items-center justify-start h-16 px-9 mt-3">
                <Link href="/dashboard" className="text-[#2981FF] font-bold text-3xl">Issue Solver</Link>
            </div>
            <div className="flex flex-col overflow-y-auto mt-11 lg:h-full">
                <nav className="flex-1 px-10 py-4">
                    {sidebarItems?.map((item) => (
                        <Link
                            href={item.path}
                            key={item.path}
                            className={`${currentPath === item.path ? "bg-[#2981FF] text-white rounded-xl" : "text-[#4D96FF]"} flex items-center gap-3 font-medium text-lg mb-4 py-4 px-3`}
                        >
                            <Image
                                alt=""
                                src={item.icon}
                                className={`${currentPath === item.path ? "brightness-[6.5]" : ""}`}
                            />
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    )
};

export default Sidebar;