import React, { useState } from "react";
import WhiteKey from "./WhiteKey";
import BlackKey from "./BlackKey";
import { pitchToNote, normalizePitch } from "utils/musicalScales";

interface Props {
  scale: {
    root: number;
    notes: number[];
    degree: number;
    mode: number;
  };
}

export default function PianoOctave({ scale }: Props) {
  const pitchToHighlight = (pitch: number) => {
    return scale.notes[0] === pitch ? 1 : scale.notes.includes(pitch) ? 2 : 0;
  };

  return (
    <>
      <div className="flex w-full h-full">
        <WhiteKey
          note={pitchToNote({ pitch: 0, degree: scale.degree }) || ""}
          highlight={pitchToHighlight(0)}
        />
        <WhiteKey
          note={pitchToNote({ pitch: 2, degree: scale.degree }) || ""}
          highlight={pitchToHighlight(2)}
        />
        <WhiteKey
          note={pitchToNote({ pitch: 4, degree: scale.degree }) || ""}
          highlight={pitchToHighlight(4)}
        />
        <WhiteKey
          note={pitchToNote({ pitch: 5, degree: scale.degree }) || ""}
          highlight={pitchToHighlight(5)}
        />
        <WhiteKey
          note={pitchToNote({ pitch: 7, degree: scale.degree }) || ""}
          highlight={pitchToHighlight(7)}
        />
        <WhiteKey
          note={pitchToNote({ pitch: 9, degree: scale.degree }) || ""}
          highlight={pitchToHighlight(9)}
        />
        <WhiteKey
          note={pitchToNote({ pitch: 11, degree: scale.degree }) || ""}
          highlight={pitchToHighlight(11)}
        />
      </div>
      <div className="flex w-full h-2/3 z-10 mt-[-24rem]">
        <BlackKey
          note={pitchToNote({ pitch: 1, degree: scale.degree }) || ""}
          highlight={pitchToHighlight(1)}
          className="ml-[9.25%]"
        />
        <BlackKey
          note={pitchToNote({ pitch: 3, degree: scale.degree }) || ""}
          highlight={pitchToHighlight(3)}
          className="ml-[4%]"
        />
        <BlackKey
          note={pitchToNote({ pitch: 6, degree: scale.degree }) || ""}
          highlight={pitchToHighlight(6)}
          className="ml-[16.75%]"
        />
        <BlackKey
          note={pitchToNote({ pitch: 8, degree: scale.degree }) || ""}
          highlight={pitchToHighlight(8)}
          className="ml-[5.5%]"
        />
        <BlackKey
          note={pitchToNote({ pitch: 10, degree: scale.degree }) || ""}
          highlight={pitchToHighlight(10)}
          className="ml-[6%]"
        />
      </div>
    </>
  );
}
