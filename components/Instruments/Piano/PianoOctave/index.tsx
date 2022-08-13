import React, { useState } from "react";
import WhiteKey from "./WhiteKey";
import BlackKey from "./BlackKey";
import { Scale } from "utils/musicalScales";

interface Props {
  scale: {
    root: number;
    notes: number[];
    sharpsOrFlats: number;
    mode: number;
  };
  octave: number;
  playNote: Function;
}

export default function PianoOctave({ scale, playNote, octave }: Props) {
  const whiteKeyNotes = [0, 2, 4, 5, 7, 9, 11];
  const blackKeyNotes = [1, 3, 6, 8, 10];
  const blackKeyMargins = [
    "ml-[9.25%]",
    "ml-[4%]",
    "ml-[16.75%]",
    "ml-[5.5%]",
    "ml-[5%]",
  ];

  const pitchToHighlight = (pitch: number) => {
    return scale.notes[0] === pitch ? 1 : scale.notes.includes(pitch) ? 2 : 0;
  };

  return (
    <>
      <div className="flex w-full h-full">
        {whiteKeyNotes.map((note) => (
          <WhiteKey
            note={
              Scale.pitchToNote({
                pitch: note,
                sharpsOrFlats: scale.sharpsOrFlats,
              }) || ""
            }
            pitch={note}
            highlight={pitchToHighlight(note)}
            onMouseDown={(e: React.MouseEvent) =>
              playNote(
                Scale.pitchToNote({ pitch: note, sharpsOrFlats: 0 }),
                octave
              )
            }
          />
        ))}
      </div>
      <div className="flex w-full h-2/3 z-10 mt-[-24rem]">
        {blackKeyNotes.map((note, index) => (
          <BlackKey
            note={
              Scale.pitchToNote({
                pitch: note,
                sharpsOrFlats: scale.sharpsOrFlats,
              }) || ""
            }
            pitch={note}
            highlight={pitchToHighlight(note)}
            className={blackKeyMargins[index]}
            onMouseDown={(e: React.MouseEvent) =>
              playNote(
                Scale.pitchToNote({ pitch: note, sharpsOrFlats: 0 }),
                octave
              )
            }
          />
        ))}
      </div>
    </>
  );
}
