import { SelectDown } from "@/assets/imgs";
import Image from "next/image";

export default function CustomSelect({
  defaultOption,
  fn,
  optionVariable,
  optionValue,
  handleChange,
}: any) {
  return (
    <div className="w-[30%] flex justify-between relative">
      <select
        name="custom-select"
        id="custom-select"
        className="w-full py-3 px-4 bg-white rounded-[8px] hover:cursor-pointer text-xs text-surface-secondary"
        defaultValue={"DEFAULT"}
        onChange={handleChange}
      >
        <option value="DEFAULT" disabled hidden>
          {defaultOption}
        </option>
        {fn &&
          fn.map((item: any, index: number) => (
            <option key={index} value={item[optionValue]}>
              {item[optionVariable]}
            </option>
          ))}
      </select>
      <Image
        src={SelectDown}
        alt="arrow-down"
        className="absolute top-[50%] translate-y-[-50%] right-4"
      />
    </div>
  );
}