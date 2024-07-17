"use client";
import { plus, trashbin } from "@/assets/imgs";
import API from "@/http/api";
import { useRequest, useRequestMutation } from "@/http/request";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import CreatePopup from "./CreatePopup";

interface IStaff {
    fullname: string;
    username: string;
    organizationName: string;
    isActiveOrganization: boolean;
};

const Staff = () => {
    const { data: staffs, isLoading } = useRequest(API.staffs_get);
    const { trigger: deleteStaffTrigger } = useRequestMutation(API.staff_delete, { method: 'DELETE' });
    const [openPopup, setOpenPopup] = useState(false);

    const handleDeleteStaff = async (username: string) => {
        const res = await deleteStaffTrigger({ params: username });
        console.log("Response delete: ", res);
        console.log("username: ", username);
    };

    return (
        <>
            <div>
                <div className="flex items-center justify-between mb-7">
                    <h2 className="font-bold text-lg">Bütün Stafflar</h2>
                    <button className="bg-[#2981FF] text-white rounded-3xl py-3 px-6 flex items-center justify-between w-[136px] text-[13px]"
                        onClick={() => setOpenPopup(true)}
                    >Qurum <Image alt="" src={plus} /></button>
                </div>

                <div>
                    <div className="grid grid-cols-5 justify-between bg-white py-6 px-8 rounded-xl mb-10 select-none">
                        <span className="text-xs">No</span>
                        <span className="text-xs">Staffın Adı</span>
                        <span className="text-xs">Staffın E-Poçtu</span>
                        <span className="text-xs text-center">Aid olduğu qurum</span>
                        <span className="text-xs text-end">Staffın Sil</span>
                    </div>

                    <div>
                        {
                            isLoading ? (
                                <div className={`fixed top-0 bottom-0 left-0 right-0 flex w-full flex-col items-center justify-center bg-black/10 z-40`}>
                                    <CircularProgress size="4rem" />
                                </div>
                            ) : (
                                staffs?.data?.items?.map((item: IStaff, index: number) => (
                                    <div className="grid grid-cols-5 items-center justify-between bg-white py-6 px-8 rounded-xl mb-3" key={index}>
                                        <span className="text-xs select-none">{index + 1}</span>
                                        <span className="text-xs">{item.fullname}</span>
                                        <span className="text-xs">{item.username}</span>
                                        <span className="text-xs whitespace-nowrap text-center">{item.isActiveOrganization && item.organizationName}</span>
                                        <div className="flex justify-end"
                                            onClick={() => handleDeleteStaff(item.username)}
                                        >
                                            <Image alt="" src={trashbin} className="cursor-pointer" />
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
            </div>

            <CreatePopup openPopup={openPopup} setOpenPopup={setOpenPopup} />
        </>
    )
};

export default Staff