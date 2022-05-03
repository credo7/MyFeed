import { ReactNode } from "react";

export default function CustomButton(props: { children: ReactNode }) {
  return (
    <button className="py-[8px] px-[40px] bg-white border-[1px] rounded-[3px] text-sm">
      {props.children}
    </button>
  );
}
