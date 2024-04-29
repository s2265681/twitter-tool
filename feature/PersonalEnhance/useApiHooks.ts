import { useEffect, useState } from "react";
import { get_filter_info } from "./api";
import { senChomeMessage, handleFilterObj, getUserName } from "~utils";

export const useApiHooks = ({ type }: { type: "followers" | "following" }) => {
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<{
    [key: string]: { label: string; key: string; rightValue: string }[];
  }>({
    created_at: [],
    followering: [],
    followers: [],
  });
  const [pageNo, setPageNo] = useState(1);

  const [params, setParams] = useState({});
  const [forceUpdate, setForceUpdate] = useState(new Date().getTime());

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
  }, [type]);

  useEffect(() => {
    const searchParams = params["text"];
    if (pageNo === 1) {
      setLoading(true);
    }
    senChomeMessage({
      action: searchParams ? "get_search_user_info_list" : "get_user_info_list",
      params: {
        screen_name: getUserName() || "ethereum",
        cursor: pageNo || 1,
        follow_category: type,
        ...params,
      },
      response: ({ data }) => {
        setDataSource(
          pageNo === 1
            ? data
            : {
                user_info_list: [
                  ...dataSource.user_info_list,
                  ...data.user_info_list,
                ],
                cursor: data.cursor,
                total: data.total,
              }
        );
        setLoading(false);
      },
    });
  }, [pageNo, forceUpdate]);

  useEffect(() => {
    setPageNo(1);
    setForceUpdate(new Date().getTime());
  }, [
    type,
    params["followers"],
    params["created_at"],
    params["following"],
    params["text"],
  ]);

  return {
    filters,
    dataSource,
    setParams,
    loading,
    setPageNo,
  };
};
