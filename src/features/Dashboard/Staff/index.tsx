"use client";
import { plus, trashbin } from "@/assets/imgs";
import API from "@/http/api";
import { useRequest, useRequestMutation } from "@/http/request";
import Image from "next/image";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePopup from "./CreatePopup";

interface IStaff {
    fullname: string;
    username: string;
    organizationName: string;
    isActiveOrganization: boolean;
};

interface IStaffResponse {
    data: {
        items: IStaff[],
        hasNext: boolean
    },
};

const Staff = () => {
    const [staffData, setStaffData] = useState<IStaff[]>([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const { trigger: deleteStaffTrigger } = useRequestMutation(API.staff_delete, { method: 'DELETE' });
    const { trigger: getStaffTrigger, data: staffs } = useRequestMutation(API.staffs_get, { method: 'GET' });

    useEffect(() => {
        if (staffs) {
            const response: IStaffResponse = staffs;
            setStaffData(prevStaffData => [...prevStaffData, ...response.data.items]);
            setHasMore(response.data.hasNext);
        }
    }, [staffs]);

    const fetchStaffData = async () => {
        try {
            setPage(prevPage => prevPage + 1);
            await getStaffTrigger({
                params: {
                    Page: page,
                    PageSize: 9
                }
            });
        } catch (error) {
            
        }
    };

    const refreshStaffData = async () => {
        setPage(0);
        setStaffData([]);
    };

    const handleDeleteStaff = async (username: string) => {
        try {
            await deleteStaffTrigger({ body: { email: username } });
            toast.success('Stafff uğurla silindi!');
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

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
                    <div className="h-[550px] overflow-auto" id="parentScrollBar">
                        <InfiniteScroll
                            dataLength={staffData?.length}
                            next={fetchStaffData}
                            hasMore={hasMore}
                            loader={<h4 className="text-center text-lg text-gray">Loading...</h4>}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                    <b>The End</b>
                                </p>
                            }
                            refreshFunction={refreshStaffData}
                            pullDownToRefresh
                            scrollableTarget="parentScrollBar"
                        >
                            {staffData?.map((item: IStaff, index: number) => (
                                <div className="grid grid-cols-5 items-center justify-between bg-white py-6 px-8 rounded-xl mb-3 w-full" key={index}>
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
                            ))}
                        </InfiniteScroll>
                    </div>
                </div>
            </div>

            <CreatePopup openPopup={openPopup} setOpenPopup={setOpenPopup} />
        </>
    )
};

export default Staff