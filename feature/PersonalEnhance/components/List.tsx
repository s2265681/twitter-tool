import React, { useEffect } from "react";

export default ({ dataSource, setPageNo }) => {
  const data = Array.isArray(dataSource?.user_info_list)
    ? dataSource?.user_info_list
    : dataSource?.user_info_list.user_info_list || [];
  const cursor = dataSource.cursor || 1;
  const total = dataSource.total;
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

  if (!data.length) return null;
  return (
    <div className="relative pb-[30px]">
      {data?.map((item, index) => {
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
      {loadMore && (
        <div
          className="w-full absolute bottom-0 left-0 text-center text-white pb-4"
          id="reload_page"
        >
          load more...
        </div>
      )}
    </div>
  );
};
