"use client";
import { ProfileAvatar, UpArrow } from "@/assets/imgs";
import API from "@/http/api";
import { useRequestMutation } from "@/http/request";
import { Divider } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";

export default function CommentSection({ itemId }: any) {
  const [commentValue, setCommentValue] = useState("");
  const [commentsDatas, setAllComments] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const { data: allComments, trigger: getCommentsTrigger } = useRequestMutation(
    API.organization_comments,
    {
      method: "GET",
    },
  );
  const { trigger: commentSend, data: response } = useRequestMutation(
    API.create_comment,
    {
      method: "POST",
    },
  );

  const fetchData = async (reset = false) => {
    const currentPage = reset ? 0 : page;
    const response = await getCommentsTrigger({
      dynamicValue: itemId,
      params: { page: currentPage, size: 10 },
    });
    const fetchedData = response?.data ?? [];

    if (reset) {
      setAllComments(fetchedData);
    } else {
      setAllComments((prev) => [...prev, ...fetchedData]);
    }

    setHasMore(fetchedData.length === 10);
    setPage(currentPage + 1);
  };

  const commentHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await commentSend({
        body: {
          commentText: commentValue,
        },
        params: {
          requestId: itemId,
        },
      });
      setCommentValue("");
      setPage(0);
      await fetchData(true);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchData(true);
  }, [itemId]);

  const getHeightClass = () => {
    if (commentsDatas.length === 0) return "h-30";
    if (commentsDatas.length < 3) return "h-50";
    return "h-90";
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="w-full text-center text-blue-primary text-md">Şərhlər</h1>
      <Divider />
      <div
        className={`${getHeightClass()} flex flex-col gap-7 overflow-auto scrollbar-hide`}
        id="parentScrollBarOrganization"
      >
        <InfiniteScroll
          dataLength={commentsDatas?.length}
          next={() => fetchData()}
          hasMore={hasMore}
          loader={<h4 className="text-center text-lg text-gray">Loading...</h4>}
          refreshFunction={() => fetchData(true)}
          pullDownToRefresh
          scrollableTarget="parentScrollBarOrganization"
        >
          {commentsDatas &&
            commentsDatas.map((comment: any) => (
              <div key={comment.commentId} className="flex flex-col gap-5">
                <div className="w-full flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Image src={ProfileAvatar} alt="avatar-icon" />
                    <span className="text-xs text-blue-primary font-semibold">
                      {comment.fullName || comment.authority}
                    </span>
                  </div>
                  <span className="text-surface-secondary text-sm-text">
                    {comment.createDate}
                  </span>
                </div>
                <p className="text-parag-gray text-md">{comment.commentText}</p>
                <Divider />
              </div>
            ))}
        </InfiniteScroll>
        <form
          className="flex items-center justify-between"
          onSubmit={commentHandler}
        >
          <input
            type="text"
            placeholder="Şərh yazın"
            className="w-[91%] bg-primary-container h-[50px] rounded-3xl border-[0.5px] focus:outline-none border-container-outline px-3 py-5 placeholder-bl-secondary placeholder:text-md placeholder:font-medium"
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          />
          <button className="w-11 h-11 rounded-[100px] bg-blue-primary flex justify-center items-center">
            <Image src={UpArrow} alt="arrow-up" />
          </button>
        </form>
      </div>
    </div>
  );
}
