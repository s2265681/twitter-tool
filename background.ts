import {
  get_filter_info,
  get_search_user_info_list,
  get_user_info_list,
} from "~feature/PersonalEnhance/api";

console.log(
  "Live now; make now always the most precious time. Now will never come again."
);

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: "https://twitter.com/soulscancom" });
});

// 监听来自content script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "get_filter_info") {
    console.log("开始发送请求1", request);
    get_filter_info(request.params).then((data) => {
      sendResponse({ data: data });
    });
  }
  if (request.action === "get_user_info_list") {
    console.log("开始发送请求2", request);
    get_user_info_list(request.params).then((data) => {
      sendResponse({ data: data });
    });
  }
  if (request.action === "get_search_user_info_list") {
    console.log("开始发送请求3", request);
    get_search_user_info_list(request.params).then((data) => {
      sendResponse({ data: data });
    });
  }
  return true;
});
