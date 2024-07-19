"use client";
import Image from "next/image";

export default function CommentSection() {
  const arr = [1, 2, 3];
  return (
    <>
      {arr.map((_, index) => {
        return (
          <div key={index}>
            <div className="flex w-full justify-between items-center">
              <div className="flex items-center gap-2">
                <Image src={""} alt="avatar" />
                <span>Nasib Babazade</span>
              </div>
              <div>10.12.2024</div>
            </div>
            <p></p>
          </div>
        );
      })}
    </>
  );
}
