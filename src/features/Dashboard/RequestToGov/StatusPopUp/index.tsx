"use client";
import { Button } from "@/features/common";
import { Modal } from "@mui/material";
import { useState } from "react";

const mockData = [
  {
    status: "Həll edildi",
    text: "Həll edildi",
  },
  {
    status: "Gözləmədə",
    text: "Gözləmədə",
  },
  {
    status: "Əsassızdır",
    text: "Əsassızdır",
  },
  {
    status: "Baxılır",
    text: "Baxılır",
  },
  {
    status: "Arxivdədir",
    text: "Arxivdədir",
  },
];

export const getStatusStyles = (status: string) => {
  switch (status) {
    case "Həll edildi":
      return {
        svgFill: "#429A60",
        bgColor: "#DDF1E4",
      };
    case "Gözləmədə":
      return {
        svgFill: "#0169FE",
        bgColor: "#2981FF47",
      };
    case "Əsassızdır":
      return {
        svgFill: "#EB2614",
        bgColor: "#FDCBD2",
      };
    case "Baxılır":
      return {
        svgFill: "#E67B2E",
        bgColor: "#FDEBDE",
      };
    case "Arxivdədir":
      return {
        svgFill: "#8C8C8C",
        bgColor: "#F0F0F0",
      };
    default:
      return {
        svgFill: "fill-gray-500",
        bgColor: "bg-gray-100",
      };
  }
};

interface StatusPopUpProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onStatusChange: (status: string) => void;
}

export default function StatusPopUp({
  open,
  onOpen,
  onClose,
  onStatusChange,
}: StatusPopUpProps): JSX.Element {
  const [radioValue, setRadioValue] = useState("");

  const statusHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onStatusChange(radioValue);
    onClose();
  };

  return (
    <>
      <Button variant="text" showIcon className="max-w-[20%]" onClick={onOpen}>
        Statusu dəyiş
      </Button>
      <Modal open={open} onClose={onClose}>
        <div
          className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 bg-black/20 flex items-center justify-center z-[60]"
          onClick={onClose}
        >
          <form
            className="flex flex-col gap-5 items-start w-[280px] border-none bg-white px-4 py-5 rounded-2xl relative"
            onSubmit={statusHandler}
            onClick={e => e.stopPropagation()}
          >
            {mockData.map((item, index) => {
              const { svgFill, bgColor } = getStatusStyles(item.status);
              return (
                <div className="flex gap-2 items-center" key={index}>
                  <input
                    type="radio"
                    name="status"
                    id={item.status}
                    className="w-5 h-5"
                    value={item.status}
                    checked={radioValue === item.status}
                    onChange={e => setRadioValue(e.target.value)}
                  />
                  <div
                    className={`flex gap-2 items-center py-2 px-5 rounded-[100px]`}
                    style={{ background: `${bgColor}` }}
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
                    <label
                      htmlFor={item.status}
                      className="text-md text-nowrap"
                      style={{ color: `${svgFill}` }}
                    >
                      {item.text}
                    </label>
                  </div>
                </div>
              );
            })}
            <div className="w-full flex justify-center">
              <button className="bg-blue-secondary text-white py-3 px-5 rounded-lg  hover:cursor-pointer hover:bg-blue-primary transition-all ease-linear">
                Yadda saxla
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
