import { useReducer, useState } from "react";
import logo from "data-base64:@/assets/logo.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const CountButton = () => {
  const [count, increase] = useReducer((c) => c + 1, 0);
  const [isModelOpen, setIsModelOpen] = useState(false);
  function toggleModel() {
    setIsModelOpen((prev) => !prev);
  }
  return (
    <>
      <Popover open={isModelOpen} onOpenChange={(open) => setIsModelOpen(open)}>
        <PopoverTrigger
          onClick={toggleModel}
          className="absolute bottom-0 right-0 bg-gray-500 h-14 w-14 overflow-hidden rounded-full border border-white"
        >
          <img className="h-full w-full" src={logo} alt="Logo" />
        </PopoverTrigger>
        <PopoverContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          className="w-96 p-0 mr-4 relative"
        >
          <iframe
            src="https://dev.app.blendit.ai"
            className="border-white rounded-lg border h-[32rem] w-full"
          ></iframe>
        </PopoverContent>
      </Popover>
    </>
  );
};
