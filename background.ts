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
    try {
      get_filter_info(request.params).then((data) => {
        sendResponse({ data: data });
      });
    } catch (error) {
      console.log(error);
    }
  }
  if (request.action === "get_user_info_list") {
    try {
      get_user_info_list(request.params).then((data) => {
        if (data.error) {
          sendResponse({
            data: {
              user_info_list: [],
            },
          });
        }
        sendResponse({ data: data });
      });
    } catch (error) {
      console.log(error);
    }
  }
  if (request.action === "get_search_user_info_list") {
    try {
      get_search_user_info_list(request.params).then((data) => {
        sendResponse({ data: data });
      });
    } catch (error) {
      console.log(error);
    }
  }
  return true;
});
