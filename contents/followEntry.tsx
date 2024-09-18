import type { PlasmoCSConfig, PlasmoGetShadowHostId } from "plasmo";
import React, { useEffect } from "react";
import PersonalEnhance from "~feature/PersonalEnhance";
import { getCookieValue, senChomeMessage } from "~utils";
import "../style.css";
import "../style.scss";
import { ThemeProvider } from "~theme";
// import "antd/dist/antd.css";//body 引入颜色
import "antd/lib/message/style/index.css"; // 只引入 message 组件的样式

// 在content脚本中接收数据
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "sendData") {
    // 在content脚本中处理和展示获取的数据
    // 在这里可以将数据渲染到content脚本的DOM中
  }
});

export const config: PlasmoCSConfig = {
  matches: ["https://*.twitter.com/*", "https://*.x.com/*"],
};

const PageIndex = () => {
  return (
    <ThemeProvider>
      <PersonalEnhance></PersonalEnhance>
    </ThemeProvider>
  );
};

export default PageIndex;
