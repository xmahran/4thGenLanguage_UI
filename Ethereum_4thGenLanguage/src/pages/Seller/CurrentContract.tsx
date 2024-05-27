import { useNavigate } from "react-router-dom";
import Header from "../../components/shared/Header";
import ListComponent from "../../components/shared/ListComponent";
import Button from "../../components/shared/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { completeSteps, loadContract } from "../../service/eth/contractApi";
import { useAppSelector } from "../../store/store";
import Loader from "../../components/shared/Loader";
import ErrorState from "../../components/shared/ErrorState";
import { useState } from "react";
import { toast } from "react-toastify";
import { StepCompletionInput } from "../../service/interfaceApi/types";
import EmptyState from "../../components/shared/EmptyState";

interface CurrentContractProps {}
const CurrentContract: React.FC<CurrentContractProps> = ({}) => {
  const nav = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const [checkedSteps, setCheckedSteps] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleCheckboxChange = (index: number) => {
    setCheckedSteps((prevState) => {
      const newCheckedSteps = { ...prevState };

      for (let i = 0; i < index; i++) {
        if (
          !newCheckedSteps[i] &&
          currContract?.steps[i].party === user.role &&
          currContract.steps[i].status != "COMPLETED"
        ) {
          toast.error(`Please check step ${i + 1} first`, {
            position: "top-center",
            className: "toast-message",
          });
          return prevState;
        }
      }

      newCheckedSteps[index] = !newCheckedSteps[index];
      return newCheckedSteps;
    });
  };
  const {
    data: currContract,
    isPending: isLoadingContract,
    isError: isErrorContract,
    refetch: refetchContracts,
  } = useQuery({
    queryKey: ["loadContractUser"],
    queryFn: () => loadContract(user.id),
  });
  const {
    mutate: mutateStep,
    isPending: isLoadingStep,
    isError: isErrorSteps,
  } = useMutation({
    mutationFn: (data: StepCompletionInput) => completeSteps(data),
    onSuccess: () => {
      nav(`/main/${user.role}/contracts`);
      toast.success(`Completed step(s)!`, {
        position: "top-center",
        className: "toast-message",
      });
    },
  });

  const complete = () => {
    if (!Object.values(checkedSteps).some((value) => value)) {
      toast.error("Please check atleast 1 step", {
        position: "top-center",
        className: "toast-message",
      });
    } else {
      const checkedStepIndices = Object.entries(checkedSteps)
        .filter(([_, isChecked]) => isChecked)
        .map(([index, _]) => parseInt(index));
      for (let i = 0; i < checkedStepIndices.length; i++) {
        if (
          checkedStepIndices[i] !== i &&
          currContract?.steps[i].party === user.role &&
          currContract.steps[i].status != "COMPLETED"
        ) {
          toast.error(`Please check steps in order up to step ${i + 1}`, {
            position: "top-center",
            className: "toast-message",
          });
          return;
        }
      }
      mutateStep({
        contractID: currContract?.id,
        stepsNo: checkedStepIndices,
      });
    }
  };

  return (
    <div>
      <Header title={`My Contracts / ${currContract?.name}`} />
      <div className="py-10">
        {isLoadingContract ? (
          <div className="mt-[20%]">
            <Loader size={60} />
          </div>
        ) : isErrorSteps || isErrorContract ? (
          <ErrorState
            title="An unknown error has occurred"
            subTitle="Retry the process"
            loading={false}
            onClick={() => refetchContracts()}
          />
        ) : currContract.steps.length === 0 ? (
          <EmptyState
            title="No steps available"
            subTitle="You may have completed all of your steps"
            buttonTitle="OK"
            loading={false}
            onClick={() => {}}
          />
        ) : (
          currContract?.steps.map((step, index) => (
            <ListComponent
              img="darkSteps"
              checkList
              completed={step.status === "COMPLETED"}
              disabled={step.party != user.role || step.status === "COMPLETED"}
              checked={checkedSteps[index]}
              onChangeCheckbox={() => handleCheckboxChange(index)}
              title={`Step ${index + 1} by ${step.party}`}
              subTitle={step.stepProcess}
            />
          ))
        )}
      </div>
      {currContract?.steps.length !== 0 && (
        <div className="flex justify-end mt-4 mr-4">
          <Button
            light={true}
            loading={isLoadingStep}
            onClick={() => complete()}
          >
            Complete Steps
          </Button>
        </div>
      )}
    </div>
  );
};
export default CurrentContract;
