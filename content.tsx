import type { PlasmoCSConfig, PlasmoGetShadowHostId } from "plasmo"
import axios, { AxiosResponse } from 'axios';

function postData(url: string, passport: string, phone: string): Promise<any> {
  return axios.post(url, {
      passport,
      phone
    })
  .then(response => {
    return response.data;
  })
  .catch(error => {
    throw new Error('请求失败:', error);
  });
};

function refreshPage() {
  location.reload();
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.type === "clear_cookies") {
    console.log("Ignore")
  } else {
    chrome.runtime.sendMessage({ type: "clear_cookies" }, function(response) {
      const record = msg.record;
      const passport = msg.passport
      console.log("record:" + record + ", passport:" + passport)
      const url: string = 'https://kalodata.com/au/testLogin';
      postData(url, passport, record.phone)
      .then(data => {
        if (data.success) {
          refreshPage();
          sendResponse("Account: " + record.phone + ", Login success")
        } else {
          sendResponse("Account: " + record.phone + ", Login fail")
        }
        return true;
      })
      .catch(error => {
        sendResponse("Account: " + record.phone + ", Login fail")
      });
    });
  }
  return true;
});

export const config: PlasmoCSConfig = {
  matches: ["https://*.kalodata.com/*"]
}

const empty = () => (
  <div></div>
)

export default empty

