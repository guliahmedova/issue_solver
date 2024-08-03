"use client";
import {
  CalendarIcon,
  ClickedCommentIcon,
  ClickedLikeIcon,
  CommentIcon,
  LikeIcon,
  LocationIcon,
  NameIcon,
} from "@/assets/imgs";
import API from "@/http/api";
import { useRequestMutation } from "@/http/request";
import { useFilterStore } from "@/state/useFilterStore";
import { useSearchStore } from "@/state/useSearchStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import CommentSection from "./CommentSection";
import RequestsFilter from "./FilterSection";
import StatusPopUp, { getStatusStyles } from "./StatusPopUp";
import { RequestsDataType } from "./type";

export default function DataCard() {
  const commentHandle = (requestId: number) => {
    setCommentVisibility((prevState) => ({
      ...prevState,
      [requestId]: !prevState[requestId],
    }));
  };

  const [requestsData, setRequestsData] = useState<RequestsDataType[]>([]);
  const [commentVisibility, setCommentVisibility] = useState<{
    [key: number]: boolean;
  }>({});
  const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>({});
  const [likeStatus, setLikeStatus] = useState<{ [key: number]: boolean }>({});
  const [statusPopUpOpen, setStatusPopUpOpen] = useState<{
    [key: number]: boolean;
  }>({});
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const { trigger: GetAllRequestsTrigger, data: allRequests } =
    useRequestMutation(API.organization_requests_all, { method: "GET" });

  const fetchData = async (reset = false) => {
    try {
      const currentPage = reset ? 0 : page;
      const response = await GetAllRequestsTrigger({
        params: { page: currentPage, size: 10 },
      });
      const fetchedData = response?.data ?? [];

      if (reset) {
        setRequestsData(fetchedData);
      } else {
        setRequestsData((prev) => [...prev, ...fetchedData]);
      }

      setHasMore(fetchedData.length === 10);
      setPage(currentPage + 1);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchData(true);
  }, []);

  useEffect(() => {
    if (allRequests?.data) {
      const initialLikeCounts = allRequests.data.reduce(
        (acc: any, request: any) => {
          acc[request.requestId] = request.likeCount;
          return acc;
        },
        {} as { [key: number]: number },
      );
      setLikeCounts(initialLikeCounts);
      const initialLikeStatus = allRequests.data.reduce(
        (acc: any, request: any) => {
          acc[request.requestId] = request.likeSuccess;
          return acc;
        },
        {} as { [key: number]: boolean },
      );
      setLikeStatus(initialLikeStatus);
    }
  }, [allRequests]);

  const { trigger: likeIncrement } = useRequestMutation(API["like-inc"], {
    method: "POST",
  });
  const { trigger: likeDelete } = useRequestMutation(API["delete_like"], {
    method: "DELETE",
  });

  const clickedLikeHandle = async (requestId: number) => {
    const isLiked = likeStatus[requestId];
    setLikeStatus((prevState) => ({
      ...prevState,
      [requestId]: !prevState[requestId],
    }));

    try {
      if (isLiked) {
        await likeDelete({
          params: { requestId },
        });
        setLikeCounts((prevState) => ({
          ...prevState,
          [requestId]: prevState[requestId] - 1,
        }));
      } else {
        await likeIncrement({
          params: { requestId },
        });
        setLikeCounts((prevState) => ({
          ...prevState,
          [requestId]: prevState[requestId] + 1,
        }));
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const { filterDatasByZustand } = useFilterStore();
  const { searchDatas } = useSearchStore();
  const dataToMap: RequestsDataType[] =
    filterDatasByZustand || searchDatas || requestsData;

  const handleStatusPopUpOpen = (requestId: number) => {
    setStatusPopUpOpen((prevState) => ({
      ...prevState,
      [requestId]: true,
    }));
  };

  const handleStatusPopUpClose = (requestId: number) => {
    setStatusPopUpOpen((prevState) => ({
      ...prevState,
      [requestId]: false,
    }));
  };

  const { trigger: updateStatusTrigger } = useRequestMutation(
    API["update-status"],
    {
      method: "PATCH",
    },
  );

  const handleStatusChange = async (requestId: number, status: string) => {
    try {
      await updateStatusTrigger({
        dynamicValue: requestId,
        params: {
          status: status === "Həll edildi" ? "Həlledildi" : status,
        },
      });
      setRequestsData((prevState) =>
        prevState.map((request) =>
          request.requestId === requestId ? { ...request, status } : request,
        ),
      );
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-col gap-8 py-6">
      <RequestsFilter />
      <div
        className="max-w-[70%] ml-8 flex flex-col gap-6 h-[800px]"
        id="parentScrollBarOrganization"
      >
        <InfiniteScroll
          dataLength={requestsData.length}
          next={() => fetchData()}
          hasMore={hasMore}
          loader={<h4 className="text-center text-lg text-gray">Loading...</h4>}
          refreshFunction={() => fetchData(true)}
          pullDownToRefresh
          scrollableTarget="parentScrollBarOrganization"
        >
          <div className="flex flex-col gap-6">
            {dataToMap &&
              dataToMap.map((item: RequestsDataType) => {
                const { svgFill, bgColor } = getStatusStyles(item.status);

                return (
                  <div
                    key={item.requestId}
                    className="rounded-xl  bg-white px-4 py-4 flex flex-col gap-4"
                    style={{
                      borderColor: bgColor,
                      borderLeftWidth: "8px",
                    }}
                  >
                    <div className="w-full flex justify-between items-center">
                      <div className="flex flex-col gap-2 items-start">
                        <div className="flex gap-1 items-center">
                          <Image
                            src={NameIcon}
                            alt="icon"
                            width={24}
                            height={24}
                          />
                          <span className="text-blue-primary text-xs">
                            {item.fullName}
                          </span>
                        </div>
                        <span className="text-surface-secondary text-sm font-medium">
                          ID:{item.requestId}
                        </span>
                      </div>
                      <h6 className="text-sm font-medium">
                        {item.organizationName}
                      </h6>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <div
                          className="flex px-5 py-2 gap-2 rounded-[100px] items-center"
                          style={{ backgroundColor: bgColor }}
                        >
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill={svgFill}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="4" cy="4" r="4" />
                          </svg>
                          <span
                            className="text-text-gray text-xxs"
                            style={{ color: svgFill }}
                          >
                            {item.status}
                          </span>
                        </div>
                        <div className="px-4 py-2 bg-gray-disabled rounded-[100px]">
                          <span className="text-text-gray text-xxs">
                            {item.category.categoryName}
                          </span>
                        </div>
                      </div>
                      <p className="text-parag-gray text-sm font-medium text-wrap">
                        {item.description}
                      </p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <Image src={LocationIcon} alt="location" />
                        <span className="text-blue-primary text-sm">
                          {item.address}
                        </span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Image src={CalendarIcon} alt="calendar" />
                        <span>{item.createDate}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <StatusPopUp
                        open={statusPopUpOpen[item.requestId] || false}
                        onOpen={() => handleStatusPopUpOpen(item.requestId)}
                        onClose={() => handleStatusPopUpClose(item.requestId)}
                        onStatusChange={(status) =>
                          handleStatusChange(item.requestId, status)
                        }
                      />
                      <div className="flex gap-6 items-center">
                        <div className="flex flex-col gap-1 items-center">
                          <button
                            onClick={() => clickedLikeHandle(item.requestId)}
                          >
                            <Image
                              src={
                                likeStatus[item.requestId]
                                  ? ClickedLikeIcon
                                  : LikeIcon
                              }
                              alt="like"
                              width={20}
                              height={20}
                            />
                          </button>
                          <span>{likeCounts[item.requestId]}</span>
                        </div>
                        <div className="flex flex-col gap-1 items-center">
                          <button onClick={() => commentHandle(item.requestId)}>
                            <Image
                              src={
                                commentVisibility[item.requestId]
                                  ? ClickedCommentIcon
                                  : CommentIcon
                              }
                              alt="comment"
                              width={20}
                              height={20}
                            />
                          </button>
                          <span>{item.commentCount}</span>
                        </div>
                      </div>
                    </div>
                    {commentVisibility[item.requestId] ? (
                      <CommentSection itemId={item.requestId} />
                    ) : null}
                  </div>
                );
              })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}
