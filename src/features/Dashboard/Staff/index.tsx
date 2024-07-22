"use client";
import { plus, trashbin } from "@/assets/imgs";
import { Loader } from "@/features/common";
import API from "@/http/api";
import { useRequestMutation } from "@/http/request";
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
    }
};

const Staff = () => {
    const [staffData, setStaffData] = useState<IStaff[]>([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [loader, setLoader] = useState(false);
    const { trigger: deleteStaffTrigger } = useRequestMutation(API.staff_delete, { method: 'DELETE' });
    const { trigger: getStaffTrigger } = useRequestMutation(API.staffs_get, { method: 'GET' });

    const fetchData = async (reset = false) => {
        const currentPage = reset ? 0 : page;
        const response = await getStaffTrigger({
            params: {
                Page: currentPage,
                PageSize: 9
            }
        });
        const data: IStaffResponse = response;

        if (reset) {
            setStaffData(data.data.items);
        } else {
            setStaffData(prevStaffData => [...prevStaffData, ...data.data.items]);
        }

        setHasMore(data.data.hasNext);
        setPage(currentPage + 1);
    };

    useEffect(() => {
        fetchData(true);
    }, []);

    const refreshData = async () => {
        await fetchData(true);
    };

    const handleStaffDelete = async (email: string) => {
        try {
            setLoader(true);
            await deleteStaffTrigger({
                body: {
                    email: email
                }
            });
            setStaffData(prevStaffData => prevStaffData.filter(staff => staff.username !== email));
            toast.success('Uğurla silindi');
        } catch (error: any) {
            console.log(error, '<- ERROR');
            toast.error(error.response.data.message);
        } finally {
            setLoader(false);
        }
    };

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={1000}
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
                        <span className="text-xs text-end">Staffı Sil</span>
                    </div>
                    <div className="h-[550px] overflow-auto" id="parentScrollBar">
                        <InfiniteScroll
                            dataLength={staffData?.length}
                            next={fetchData}
                            hasMore={hasMore}
                            loader={<h4 className="text-center text-lg text-gray">Loading...</h4>}
                            refreshFunction={refreshData}
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
                                        onClick={() => handleStaffDelete(item.username)}
                                    >
                                        <Image alt="" src={trashbin} className="cursor-pointer" />
                                    </div>
                                </div>
                            ))}
                        </InfiniteScroll>
                    </div>
                </div>
            </div>

            <Loader loader={loader} />

            <CreatePopup openPopup={openPopup} setOpenPopup={setOpenPopup} refreshData={refreshData} />
        </>
    )
};

export default Staff