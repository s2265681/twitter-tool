import React from "react";
import List from "../List";
import MyLoadingSvg from "react:../loading.svg";

export default ({ recentFollowingParams }) => {
  return (
    <div className="w-full p-3">
      <RecentList  {...recentFollowingParams}></RecentList>
    </div>
  );
};

const RecentList = ({ dataSource, loading, setPageNo }) => {
  const cursor = dataSource?.cursor || 1;
  const total = dataSource?.total;
  let newData = Array.isArray(dataSource)
    ? dataSource
    : dataSource?.user_info_list || [];
  newData = newData.filter((el) => el.id !== "");
  return (
    <div className="" id="xxx">
      {loading && (
        <div className="flex w-full h-[100px] justify-center items-center">
          <MyLoadingSvg className="animate-spin"></MyLoadingSvg>
        </div>
      )}
      {!loading && newData.length > 0 && (
        <List
          cursor={cursor}
          total={total}
          dataSource={newData}
          setPageNo={setPageNo}
        ></List>
      )}
      {!loading && newData?.length === 0 && (
        <div className="text-center font-extrabold text_theme_text text-[31px]">
          No Data
        </div>
      )}
    </div>
  );
};
