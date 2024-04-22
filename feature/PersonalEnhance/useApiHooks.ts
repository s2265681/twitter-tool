import { useEffect, useState } from "react";
import { get_filter_info } from "./api";
import { senChomeMessage, handleFilterObj, getUserName } from "~utils";

export const useApiHooks = ({ type }: { type: "followers" | "following" }) => {
  const [filters, setFilters] = useState<{
    [key: string]: { label: string; key: string; rightValue: string }[];
  }>({
    created_at: [],
    followering: [],
    followers: [],
  });

  const [dataSource, setDataSource] = useState<{
    user_info_list: [];
    cursor: number;
    total: number;
  }>({
    user_info_list: [],
    cursor: 1,
    total: 0,
  });

  useEffect(() => {
    senChomeMessage({
      action: "get_filter_info",
      params: {
        screen_name: getUserName() || "ethereum",
        follow_category: type,
      },
      response: ({ data }) => {
        const newFilters = {};
        const { created_at, followers, followering } = data;
        newFilters["created_at"] = handleFilterObj(created_at);
        newFilters["followers"] = handleFilterObj(followers);
        newFilters["following"] = handleFilterObj(followering);
        setFilters(newFilters);
      },
    });
  }, []);

  useEffect(() => {
    senChomeMessage({
      action: "get_user_info_list",
      params: {
        screen_name: "ethereum",
        follow_category: "followers",
        created_at: "2017",
        followers_count: "1k-10k",
        following_count: "1k-10k",
        cursor: 1,
      },
      response: ({ data }) => {
        setDataSource(data || []);
      },
    });
  }, []);

  return {
    filters,
    dataSource,
  };
};
