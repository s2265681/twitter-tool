import { useEffect, useRef, useState } from "react";
import {
  insertTabElement,
  getLocationPathName,
  setOriginTabSelectedStyle,
  CUSTOM_CARD_KEY,
  setOriginAreaIsShow,
  setCustomCardSelected,
  setThemeColor,
} from "./utils";
import { findLastChildRecursive } from "~utils";
import Icon from "data-base64:~assets/icon.png";

let lastLocation = "verified_followers";
export const useRenderDomHelpHooks = () => {
  const [curSelected, setCurSelected] = useState(getLocationPathName());
  const [renderCardContent, setRenderCardContent] = useState(false);
  const [curTheme, setCurTheme] = useState("0");

  // 1、选择插入tab的时机，插入后进行渲染相应的节点， 节点创建成功，更新当前的主题色状态
  useEffect(() => {
    const tablistNode = document.querySelector('[role="tablist"]');
    if (tablistNode) {
      // 插入元素
      insertTabElement(tablistNode);
      // 获取当前的主题色设置当前主题色
      setThemeColor();
      // 切换类型
      tablistNode.addEventListener("click", (e) => {
        // 切换tab拿到相应的 值， 维护切换的状态
        setTimeout(() => {
          const locationPathName = getLocationPathName();
          setCurSelected((oldState) => {
            lastLocation = oldState;
            return locationPathName;
          });
        }, 0);
      });
    }
  }, []);

  useEffect(() => {
    // 没有渲染好tab之前不执行
    // 2、 对应的curSelected变化， 更新tab的选中状态、 先隐藏所有状态、在增加状态
    // 3、根据切换的状态， 处理相应节点的展示隐藏
    if (CUSTOM_CARD_KEY.includes(curSelected)) {
      // 如果是自定义区域的，隐藏原有tab的选中样式
      setOriginTabSelectedStyle(false);
      // 给当前tab 增加选中样式
      setCustomCardSelected(document.getElementById(curSelected), true);
      // 隐藏当前展示区域的节点, 渲染自定义的组件

      setTimeout(() => {
        if (!CUSTOM_CARD_KEY.includes(lastLocation)) {
          setOriginAreaIsShow(false);
          // setTimeout(() => {
          //   const custom_card = document.querySelector("#custom_card");
          //   if (custom_card) {
          //     const nextEle = custom_card.nextElementSibling;
          //     if (nextEle && nextEle.style) {
          //       nextEle.style.display = "none";
          //     }
          //   }
          // }, 1000);
        }
      }, 100);
      setTimeout(() => {
        setRenderCardContent(true);
      }, 200);
    } else {
      // 清理当前tab选中样式
      setCustomCardSelected(document.getElementById(curSelected), false);
      // 恢复原有tab的选中样式
      setOriginTabSelectedStyle(true);
      // 隐藏当前的自定义组件， 展示之前的区域
      setRenderCardContent(false);
      setOriginAreaIsShow(true);
    }
  }, [curSelected]);

  return {
    curSelected,
    renderCardContent,
    curTheme,
  };
};

export const useRenderUserLink = () => {
  const onceRef = useRef(false);
  const userName2 = useRef(null);
  useEffect(() => {
    let timerId = null;
    function updateIsRender() {
      timerId = setInterval(() => {
        const UserNameDom = document.querySelector(
          'div[data-testid="UserName"]'
        );

        const UserNameDomParent = UserNameDom?.parentElement;

        if (!UserNameDom || !UserNameDomParent) {
          onceRef.current = false;
          return;
        }

        if (!userName2.current && UserNameDom?.children?.[0]) {
          userName2.current = userName2.current
            ? userName2.current
            : findLastChildRecursive(UserNameDom.children[0]);
          userName2.current = userName2.current.innerText.replace("@", "");
        }

        const followingLinkWrapper = UserNameDomParent.querySelector(
          `a[role="link"][dir="ltr"][href="/${userName2.current}/following"]`
        );
        const followerLinkWrapper = UserNameDomParent.querySelector(
          `a[role="link"][dir="ltr"][href="/${userName2.current}/verified_followers"]`
        );

        if (userName2.current && followingLinkWrapper && followerLinkWrapper) {
          // 插入元素？
          if (!onceRef.current) {
            // const followingLink = document.createElement("a");
            // followingLink.innerHTML = `<span class="custom_links"><img src='${Icon}' class='icon_img'/>Following</span>`;
            // followingLink.href = `/${userName2.current}/following#following`;
            // followingLinkWrapper.parentElement.appendChild(followingLink);
            // followingLinkWrapper.parentElement.style.display = "flex";
            // followingLinkWrapper.parentElement.style.flexDirection = "row";

            const followerLink = document.createElement("a");
            followerLink.innerHTML = `<span class="custom_links"><img src='${Icon}' class='icon_img'/>Followers</span>`;
            followerLink.href = `/${userName2.current}/followers#followers`;
            followerLinkWrapper.parentElement.appendChild(followerLink);
            followerLinkWrapper.parentElement.style.display = "flex";
            followerLinkWrapper.parentElement.style.flexDirection = "row";
          }
          onceRef.current = true;
        } else {
          onceRef.current = false;
          userName2.current = null;
        }
      }, 50);
    }
    const fn = () => {
      updateIsRender();
    };
    window.addEventListener("popstate", fn);
    updateIsRender();
    return () => {
      clearInterval(timerId);
      window.removeEventListener("popstate", fn);
    };
  }, []);
};
