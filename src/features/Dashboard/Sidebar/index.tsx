import { about, applies, comments, exit, faq, privacy } from "@/assets/imgs";
import Image from "next/image";
import Link from "next/link";

interface ISidebar {
    openSidebar: boolean;
};

const Sidebar = ({ openSidebar }: ISidebar) => {
    return (
        <div className={`${openSidebar ? 'md:flex' : 'hidden'} flex-col lg:w-72 bg-sidebar-img bg-no-repeat bg-fix bg-center bg-cover shadow border`}>
            <div className="flex items-center justify-start h-16 px-9 mt-3">
                <Link href="/dashboard" className="text-[#2981FF] font-bold text-3xl">Issue Solver</Link>
            </div>
            <div className="flex flex-col overflow-y-auto mt-7 lg:h-full">
                <nav className="flex-1 px-9 py-4">
                    <Link href="/dashboard/requests" className="flex items-center gap-3 text-[#4D96FF] font-bold text-xl mb-3 py-4">
                        <Image alt="" src={applies} />
                        Müraciətlər
                    </Link>
                    <Link href="/dashboard" className="flex items-center gap-3 text-[#4D96FF] font-bold text-xl mb-3 py-4">
                        <Image alt="" src={comments} />
                        Şərhlərim
                    </Link>
                    <Link href="/dashboard" className="flex items-center gap-3 text-[#4D96FF] font-bold text-xl mb-3 py-4">
                        <Image alt="" src={privacy} />
                        Məxfilik siyasəti
                    </Link>
                    <Link href="/dashboard" className="flex items-center gap-3 text-[#4D96FF] font-bold text-xl mb-3 py-4">
                        <Image alt="" src={faq} />
                        Tez-tez verilən suallar
                    </Link>
                    <Link href="/dashboard" className="flex items-center gap-3 text-[#4D96FF] font-bold text-xl mb-3 py-4">
                        <Image alt="" src={about} />
                        Platforma haqqında
                    </Link>
                </nav>

                <div className="flex gap-3 items-center text-[#2981FF] font-bold text-xl px-9 cursor-pointer mb-2">
                    <Image alt="" src={exit} />
                    Hesabdan çıxış
                </div>
            </div>
        </div>
    )
};

export default Sidebar;