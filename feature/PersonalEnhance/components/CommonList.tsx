import React from "react";
import MyLoadingSvg from "react:./loading.svg";
import Filters from "./Filters";
import List from "./List";

export default ({ filters, dataSource, setParams, loading, setPageNo }) => {
  return (
    <div className="" id="xxx">
      <Filters filters={filters} setParams={setParams}></Filters>
      {loading && (
        <div className="flex w-full h-[100px] justify-center items-center">
          <MyLoadingSvg className="animate-spin"></MyLoadingSvg>
        </div>
      )}
      {!loading && <List dataSource={dataSource} setPageNo={setPageNo}></List>}
      {!loading && dataSource?.user_info_list?.length === 0 && (
        <div className="text-center font-extrabold text-[31px]">No Data</div>
      )}
    </div>
  );
};
