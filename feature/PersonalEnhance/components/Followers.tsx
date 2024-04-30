import React from "react";
import CommonList from "./CommonList";

export default ({ followersParams }) => {
  const { filters, dataSource, setParams, loading, setPageNo } =
    followersParams;
  return (
    <div className="w-full">
      <CommonList
        setPageNo={setPageNo}
        filters={filters}
        setParams={setParams}
        dataSource={dataSource}
        loading={loading}
      ></CommonList>
    </div>
  );
};
