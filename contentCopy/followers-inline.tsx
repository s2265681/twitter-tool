import type {
  PlasmoCSConfig,
  PlasmoCSUIJSXContainer,
  PlasmoGetInlineAnchor,
  PlasmoRender,
  PlasmoWatchOverlayAnchor,
} from "plasmo";
import React from "react";
import { getUserName } from "~utils";

export const config: PlasmoCSConfig = {
  matches: ["https://*.twitter.com/*"],
};

const name = getUserName();
export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(`a[role="tab"][href="/${name}/following"]`);

export const getShadowHostId = () => "plasmo-inline-following-unique-id";

const PlasmoInline = () => {
  return null;
  return (
    <div
      style={{
        borderRadius: 4,
        padding: 4,
        background: "pink",
      }}
    >
      Following
    </div>
  );
};

export default PlasmoInline;
