import React, { useState } from "react";
import WhiteKey from "./WhiteKey";
import BlackKey from "./BlackKey";

interface Props {
  scale: {
    root: number;
    notes: number[];
    degree: number;
    mode: number;
  };
}

export default function Piano({ scale }: Props) {
  const whiteKeyNotes = ["C", "D", "E", "F", "G", "A", "B"];
  const blackKeyNotes = {
    flat: ["D♭", "E♭", "G♭", "A♭", "B♭"],
    sharp: ["C♯", "D♯", "F♯", "G♯", "A♯"],
  };

  const [setWhiteKeyHighlights, whiteKeyHighlights] = useState([
    0, 2, 4, 5, 7, 9, 11,
  ]);
  const [setBlackKeyHightlists, blackKeyHightlists] = useState([]);

  return (
    <div className="w-full h-96 px-16">
      <div className="flex w-full h-full">
        {whiteKeyNotes.map((note, number) => (
          <WhiteKey note={note} />
        ))}
      </div>
      <div className="flex w-full h-2/3 z-10 mt-[-24rem]">
        <BlackKey note="C#" className="ml-[9.25%]" />
        <BlackKey note="D#" className="ml-[4%]" />
        <BlackKey note="F#" className="ml-[16.75%]" />
        <BlackKey note="G#" className="ml-[5.5%]" />
        <BlackKey note="A#" className="ml-[6%]" />
      </div>
    </div>
  );
}
