import { useState } from "react";

interface Props {
  onClick?: Function;
  onMouseDown?: Function;
  onMouseUp?: Function;
  className?: string;
  note: string;
  highlight?: number;
}

export default function Note({
  className = "",
  note,
  highlight = 0,
  onClick,
  onMouseDown,
  onMouseUp,
}: Props) {
  const baseColor = "bg-white border-gray-200";
  const rootColor = "bg-purple-300 border-purple-500";
  const noteColor = "bg-blue-300 border-blue-500";

  const [isPressed, setIsPressed] = useState(false);

  function handlePress(e: React.FormEvent<HTMLButtonElement>) {
    setIsPressed(true);
  }

  document.body.addEventListener("mouseup", (e) => {
    if (onMouseUp) onMouseUp(e);
    setIsPressed(false);
  });

  return (
    <button
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
      onMouseDown={(e) => {
        if (onMouseDown) onMouseDown(e);
        handlePress(e);
      }}
      onTouchStart={(e) => {
        if (onMouseDown) onMouseDown(e);
        handlePress(e);
      }}
      onTouchEnd={(e) => {
        if (onMouseUp) onMouseUp(e);
        setIsPressed(false);
      }}
      className={`
        ${className ? className + " " : ""} ${
        highlight === 1 ? rootColor : highlight === 2 ? noteColor : baseColor
      } ${
        isPressed
          ? "h-[30px] mt-[2px] border-2 border-b-2"
          : "h-8 border-2 border-b-4"
      } w-8 rounded-xl`}
    >
      {note}
    </button>
  );
}
