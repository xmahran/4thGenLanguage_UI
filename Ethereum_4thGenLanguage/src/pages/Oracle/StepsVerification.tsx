import { useMutation, useQuery } from "@tanstack/react-query";
import Header from "../../components/shared/Header";
import { useNavigate, useParams } from "react-router-dom";
import { loadContractForOracle } from "../../service/eth/contractApi";
import ListComponent from "../../components/shared/ListComponent";
import Button from "../../components/shared/Button";
import Loader from "../../components/shared/Loader";
import ErrorState from "../../components/shared/ErrorState";
import EmptyState from "../../components/shared/EmptyState";
import { useState } from "react";
import { VerifyStepsInput } from "../../service/interfaceApi/types";
import { verifySteps } from "../../service/eth/oracleApi";
import { toast } from "react-toastify";
import { useAppSelector } from "../../store/store";

interface StepsVerificationProps {}
const StepsVerification: React.FC<StepsVerificationProps> = () => {
  const nav = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const [checkedSteps, setCheckedSteps] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleCheckboxChange = (index: number) => {
    setCheckedSteps((prevState) => {
      const newCheckedSteps = { ...prevState };
      newCheckedSteps[index] = !newCheckedSteps[index];
      return newCheckedSteps;
    });
  };
  const { sellerID } = useParams();
  const {
    data: currContract,
    isError: errorLoadContract,
    isPending: isLoadingContract,
    refetch: refetchContracts,
  } = useQuery({
    queryKey: ["loadContractOracle"],
    queryFn: () => loadContractForOracle(sellerID),
  });
  const {
    mutate: mutateStep,
    isPending: isLoadingStep,
    isError: isErrorSteps,
  } = useMutation({
    mutationFn: (data: VerifyStepsInput) => verifySteps(data),
    onSuccess: () => {
      toast.success(
        "Verification success, and reward is being transferred to your account now",
        {
          position: "top-center",
          className: "toast-message",
        }
      );
      nav("/main/oracle");
    },
  });
  const verify = () => {
    if (!Object.values(checkedSteps).some((value) => value)) {
      toast.error(`Select atleast 1 step to verify`, {
        position: "top-center",
        className: "toast-message",
      });
    } else {
      const checkedStepIndices = Object.entries(checkedSteps)
        .filter(([_, isChecked]) => isChecked)
        .map(([index, _]) => parseInt(index));
      mutateStep({
        contractID: currContract?.id,
        oracleAddress: user.ethAddress,
        stepsNo: checkedStepIndices,
        stake: user.stake,
      });
    }
  };
  return (
    <div>
      <Header title={"Contract Steps"} />
      <div className="py-10">
        {isLoadingContract ? (
          <div className="mt-[20%]">
            <Loader size={60} />
          </div>
        ) : errorLoadContract || isErrorSteps ? (
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
              disabled={step.status === "VERIFIED"}
              completed={step.status === "VERIFIED"}
              checked={checkedSteps[index]}
              onChangeCheckbox={() => handleCheckboxChange(index)}
              title={`Step ${index + 1} by ${step.party}`}
              subTitle={step.stepProcess}
            />
          ))
        )}
      </div>
      {!currContract?.steps.every((step) => step.status === "VERIFIED") && (
        <div className="flex gap-x-4 justify-end mt-4 mr-5">
          <Button
            dark
            loading={false}
            onClick={() => nav("/main/oracle/contract")}
          >
            Back
          </Button>
          <Button light loading={isLoadingStep} onClick={() => verify()}>
            Verify Step(s)
          </Button>
        </div>
      )}
    </div>
  );
};

export default StepsVerification;
