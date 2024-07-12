"use client";
import { plus } from "@/assets/imgs";
import Image from "next/image";
import { useState } from "react";
import CreatePopup from "./CreatePopup";

const Organizations = () => {
    const [selectStatus, setSelectStatus] = useState('Aktiv');
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
                            <div className={`${selectStatus === "Deaktiv" ? "bg-[#FF3D2C33] text-[#EF5648]" : "bg-[#DDF1E4] text-[#429A60]"} relative flex items-center gap-10 rounded-full py-1 px-3 w-[100px]`}>
                                <select className="appearance-none w-full outline-none border-0 bg-transparent" name="whatever" id="frm-whatever" onChange={(status) => setSelectStatus(status.target.value)}>
                                    <option value="Aktiv" className="text-xxs bg-white text-black outline-none rounded-full py-[6px] px-3">Aktiv</option>
                                    <option value="Deaktiv" className="text-xxs border-0 text-black outline-none rounded-full py-7 px-3">Deaktiv</option>
                                </select>
                                <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center text-[#EF5648] pr-2">
                                    <svg className={`h-4 w-4 ${selectStatus === "Deaktiv" ? "fill-[#EF5648]" : "fill-[#429A60]"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CreatePopup openPopup={openPopup} setOpenPopup={setOpenPopup} />
        </>
    )
};

export default Organizations