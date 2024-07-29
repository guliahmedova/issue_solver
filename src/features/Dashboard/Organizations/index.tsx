"use client";
import { plus } from "@/assets/imgs";
import { Loader } from "@/features/common";
import API from "@/http/api";
import { useRequestMutation } from "@/http/request";
import Image from "next/image";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast, ToastContainer } from "react-toastify";
import CreatePopup from "./CreatePopup";

interface IOrganization {
  name: string;
  active: boolean;
};

interface IOrganizationResponse {
  data: {
    items: IOrganization[];
    hasNext: boolean;
  };
};

const Organizations = () => {
  const [organizationData, setOrganizationData] = useState<IOrganization[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [selectStatus, setSelectStatus] = useState({
    open: false,
    status: "Aktiv",
    name: "",
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [loader, setLoader] = useState(false);
  const [editIndex, setEditIndex] = useState<null | number>(null);
  const [editOldName, setEditOldName] = useState('');
  const [editNewName, setEditNewName] = useState('');

  const { trigger: getOrganizationTrigger } = useRequestMutation(API.organizations_get, { method: "GET" });
  const { trigger: statusTrigger } = useRequestMutation(API.organization_status, { method: "PATCH" });
  const { trigger: editOrganizationTrigger } = useRequestMutation(API.organization_edit, { method: "PUT" });

  const fetchData = async (reset = false) => {
    const currentPage = reset ? 0 : page;
    const response = await getOrganizationTrigger({
      params: {
        Page: currentPage,
        PageSize: 9,
      },
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
      name: prevState?.name === name ? "" : name,
    }));
  };

  const handleStatusChange = async (name: string, currentStatus: boolean) => {
    try {
      setLoader(true);
      setSelectStatus(prevState => ({ name: "", status: "Deaktiv", open: false }));
      const newStatus = !currentStatus;
      setOrganizationData(prevData =>
        prevData.map(org => (org.name === name ? { ...org, active: newStatus } : org)),
      );
      await statusTrigger({
        body: {
          name: name,
        },
      });
      await refreshData();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoader(false);
    }
  };

  const handleEditClick = (index: number, name: string) => {
    setEditIndex(index);
    setEditOldName(name);
    setEditNewName(name);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditNewName(e.target.value);
  };

  const handleEditSubmit = async () => {
    try {
      setLoader(true);

      await editOrganizationTrigger({
        body: {
          oldName: editOldName,
          newName: editNewName
        }
      });

      setOrganizationData(prevStaffData =>
        prevStaffData.map((staff, index) =>
          index === editIndex ? { ...staff, name: editNewName } : staff
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
          <h2 className="font-bold text-lg">Bütün Qurumlar</h2>
          <button
            className="bg-[#2981FF] text-white rounded-3xl py-3 px-6 flex items-center justify-between w-[136px] text-[13px]"
            onClick={() => setOpenPopup(true)}
          >
            Qurum <Image alt="" src={plus} />
          </button>
        </div>

        <div>
          <div className="xl:flex hidden items-center justify-between bg-white py-6 px-14 rounded-xl mb-10 select-none">
            <span className="xl:text-base text-xxs">No</span>
            <span className="xl:text-base text-xxs">Qurumun Adı</span>
            <span className="xl:text-base text-xxs">Qurumun Statusu</span>
          </div>

          <div className="max-h-min h-[380px] overflow-auto" id="parentScrollBarOrganization">
            <InfiniteScroll
              dataLength={organizationData?.length}
              next={fetchData}
              hasMore={hasMore}
              loader={<h4 className="text-center text-lg text-gray">Yüklənir</h4>}
              refreshFunction={refreshData}
              pullDownToRefresh
              scrollableTarget="parentScrollBarOrganization"
            >
              {organizationData?.map((item: IOrganization, index: number) => (
                <div
                  className="xl:flex grid grid-cols-1 items-center justify-between bg-white py-6 px-14 rounded-xl mb-3"
                  key={index}
                >
                  <span className="xl:text-base text-sm select-none">{index + 1}</span>
                  <span className="xl:text-base text-sm text-center">
                    {editIndex === index ? (
                      <input
                        type="text"
                        value={editNewName}
                        onChange={handleEditChange}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleEditSubmit();
                          }
                        }}
                        className="lg:w-4/6 w-5/6 rounded p-1 border-2 border-[#2981FF] bg-gray-disabled"
                      />
                    ) : (
                      <span onClick={() => handleEditClick(index, item.name)}>
                        {item.name}
                      </span>
                    )}
                  </span>
                  <div className="relative text-xxs xl:w-[90px] z-0 flex justify-center w-full">
                    <span
                      className={`${item.active ? "bg-[#DDF1E4] text-[#429A60]" : "bg-[#FF3D2C33] text-[#EF5648]"} rounded-full py-[6px] px-3 cursor-pointer text-center flex items-center justify-between lg:mt-0 mt-2`}
                      onClick={() => handleStatusDropdown(item.name, item.active)}
                    >
                      {item.active ? "Aktiv" : "Deaktiv"}
                      <svg
                        className={`h-4 w-4 ${selectStatus.name === item.name ? "rotate-180" : "rotate-0"} ${item.active ? "fill-[#429A60]" : "fill-[#EF5648]"}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                    <div
                      className={`${selectStatus.name === item.name ? "absolute" : "hidden"} flex flex-col gap-4 bg-white shadow rounded-md p-2 top-full z-10 mb-0`}
                    >
                      <span
                        className={`${item.active ? "bg-[#FF3D2C33] text-[#EF5648]" : "bg-[#DDF1E4] text-[#429A60]"} rounded-full py-[6px] px-3 cursor-pointer text-center`}
                        onClick={() => handleStatusChange(item.name, item.active)}
                      >
                        {item.active ? "Deaktiv" : "Aktiv"}
                      </span>
                    </div>
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
  );
};

export default Organizations;