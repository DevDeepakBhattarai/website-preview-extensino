import cssText from "data-text:@/style.css";
import type { PlasmoCSConfig } from "plasmo";
import { CountButton } from "./features/OverlayIcon";

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
      <CountButton></CountButton>
    </div>
  );
};

export default PlasmoOverlay;
