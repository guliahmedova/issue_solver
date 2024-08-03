"use client";
import { CloseButton, FilterIcon } from "@/assets/imgs";
import CustomSelect from "@/features/common/CustomSelect";
import API from "@/http/api";
import { useRequest, useRequestMutation } from "@/http/request";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { useFilterStore } from "@/state/useFilterStore";

export default function RequestsFilter() {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [filterEnable, setFilterEnable] = useState(true);
  const { data: response } = useRequest(API.all_category);
  const categoryNames = response?.data || [];
  const statusOptions = [
    { id: 1, value: "Gözləmədə", name: "Gözləmədə" },
    { id: 2, value: "Baxılır", name: "Baxılır" },
    { id: 3, value: "Əsassızdır", name: "Əsassızdır" },
    { id: 4, value: "Həlledildi", name: "Həlledildi" },
    { id: 5, value: "Arxivdədir", name: "Arxivdədir" },
  ];
  const timePeriodOptions = [
    { id: 1, value: "Son bir gün", name: "Son bir gün" },
    { id: 2, value: "Son bir həftə", name: "Son bir həftə" },
    { id: 3, value: "Son bir ay", name: "Son bir ay" },
  ];
  const { trigger: filterTrigger } = useRequestMutation(API.filter_requests, {
    method: "GET",
  });

  const { setfilterDatasByZustand } = useFilterStore();

  const handleFilterRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setFilterEnable((prev) => !prev);
    try {
      const result = await filterTrigger({
        params: {
          status: status,
          categoryName: category,
          timePeriodId: timePeriod,
          page: 0,
          size: 10,
        },
      });
      setfilterDatasByZustand(result?.data);
      console.log(result?.data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const deleteFilterDatas = (e: React.FormEvent) => {
    e.preventDefault();
    setFilterEnable((prev) => !prev);
    setfilterDatasByZustand(undefined);
    setCategory("");
    setStatus("");
    setTimePeriod("");
  };

  return (
    <form className="mx-8 flex justify-between items-center">
      <CustomSelect
        defaultOption="Kateqoriya"
        fn={categoryNames}
        optionValue={category}
        optionVariable="categoryName"
        handleChange={(e: any) => setCategory(e.target.value)}
      />
      <CustomSelect
        defaultOption="Status"
        fn={statusOptions}
        optionValue="value"
        optionVariable="name"
        handleChange={(e: any) => setStatus(e.target.value)}
      />
      <CustomSelect
        defaultOption="Müddət"
        fn={timePeriodOptions}
        optionValue="value"
        optionVariable="name"
        handleChange={(e: any) => setTimePeriod(e.target.value)}
      />
      <button
        className="w-10 h-10 flex justify-center items-center disabled:opacity-[40%]"
        onClick={handleFilterRequest}
        disabled={!filterEnable}
      >
        <Image src={FilterIcon} alt="filter" />
      </button>
      <button
        className="w-10 h-10 flex justify-center items-center disabled:opacity-[40%]"
        onClick={deleteFilterDatas}
        disabled={filterEnable}
      >
        <Image src={CloseButton} alt="filter" />
      </button>
    </form>
  );
}
