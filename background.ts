import {
  get_compute_user_interact,
  get_filter_info,
  get_search_user_info_list,
  get_user_info_list,
  search_user_info,
} from "~feature/PersonalEnhance/api";

console.log(
  "Live now; make now always the most precious time. Now will never come again."
);

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: "https://twitter.com/soulscancom",
  });
});

// 监听来自content script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "get_filter_info") {
    try {
      get_filter_info(request.params)
        .then((data) => {
          sendResponse({ data: data });
        })
        .catch((error) => console.log(error));
    } catch (error) {
      sendResponse({ data: {}, error: error, isError: true });
    }
  }
  if (request.action === "get_user_info_list") {
    try {
      get_user_info_list(request.params)
        .then((data) => {
          if (data.error) {
            sendResponse({
              data: {
                user_info_list: [],
              },
            });
          }
          sendResponse({ data: data });
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
      sendResponse({ data: {}, error: error, isError: true });
    }
  }
  // if (request.action === "get_search_user_info_list") {
  //   try {
  //     get_search_user_info_list(request.params)
  //       .then((data) => {
  //         sendResponse({ data: data });
  //       })
  //       .catch((error) => console.log(error));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  if (request.action === "get_compute_user_interact") {
    try {
      get_compute_user_interact(request.params)
        .then((data) => {
          sendResponse({ data: data });
        })
        .catch((error) => console.log(error));
    } catch (error) {
      sendResponse({ data: { isError: true } });
    }
  }
  if (request.action === "search_user_info") {
    try {
      search_user_info(request.params)
        .then((data) => {
          sendResponse({ data: data });
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }

  if (request.action === "export_user_interact") {
    const { screen_name, followers, following, created_at, interact_ids } =
      request.params;
    let fetchUrl = `http://198.181.37.232:5001/export_user_info_list?screen_name=${screen_name}`;
    if (interact_ids) {
      fetchUrl = `http://198.181.37.232:5001/export_user_interact?screen_name=${screen_name}`;
    }
    if (followers) {
      fetchUrl += "&followers_count=" + followers;
    }
    if (following) {
      fetchUrl += "&following_count=" + following;
    }
    if (created_at) {
      fetchUrl += "&created_at=" + created_at;
    }
    if (interact_ids) {
      fetchUrl += "&interact_ids=" + interact_ids;
    }
    try {
      chrome.tabs.create({
        url: fetchUrl,
      });
      sendResponse("success");
    } catch (error) {
      console.log(error);
    }
  }

  return true;
});
