import { findLastChildRecursive, findLastSpan, getCookieValue } from "~utils";
import Icon from "data-base64:~assets/icon.png";
export const CUSTOM_CARD_KEY = ["#followers", "#following"];
export const $FOLLOWERS = "#followers";
export const $FOLLOWING = "#following";

export const followUrlPaths = [
  "verified_followers",
  "followers",
  "following",
  "followers_you_follow",
  "creator-subscriptions",
];

export const insertTabElement = (parentElement) => {
  // 在哪个位置插入
  var newDiv = document.createElement("div");
  newDiv.className = "block_style_wrapper";
  newDiv.innerHTML = `<div class='nav_wrapper' id='#followers'><span class='text text_theme_text'><img src='${Icon}' class='icon_img'/>Followers</span><div class='underline'></div></div>`;
  newDiv.setAttribute("role", "tab");
  newDiv.addEventListener(
    "click",
    () => {
      // 设置原来的标签的选中字体颜色
      setOriginSpanFontWeight();
      location.hash = "#followers";
      newDiv.classList.add("selected");
    },
    true
  );

  var newDiv2 = document.createElement("div");
  newDiv2.className = "block_style_wrapper";
  newDiv2.innerHTML = `<div class='nav_wrapper' id='#following'><span class='text text_theme_text'><img src='${Icon}' class='icon_img'/>Following</span><div class='underline'></div></div>`;
  newDiv2.setAttribute("role", "tab");
  newDiv2.addEventListener(
    "click",
    () => {
      // 设置原来的标签的选中字体颜色
      setOriginSpanFontWeight();
      location.hash = "#following";
      newDiv2.classList.add("selected");
    },
    true
  );
  // 获取父元素的子元素列表
  const children = parentElement.children;
  // 找到第2个子元素
  const lastSecondChild = children[children.length - 3];
  const lastOneChild = children[children.length - 2];
  // 在第2个子元素后面插入新元素
  parentElement.insertBefore(newDiv, lastSecondChild.nextSibling);
  parentElement.insertBefore(newDiv2, lastOneChild.nextSibling);
};

function setOriginSpanFontWeight() {
  const tablistNode = document.querySelector('[role="tablist"]');
  if (!tablistNode) return;
  const tabs = tablistNode.querySelectorAll("[role=tab]");
  if (tabs) {
    tabs.forEach((item, index) => {
      let findSpanChildren = findLastSpan(item);
      if (
        findSpanChildren &&
        !findSpanChildren.className.includes("text_theme_text")
      ) {
        findSpanChildren.style.fontWeight = 400;
        item.addEventListener("click", () => {
          findSpanChildren.style.fontWeight = 700;
        });
      }
    });
  }
}

export const getLocationPathName = () => {
  if (location.hash && CUSTOM_CARD_KEY.includes(location.hash))
    return location.hash;
  return location.pathname.split("/")[2];
};

export const setOriginTabSelectedStyle = (isShow) => {
  const tablistNode = document.querySelector('[role="tablist"]');
  if (!tablistNode) return;
  const tabs = tablistNode.querySelectorAll("[role=tab]");
  if (tabs) {
    tabs.forEach((item, index) => {
      let findLaseChildren = findLastChildRecursive(item);
      findLaseChildren.style.visibility = isShow ? "visible" : "hidden";
    });
  }
  if (document.getElementById($FOLLOWERS)) {
    document.getElementById($FOLLOWERS)?.classList.remove("cardType_selected");
  }
  if (document.getElementById($FOLLOWING)) {
    document.getElementById($FOLLOWING)?.classList.remove("cardType_selected");
  }
};

export const setOriginAreaIsShow = (display: boolean) => {
  const home_timeline_area = document.querySelector(
    '[aria-label="Home timeline"]'
  );
  if (!home_timeline_area) return;
  if (home_timeline_area.lastChild && home_timeline_area.lastChild.style) {
    home_timeline_area.lastChild.style.display = display ? "block" : "none";
  }
};

export const setCustomCardSelected = (typeNode, selected = false) => {
  if (!typeNode) return;
  if (selected) {
    typeNode.classList.add("cardType_selected");
  } else {
    typeNode.classList.remove("cardType_selected");
  }
};

export const setThemeColor = () => {
  const night_mode = getCookieValue("night_mode");
  if (night_mode === "0") {
    document.documentElement.className = "light";
  } else {
  }
  switch (night_mode) {
    case "0":
      document.documentElement.className = "light";
      break;
    case "1":
      document.documentElement.className = "dim";
      break;
    case "2":
      document.documentElement.className = "dark";
      break;
    default:
      break;
  }
};
