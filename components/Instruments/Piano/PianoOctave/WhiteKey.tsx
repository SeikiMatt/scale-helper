import { Interactible } from "../../Interactible";

export interface Props {
  onClick?: Function;
  onMouseDown?: Function;
  onMouseUp?: Function;
  className?: string;
  note: string;
  pitch: number;
  highlight?: number;
}

export default function WhiteKey(props: Props) {
  console.log(props.className);
  return (
    <Interactible
      {...props}
      className={`${
        props.className ? props.className + " " : ""
      }pb-4 border-x-2 drop-shadow rounded-md w-[calc(100%/7)] mx-0.5 flex flex-col-reverse text-center`}
      highlightClassNames={[
        "text-black bg-gray-100 border-gray-200",
        "text-white bg-purple-400 border-purple-500",
        "text-white bg-blue-400 border-blue-500",
      ]}
      isPressedClassNames={[
        "border-b-[16px] h-full",
        "border-b-8 h-[calc(100%-8px)] mt-2",
      ]}
    />
  );
}
