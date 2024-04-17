import React from "react";
import Followers from "~feature/PersonalEnhance/components/Followers";
import { useEffect, useState } from "react";
import Followering from "~feature/PersonalEnhance/components/Followering";
import { findLastChildRecursive, getCookieValue } from "~utils";
import { createPortal } from "react-dom";

const PersonlEnhance = () => {
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
    function updatePositon() {
      let timerId = setInterval(() => {
        if (addListenDom()) {
          const tablistNode = document.querySelector('[role="tablist"]');
          tablistNode.addEventListener("click", () => {
            setTimeout(() => {
              console.log(location.pathname, "......");
              console.log(location.hash, "location.hash");
            }, 0);
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
  }, []);

  const [curSelected, setCurSelected] = useState(
    location.pathname.split("/")[2]
  );

  function addListenDom() {
    if (document.querySelector('[role="tablist"]')) return true;
  }

  console.log(
    document.querySelector('[aria-label="Home timeline"]')?.lastElementChild,
    "123"
  );
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

export default PersonlEnhance;
