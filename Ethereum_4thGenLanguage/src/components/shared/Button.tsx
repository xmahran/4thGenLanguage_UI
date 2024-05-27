import React from "react";
import Loader from "./Loader";

interface ButtonProps {
  light?: boolean;
  dark?: boolean;
  children: React.ReactNode;
  visible?: boolean;
  icon?: string;
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
}) => {
  return (
    <div>
      {light ? (
        <button
          disabled={loading || disabled}
          onClick={() => onClick()}
          className={`rounded-3xl px-4 ${
            width ? width : "w-[200px]"
          } h-[45px] text-sm bg-[#2196F3] text-white font-bold 
    ${!loading && "hover:bg-[#1780C2]"}`}
        >
          <div className="flex items-center justify-between">
            <span>{children}</span>
            {!loading ? (
              <img src={`/svgs/whiteRight.svg`} className="w-5 h-5" />
            ) : (
              <Loader size={20} />
            )}
          </div>
        </button>
      ) : dark ? (
        <button
          disabled={loading || disabled}
          onClick={() => onClick()}
          className={`rounded-3xl px-4 ${
            width ? width : "w-[200px]"
          } h-[45px] text-sm bg-[#FF7324] text-white font-bold 
  ${!loading && "hover:bg-[#e65e1e]"}`}
        >
          <div className="flex items-center justify-between">
            <span>{children}</span>
            {!loading ? (
              <img src={`/svgs/whiteRight.svg`} className="w-5 h-5" />
            ) : (
              <Loader size={20} />
            )}
          </div>{" "}
        </button>
      ) : (
        <button
          disabled={loading || disabled}
          onClick={() => onClick()}
          className={`rounded-3xl px-4 ${width ? width : "w-[120px]"} ${
            visible === false && "hidden"
          } h-[45px] text-sm bg-transparent 
          ${!loading && "hover:bg-[#EAEAEA]"}        
${!loading && "hover:ease-in-out trasnition duration-300"}`}
        >
          <div className="flex items-center justify-between">
            {arrowDirection === "RIGHT" ? (
              <>
                <span>{children}</span>
                {!loading ? (
                  <img src={`/svgs/blueRight.svg`} className="w-5 h-5" />
                ) : (
                  <Loader size={20} />
                )}
              </>
            ) : (
              <>
                {!loading ? (
                  <img src={`/svgs/leftRight.svg`} className="w-5 h-5" />
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
