import React, { useState } from "react";
import { pitchToNote, normalizePitch } from "utils/musicalScales";

interface Props {
  scale: {
    root: number;
    notes: number[];
    degree: number;
    mode: number;
  };
  options: {
    strings: number;
    frets: number;
    tuning: number[];
  };
}

export default function Guitar({ scale, options }: Props) {
  const noteMatrix = options.tuning.map((root) => {
    const noteSequence = [root];
    for (let i = 1; i < options.frets + 1; i++)
      noteSequence.push(normalizePitch(root + i));

    return noteSequence;
  });

  return (
    <div className="w-full h-64 my-8 px-16">
      <div className="w-full flex flex-col h-[13.5rem]">
        {Array(options.strings - 1)
          .fill(0)
          .map((x, xlen) => (
            <div className="flex flex-grow">
              {Array(options.frets + 1)
                .fill(0)
                .map((y, ylen) => (
                  <div
                    className={
                      ylen === 0
                        ? "border-gray-200 border-r-8 ml-[-2px] flex-grow"
                        : xlen === options.strings - 2
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
          {Array(options.strings)
            .fill(0)
            .map((_, x) => (
              <tr className="">
                {Array(options.frets + 1)
                  .fill(0)
                  .map((_, y) => (
                    <td
                      className={`text-center w-[calc(100%/${
                        options.frets + 1
                      })]`}
                    >
                      <button
                        className={`w-8 h-8 bg-white border-2 border-gray-200 rounded-xl
                      ${
                        scale.notes[0] ===
                        normalizePitch(noteMatrix[options.strings - x - 1][y])
                          ? " bg-purple-300 border-purple-500"
                          : scale.notes.includes(
                              normalizePitch(
                                noteMatrix[options.strings - x - 1][y]
                              )
                            ) === true
                          ? " bg-blue-300 border-blue-500"
                          : ""
                      }`}
                      >
                        {pitchToNote({
                          pitch: normalizePitch(
                            noteMatrix[options.strings - x - 1][y]
                          ),
                          degree: scale.degree,
                        })}
                      </button>
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
      <div className="w-full">
        <div className="flex">
          {Array(options.frets + 1)
            .fill(0)
            .map((_, x) => (
              <div
                className={`w-full text-center text-gray-600 w-[calc(100%/${
                  options.frets + 1
                })]`}
              >
                {x}
                <br />
                {x === 3
                  ? "⬤"
                  : x === 5
                  ? "⬤"
                  : x === 7
                  ? "⬤"
                  : x === 9
                  ? "⬤"
                  : x === 12
                  ? "⬤ ⬤"
                  : x === 15
                  ? "⬤"
                  : x === 17
                  ? "⬤"
                  : x === 19
                  ? "⬤"
                  : x === 21
                  ? "⬤"
                  : x === 24
                  ? "⬤"
                  : ""}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
