import type { PlasmoCSConfig, PlasmoGetShadowHostId } from "plasmo";
import React, { useEffect } from "react";
import cssText from "data-text:~style.css";
import cssText2 from "data-text:antd/dist/antd.css";
import PersonalEnhance from "~feature/PersonalEnhance";
import { getCookieValue } from "~utils";

// function postData(url: string, passport: string, phone: string): Promise<any> {
//   return axios
//     .post(url, {
//       passport,
//       phone,
//     })
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       throw new Error("请求失败:", error);
//     });
// }

export const config: PlasmoCSConfig = {
  matches: ["https://*.twitter.com/*"],
};

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  style.textContent += cssText2;
  return style;
};

const PageIndex = () => {
  useEffect(() => {
    const url = "https://twitter.com";
    const night_mode = getCookieValue("night_mode");
    console.log(night_mode, "night_mode");
  }, []);

  // 功能1 follower followers 页面增加筛选搜索能力
  return <PersonalEnhance></PersonalEnhance>;
};

export default PageIndex;
