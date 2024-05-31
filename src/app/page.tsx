import API from "@/http/api";
import { useRequest } from "@/http/request";

export default function Home() {
  const { data, isLoading, error } = useRequest(API.todos + "/1");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
