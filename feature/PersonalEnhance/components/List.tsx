import React from "react";

export default ({ dataSource }) => {
  return (
    <div>
      {dataSource.list.map((item, index) => {
        return (
          <div
            className="cursor-pointer py-3 hover:bg-[#00000008] flex gap-2 items-start"
            key={index}
          >
            <img
              src={item.image}
              className="w-[40px] h-[40px] rounded-full"
            ></img>
            <div className="flex flex-col gap-1">
              <div className=" font-semibold text_theme_text">{item.name}</div>
              <div className="text_theme_subText">{item.sceen_name}</div>
              <div className="text_theme_text">{item.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
