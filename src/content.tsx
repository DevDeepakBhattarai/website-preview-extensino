import cssText from "data-text:@/style.css";
import type { PlasmoCSConfig } from "plasmo";
import { WebsitePreviewTrigger } from "./features/OverlayIcon";

export const config: PlasmoCSConfig = {
  matches: ["https://*/*"],
};

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

const PlasmoOverlay = () => {
  return (
    <div className="z-50 flex fixed bottom-6 right-6 ">
      <WebsitePreviewTrigger></WebsitePreviewTrigger>
    </div>
  );
};

export default PlasmoOverlay;
