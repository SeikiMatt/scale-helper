import React from "react";
import PianoOctave from "./PianoOctave";

interface Props {
  scale: {
    root: number;
    notes: number[];
    degree: number;
    mode: number;
  };
}

export default function Piano({ scale }: Props) {
  return (
    <div className="w-full flex h-[444px] py-9 px-2 lg:px-[7%] xl:px-[14%]">
      <div className="w-1/2">
        <PianoOctave scale={scale} />
      </div>
      <div className="w-1/2">
        <PianoOctave scale={scale} />
      </div>
    </div>
  );
}
