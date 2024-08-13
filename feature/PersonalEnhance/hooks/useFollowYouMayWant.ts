import { useEffect, useState } from "react";
import { senChomeMessage, handleFilterObj, getUserName } from "~utils";
import { message } from "antd";

export const useFollowYouMayWant = ({ isCanRender }) => {
  const [loading, setLoading] = useState(true);
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

    if (pageNo === 1) {
      setLoading(true);
    }
    senChomeMessage({
      action: "get_friends_you_want",
      params: {
        screen_name: getUserName() || "ethereum"},
      response: ({
        data: res,
      }: {
        data: {
          data: any;
          is_success: boolean;
          message: string;
        };
      }) => {
        const is_success = res.is_success;
        const msg = res.message;
        if (is_success === false) {
          message.error(msg);
          return setLoading(false);
        }
        const data = res.data || {};
        console.log(data,'data....')
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
    params["interact_ids"],
    isCanRender,
  ]);

  return {
    dataSource,
    setParams,
    loading,
    setPageNo,
  };
};
