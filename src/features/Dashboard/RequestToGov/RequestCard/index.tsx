"use client";
import {
  CalendarIcon,
  CommentIcon,
  LikeIcon,
  LocationIcon,
  NameIcon,
  StatusIcon,
  ClickedLikeIcon,
  ClickedCommentIcon,
} from "@/assets/imgs";
import { Button } from "@/features/common";
import API from "@/http/api";
import { useRequest } from "@/http/request";
import { Divider } from "@mui/material";
import Image from "next/image";
import { Fragment, useState } from "react";
import CommentSection from "../CommentSection";
type requestsDataType = {
  requestId: number;
  fullName: string;
  address: string;
  status: string;
  organizationName: string;
  createDate: string;
  commentCount: number;
  likeCount: number;
  likeSuccess: false;
  category: any;
  description: string;
};
const getStatusColor = (status: string) => {
  switch (status) {
    case "Gözləmədə":
      return "#8C8C8C";
    case "Əsassızdır":
      return "#EB2614";
    case "Baxılır":
      return "#E67B2E";
    default:
      return "#429A60";
  }
};
export default function ApplyCard() {
  const [commentVisibility, setCommentVisibility] = useState<{ [key: number]: boolean }>({});
  const [clickedLike, setClickedLike] = useState(false);
  const [clickedComment, setClickedComment] = useState(false);
  const clickedLikeHandle = () => {
    setClickedLike(clickedLike ? false : true);
  };
  const commentHandle = (requestId: number) => {
    setClickedComment(clickedComment ? false : true);
    setCommentVisibility(prevState => ({
      ...prevState,
      [requestId]: !prevState[requestId],
    }));
  };

  const { isLoading, data } = useRequest(API.organization_requests_all, { method: "GET" });
  const requestsData: requestsDataType[] = data?.data;
  // const likeHandler = (e: any) => {
  //   console.log(e.target.src);
  //   e.target.src = "C:Users\nasib.babazadeDesktopIDDA Project 1srcassetsimgsclickLike.svg";
  // };

  return (
    <div className=" flex flex-col gap-6  ">
      {requestsData &&
        requestsData.map(item => {
          return (
            <div
              key={item.requestId}
              className="rounded-xl border-l-8 border-warning bg-white px-4  py-4 flex flex-col gap-4"
            >
              <div className="w-full flex justify-between items-center ">
                <div className="flex flex-col gap-2 items-start">
                  <div className="flex gap-1 items-center">
                    <Image src={NameIcon} alt="icon" width={24} height={24} />
                    <span className="text-blue-primary text-xs">{item.fullName}</span>
                  </div>
                  <span className="text-surface-secondary text-sm font-medium">
                    ID:{item.requestId}
                  </span>
                </div>
                <h6 className="text-sm font-medium">{item.organizationName}</h6>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex px-5 py-2 gap-2 bg-gray-disabled rounded-[100px]">
                    <div className="flex items-center gap-2">
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="4" cy="4" r="4" fill="#8C8C8C" />
                      </svg>
                      <span className="text-text-gray text-xxs">{item.status}</span>
                    </div>
                  </div>
                  <div className="px-4 py-2  bg-gray-disabled rounded-[100px]">
                    <span className="text-text-gray text-xxs">{item.category.categoryName}</span>
                  </div>
                </div>
                <p className="text-parag-gray text-sm font-medium">{item.description}</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Image src={LocationIcon} alt="location" width={20} height={20} />
                  <span className="text-sm-alt text-blue-primary">{item.address}</span>
                </div>
                <div className="flex gap-2">
                  <Image src={CalendarIcon} alt="calendar" width={20} height={20} />
                  <span className="text-sm-alt ">{item.createDate}</span>
                </div>
              </div>
              <Divider />
              <div className="flex justify-between items-center">
                <Button variant="text" showIcon className="max-w-[20%] ">
                  Statusu dəyiş
                </Button>
                <div className="flex gap-6 items-center">
                  <div className="flex flex-col gap-1 items-center">
                    <button onClick={clickedLikeHandle}>
                      <Image
                        src={!clickedLike ? LikeIcon : ClickedLikeIcon}
                        alt="like"
                        width={20}
                        height={20}
                      />
                    </button>
                    <span>{item.likeCount}</span>
                  </div>
                  <div className="flex flex-col gap-1 items-center">
                    <button onClick={() => commentHandle(item.requestId)}>
                      <Image
                        src={!clickedComment ? CommentIcon : ClickedCommentIcon}
                        alt="comment"
                        width={20}
                        height={20}
                      />
                    </button>
                    <span>{item.commentCount}</span>
                  </div>
                </div>
              </div>
              {commentVisibility[item.requestId] ? <CommentSection itemId={item.requestId} /> : ""}
            </div>
          );
        })}
    </div>
  );
}
