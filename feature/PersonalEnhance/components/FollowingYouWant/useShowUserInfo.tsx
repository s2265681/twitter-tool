import { Tooltip } from "antd";
import React from "react";
import { useRef, useState } from "react";
import { parseHtml, unicodeToEmoji } from "~utils";
import './index.scss'


interface UserInfo {
  following_screen_name_list: any;
  description: string;
  screen_name: string;
  id: number;
  name: string;
  avatar: string;
  profile_image_url_https: string;
}

const useShowUserInfo = () => {
  const [showUserInfo, setShowUserInfo] = useState<{ userInfo: UserInfo | null }>({
    userInfo: null,
  })

  const handleContainerClick = (event) => {
    // 检查点击的目标是否为<a>标签
    if (event.target.tagName === "A") {
      // 执行你想要的操作，比如阻止事件冒泡
      event.stopPropagation();
    }
  };


  const PersionInfoDom = () => {
    if (showUserInfo.userInfo === null) return null
    const item = showUserInfo.userInfo as UserInfo
    return (
      <div className="persion_info_modal_warpper bg_theme border_theme">
          <img
            src={item.profile_image_url_https}
            className="persion_pic w-[60px] h-[60px] rounded-full flex-none border_theme"
          ></img>
        <div
          className="flex flex-col gap-1 relative flex-1"
        >
          <div className=" font-semibold text_theme_text mt-1">{unicodeToEmoji(item.name)}</div>
          <div className="text_theme_subText">@{item.screen_name}</div>
          <div
            className="text_theme_text overflow-hidden break-words"
            dangerouslySetInnerHTML={{
              __html: unicodeToEmoji(parseHtml(item.description)),
            }}
            onClick={handleContainerClick}
          ></div>
        </div>

      </div>
    )
  }


  return {
    showUserInfo, 
    setShowUserInfo,
    PersionInfoDom
  }
}

export default useShowUserInfo