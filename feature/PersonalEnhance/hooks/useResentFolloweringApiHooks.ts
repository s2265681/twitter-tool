import { useEffect, useState } from "react";
import { senChomeMessage, getUserName } from "~utils";
import { message } from "antd";

export const useResentFolloweringApiHooks = ({ isCanRender }) => {
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);

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
    setLoading(true);
    senChomeMessage({
      action: "get_user_recent_friends",
      params: {
        screen_name: getUserName() || "ethereum",
      },
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
          // message.error(msg);
          return setLoading(false);
        }
        const data = res.data || {};
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
  }, [pageNo, isCanRender]);

  return {
    dataSource,
    loading,
    setPageNo,
  };
};
