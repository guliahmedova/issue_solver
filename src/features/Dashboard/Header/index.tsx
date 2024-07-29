"use client";
import { building, key, logout, user } from "@/assets/imgs";
import { Loader } from "@/features/common";
import API from "@/http/api";
import { useRequestMutation } from "@/http/request";
import MenuIcon from '@mui/icons-material/Menu';
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import ChangePassword from "../ChangePassword";
import LogoutPopup from "../LogoutPopup";

interface IHeader {
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
};

interface IUserResponse {
    data: {
        organizationName: string;
        fullName: string;
        email: string;
    }
};

const Header = ({ setSidebarOpen }: IHeader) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [openPasswordModal, setOpenPasswordModal] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [logoutModal, setLogoutModal] = useState<boolean>(false);

    const [userData, setUserData] = useState<IUserResponse["data"]>({
        organizationName: "",
        email: "",
        fullName: ""
    });

    const [loader, setLoader] = useState(false);
    const { trigger: getDataTrigger } = useRequestMutation(API.get_me, { method: 'GET' });

    const handleOutsideClick = (e: React.MouseEvent<HTMLElement>) => {
        if (dropdownRef?.current && !dropdownRef?.current?.contains(e.target as Node)) {
            setShowDropdown(false);
        };
    };

    const handledropdownMenu = async () => {
        setShowDropdown(true);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoader(true);
                const res: IUserResponse = await getDataTrigger();
                setUserData({
                    organizationName: res?.data?.organizationName ?? res?.data?.fullName,
                    email: res?.data?.email,
                    fullName: res?.data?.fullName
                });
            } catch (error: any) {
                toast.error(error.response?.data?.message ?? "Error fetching user data");
            } finally {
                setLoader(false);
            }
        };

        fetchUserData();
    }, []);

    return (
        <>
            <header className="sticky top-0 z-20 flex w-full lg:bg-surface-background bg-white drop-shadow-1 shadow-sm">
                <div className="flex justify-between items-center w-full px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                    <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                        <button
                            aria-controls="sidebar"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSidebarOpen(prevState => !prevState);
                            }}
                            className="z-99999 inline-block lg:bg-surface-background bg-transparent p-1.5 lg:hidden cursor-pointer"
                        >
                            <MenuIcon />
                        </button>
                    </div>

                    <div className="flex items-center gap-3 2xsm:gap-7 w-full justify-end">
                        {/**-----------------------DROPDOWN------------------------- */}
                        <div className="relative" >
                            <div className="bg-[#E0EDFF] rounded-full w-12 h-12 flex items-center justify-center cursor-pointer relative z-30"
                                onClick={handledropdownMenu}
                            >
                                <Image alt="" src={building} />
                            </div>
                            <div onClick={handleOutsideClick} className={`${showDropdown ? 'fixed' : 'hidden'} bg-black/20 top-0 bottom-0 left-0 right-0 z-[999]`}
                            >
                                <div className="absolute bg-white rounded-xl p-4 shadow top-24 right-8 h-auto z-[999]"
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
                                                <h3 className="font-medium text-lg">{userData.organizationName}</h3>
                                                <span className="text-[#F09350] text-wrap w-64 overflow-hidden">{userData.email}</span>
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
                        {/**-----------------------DROPDOWN------------------------- */}
                    </div>
                </div>
            </header>

            <Loader loader={loader} />

            <ChangePassword openPasswordModal={openPasswordModal}
                setOpenPasswordModal={setOpenPasswordModal} />
            <LogoutPopup isOpen={logoutModal} close={setLogoutModal} />
        </>
    )
};

export default Header;