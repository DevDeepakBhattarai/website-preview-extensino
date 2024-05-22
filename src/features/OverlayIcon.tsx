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
  const [isBeingDragged, setIsBeingDragged] = useState(false);
  const ref = useRef<HTMLIFrameElement>(null);
  function toggleModel() {
    if (!isBeingDragged) {
      setIsModelOpen((prev) => !prev);
    }
  }

  return (
    <>
      <Popover
        open={isModelOpen}
        onOpenChange={(open) => {
          if (!isBeingDragged) setIsModelOpen(open);
        }}
      >
        <PopoverTrigger
          asChild
          className="absolute right-4 bottom-4 bg-gray-500 h-12 w-12 overflow-hidden rounded-full border border-white"
        >
          <motion.div
            className="absolute bottom-4 right-4"
            drag
            dragConstraints={{
              left: -1 * (window.screen.availWidth - 60),
              right: 0,
              top: -1 * (window.screen.availHeight - 3 * 50),
              bottom: 0,
            }}
            dragMomentum={false}
            onDragStart={() => {
              setIsBeingDragged(true);
            }}
            onDragEnd={() => {
              setIsBeingDragged(false);
            }}
          >
            <motion.button onClick={toggleModel}>
              <img
                className="h-12 w-12 pointer-events-none"
                src={logo}
                alt="Logo"
              />
            </motion.button>
          </motion.div>
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
