console.log(">>>>>>>");

chrome.browserAction.onClicked.addListener(function (tab) {
  // 在这里打开指定的URL
  console.log("tab..", tab);
  chrome.tabs.create({ url: "https://twitter.com/soulscancom" });
});
