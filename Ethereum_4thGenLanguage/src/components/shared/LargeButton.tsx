import { useState } from "react";

interface LargeButtonProps {
  title: string;
  subTitle: string;
  width?: number;
  icon: string;
  hoverIcon?: string;
  onClick: (key?: string) => void;
}
const LargeButton: React.FC<LargeButtonProps> = ({
  title,
  subTitle,
  icon,
  width,
  onClick,
  hoverIcon,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <div
      className={`w-[${width}px] h-[70px] hover:bg-[#1C1C1C] cursor-pointer rounded-3xl flex justify-between items-center p-5`}
      onClick={() => onClick()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex flex-col gap-y-1 cursor-pointer`}>
        <label className="font-bold text-start">{title}</label>
        <label className="text-[#7C7F82] text-sm text-start">{subTitle}</label>
      </div>
      {isHovered ? (
        <img src={`/svgs/${hoverIcon}.svg`} className="w-6 h-6 ml-4" />
      ) : (
        <img src={`/svgs/${icon}.svg`} className="w-6 h-6 ml-4" />
      )}
    </div>
  );
};
export default LargeButton;
