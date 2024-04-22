import React from "react";

export default ({ dataSource }) => {
  return (
    <div>
      {dataSource.user_info_list.map((item, index) => {
        return (
          <div
            className="cursor-pointer py-3 hover:bg-[#00000008] flex gap-2 items-start px-4  transform transition duration-200"
            key={index}
            onClick={() => {
              window.open(location.origin + "/" + item.screen_name, "_blank");
            }}
          >
            <div className="w-[40px] h-[40px] rounded-full flex-none">
              <img
                src={item.profile_image_url_https}
                className="w-[40px] h-[40px] rounded-full flex-none"
              ></img>
            </div>
            <div className="flex flex-col gap-1">
              <div className=" font-semibold text_theme_text">{item.name}</div>
              <div className="text_theme_subText">@{item.screen_name}</div>
              <div className="text_theme_text">{item.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
