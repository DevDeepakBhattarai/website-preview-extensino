import { useEffect, useReducer, useRef, useState } from "react";
import logo from "data-base64:@/assets/logo.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
const URL = "https://dev.app.blendit.ai/";
export const WebsitePreviewTrigger = ({
  cookie,
}: {
  cookie: chrome.cookies.Cookie[];
}) => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const ref = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.contentWindow.addEventListener("message", (e) => {
        if (e.data.type == "set") {
          console.log(e.data);
          const cookies = JSON.parse(e.data.cookies);
          const sbCookie = cookies.find((cookie) =>
            cookie.name.startsWith("sb-")
          );

          ref.current.contentDocument.cookie = `${sbCookie.name}=${sbCookie.value}; domain=dev.app.blendit.ai;`;
          ref.current.contentWindow.location.reload();
          console.log(ref.current.contentDocument.cookie);
        }
      });
    }
  }, []);

  useEffect(() => {
    ref.current.contentWindow.postMessage(
      {
        type: "set",
        cookies: JSON.stringify(cookie),
      },
      ref.current.contentWindow.origin
    );
  }, [cookie]);

  function toggleModel() {
    setIsModelOpen((prev) => !prev);
    ref.current.contentWindow.postMessage(
      { type: "get" },
      ref.current.contentWindow.origin
    );
  }

  return (
    <>
      <Popover open={isModelOpen} onOpenChange={(open) => setIsModelOpen(open)}>
        <PopoverTrigger asChild>
          <motion.div
            className="bottom-4 right-4 bg-red-500 h-24 w-24"
            drag
            dragConstraints={{
              left: -1 * window.screen.availWidth,
              right: 0,
              top: -1 * window.screen.availHeight,
              bottom: 0,
            }}
          ></motion.div>
          <motion.button
            drag
            onClick={toggleModel}
            className="absolute right-4 bottom-4 bg-gray-500 h-12 w-12 overflow-hidden rounded-full border border-white"
          >
            <img className="h-12 w-12" src={logo} alt="Logo" />
          </motion.button>
        </PopoverTrigger>
        <PopoverContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          className="w-80 p-0 mr-4 relative"
        >
          <iframe
            id="blendit_ai"
            ref={ref}
            src={URL}
            className={cn(
              "border-white rounded-lg border h-[28rem] w-full",
              isModelOpen ? "block" : "hidden"
            )}
          ></iframe>
        </PopoverContent>
      </Popover>
    </>
  );
};
