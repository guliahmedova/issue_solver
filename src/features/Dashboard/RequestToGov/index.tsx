import ApplyCard from "./RequestCard";
import Filter from "./RequestFilter";

export default function RequestSection() {
  return (
    <div className="flex flex-col gap-8 py-6">
      <Filter />
      <div className="max-w-[70%] ml-8 flex flex-col gap-6">
        <ApplyCard />
        <ApplyCard />
        <ApplyCard />
        <ApplyCard />
      </div>
    </div>
  );
}
