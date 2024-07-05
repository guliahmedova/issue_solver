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
import { Divider } from "@mui/material";
import Image from "next/image";

export default function ApplyCard() {
  return (
    <div className="bg-white flex flex-col gap-6 px-4  py-4 rounded-xl border-l-8 border-warning">
      <div className="w-full flex justify-between items-center ">
        <div className="flex flex-col gap-2 items-start">
          <div className="flex gap-1 items-center">
            <Image src={NameIcon} alt="icon" width={24} height={24} />
            <span className="text-blue-primary text-xs">Nəsib Babazadə</span>
          </div>
          <span className="text-surface-secondary text-sm font-medium">ID:65420</span>
        </div>
        <h6 className="text-sm font-medium">Daxili İşlər Nazirliyi</h6>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex px-5 py-2 gap-2 bg-gray-disabled rounded-[100px]">
            <Image src={StatusIcon} alt="status icon" width={8} height={8} />
            <span className="text-text-gray text-xxs">Arxivdədir</span>
          </div>
          <div className="px-4 py-2  bg-gray-disabled rounded-[100px]">
            <span className="text-text-gray text-xxs">Küçə heyvanlarına qarşı zorbalıq</span>
          </div>
        </div>
        <p className="text-parag-gray text-sm font-medium">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s.
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src={LocationIcon} alt="location" width={20} height={20} />
          <span className="text-sm-alt text-blue-primary">Location</span>
        </div>
        <div className="flex gap-2">
          <Image src={CalendarIcon} alt="calendar" width={20} height={20} />
          <span className="text-sm-alt ">01.08.2024, 14:30</span>
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
            <span>723</span>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <button>
              <Image src={CommentIcon} alt="comment" width={20} height={20} />
            </button>
            <span>723</span>
          </div>
        </div>
      </div>
    </div>
  );
}
