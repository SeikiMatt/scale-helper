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
  return (
    <Interactible
      {...props}
      className={`${
        props.className ? props.className + " " : ""
      }border-x-4 drop-shadow-md pb-2 rounded-md w-[calc(100%/10)] mx-0.5 flex flex-col-reverse text-center text-white`}
      highlightClassNames={[
        "bg-gray-900 border-gray-200 border-b-gray-700 border-l-gray-800 border-r-gray-800",
        "bg-purple-900 border-purple-200 border-b-purple-700 border-l-purple-800 border-r-purple-800",
        "bg-blue-900 border-blue-200 border-b-blue-700 border-l-blue-800 border-r-blue-800",
      ]}
      isPressedClassNames={[
        "border-b-[16px] h-full",
        "border-b-8 h-[calc(100%-8px)] mt-2",
      ]}
    />
  );
}
