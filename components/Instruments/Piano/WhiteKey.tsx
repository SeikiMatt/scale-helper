interface Props {
  className?: string;
  note?: string;
  highlighted?: boolean;
}

export default function WhiteKey({ className = "", note }: Props) {
  return (
    <div
      className={
        (className ? className + " " : "") +
        "bg-black h-full w-[calc(100%/7)] mx-0.5 flex flex-col-reverse text-center text-white"
      }
    >
      {note}
    </div>
  );
}
