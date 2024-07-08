import { about, applies, comments, faq, privacy } from "@/assets/imgs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ISidebar {
    openSidebar: boolean;
};

const Sidebar = ({ openSidebar }: ISidebar) => {
    const currentPath = usePathname();

    return (
        <div className={`${openSidebar ? 'md:flex' : 'hidden'} flex-col lg:w-72 bg-[#E0EDFF] bg-no-repeat bg-fix bg-center bg-cover shadow border`}>
            <div className="flex items-center justify-start h-16 px-9 mt-3">
                <Link href="/dashboard" className="text-[#2981FF] font-bold text-3xl">Issue Solver</Link>
            </div>
            <div className="flex flex-col overflow-y-auto mt-11 lg:h-full">
                <nav className="flex-1 px-10 py-4">
                    <Link
                        href="/dashboard/requests"
                        className={`${currentPath === '/dashboard/requests' ? "bg-[#2981FF] text-white rounded-xl" : "text-[#4D96FF]"} flex items-center gap-3 font-medium text-lg mb-4 py-4 px-3`}
                    >
                        <Image
                            alt=""
                            src={applies}
                            className={`${currentPath === "/dashboard/requests" ? "brightness-[6.5]" : ""}`}
                        />
                        Müraciətlər
                    </Link>
                    <Link
                        href="/dashboard/comments"
                        className={`${currentPath === '/dashboard/comments' ? "bg-[#2981FF] text-white rounded-xl" : "text-[#4D96FF]"} flex items-center gap-3 font-medium text-lg mb-4 py-4 px-3`}
                    >
                        <Image alt="" src={comments}
                            className={`${currentPath === "/dashboard/comments" ? "brightness-[6.5]" : ""}`}
                        />
                        Şərhlərim
                    </Link>
                    <Link
                        href="/dashboard/privacy"
                        className={`${currentPath === '/dashboard/privacy' ? "bg-[#2981FF] text-white rounded-xl" : "text-[#4D96FF]"} flex items-center gap-3 font-medium text-lg mb-4 py-4 px-3`}
                    >
                        <Image alt="" src={privacy}
                            className={`${currentPath === "/dashboard/privacy" ? "brightness-[6.5]" : ""}`}
                        />
                        Məxfilik siyasəti
                    </Link>
                    <Link
                        href="/dashboard/faq"
                        className={`${currentPath === '/dashboard/faq' ? "bg-[#2981FF] text-white rounded-xl" : "text-[#4D96FF]"} flex items-center gap-3 font-medium text-lg mb-4 py-4 px-3`}
                    >
                        <Image alt="" src={faq}
                            className={`${currentPath === "/dashboard/faq" ? "brightness-[6.5]" : ""}`}
                        />
                        Tez-tez verilən suallar
                    </Link>
                    <Link
                        href="/dashboard/about"
                        className={`${currentPath === '/dashboard/about' ? "bg-[#2981FF] text-white rounded-xl" : "text-[#4D96FF]"} flex items-center gap-3 font-medium text-lg mb-4 py-4 px-3`}
                    >
                        <Image alt="" src={about}
                            className={`${currentPath === "/dashboard/about" ? "brightness-[6.5]" : ""}`}
                        />
                        Platforma haqqında
                    </Link>
                </nav>
            </div>
        </div>
    )
};

export default Sidebar;