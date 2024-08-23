import { useEffect, useState } from "react";
import { senChomeMessage, handleFilterObj, getUserName } from "~utils";
import { message } from "antd";

export const useFollowYouMayWant = ({ isCanRender }) => {
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [params, setParams] = useState({});
  const [forceUpdate, setForceUpdate] = useState(new Date().getTime());

  const [dataSource, setDataSource] = useState<[]>([]);

  useEffect(() => {
    if (!isCanRender) return;

    if (pageNo === 1) {
      setLoading(true);
    }

    let timer =   setTimeout(()=>{
      if(loading ){
        setDataSource([]);
        setLoading(false);
      }
    },8000)

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
        clearTimeout(timer)
        const is_success = res.is_success;
        const msg = res.message;
        if (is_success === false) {
          // message.error(msg);
          return setLoading(false);
        }
        const data = res.data || [];
        setDataSource(data);
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
