import {
  CUSTOM_CARD_KEY,
  setOriginTabSelectedStyle,
} from "~feature/PersonalEnhance/utils";

export function getCookieValue(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}

export function findLastChildRecursive(element) {
  if (element.lastElementChild) {
    return findLastChildRecursive(element.lastElementChild);
  } else {
    return element;
  }
}

export function findLastSpan(element) {
  if (element && element.tagName == "SPAN") {
    return element;
  } else if (element.firstElementChild) {
    return findLastSpan(element.firstElementChild);
  }
  return null;
}

export function senChomeMessage({ action, params, response }) {
  chrome.runtime.sendMessage(
    {
      action,
      params,
    },
    (res) => {
      response(res);
    }
  );
}

export function handleFilterObj(arr: string[]) {
  if (arr && arr?.length && Object.keys(arr)?.length) {
    const arrItem = arr[0] || {};
    let newItems = [];
    Object.entries(arrItem).map(([key, value]) => {
      newItems.push({
        label: key || "",
        rightValue: value || "",
      });
    });
    return newItems;
  }
  return [];
}

export function getUserName() {
  // return "rockshang";
  return location.pathname.split("/")[1];
  // const screen_name = document.querySelector(
  //   'h2[role="heading"][aria-level="2"][dir="ltr"]'
  // );
  // console.log(screen_name, "screen_name....");
  // return (screen_name && screen_name.innerText) || "rockshang";
}

export function clearLastSelection() {
  const HomeTimeline = document.querySelector('[aria-label="Home timeline"]');
  if (CUSTOM_CARD_KEY.includes(location.hash)) {
    const lastEle = HomeTimeline.lastChild;
    if (
      lastEle &&
      lastEle.id !== "custom_card" &&
      lastEle.style.display !== "none"
    ) {
      lastEle.style.display = "none";
    }
  }
}

// 创建一个下载文件的函数
export function downloadFile(url) {
  // 创建一个a标签
  var link = document.createElement("a");
  // 设置a标签的href属性为文件的URL
  link.href = url;
  link.target = "_blank";
  // 添加download属性，告诉浏览器这是一个下载链接
  // link.download = "";
  // 将a标签添加到页面中
  document.body.appendChild(link);
  // 触发a标签的点击事件
  link.click();
  // 移除a标签，清理页面
  document.body.removeChild(link);
}
