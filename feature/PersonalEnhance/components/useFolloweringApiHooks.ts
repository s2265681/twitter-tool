import { useEffect, useState } from "react";
import { get_filter_info } from "../api";
import { senChomeMessage, handleFilterObj, getUserName } from "~utils";

export const useFolloweringApiHooks = ({ isCanRender }) => {
  const type = "following";
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
    if (!isCanRender) return;
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
  }, [isCanRender]);

  useEffect(() => {
    if (!isCanRender) return;
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
    setParams({ ...params, first: true });
  }, [pageNo, forceUpdate, isCanRender]);

  useEffect(() => {
    if (!isCanRender) return;
    if (params["first"]) {
      setPageNo(1);
      setForceUpdate(new Date().getTime());
    }
  }, [
    params["followers"],
    params["created_at"],
    params["following"],
    params["text"],
    isCanRender,
  ]);

  return {
    filters,
    dataSource,
    setParams,
    loading,
    setPageNo,
  };
};
