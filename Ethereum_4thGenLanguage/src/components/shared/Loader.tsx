import { CircularProgress } from "@mui/material";
import React from "react";

interface LoaderProps {
  className?: string;
  size?: number;
}
const Loader: React.FC<LoaderProps> = ({ className, size }) => {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#303F9F" />
            <stop offset="100%" stopColor="#7B1FA2" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
        size={size}
        className={className}
      />
    </React.Fragment>
  );
};

export default Loader;
