import { Interactible } from "../Interactible";

export interface Props {
  onClick?: Function;
  onMouseDown?: Function;
  onMouseUp?: Function;
  className?: string;
  note: string;
  pitch: number;
  highlight?: number;
}

export default function Note(props: Props) {
  return (
    <Interactible
      {...props}
      className={`${
        props.className ? props.className + " " : ""
      }w-8 rounded-xl`}
      highlightClassNames={[
        "bg-white border-gray-200",
        "bg-purple-300 border-purple-500",
        "bg-blue-300 border-blue-500",
      ]}
      isPressedClassNames={[
        "h-8 border-2 border-b-4",
        "h-[30px] mt-[2px] border-2 border-b-2",
      ]}
    />
  );
}
