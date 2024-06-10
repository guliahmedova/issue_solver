"use client";
import API from "@/http/api";
import { useRequest } from "@/http/request";

export default function Home() {
  const { data, isLoading, error } = useRequest(API.todos + "/1");
  return <main className="w-full h-full flex items-center justify-center"></main>;
}
