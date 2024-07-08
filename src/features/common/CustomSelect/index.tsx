import { SelectDown } from "@/assets/imgs";
import Image from "next/image";

const Options = [
  {
    id: 1,
    value: "DİN",
    abbr: "Daxili İşlər Nazirliyi",
  },
  {
    value: "DIN",
    abbr: "Daxili İşlər Nazirliyi",
  },
  {
    value: "DIN",
    abbr: "Daxili İşlər Nazirliyi",
  },
  {
    value: "DIN",
    abbr: "Daxili İşlər Nazirliyi",
  },
  {
    value: "DIN",
    abbr: "Daxili İşlər Nazirliyi",
  },
  {
    value: "DIN",
    abbr: "Daxili İşlər Nazirliyi",
  },
];

export default function CustomSelect() {
  return (
    <div className="w-[30%]  flex justify-between relative">
      <select
        name="government"
        id="government "
        className="w-full py-3 px-4 bg-white rounded-[8px] hover:cursor-pointer text-xs text-surface-secondary"
        defaultValue={"DEFAULT"}
      >
        <option value="DEFAULT" disabled hidden>
          Qurum
        </option>
        {Options.map((option, index) => {
          return (
            <option key={index} value={option.value} className="text-black">
              {option.abbr}
            </option>
          );
        })}
      </select>
      <Image
        src={SelectDown}
        alt="arrow-down "
        className="absolute top-[50%] translate-y-[-50%] right-4"
      />
    </div>
  );
}
