"use client";
import {
  CalendarIcon,
  CommentIcon,
  LikeIcon,
  LocationIcon,
  NameIcon,
  StatusIcon,
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
  adress: string;
  status: string;
  organizationName: string;
  createDate: string;
  commentCount: number;
  likeCount: number;
  likeSuccess: false;
  category: any;
  description: string;
};
export default function ApplyCard() {
  const [commentVisibilty, setCommentVisibilty] = useState(false);
  const commentHandle = () => {
    setCommentVisibilty(commentVisibilty === false ? true : false);
  };
  const { isLoading, data } = useRequest(API.organization_requests_all, { method: "GET" });
  const requestsData: requestsDataType[] = data?.data;
  return (
    <div className="bg-white flex flex-col gap-6 px-4  py-4 rounded-xl border-l-8 border-warning">
      {requestsData &&
        requestsData.map(item => {
          return (
            <Fragment key={item.requestId}>
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
                    <Image src={StatusIcon} alt="status icon" width={8} height={8} />
                    <span className="text-text-gray text-xxs">{item.status}</span>
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
                  <span className="text-sm-alt text-blue-primary">{item.adress}</span>
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
                    <button>
                      <Image src={LikeIcon} alt="like" width={20} height={20} />
                    </button>
                    <span>{item.likeCount}</span>
                  </div>
                  <div className="flex flex-col gap-1 items-center">
                    <button onClick={commentHandle}>
                      <Image src={CommentIcon} alt="comment" width={20} height={20} />
                    </button>
                    <span>{item.commentCount}</span>
                  </div>
                </div>
              </div>
              {commentVisibilty ? <CommentSection /> : ""}
            </Fragment>
          );
        })}
    </div>
  );
}
