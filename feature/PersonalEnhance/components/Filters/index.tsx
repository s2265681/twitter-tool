import { Button, Icon, Input, Menu, message, Tooltip } from "antd";
import Dropdown from "./Dropdown";
import { created_at, followers_count, following_count } from "./config";
import React from "react";

export default () => {
  console.log(
    document.documentElement.className,
    "document.documentElement.className;;"
  );
  return (
    <div>
      <div className="flex items-center gap-4 justify-start mt-5 mb-[10px]">
        <Dropdown
          options={created_at}
          value="2023"
          setValue={(item) => {
            console.log(item);
          }}
          className="flex-1"
        ></Dropdown>
        <Dropdown
          options={followers_count}
          value="10~100"
          setValue={(item) => {
            console.log(item);
          }}
          className="flex-1"
        ></Dropdown>
        <Dropdown
          options={following_count}
          value="0~10"
          setValue={(item) => {
            console.log(item);
          }}
          className="flex-1"
        ></Dropdown>
      </div>

      <div className="my-[20px] w-full h-[30px] bg-[rgba(0,0,0,0.1)] px-[20px]">
        input search
      </div>

      {/* <div className="text-primary bg-primary">主题色设置1+</div>
      <div className="bg-primary text-white">主题色设置123+</div>
      <div className="bg-theme_bg">主题背景色ee</div>
      <div className="bg-drowdown_bg">下拉背景色</div>
      <div className="text-input_primary">输入框颜色选中</div>
      <div className="text-input_selected">输入框颜色选中hover</div>
      <div className="text-input_default">1输入框颜色文字默认</div>
      <div className="bg-input_bg">输入框颜色背景默认</div> */}
    </div>
  );
};
