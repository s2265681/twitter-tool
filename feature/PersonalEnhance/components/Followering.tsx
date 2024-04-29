import React from "react";
import CommonList from "./CommonList";
import { useApiHooks } from "../useApiHooks";

export default () => {
  const { filters, dataSource, setParams, loading, setPageNo } = useApiHooks({
    type: "following",
  });

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
