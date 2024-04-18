export {};

// function clearCookies() {
//   const url = "https://www.kalodata.com";
//   chrome.cookies.getAll({ url: url }, function(cookies) {
//     cookies.forEach(function(cookie) {
//       chrome.cookies.remove({ url: url, name: cookie.name });
//     });
//     console.log('Cookies cleared for:', url);
//   });
// }
// chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
//   if (msg.type === "clear_cookies") {
//     console.log("msg:" + msg)
//     clearCookies()
//   }
//   sendResponse("ok")
// })

const url = "https://twitter.com";
chrome.cookies.getAll({ url: url }, function (cookies) {
  cookies.forEach(function (cookie) {
    console.log(cookie, "cookie");
  });
});
