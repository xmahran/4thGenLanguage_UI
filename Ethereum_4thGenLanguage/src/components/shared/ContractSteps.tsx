import React, { useState } from "react";
import StdTextBox from "./StdTextBox";
import { Step } from "../../interfaces/contractDataTypes";
import ImgButton from "./ImgButton";

interface ContractStepsProps {
  currSteps: Step[];
  type: string;
  buyerSteps?: Step[];
  onChange: (index: number, updatedStep: Step) => void;
}

const ContractSteps: React.FC<ContractStepsProps> = ({
  currSteps,
  onChange,
  buyerSteps,
  type,
}) => {
  const [steps, setSteps] = useState<number[]>([0]);

  const handleChange = (index: number, fieldName: string, value: string) => {
    const updatedStep = {
      ...currSteps[index],
      [fieldName]: value,
      status: "INPROGRESS",
    };
    onChange(index, updatedStep);
  };

  const handleAddStep = () => {
    setSteps([...steps, 1]);
  };

  return (
    <div>
      {!buyerSteps
        ? steps.map((_, index) => (
            <div className="flex space-x-4 justify-start" key={index}>
              <label>Step {index + 1}:</label>
              <StdTextBox
                width={400}
                placeholder="Step Details"
                disabled={type === "buyer" ? true : false}
                value={currSteps[index]?.stepProcess || ""}
                onChange={(e) =>
                  handleChange(index, "stepProcess", e.target.value)
                }
                className="ml-4"
              />
              <label>fullfilled by</label>
              <StdTextBox
                placeholder="Party - Buyer/Seller"
                value={currSteps[index]?.party || ""}
                disabled={type === "buyer" ? true : false}
                onChange={(e) => handleChange(index, "party", e.target.value)}
                className="ml-4"
              />
              <label>followed by</label>

              {index === steps.length - 1 && type === "seller" && (
                <ImgButton
                  hoveredImg="bluePlus"
                  img="darkPlus"
                  className="cursor-pointer"
                  onClick={handleAddStep}
                />
              )}
            </div>
          ))
        : buyerSteps.map((step, index) => (
            <div className="flex space-x-4 justify-start" key={index}>
              <label>Step {index + 1}:</label>
              <StdTextBox
                width={400}
                placeholder="Step Details"
                disabled={type === "buyer" ? true : false}
                value={step.stepProcess || ""}
                className="ml-4"
              />
              <label>fullfilled by</label>
              <StdTextBox
                placeholder="Party - Buyer/Seller"
                value={step.party || ""}
                disabled={type === "buyer" ? true : false}
                className="ml-4"
              />
              <label>followed by</label>

              {index === steps.length - 1 && type === "seller" && (
                <ImgButton
                  hoveredImg="bluePlus"
                  img="darkPlus"
                  onClick={handleAddStep}
                />
              )}
            </div>
          ))}
    </div>
  );
};

export default ContractSteps;
