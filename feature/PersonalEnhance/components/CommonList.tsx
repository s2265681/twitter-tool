import React from "react";
import MyLoadingSvg from "react:./loading.svg";
import Filters from "./Filters";
import List from "./List";
import Tooltip from "./Tooltip";

export default ({ filters, dataSource, setParams, loading, setPageNo }) => {
  const avatarArr = [
    {
      title: "@Rockshang",
      src: "https://d149xzut2sq6e3.cloudfront.net/upload/d10b52d9.png",
    },
    {
      title: "@A18n",
      src: "https://d149xzut2sq6e3.cloudfront.net/upload/6fb8b426.png",
    },
    {
      title: "@dhDUDDUh_djfudhiuafhvui",
      src: "https://d149xzut2sq6e3.cloudfront.net/upload/76d207b8.png",
    },
  ];

  const cursor = dataSource?.cursor || 1;
  const total = dataSource?.total;
  let newData = Array.isArray(dataSource)
    ? dataSource
    : dataSource?.user_info_list || [];

  newData = newData.filter((el) => el.id !== "");
  console.log(newData, "newData...");

  return (
    <div className="" id="xxx">
      {/* <div className="p-4 m-3 flex items-center relative left-[100px]">
        {avatarArr.map((item, index) => {
          return (
            <div className="" key={item.title}>
              <Tooltip title={item.title}>
                <img
                  className={`avatar relative z-[${avatarArr.length - index}]`}
                  src={item.src}
                  style={{
                    left: -index * 8 + "px",
                  }}
                ></img>
              </Tooltip>
            </div>
          );
        })}
      </div> */}

      <Filters
        filters={filters}
        setParams={setParams}
        loading={loading}
      ></Filters>
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
