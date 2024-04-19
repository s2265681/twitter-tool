import React, { useEffect, useState } from "react";
import Button from "antd/es/button";
import Table from "antd/es/table";
import Input from "antd/es/input";
import notification from "antd/es/notification";
import message from "antd/es/message";
import { ThemeProvider } from "~theme";
import axios, { AxiosResponse } from "axios";
import { Storage } from "@plasmohq/storage";
import cssText from "data-text:~style.css";
export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

function postData(url, data) {
  return axios
    .post(url, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error("请求失败:", error);
    });
}

function IndexPopup() {
  return (
    <div className="content">
      1212
      <div className="text-[#fff]">ddddd</div>
      <Button type="primary">安妮11</Button>
      <a href="https://www.plasmo.com" target="_blank">
        Plasmo
      </a>{" "}
      <button
        onClick={() => {
          chrome.tabs.create({
            url: "https://www.plasmo.com",
          });
        }}
      >
        open tab page
      </button>
    </div>
  );
}

export default IndexPopup;
