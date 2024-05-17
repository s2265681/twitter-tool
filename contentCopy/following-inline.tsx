import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchor,
  PlasmoGetOverlayAnchor,
  PlasmoMountShadowHost,
} from "plasmo";
import { getUserName } from "~utils";

export const config: PlasmoCSConfig = {
  matches: ["https://*.twitter.com/*", "https://*.x.com/*"],
};

const name = getUserName();
export const getInlineAnchor: PlasmoGetInlineAnchor = () => ({
  element: document.querySelector(`a[role="tab"][href="/${name}/followers"]`),
  insertPosition: "afterend",
});

export const getShadowHostId = () => "plasmo-inline-followers-unique-id";

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
      Followers
    </div>
  );
};

export const mountShadowHost: PlasmoMountShadowHost = ({
  shadowHost,
  anchor,
  mountState,
}) => {
  anchor.element.appendChild(shadowHost);
  mountState.observer.disconnect(); // OPTIONAL DEMO: stop the observer as needed
};

export default PlasmoInline;
