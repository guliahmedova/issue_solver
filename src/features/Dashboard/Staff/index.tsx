"use client";
import { trashbin, plus } from "@/assets/imgs";
import Image from "next/image";
import { useState } from "react";
import CreatePopup from "./CreatePopup";

const Staff = () => {
    const [openPopup, setOpenPopup] = useState(true);

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
                        <span className="text-xs">Staffın Adı</span>
                        <span className="text-xs">Staffın E-Poçtu</span>
                        <span className="text-xs">Aid olduğu qurum</span>
                        <span className="text-xs">Staffın Redaktəsi</span>
                    </div>

                    <div>
                        <div className="flex items-center justify-between bg-white py-6 px-14 rounded-xl mb-3">
                            <span className="text-xs select-none">1</span>
                            <span className="text-xs">Leyla Əsədova</span>
                            <span className="text-xs">leylaiddia@gmail.com</span>
                            <span className="text-xs select-none">İnnovasiya və Rəqəmsal İnkşaf Agentliyi</span>
                            <Image alt="" src={trashbin} className="cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>

            <CreatePopup openPopup={openPopup} setOpenPopup={setOpenPopup} />
        </>
    )
};

export default Staff