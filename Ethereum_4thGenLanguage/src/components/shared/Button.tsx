import React from "react";
import { useState } from "react";
import Loader from "./Loader";

interface ButtonProps {
  light?: boolean;
  dark?: boolean;
  children: React.ReactNode;
  visible?: boolean;
  icon?: string;
  hoverIcon?: string;
  disabled?: boolean;
  onClick: (...args: any[]) => void;
  loading: boolean;
  width?: string;
  arrowDirection?: string;
}
const Button: React.FC<ButtonProps> = ({
  light,
  dark,
  children,
  visible,
  loading,
  disabled,
  width,
  arrowDirection,
  onClick,
  icon,
  hoverIcon,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <div>
      {light ? (
        <button
          disabled={loading || disabled}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => onClick()}
          className={`rounded-3xl px-4 ${
            width ? width : "w-[200px]"
          } h-[45px] text-sm bg-white text-black font-bold 
    ${!loading && "hover:bg-gradient-to-b to-purple-700 from-indigo-700"} 
    ${!loading && "hover:text-white ease-in-out trasnition duration-300"}`}
        >
          <div className="flex items-center justify-between">
            <span>{children}</span>
            {!loading ? (
              <img
                src={`/svgs/${isHovered ? "whiteRight" : "purpleRight"}.svg`}
                className="w-5 h-5"
              />
            ) : (
              <Loader size={20} />
            )}
          </div>
        </button>
      ) : dark ? (
        <button
          disabled={loading || disabled}
          onClick={() => onClick()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`rounded-3xl px-4 ${
            width ? width : "w-[200px]"
          } h-[45px] text-sm bg-black text-white font-bold 
  ${!loading && "hover:bg-white"}
  ${!loading && "hover:text-black ease-in-out trasnition duration-300"}`}
        >
          <div className="flex items-center justify-between">
            <span>{children}</span>
            {!loading ? (
              <img
                src={`/svgs/${isHovered ? "purpleRight" : "whiteRight"}.svg`}
                className="w-5 h-5"
              />
            ) : (
              <Loader size={20} />
            )}
          </div>{" "}
        </button>
      ) : (
        <button
          disabled={loading || disabled}
          onClick={() => onClick()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`rounded-3xl px-4 ${width ? width : "w-[120px]"} ${
            visible === false && "hidden"
          } h-[45px] text-sm bg-transparent 
          ${!loading && "hover:bg-[#1C1C1C]"}        
${!loading && "hover:ease-in-out trasnition duration-300"}`}
        >
          <div className="flex items-center justify-between">
            {arrowDirection === "RIGHT" ? (
              <>
                <span>{children}</span>
                {!loading ? (
                  <img
                    src={`/svgs/${isHovered ? hoverIcon : icon}.svg`}
                    className="w-5 h-5"
                  />
                ) : (
                  <Loader size={20} />
                )}
              </>
            ) : (
              <>
                {!loading ? (
                  <img
                    src={`/svgs/${isHovered ? hoverIcon : icon}.svg`}
                    className="w-5 h-5"
                  />
                ) : (
                  <Loader size={20} />
                )}
                <span>{children}</span>
              </>
            )}
          </div>{" "}
        </button>
      )}
    </div>
  );
};
export default Button;
