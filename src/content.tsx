import cssText from "data-text:@/style.css";
import type { PlasmoCSConfig } from "plasmo";
import { WebsitePreviewTrigger } from "./features/OverlayIcon";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
export const config: PlasmoCSConfig = {
  matches: ["https://*/*"],
};

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

const PlasmoOverlay = () => {
  const [cookies, setCookies] = useState([]);
  useEffect(() => {
    async function run() {
      const response = await chrome.runtime.sendMessage({
        type: "REQ_COOKIE",
        hello: "HEllo",
      });
      console.log(response);
      setCookies(response.cookies);
    }
    run();
  }, []);

  console.log(window.screen.availWidth, window.screen.availHeight);
  return (
    <div className="z-50 flex fixed bottom-0 right-0">
      <WebsitePreviewTrigger cookies={cookies}></WebsitePreviewTrigger>
    </div>
  );
};

export default PlasmoOverlay;
