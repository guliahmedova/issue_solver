"use client";
import { plus } from "@/assets/imgs";
import API from "@/http/api";
import { useRequestMutation } from "@/http/request";
import Image from "next/image";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ToastContainer } from "react-toastify";
import CreatePopup from "./CreatePopup";

interface IOrganization {
    name: string;
    active: boolean;
};

interface IOrganizationResponse {
    data: {
        items: IOrganization[],
        hasNext: boolean
    }
};

const Organizations = () => {
    const [organizationData, setOrganizationData] = useState<IOrganization[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [selectStatus, setSelectStatus] = useState({
        open: false,
        status: "Aktiv",
        name: ''
    });
    const [openPopup, setOpenPopup] = useState(false);

    const { trigger: getOrganizationTrigger } = useRequestMutation(API.organizations_get, { method: 'GET' });

    const fetchData = async (reset = false) => {
        const currentPage = reset ? 0 : page;
        const response = await getOrganizationTrigger({
            params: {
                Page: currentPage,
                PageSize: 9
            }
        });

        const data: IOrganizationResponse = response;

        if (reset) {
            setOrganizationData(data.data.items);
        } else {
            setOrganizationData(prevStaffData => [...prevStaffData, ...data.data.items]);
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

    const handleStatusDropdown = (name: string, currentStatus: boolean) => {
        setSelectStatus(prevState => ({
            ...prevState,
            open: prevState?.name === name ? !currentStatus : currentStatus,
            name: prevState?.name === name ? "" : name
        }));
    };

    const handleStatusChange = (name: string, currentStatus: boolean) => {
        setSelectStatus(prevState => ({ name: '', status: "Deaktiv", open: false }));
        const newStatus = !currentStatus;
        setOrganizationData(prevData => prevData.map(org =>
            org.name === name ? { ...org, active: newStatus } : org
        ));
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

                    <div className="h-[550px] overflow-auto" id="parentScrollBarOrganization">
                        <InfiniteScroll
                            dataLength={organizationData?.length}
                            next={fetchData}
                            hasMore={hasMore}
                            loader={<h4 className="text-center text-lg text-gray">Loading...</h4>}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                    <b>The End</b>
                                </p>
                            }
                            refreshFunction={refreshData}
                            pullDownToRefresh
                            scrollableTarget="parentScrollBar"
                        >
                            {
                                organizationData?.map((item: IOrganization, index: number) => (
                                    <div className="flex items-center justify-between bg-white py-6 px-14 rounded-xl mb-3" key={index}>
                                        <span className="text-xs select-none">{index + 1}</span>
                                        <span className="text-xs">{item.name}</span>
                                        {/**----------------- */}
                                        <div className="relative text-xxs w-[90px]">
                                            <span className={`${item.active ? 'bg-[#DDF1E4] text-[#429A60]' : 'bg-[#FF3D2C33] text-[#EF5648]'} rounded-full py-[6px] px-3 cursor-pointer text-center flex items-center justify-between`}
                                                onClick={() => handleStatusDropdown(item.name, item.active)}
                                            >
                                                {item.active ? 'Aktiv' : 'Deaktiv'}
                                                <svg className={`h-4 w-4 ${selectStatus.name === item.name ? 'rotate-180' : 'rotate-0'} ${item.active ? "fill-[#429A60]" : "fill-[#EF5648]"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                </svg>
                                            </span>
                                            <div className={`${selectStatus.name === item.name ? 'absolute' : 'hidden'} flex flex-col gap-4 bg-white/65 shadow rounded-md p-2 top-[28.6px] w-full`}>
                                                <span className={`${item.active ? "bg-[#FF3D2C33] text-[#EF5648]" : "bg-[#DDF1E4] text-[#429A60]"} rounded-full py-[6px] px-3 cursor-pointer text-center`}
                                                    onClick={() => handleStatusChange(item.name, item.active)}
                                                >{item.active ? "Deaktiv" : "Aktiv"}</span>
                                            </div>
                                        </div>
                                        {/**----------------- */}
                                    </div>

                                ))
                            }
                        </InfiniteScroll>
                    </div>
                </div>
            </div>

            <CreatePopup openPopup={openPopup} setOpenPopup={setOpenPopup} />
        </>
    )
};

export default Organizations