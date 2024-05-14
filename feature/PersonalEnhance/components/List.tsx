import React, { useEffect } from "react";
import Tooltip from "./Tooltip";
import { parseHtml } from "~utils";

export default ({ dataSource, setPageNo }) => {
  const data = Array.isArray(dataSource)
    ? dataSource
    : Array.isArray(dataSource?.user_info_list)
      ? dataSource?.user_info_list
      : dataSource?.user_info_list.user_info_list || [];
  const cursor = dataSource?.cursor || 1;
  const total = dataSource?.total;
  const loadMore = data.length < total;
  useEffect(() => {
    const reload_page = document.querySelector("#reload_page");
    if (!reload_page) return;
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio <= 0) return;
      if (loadMore) {
        setPageNo(cursor + 1);
      }
    });
    // 开始监听
    intersectionObserver.observe(document.querySelector("#reload_page"));
    return () => {
      if (reload_page) {
        intersectionObserver.unobserve(reload_page);
      }
    };
  }, [cursor]);

  const handleContainerClick = (event) => {
    // 检查点击的目标是否为<a>标签
    if (event.target.tagName === "A") {
      // 执行你想要的操作，比如阻止事件冒泡
      event.stopPropagation();
    }
  };

  if (!data.length) return null;
  return (
    <div className="relative pb-[30px]">
      {data?.map((item, index) => {
        return (
          <div
            className="cursor-pointer py-3 hover:bg-[#00000008] flex gap-2 items-start px-4  transform transition duration-200 overflow-hidden"
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
            <div className="flex flex-col gap-1 relative">
              <div className=" font-semibold text_theme_text">{item.name}</div>
              <div className="text_theme_subText">@{item.screen_name}</div>
              <div
                className="text_theme_text"
                dangerouslySetInnerHTML={{
                  __html: parseHtml(item.description),
                }}
                onClick={handleContainerClick}
              ></div>
              <div className="absolute top-3 right-3 flex">
                {item?.following_screen_name_list &&
                  item?.following_screen_name_list.map((nameitem, index) => {
                    return (
                      <div className="" key={nameitem.name}>
                        <Tooltip title={nameitem.name}>
                          <img
                            className={`avatar relative z-[${item?.following_screen_name_list.length - index}]`}
                            src={nameitem.profile_image_url_https}
                            style={{
                              left: -index * 8 + "px",
                            }}
                            onClick={() => {
                              window.open(
                                location.origin + "/" + nameitem.screen_name,
                                "_blank"
                              );
                            }}
                          ></img>
                        </Tooltip>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        );
      })}
      {loadMore && (
        <div
          className="text_theme_text w-full absolute bottom-0 left-0 text-center  pb-4"
          id="reload_page"
        >
          {/* load more... */}
        </div>
      )}
    </div>
  );
};
