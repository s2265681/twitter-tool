import React from "react";
import CommonList from "./CommonList";
import { useApiHooks } from "../useApiHooks";

export default () => {
  const { filters, dataSource, setParams, loading, setPageNo } = useApiHooks({
    type: "followers",
  });

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
