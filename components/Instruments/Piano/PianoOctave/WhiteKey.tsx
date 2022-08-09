import { useState, useEffect } from "react";

interface Props {
  onClick?: Function;
  onMouseDown?: Function;
  onMouseUp?: Function;
  className?: string;
  note: string;
  pitch: number;
  highlight?: number;
}

export default function WhiteKey({
  className = "",
  note,
  pitch,
  highlight = 0,
  onClick,
  onMouseDown,
  onMouseUp,
}: Props) {
  const baseColor = "text-black bg-gray-100 border-gray-200";
  const rootColor = "text-white bg-purple-400 border-purple-500";
  const noteColor = "text-white bg-blue-400 border-blue-500";

  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    document.body.addEventListener("mouseup", (e) => {
      if (onMouseUp) onMouseUp(e);
      setIsPressed(false);
    });
  }, []);

  function handlePress(e: React.FormEvent<HTMLDivElement>) {
    setIsPressed(true);
  }

  return (
    <div
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
      onMouseDown={(e) => {
        if (
          !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
        ) {
          if (!isPressed) {
            if (onMouseDown) onMouseDown(e);
            handlePress(e);
          }
        }
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
          ? "border-b-8 h-[calc(100%-8px)] mt-2"
          : "border-b-[16px] h-full"
      } pb-4 border-x-2 drop-shadow rounded-md w-[calc(100%/7)] mx-0.5 flex flex-col-reverse text-center`}
    >
      {note}
    </div>
  );
}
