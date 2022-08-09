import { useState, useEffect } from "react";

export interface InteractibleProps {
  onClick?: Function;
  onMouseDown?: Function;
  onMouseUp?: Function;
  className?: string;
  note: string;
  pitch: number;
  highlight?: number;
  highlightClassNames: string[];
  isPressedClassNames: string[];
}

export function Interactible(props: InteractibleProps) {
  const baseColor = props.highlightClassNames[0];
  const rootColor = props.highlightClassNames[1];
  const noteColor = props.highlightClassNames[2];

  const isNotPressedStyle = props.isPressedClassNames[0];
  const isPressedStyle = props.isPressedClassNames[1];

  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    document.body.addEventListener("mouseup", (e) => {
      if (props.onMouseUp) props.onMouseUp(e);
      setIsPressed(false);
    });
  }, []);

  function handlePress(e: React.FormEvent<HTMLButtonElement>) {
    setIsPressed(true);
  }

  return (
    <button
      onClick={(e) => {
        if (props.onClick) props.onClick(e);
      }}
      onMouseDown={(e) => {
        // MOUSE DOWN FIRES ON MOBILE FOR SOME REASON
        if (
          !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
        ) {
          if (!isPressed) {
            if (props.onMouseDown) props.onMouseDown(e);
            handlePress(e);
          }
        }
      }}
      onTouchStart={(e) => {
        if (props.onMouseDown) props.onMouseDown(e);
        handlePress(e);
      }}
      onTouchEnd={(e) => {
        if (props.onMouseUp) props.onMouseUp(e);
        setIsPressed(false);
      }}
      className={`
        ${props.className ? props.className + " " : ""} ${
        props.highlight === 1
          ? rootColor
          : props.highlight === 2
          ? noteColor
          : baseColor
      } ${isPressed ? isPressedStyle : isNotPressedStyle}`}
    >
      {props.note}
    </button>
  );
}
