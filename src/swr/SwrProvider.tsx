"use client";
import { SWRConfig } from "swr";
import { defaultValues } from "./config";

export const SWRProvider = (props: any) => {
  return <SWRConfig value={defaultValues}>{props.children}</SWRConfig>;
};
