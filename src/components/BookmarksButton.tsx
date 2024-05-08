import { TriangleDownIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import { useOutSideClick } from "../hooks/hooks";
import BookmarksPopover from "./BookmarksPopover";

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useOutSideClick([buttonRef, popoverRef], () => setIsOpen(false));

  // useEffect(() => {
  //   const handleOutsideClick = (e: MouseEvent) => {
  //     if (
  //       e.target instanceof HTMLElement &&
  //       !buttonRef.current?.contains(e.target) &&
  //       !popoverRef.current?.contains(e.target)
  //     ) {
  //       setIsOpen(false);
  //     }
  //   };
  //   // const handleOutsideClick = (e: MouseEvent) => {
  //   //   if (
  //   //     e.target instanceof HTMLElement &&
  //   //     !e.target.closest(".bookmarks-btn") &&
  //   //     !e.target.closest(".bookmarks-popover")
  //   //   ) {
  //   //     setIsOpen(false);
  //   //   }
  //   // };

  //   document.addEventListener("click", handleOutsideClick);

  //   return () => {
  //     document.removeEventListener("click", handleOutsideClick);
  //   };
  // }, []);

  return (
    <section>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="bookmarks-btn"
      >
        Bookmarks <TriangleDownIcon />
      </button>
      {isOpen && <BookmarksPopover ref={popoverRef} isopen={false} />}
    </section>
  );
}
