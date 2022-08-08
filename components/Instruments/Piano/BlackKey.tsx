interface Props {
  className?: string;
  note: string;
  highlight?: number;
}

// <div
//   className={`
//     ${className ? className + " " : ""} ${
//     highlight === 1 ? rootColor : highlight === 2 ? noteColor : baseColor
//   } text-black pb-4 border-x-2 border-b-4 drop-shadow rounded-md h-full w-[calc(100%/7)] mx-0.5 flex flex-col-reverse text-center text-white`}
// >
//   {note}
// </div>

export default function BlackKey({
  className = "",
  note,
  highlight = 0,
}: Props) {
  const baseColor =
    "bg-gray-900 border-gray-200 border-b-gray-700 border-l-gray-800 border-r-gray-800";
  const rootColor =
    "bg-purple-900 border-purple-200 border-b-purple-700 border-l-purple-800 border-r-purple-800";
  const noteColor =
    "bg-blue-900 border-blue-200 border-b-blue-700 border-l-blue-800 border-r-blue-800";

  return (
    <div
      className={`
        ${className ? className + " " : ""} ${
        highlight === 1 ? rootColor : highlight === 2 ? noteColor : baseColor
      }  border-x-4 border-b-[16px] drop-shadow-md pb-2 rounded-md h-full w-[calc(100%/10)] mx-0.5 flex flex-col-reverse text-center text-white`}
    >
      {note}
    </div>
  );
}
