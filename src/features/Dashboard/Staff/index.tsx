"use client";
import { plus, trashbin } from "@/assets/imgs";
import Image from "next/image";
import { useState } from "react";
import CreatePopup from "./CreatePopup";

const Staff = () => {
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
                    <div className="grid grid-cols-5 items-center justify-between bg-white py-6 px-14 rounded-xl mb-10 select-none">
                        <span className="text-xs">No</span>
                        <span className="text-xs text-center">Staffın Adı</span>
                        <span className="text-xs text-center">Staffın E-Poçtu</span>
                        <span className="text-xs text-end">Aid olduğu qurum</span>
                        <span className="text-xs text-end">Staffın Sil</span>
                    </div>

                    <div>
                        <div className="grid grid-cols-5 items-center justify-between bg-white py-6 px-14 rounded-xl mb-3">
                            <span className="text-xs select-none">1</span>
                            <span className="text-xs text-center">Leyla Əsədova</span>
                            <span className="text-xs text-center">leylaiddia@gmail.com</span>
                            <span className="text-xs text-center whitespace-nowrap">İnnovasiya və Rəqəmsal İnkşaf Agentliyi</span>
                            <div className="text-center flex justify-end">
                                <Image alt="" src={trashbin} className="cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CreatePopup openPopup={openPopup} setOpenPopup={setOpenPopup} />
        </>
    )
};

export default Staff