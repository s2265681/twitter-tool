import type { PlasmoCSConfig, PlasmoGetShadowHostId } from "plasmo";
import React, { useEffect } from "react";
import PersonalEnhance from "~feature/PersonalEnhance";
import { getCookieValue } from "~utils";
import "./style.css";
import "./style.scss";

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

// export const config: PlasmoCSConfig = {
//   matches: [
//     "https://twitter.com/*/verified_followers",
//     "https://twitter.com/*/followers_you_follow",
//     "https://twitter.com/*/followers",
//     "https://twitter.com/*/following",
//     "https://twitter.com/*/creator-subscriptions/subscriptions",
//   ],
// };

const PageIndex = () => {
  // 监听
  // 功能1 follower followers 页面增加筛选搜索能力
  return <PersonalEnhance></PersonalEnhance>;
};

export default PageIndex;
