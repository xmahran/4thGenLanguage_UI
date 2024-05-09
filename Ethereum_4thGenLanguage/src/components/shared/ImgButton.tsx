import { useState } from "react";

interface ImgButtonProps {
  img: string;
  hoveredImg: string;
  onClick: () => void;
  className?: string;
}
const ImgButton: React.FC<ImgButtonProps> = ({
  img,
  hoveredImg,
  className,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <img
      src={isHovered ? `/svgs/${hoveredImg}.svg` : `/svgs/${img}.svg`}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    />
  );
};
export default ImgButton;
