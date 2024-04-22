import React from "react";
import Filters from "./Filters";
import List from "./List";
import { mockListData } from "../config";
import { useApiHooks } from "../useApiHooks";

export default ({ filters, dataSource }) => {
  return (
    <div className="" id="xxx">
      <Filters filters={filters}></Filters>
      <List dataSource={dataSource}></List>
    </div>
  );
};
