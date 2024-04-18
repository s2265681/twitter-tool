import React from "react";
import Filters from "./Filters";

const mockListData = {
  list: [
    {
      image:
        "https://pbs.twimg.com/profile_images/1484544141904457732/C7VBlmXJ_reasonably_small.jpg",
      name: "XCaptain",
      sceen_name: "@XCaptaincc",
      description:
        "推上发言只代表个人观点 kepp real/デジタル爱好者/メーカー/Developer/日本语/",
    },
    {
      image:
        "https://pbs.twimg.com/profile_images/1758076307181826049/C8g29_EW_normal.jpg",
      name: "XCaptain",
      sceen_name: "@XCaptaincc",
      description:
        "推上发言只代表个人观点 kepp real/デジタル爱好者/メーカー/Developer/日本语/",
    },
    {
      image:
        "https://pbs.twimg.com/profile_images/1758076307181826049/C8g29_EW_normal.jpg",
      name: "XCaptain",
      sceen_name: "@XCaptaincc",
      description:
        "推上发言只代表个人观点 kepp real/デジタル爱好者/メーカー/Developer/日本语/",
    },
  ],
  pageIndex: 1,
  pageSize: 50,
};

const List = () => {
  return (
    <div>
      {mockListData.list.map((item, index) => {
        return (
          <div
            className="cursor-pointer py-3 px-4 hover:bg-[#00000008] flex gap-2 items-start border-solid border-[#00000008] border-[1px]"
            key={index}
          >
            <img
              src={item.image}
              className="w-[40px] h-[40px] rounded-full"
            ></img>
            <div className="flex flex-col gap-1">
              <div className=" font-semibold text-theme_text">{item.name}</div>
              <div className="text-[rgb(83,100,113)]">{item.sceen_name}</div>
              <div className="text-theme_text">{item.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default () => {
  return (
    <div className="" id="xxx">
      <Filters></Filters>
      <List></List>
    </div>
  );
};
