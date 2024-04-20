import React from "react";
import Filters from "./Filters";
import List from "./List";
import { mockListData } from "../config";

export default () => {
  return (
    <div className="" id="xxx">
      <Filters></Filters>
      <List dataSource={mockListData}></List>
    </div>
  );
};
