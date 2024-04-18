import { useEffect, useState } from "react";
import {
  insertTabElement,
  getLocationPathName,
  setOriginTabSelectedStyle,
  CUSTOM_CARD_KEY,
  setOriginAreaIsShow,
  setCustomCardSelected,
} from "./utils";
import { getCookieValue } from "~utils";

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
      // 获取当前的主题色
      const night_mode = getCookieValue("night_mode");
      // 设置当前主题色
      setCurTheme(night_mode);
      // 切换类型
      tablistNode.addEventListener("click", () => {
        // 切换tab拿到相应的 值， 维护切换的状态
        setTimeout(() => {
          const locationPathName = getLocationPathName();
          setCurSelected(locationPathName);
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
        setOriginAreaIsShow(false);
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
