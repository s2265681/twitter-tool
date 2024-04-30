import React from "react";
import CommonList from "./CommonList";
import { useFolloweringApiHooks } from "./useFolloweringApiHooks";

export default ({ followeringParams }) => {
  const { filters, dataSource, setParams, loading, setPageNo } =
    followeringParams;
  return (
    <div className="w-full">
      <CommonList
        setPageNo={setPageNo}
        filters={filters}
        dataSource={dataSource}
        setParams={setParams}
        loading={loading}
      ></CommonList>
    </div>
  );
};
