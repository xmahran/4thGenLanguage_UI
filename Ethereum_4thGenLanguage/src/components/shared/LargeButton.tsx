import { useState } from "react";

interface LargeButtonProps {
  title: string;
  subTitle: string;
  width?: number;
  icon: string;
  onClick: (key?: string) => void;
}
const LargeButton: React.FC<LargeButtonProps> = ({
  title,
  subTitle,
  icon,
  width,
  onClick,
}) => {
  return (
    <div
      className={`w-[${width}px] h-[70px] hover:bg-[#EAEAEA] cursor-pointer rounded-3xl flex justify-between items-center p-5  border border-[#EAEAEA]`}
      onClick={() => onClick()}
    >
      <div className={`flex flex-col gap-y-1 cursor-pointer`}>
        <label className="font-bold text-start">{title}</label>
        <label className="text-[#7C7F82] text-sm text-start">{subTitle}</label>
      </div>

      <img src={`/svgs/${icon}.svg`} className="w-6 h-6 ml-4" />
    </div>
  );
};
export default LargeButton;
