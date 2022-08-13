import React, { useEffect } from "react";
import Note from "components/Instruments/Guitar/Note";
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
    <div className="w-full h-64 my-8 px-4 sm:px-4 lg:px-16 xl:px-48">
      <div className="w-full flex flex-col h-[13.5rem]">
        {noteMatrix.map((_, x) => (
          <div className="flex flex-grow">
            {noteMatrix[x].map((_, y) => (
              <div
                key={"guitar-notetable-" + x + "-" + y}
                className={
                  y === 0
                    ? "border-gray-200 border-r-8 ml-[-2px] flex-grow"
                    : x === options.strings - 1
                    ? `border-gray-200 border-r-2 border-y-2 flex-grow`
                    : `border-gray-200 border-r-2 border-t-2 flex-grow`
                }
              ></div>
            ))}
          </div>
        ))}
      </div>
      <table className="w-full h-64 mt-[-14.8rem] z-10">
        <tbody>
          {noteMatrix.map((_, x) => (
            <tr className="">
              {noteMatrix[x].map((_, y) => (
                <td className={`text-center w-[calc(100%/${x})]`}>
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
                      Scale.normalizePitch(
                        noteMatrix[options.strings - x - 1][y]
                      )
                    )}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full">
        <div className="flex">
          {noteMatrix[0].map((_, y) => (
            <div
              className={`w-full text-center text-gray-600 w-[calc(100%/${
                options.frets + 1
              })]`}
            >
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
    </div>
  );
}
