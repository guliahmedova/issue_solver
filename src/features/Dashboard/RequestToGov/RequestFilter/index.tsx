import { FilterIcon } from "@/assets/imgs";
import CustomSelect from "@/features/common/CustomSelect";
import Image from "next/image";

export default function RequestFilter() {
  return (
    <div className="mx-8 flex justify-between items-center ">
      <div className="w-10 h-10 flex justify-center items-center">
        <Image src={FilterIcon} alt="filter" width={27} height={18} />
      </div>
      <CustomSelect />
      <CustomSelect />
      <CustomSelect />
    </div>
  );
}
