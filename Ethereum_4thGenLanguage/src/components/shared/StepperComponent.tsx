import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { useState } from "react";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#FF7324",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#FF7324",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: "#2196F3",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundColor: "#2196F3",
  }),
}));

const labelStyle = {
  "&.MuiStepLabel-root": {
    "& .MuiStepLabel-label": {
      color: "#333333",
      fontFamily: "Raleway, sans-serif",
      fontSize: "0.875rem",
    },
  },
};

interface StepperComponentProps {
  steps: string[];
  givenIcons: string[];
  content: JSX.Element[];
  validated: boolean[];
  onClickLastBtn: () => void;
  loadingLastBtn: boolean;
}

const StepperComponent: React.FC<StepperComponentProps> = ({
  steps,
  givenIcons,
  content,
  validated,
  onClickLastBtn,
  loadingLastBtn,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {};

    givenIcons.forEach((icon, index) => {
      icons[(index + 1).toString()] = <img src={`/svgs/${icon}.svg`} />;
    });

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }
  const nextTab = () => {
    let newActiveStep = activeStep + 1;
    if (validated && validated[activeStep]) setActiveStep(newActiveStep);
    else {
      toast.error("Please fill out missing fields", {
        position: "top-center",
        className: "toast-message",
      });
    }
  };

  const prevTab = () => {
    let newActiveStep = activeStep - 1;
    setActiveStep(newActiveStep);
  };
  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <ToastContainer />
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel sx={labelStyle} StepIconComponent={ColorlibStepIcon}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="flex flex-col py-10">
        <div>{content[activeStep]}</div>
        <div className="flex justify-between px-[13%] py-[2%]">
          <Button
            onClick={() => prevTab()}
            arrowDirection="LEFT"
            loading={false}
            disabled={loadingLastBtn}
            visible={activeStep != 0 ? true : false}
          >
            Previous
          </Button>
          <Button
            onClick={() => nextTab()}
            arrowDirection="RIGHT"
            loading={false}
            visible={activeStep != steps.length - 1 ? true : false}
          >
            Next
          </Button>
          {activeStep === steps.length - 1 && validated[2] && (
            <Button
              light={true}
              loading={loadingLastBtn}
              onClick={onClickLastBtn}
            >
              Register
            </Button>
          )}
        </div>
      </div>
    </Stack>
  );
};

export default StepperComponent;
