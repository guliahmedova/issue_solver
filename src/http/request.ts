import { useAuthStore } from "@/state/useAuthStore";
import axios from "axios";
import useSWR from "swr";
import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  req => {
    const token = useAuthStore.getState().authData?.token;

    if (token) {
      req.headers["Authorization"] = `Bearer ${token}`;
    }
    return req;
  },
  error => {
    return Promise.reject(error);
  },
);

export const useRequest = (apiUrl: string, { method = "GET", headers: customHeaders = {}, ...rest } = {}, options = {}) => {
  const fetcher = () => {
    return axiosInstance({
      method,
      url: apiUrl,
      headers: {
        ...customHeaders
      },
      ...rest
    }).then(res => {
      return res?.data;
    });
  }

  const response = useSWR(apiUrl, fetcher, options)

  return { ...response };
}

export function useRequestMutation<Data = any, Error = any>(apiUrl: string, { method = 'GET', headers: customHeaders = {}, ...rest }, options?: SWRMutationConfiguration<Data, Error>) {

  const axiosOptions: any = {
    method,
    url: apiUrl,
    headers: {
      ...customHeaders
    },
    ...rest
  };

  const fetcher = (url: any, { arg }: any) => {
    if (arg.body) {
      axiosOptions.data = arg.body;
    }
    if (arg.params) {
      axiosOptions.params = arg.params;
    }
    return axiosInstance(axiosOptions).then(res => {
      return res?.data
    });
  };

  const { trigger, ...response } = useSWRMutation<Data, Error>(apiUrl, fetcher, options as any);
  return {
    trigger: (value: TTriggerArgs = {}, options?: SWRMutationConfiguration<any, any>) => {
      return trigger(value as any, options as any);
    },
    ...response,
  };
};

type TTriggerArgs = {
  body?: any;
  dynamicValue?: any;
  params?: any;
  cacheOnly?: boolean;
  paramsSerializer?: any;
};