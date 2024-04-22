import React from "react";
import CommonList from "./CommonList";
import { useApiHooks } from "../useApiHooks";

export default () => {
  const { filters, dataSource } = useApiHooks({
    type: "followers",
  });

  return (
    <div className="w-full">
      <CommonList filters={filters} dataSource={dataSource}></CommonList>
    </div>
  );
};
