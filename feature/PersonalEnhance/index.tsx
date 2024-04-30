import React, { useEffect, useRef, useState } from "react";
import Followers from "~feature/PersonalEnhance/components/Followers";
import Followering from "~feature/PersonalEnhance/components/Followering";
import { createPortal } from "react-dom";
import { useRenderDomHelpHooks, useRenderUserLink } from "./hooks";
import { useFolloweringApiHooks } from "./components/useFolloweringApiHooks";
import {
  getLocationPathName,
  CUSTOM_CARD_KEY,
  $FOLLOWERS,
  $FOLLOWING,
  followUrlPaths,
} from "./utils";
import "./index.scss";
import { clearLastSelection } from "~utils";
import { useFollowersApiHooks } from "./components/useFollowersApiHooks";

const PersonlEnhance = ({ followersParams, followeringParams }) => {
  const { renderCardContent } = useRenderDomHelpHooks();
  const localPath = getLocationPathName();

  if (!CUSTOM_CARD_KEY.includes(localPath)) return null;
  if (!renderCardContent) return null;

  return createPortal(
    <div
      className="flex justify-around  relative bg-theme_bg w-full"
      id="custom_card"
    >
      {$FOLLOWERS === localPath && (
        <Followers followersParams={followersParams}></Followers>
      )}
      {$FOLLOWING === localPath && (
        <Followering followeringParams={followeringParams}></Followering>
      )}
    </div>,
    document.querySelector('[aria-label="Home timeline"]')
  );
};

const PersonlEnhanceWrapper = () => {
  const [isCanRender, setIsCanRender] = useState(false);

  useEffect(() => {
    let timerId = null;
    let timerId2 = null;
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
          timerId2 = setTimeout(() => {
            setIsCanRender(true);
            clearTimeout(timerId2);
          }, 1000);
          clearLastSelection();
        } else {
          setIsCanRender(false);
        }
      }, 50);
    }
    updateIsRender();
    return () => {
      clearInterval(timerId);
      clearTimeout(timerId2);
      setIsCanRender(false);
    };
  }, []);

  const followersParams = useFolloweringApiHooks({ isCanRender });
  const followeringParams = useFollowersApiHooks({ isCanRender });

  useRenderUserLink();

  if (!isCanRender) return null;
  const locationPath = location.pathname.split("/")?.[2];
  if (!followUrlPaths.includes(locationPath)) return null;

  return (
    <PersonlEnhance
      followersParams={followersParams}
      followeringParams={followeringParams}
    ></PersonlEnhance>
  );
};

export default PersonlEnhanceWrapper;
