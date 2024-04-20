import React, { useEffect, useRef, useState } from "react";
import Followers from "~feature/PersonalEnhance/components/Followers";
import Followering from "~feature/PersonalEnhance/components/Followering";
import { createPortal } from "react-dom";
import { useRenderDomHelpHooks } from "./hooks";
import {
  getLocationPathName,
  CUSTOM_CARD_KEY,
  $FOLLOWERS,
  $FOLLOWING,
  followUrlPaths,
} from "./utils";
import "./index.scss";

const PersonlEnhance = () => {
  const {  renderCardContent } = useRenderDomHelpHooks();
  const localPath = getLocationPathName();
  if (!CUSTOM_CARD_KEY.includes(localPath)) return null;
  if (!renderCardContent) return null;
  return createPortal(
    <div className="flex items-stretch justify-around  relative px-4 bg-theme_bg">
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
        const HomeTimeline = document.querySelector(
          '[aria-label="Home timeline"]'
        );
        const locationPath = location.pathname.split("/")?.[2];
        if (
          followUrlPaths.includes(locationPath) &&
          tablistNode &&
          HomeTimeline
        ) {
          setIsCanRender(true);
        } else {
          setIsCanRender(false);
        }
      }, 50);
    }
    updateIsRender();
    return () => {
      clearInterval(timerId);
      setIsCanRender(false);
    };
  }, []);

  if (!isCanRender) return null;

  return <PersonlEnhance></PersonlEnhance>;
};

export default PersonlEnhanceWrapper;
