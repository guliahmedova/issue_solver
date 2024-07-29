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
    isActiveOrganization: string;
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
    const [loader, setLoader] = useState(false);
    const [page, setPage] = useState(0);
    const [editFullname, setEditFullname] = useState('');
    const [editUsername, setEditUsername] = useState('');
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const { trigger: deleteStaffTrigger } = useRequestMutation(API.staff_delete, { method: 'DELETE' });
    const { trigger: getStaffTrigger } = useRequestMutation(API.staffs_get, { method: 'GET' });
    const { trigger: editStaffTrigger } = useRequestMutation(API.staff_edit, { method: 'PUT' });

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
            toast.error(error.response.data.message);
        } finally {
            setLoader(false);
        }
    };

    const handleEditClick = (index: number, currentFullname: string, currentUsername: string) => {
        setEditFullname(currentFullname);
        setEditUsername(currentUsername);
        setEditIndex(index);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditFullname(e.target.value);
    };

    const handleEditSubmit = async () => {
        try {
            setLoader(true);
            await editStaffTrigger({
                body: {
                    fullName: editFullname,
                    username: editUsername
                }
            });
            setStaffData(prevStaffData =>
                prevStaffData.map((staff, index) =>
                    index === editIndex ? { ...staff, fullname: editFullname } : staff
                )
            );
            setEditIndex(null);
            toast.success('Uğurla yeniləndi');
        } catch (error: any) {
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
                    <h2 className="font-bold text-xl select-none">Bütün Əməkdaşlar</h2>
                    <button className="bg-[#2981FF] text-white rounded-3xl py-3 px-6 flex items-center justify-between w-[136px] text-[13px]"
                        onClick={() => setOpenPopup(true)}
                    >Əlavə et <Image alt="" src={plus} /></button>
                </div>

                {/**------------------------------------------------- */}
                <div className="overflow-x-auto">
                    <div className="max-h-80">
                        <div className="lg:grid grid-cols-5 justify-between bg-white py-6 px-8 rounded-xl mb-10 select-none hidden">
                            <span className="xl:text-base text-[13px]">No</span>
                            <span className="xl:text-base text-[13px]">Staffın Adı</span>
                            <span className="xl:text-base text-center text-[13px]">Staffın E-Poçtu</span>
                            <span className="xl:text-base text-[13px] text-center">Aid olduğu qurum</span>
                            <span className="xl:text-base text-[13px] text-end">Staffı Sil</span>
                        </div>
                    </div>

                    <div id="parentScrollBar" className="max-h-max h-[390px]">
                        <InfiniteScroll
                            dataLength={staffData?.length}
                            next={fetchData}
                            hasMore={hasMore}
                            loader={<h4 className="text-center text-lg text-gray">Yüklənir</h4>}
                            refreshFunction={refreshData}
                            pullDownToRefresh
                            scrollableTarget="parentScrollBar"
                        >
                            {staffData?.map((item: IStaff, index: number) => (
                                <div className={`grid xl:grid-cols-5 grid-cols-1 gap-3 items-center justify-between ${item.isActiveOrganization === "True" ? "bg-white" : "bg-gray-disabled select-none"} py-6 px-8 rounded-xl mb-3 w-full`} key={index}>
                                    <span className="xl:text-base text-sm select-none text-left md:text-left w-fit">{index + 1}</span>
                                    <span className="xl:text-base text-sm whitespace-break-spaces break-words text-center xl:text-left xl:w-fit">
                                        {editIndex === index ? (
                                            <input
                                                type="text"
                                                value={editFullname}
                                                onChange={handleEditChange}
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleEditSubmit();
                                                    }
                                                }}
                                                className="xl:w-4/6 w-5/6 rounded p-1 border-2 border-[#2981FF] bg-gray-disabled"
                                            />
                                        ) : (
                                            <span onClick={() => handleEditClick(index, item.fullname, item.username)}>
                                                {item.fullname}
                                            </span>
                                        )}
                                    </span>
                                    <span className="xl:text-base text-sm whitespace-break-spaces break-words xl:w-fit xl:text-left text-center">{item.username}</span>
                                    <span className="xl:text-base text-sm text-center whitespace-break-spaces break-words w-full">{item.isActiveOrganization && item.organizationName}</span>
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
                {/**------------------------------------------------- */}

            </div>

            <Loader loader={loader} />
            <CreatePopup openPopup={openPopup} setOpenPopup={setOpenPopup} refreshData={refreshData} />
        </>
    )
};

export default Staff;