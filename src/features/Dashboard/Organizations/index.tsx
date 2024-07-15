"use client";
import { plus } from "@/assets/imgs";
import Image from "next/image";
import { useState } from "react";
import CreatePopup from "./CreatePopup";

const Organizations = () => {
    const [selectStatus, setSelectStatus] = useState({
        open: false,
        status: "Aktiv"
    });
    const [openPopup, setOpenPopup] = useState(false);

    return (
        <>
            <div>
                <div className="flex items-center justify-between mb-7">
                    <h2 className="font-bold text-lg">Bütün Qurumlar</h2>
                    <button className="bg-[#2981FF] text-white rounded-3xl py-3 px-6 flex items-center justify-between w-[136px] text-[13px]"
                        onClick={() => setOpenPopup(true)}
                    >Qurum <Image alt="" src={plus} /></button>
                </div>

                <div>
                    <div className="flex items-center justify-between bg-white py-6 px-14 rounded-xl mb-10 select-none">
                        <span className="text-xs">No</span>
                        <span className="text-xs">Qurumun Adı</span>
                        <span className="text-xs">Qurumun Statusu</span>
                    </div>

                    <div>
                        <div className="flex items-center justify-between bg-white py-6 px-14 rounded-xl mb-3">
                            <span className="text-xs select-none">1</span>
                            <span className="text-xs">İnnovasiya və Rəqəmsal İnkişaf Agentliyi</span>

                            {/**----------------- */}
                            <div className="relative text-xxs w-[90px]">
                                <span className={`${selectStatus.status === 'Aktiv' ? 'bg-[#DDF1E4] text-[#429A60]' : 'bg-[#FF3D2C33] text-[#EF5648]'} rounded-full py-[6px] px-3 cursor-pointer text-center flex items-center justify-between`}
                                    onClick={() => setSelectStatus((prevState) => ({
                                        ...prevState,
                                        open: !selectStatus.open
                                    }))}
                                >
                                    {selectStatus.status}
                                    <svg className={`h-4 w-4 ${selectStatus.open ? 'rotate-180' : 'rotate-0'} ${selectStatus.status === "Deaktiv" ? "fill-[#EF5648]" : "fill-[#429A60]"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </span>
                                <div className={`${selectStatus.open ? 'absolute' : 'hidden'} flex flex-col gap-4 bg-white/65 shadow rounded-md p-2 top-[28.6px] w-full`}>
                                    <span className="bg-[#DDF1E4] text-[#429A60] rounded-full py-[6px] px-3 cursor-pointer text-center"
                                        onClick={() => setSelectStatus({
                                            status: "Aktiv",
                                            open: false
                                        })}
                                    >Aktiv</span>
                                    <span className="bg-[#FF3D2C33] text-[#EF5648] rounded-full py-[6px] px-3 cursor-pointer text-center"
                                        onClick={() => setSelectStatus({
                                            status: "Deaktiv",
                                            open: false
                                        })}
                                    >Deaktiv</span>
                                </div>
                            </div>
                            {/**----------------- */}

                        </div>
                    </div>
                </div>
            </div>

            <CreatePopup openPopup={openPopup} setOpenPopup={setOpenPopup} />
        </>
    )
};

export default Organizations