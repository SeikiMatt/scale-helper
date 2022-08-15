import React, { useEffect } from "react";
import Note from "components/Instruments/Stringed/Note";
import * as Tone from "tone";
import { Scale } from "utils/musicalScales";

interface Props {
  scale: Scale;
  options: {
    strings: number;
    frets: number;
    tuning: number[];
  };
}

export default function Guitar({ scale, options }: Props) {
  let synth: any;
  useEffect(() => {
    synth = new Tone.Sampler({
      urls: {
        C4: "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        A4: "A4.mp3",
      },
      release: 1,
      baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).toDestination();
  });

  function playNote(note: string, octave: number) {
    synth.triggerAttackRelease(
      Scale.noteUnicodeToAlphabet(note) + octave,
      "8n"
    );
  }

  const noteMatrix = options.tuning.map((root) => {
    const noteSequence = [root];
    for (let i = 1; i < options.frets + 1; i++)
      noteSequence.push(Scale.normalizePitch(root + i));

    return noteSequence;
  });

  const pitchToHighlight = (pitch: number) => {
    return scale.notes[0] === pitch ? 1 : scale.notes.includes(pitch) ? 2 : 0;
  };

  return (
    <div className="w-full flex flex-col text-center py-8 sm:px-0 md:px-8 lg:px-16 xl:px-32 px-48">
      {noteMatrix.map((_, x) => (
        <div className="flex h-10 justify-between relative overflow-hidden">
          {noteMatrix[x].map((_, y) => (
            <div className="flex-grow">
              <div
                className={`absolute mt-4 w-full${
                  y === 0 ? " " : " border "
                }-z-10`}
              ></div>
              <div
                className={`absolute h-full ${
                  x === 0
                    ? "mt-4"
                    : x === noteMatrix.length - 1
                    ? "h-[calc(1rem+2px)]"
                    : ""
                } ${
                  y === 0
                    ? "border-0"
                    : y === 1
                    ? "border-l-8 -ml-1"
                    : "border-l-2"
                } -z-10`}
              ></div>

              <Note
                note={
                  Scale.pitchToNote({
                    pitch: Scale.normalizePitch(
                      noteMatrix[options.strings - x - 1][y]
                    ),
                    sharpsOrFlats: scale.sharpsOrFlats,
                  }) || ""
                }
                pitch={Scale.normalizePitch(
                  noteMatrix[options.strings - x - 1][y]
                )}
                highlight={pitchToHighlight(
                  Scale.normalizePitch(noteMatrix[options.strings - x - 1][y])
                )}
              />
            </div>
          ))}
        </div>
      ))}

      <div className="flex justify-between">
        {noteMatrix[0].map((_, y) => (
          <div className="flex-grow w-8 text-gray-600">
            {y}
            <br />
            {y === 3
              ? "⬤"
              : y === 5
              ? "⬤"
              : y === 7
              ? "⬤"
              : y === 9
              ? "⬤"
              : y === 12
              ? "⬤ ⬤"
              : y === 15
              ? "⬤"
              : y === 17
              ? "⬤"
              : y === 19
              ? "⬤"
              : y === 21
              ? "⬤"
              : y === 24
              ? "⬤"
              : ""}
          </div>
        ))}
      </div>
    </div>
  );
}