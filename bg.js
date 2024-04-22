/* Note if you're building for firefox or mv2 in general, chrome.action will be undefined so you have to do something like this:

@see https://stackoverflow.com/questions/70216500/chrome-action-is-undefined-migrating-to-v3-manifest

const handleClick = (tab) => {
  console.log("clicked", tab.id);
  if (!tab.id) throw new Error("tab id not found");
  chrome.tabs.sendMessage(tab.id, {
    name: "show-dialog"
  });
};

if (chrome.action != undefined) {
  chrome.action.onClicked.addListener(handleClick);
} else {
  chrome.browserAction.onClicked.addListener(handleClick);
}
*/

// get_filter_info("rockshang", "followers").then((res) => {
//   console.log(res, "res.....");
// });

// getTitwer().then((res) => {
//   console.log(res, "ddddd");
// });

// fetch(
//   "http://107.182.191.234:5001/get_filter_info?screen_name=rockshang1&follow_category=followers",
//   {
//     mode: "no-cors",
//   }
// )
//   .then((response) => response.json())
//   .then((data) => {
//     console.log("1");
//     // console.log("请求接口数据1", "1212");
//     // console.log(data);
//     // 将获取的数据发送到content脚本
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, { action: "sendData", data: data });
//     });
//   })
//   .catch((error) => {
//     console.error("发生错误：");
//   });

// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//   chrome.tabs.sendMessage(tabs[0].id, { action: "sendData", data: "111" });
// });
