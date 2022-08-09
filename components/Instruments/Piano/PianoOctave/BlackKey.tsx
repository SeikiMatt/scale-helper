import { useState } from "react";

interface Props {
  onClick?: Function;
  onMouseDown?: Function;
  onMouseUp?: Function;
  className?: string;
  note: string;
  highlight?: number;
}

export default function BlackKey({
  className = "",
  note,
  highlight = 0,
  onClick,
  onMouseDown,
  onMouseUp,
}: Props) {
  const baseColor =
    "bg-gray-900 border-gray-200 border-b-gray-700 border-l-gray-800 border-r-gray-800";
  const rootColor =
    "bg-purple-900 border-purple-200 border-b-purple-700 border-l-purple-800 border-r-purple-800";
  const noteColor =
    "bg-blue-900 border-blue-200 border-b-blue-700 border-l-blue-800 border-r-blue-800";

  const [isPressed, setIsPressed] = useState(false);

  function handlePress(e: React.FormEvent<HTMLButtonElement>) {
    setIsPressed(true);
  }

  if (typeof window !== "undefined") {
    document.body.addEventListener("mouseup", (e) => {
      if (onMouseUp) onMouseUp(e);
      setIsPressed(false);
    });
  }

  return (
    <button
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
      onMouseDown={(e) => {
        if (onMouseDown) onMouseDown(e);
        handlePress(e);
      }}
      className={`
        ${className ? className + " " : ""} ${
        highlight === 1 ? rootColor : highlight === 2 ? noteColor : baseColor
      } ${
        isPressed
          ? "border-b-8 h-[calc(100%-8px)] mt-2"
          : "border-b-[16px] h-full"
      } border-x-4 drop-shadow-md pb-2 rounded-md w-[calc(100%/10)] mx-0.5 flex flex-col-reverse text-center text-white`}
    >
      {note}
    </button>
  );
}
