import React, { useEffect, useState } from "react";
import Followers from "~feature/PersonalEnhance/components/Followers";
import Followering from "~feature/PersonalEnhance/components/Followering";
import { createPortal } from "react-dom";
import { useRenderDomHelpHooks } from "./hooks";
import {
  getLocationPathName,
  CUSTOM_CARD_KEY,
  $FOLLOWERS,
  $FOLLOWING,
  setOriginAreaIsShow,
} from "./utils";
import "./index.scss";

const PersonlEnhance = () => {
  const { curTheme, curSelected, renderCardContent } = useRenderDomHelpHooks();
  const localPath = getLocationPathName();
  if (!CUSTOM_CARD_KEY.includes(localPath)) return null;
  if (!renderCardContent) return null;
  console.log(curTheme, curSelected, "curTheme, curSelected");
  return createPortal(
    <div className="flex items-stretch justify-around bg-white relative px-4">
      {$FOLLOWERS === localPath && <Followers></Followers>}
      {$FOLLOWING === localPath && <Followering></Followering>}
    </div>,
    document.querySelector('[aria-label="Home timeline"]')
  );
};

const PersonlEnhanceWrapper = () => {
  const [isCanRender, setIsCanRender] = useState(false);
  useEffect(() => {
    let timerId = null;
    function updateIsRender() {
      timerId = setInterval(() => {
        const tablistNode = document.querySelector('[role="tablist"]');
        if (tablistNode) {
          !isCanRender && setIsCanRender(true);
        } else {
          isCanRender && setIsCanRender(false);
        }
      }, 50);
    }
    updateIsRender();
    return () => {
      clearInterval(timerId);
    };
  }, []);

  if (!isCanRender) return null;

  return <PersonlEnhance></PersonlEnhance>;
};

export default PersonlEnhanceWrapper;
