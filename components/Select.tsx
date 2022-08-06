import React, { useState } from "react";

interface Props {
  options: { label: string; value: string }[];
  className?: string;
  onChange: Function;
}

export default function Select({ ...props }: Props) {
  return (
    <select
      onChange={(e) => props.onChange(e)}
      className={`h-12 w-auto px-4 py-2 hover:h-[calc(3rem-2px)] hover:mt-[2px] text-xl text-gray-700 hover:text-blue-400 font-semibold bg-white border-2 border-b-4 border-gray-200 hover:border-blue-300 hover:border-2 rounded-xl ${
        props.className ? " " + props.className : ""
      }`}
    >
      {props.options.map((opt) => (
        <option
          className="h-8 text-base text-gray-700"
          key={opt.value}
          value={opt.value}
        >
          {opt.label}
        </option>
      ))}
    </select>
  );
}
