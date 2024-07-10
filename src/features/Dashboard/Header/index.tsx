"use client";
import { building, key, logout, notif, user } from "@/assets/imgs";
import API from "@/http/api";
import { useRequest } from "@/http/request";
import MenuIcon from '@mui/icons-material/Menu';
import Image from "next/image";
import { useRef, useState } from "react";
import ChangePassword from "../ChangePassword";
import LogoutPopup from "../LogoutPopup";

interface IHeader {
    setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
};

const Header = ({ setOpenSidebar }: IHeader) => {
    const getMeData = useRequest(API.get_me);
    const [showDropdown, setShowDropdown] = useState(false);
    const [openPasswordModal, setOpenPasswordModal] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [logoutModal, setLogoutModal] = useState<boolean>(false);
    const organizationName = getMeData?.data?.data?.organizationName ?
        getMeData?.data?.data?.organizationName : "İnnovasiya və Rəqəmsal İnkişaf Agentliyi";
    const email = getMeData?.data?.data?.email ? getMeData?.data?.data?.email : "info@idda.az";

    const handleOutsideClick = (e: React.MouseEvent<HTMLElement>) => {
        if (dropdownRef?.current && !dropdownRef?.current?.contains(e.target as Node)) {
            setShowDropdown(false);
        };  
    };

    return (
        <>
            <div className="flex items-center justify-between lg:justify-end px-10 pt-4">
                <div className="cursor-pointer lg:hidden block"
                    onClick={() => setOpenSidebar((prevState) => !prevState)}
                >
                    <MenuIcon />
                </div>
                <div className="flex items-center justify-end h-16 gap-6 | dropdown_bg">
                    <form className="max-w-md hidden lg:block">
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none opacity-80">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border rounded-xl outline-none" placeholder="Search" />
                        </div>
                    </form>
                    <div>
                        <Image alt="" src={notif} />
                    </div>
                    <div className="relative" >
                        <div className="bg-[#E0EDFF] rounded-full w-12 h-12 flex items-center justify-center cursor-pointer relative z-20"
                            onClick={() => setShowDropdown(true)}
                        >
                            <Image alt="" src={building} />
                        </div>
                        <div onClick={handleOutsideClick} className={`${showDropdown ? 'fixed' : 'hidden'} bg-black/20 top-0 bottom-0 left-0 right-0 z-40`}
                        >
                            <div className="absolute bg-white rounded-xl p-4 border shadow top-24 right-8 h-auto"
                                ref={dropdownRef}
                            >
                                <ul>
                                    <li className="cursor-pointer flex items-center gap-5 mb-4"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShowDropdown(false);
                                        }}
                                    >
                                        <div className="w-12 h-12 rounded-full bg-[#E0EDFF] flex items-center justify-center">
                                            <Image alt="" src={user} />
                                        </div>
                                        <div className="text-wrap w-64 overflow-x-scroll">
                                            <h3 className="font-medium text-lg">{organizationName}</h3>
                                            <span className="text-[#F09350] text-wrap w-64 overflow-hidden">{email}</span>
                                        </div>
                                    </li>
                                    <li className="cursor-pointer flex items-center gap-5 mb-4"
                                        onClick={() => {
                                            setShowDropdown(false);
                                            setOpenPasswordModal(true);
                                        }}
                                    >
                                        <div className="w-12 h-12 rounded-full bg-[#E0EDFF] flex items-center justify-center">
                                            <Image alt="" src={key} />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-lg">Şifrəni dəyiş</h3>
                                        </div>
                                    </li>
                                    <li className="cursor-pointer flex items-center gap-5 mb-6 pl-3 mt-6"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShowDropdown(false);
                                            setLogoutModal(true);
                                        }}
                                    >
                                        <div>
                                            <Image alt="" src={logout} />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-lg text-[#F09350]">Hesabdan çıxış</h3>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ChangePassword openPasswordModal={openPasswordModal}
                setOpenPasswordModal={setOpenPasswordModal} />
            <LogoutPopup isOpen={logoutModal} close={setLogoutModal} />
        </>
    )
};

export default Header;