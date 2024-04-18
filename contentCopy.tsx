import type { PlasmoCSConfig, PlasmoGetShadowHostId } from "plasmo";
import "./style.css";
import { useReducer } from "react";
import React from "react";
import { useEffect, useLayoutEffect, useState } from "react";
// import { ThemeProvider } from "~theme";
import { findLastChildRecursive, getCookieValue } from "~utils";
import { createPortal } from "react-dom";
import Followers from "~feature/PersonalEnhance/components/Followers";

// function postData(url: string, passport: string, phone: string): Promise<any> {
//   return axios
//     .post(url, {
//       passport,
//       phone,
//     })
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       throw new Error("请求失败:", error);
//     });
// }

export const config: PlasmoCSConfig = {
  matches: ["https://*.twitter.com/*"],
};

// export const getStyle = () => {
//   const style = document.createElement("style");
//   style.textContent = cssText;
//   style.textContent += cssText2;
//   return style;
// };

const empty = () => {
  const [position, setPosition] = useState({
    x: -600,
    y: 100,
    width: 0,
    height: 0,
  });
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const url = "https://twitter.com";
    const night_mode = getCookieValue("night_mode");
  }, []);

  useEffect(() => {
    let id = setInterval(() => {
      if (!isShow && checkIsShow()) setIsShow(true);
      if (isShow && !checkIsShow()) setIsShow(false);
      // if (location.href.includes("#followers")) {
      //   setCurSelected("#followers");
      // }
    }, 10);
    return () => {
      clearInterval(id);
    };
  }, [isShow]);

  const checkIsShow = () => {
    if (
      ["verified_followers", "followers", "following"].includes(
        location.pathname.split("/")[2]
      )
    )
      return true;
    return false;
  };

  const insterElement = (node) => {
    var newDiv = document.createElement("div");
    newDiv.className = "block_style_wrapper";
    newDiv.innerHTML =
      "<div class='nav_wrapper'><span class='text'>Followers</span><div class='underline'></div></div>";
    newDiv.setAttribute("role", "tab");
    newDiv.addEventListener(
      "click",
      () => {
        location.hash = "#followers";
        setLineSelect();
        newDiv.classList.add("selected");
        setCurSelected("#followers");
      },
      true
    );
    node.appendChild(newDiv);
  };

  const setLineSelect = () => {
    const tablistNode = document.querySelector('[role="tablist"]');
    const tabs = tablistNode.querySelectorAll("[role=tab]");
    tabs.forEach((item, index) => {
      item.classList.remove("selected");
      let findLaseChildren = findLastChildRecursive(item);
      findLaseChildren.style.backgroundColor = "transparent";
    });
  };

  useEffect(() => {
    if (!isShow) return;
    function updatePositon() {
      let timerId = setInterval(() => {
        if (addListenDom()) {
          const tablistNode = document.querySelector('[role="tablist"]');
          tablistNode.addEventListener("click", () => {
            setTimeout(() => {}, 0);
          });
          if (tablistNode) {
            // 后面插入元素
            clearInterval(timerId);
            insterElement(tablistNode);
          }
        }
      }, 50);
    }
    updatePositon();
    return () => {};
  }, [isShow]);

  const [curSelected, setCurSelected] = useState(
    location.pathname.split("/")[2]
  );

  function addListenDom() {
    if (document.querySelector('[role="tablist"]')) return true;
  }
  if (!document.querySelector('[aria-label="Home timeline"]')?.lastElementChild)
    return;
  return createPortal(
    <div className="flex items-stretch justify-around bg-white relative px-4">
      {curSelected === "#followers" && (
        <div className="border-top-[1px]  border-[#000] border-solid">
          {curSelected === "#followers" && <Followers></Followers>}
        </div>
      )}
    </div>,
    document.querySelector('[aria-label="Home timeline"]')?.lastElementChild
  );
};

export default empty;
