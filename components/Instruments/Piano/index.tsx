import React, { useEffect } from "react";
import PianoOctave from "./PianoOctave";
import * as Tone from "tone";
import { noteUnicodeToAlphabet } from "utils/musicalScales";

interface Props {
  scale: {
    root: number;
    notes: number[];
    degree: number;
    mode: number;
  };
}

export default function Piano({ scale }: Props) {
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
    synth.triggerAttackRelease(noteUnicodeToAlphabet(note) + octave, "8n");
  }

  return (
    <div className="w-full flex h-[444px] py-9 px-2 lg:px-[7%] xl:px-[14%]">
      <div className="w-1/2">
        <PianoOctave scale={scale} playNote={playNote} octave={4} />
      </div>
      <div className="w-1/2">
        <PianoOctave scale={scale} playNote={playNote} octave={5} />
      </div>
    </div>
  );
}
