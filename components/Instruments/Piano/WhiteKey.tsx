interface Props {
  className?: string;
  note: string;
  highlight?: number;
}

export default function WhiteKey({
  className = "",
  note,
  highlight = 0,
}: Props) {
  const baseColor = "text-black bg-gray-100 border-gray-200";
  const rootColor = "bg-purple-400 border-purple-500";
  const noteColor = "bg-blue-400 border-blue-500";

  return (
    <div
      className={`
        ${className ? className + " " : ""} ${
        highlight === 1 ? rootColor : highlight === 2 ? noteColor : baseColor
      } pb-4 border-x-2 border-b-8 drop-shadow rounded-md h-full w-[calc(100%/7)] mx-0.5 flex flex-col-reverse text-center text-white`}
    >
      {note}
    </div>
  );
}
