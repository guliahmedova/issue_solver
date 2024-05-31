import { useAuthStore } from "@/state/useAuthStore";
import axios from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

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

  return {...response};
}

export const useRequestMutation = (apiUrl: string, { method = "GET", headers: customHeaders = {}, ...rest }, options = {}) => {
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

  const response = useSWRMutation(apiUrl, fetcher, options)

  return {...response};
}