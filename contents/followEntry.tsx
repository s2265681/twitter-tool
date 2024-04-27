import type { PlasmoCSConfig, PlasmoGetShadowHostId } from "plasmo";
import React, { useEffect } from "react";
import PersonalEnhance from "~feature/PersonalEnhance";
import { getCookieValue, senChomeMessage } from "~utils";
import "../style.css";
import "../style.scss";

// 在content脚本中接收数据
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "sendData") {
    // 在content脚本中处理和展示获取的数据
    console.log("收到数据：", message.data);
    // 在这里可以将数据渲染到content脚本的DOM中
  }
});

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
  // return (
  //   <div
  //     onClick={() => {
  //       senChomeMessage({
  //         action: "get_user_info_list",
  //         params: {
  //           screen_name: "ethereum",
  //           follow_category: "followers",
  //           created_at: "2017",
  //           followers_count: "1k-10k",
  //           following_count: "1k-10k",
  //           cursor: 1,
  //         },
  //         response: (data) => {
  //           console.log("response2", data);
  //         },
  //       });

  //       senChomeMessage({
  //         action: "get_search_user_info_list",
  //         params: {
  //           text: "111111",
  //           follow_category: "followers",
  //           created_at: "2024",
  //           followers_count: "1k-10k",
  //           following_count: "0-10",
  //           cursor: 1,
  //         },
  //         response: (data) => {
  //           console.log("response3", data);
  //         },
  //       });
  //     }}
  //   >
  //     测试
  //   </div>
  // );
  return <PersonalEnhance></PersonalEnhance>;
};

export default PageIndex;
