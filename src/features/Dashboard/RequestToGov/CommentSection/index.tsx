"use client";
import { ProfileAvatar, UpArrow } from "@/assets/imgs";
import { Divider } from "@mui/material";
import Image from "next/image";

export default function CommentSection() {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="w-full text-center text-blue-primary text-md">Şərhlər</h1>
      <Divider />
      <div className="flex flex-col gap-3">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src={ProfileAvatar} alt="avatar-icon" />
            <span className="text-xs text-blue-primary font-semibold">Nəsib Babazadə</span>
          </div>
          <span className="text-surface-secondary text-sm-text">07.07.2024</span>
        </div>
        <p className="text-parag-gray text-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam fugiat, perspiciatis
          necessitatibus distinctio voluptatem maxime nihil tenetur reprehenderit obcaecati qui!
        </p>
      </div>
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Şərh yazın"
          className="w-[91%] bg-primary-container h-[50px] rounded-3xl border-[0.5px] focus:outline-none border-container-outline px-3 py-5 placeholder-bl-secondary placeholder:text-md placeholder:font-medium"
        />
        <button className="w-11 h-11 rounded-[100px] bg-blue-primary flex justify-center items-center ">
          <Image src={UpArrow} alt="arrow-up" />
        </button>
      </div>
    </div>
  );
}
