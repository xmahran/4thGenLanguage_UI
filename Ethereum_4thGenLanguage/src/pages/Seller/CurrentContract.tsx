import { useNavigate } from "react-router-dom";
import Header from "../../components/shared/Header";
import ListComponent from "../../components/shared/ListComponent";
import Button from "../../components/shared/Button";
import { useMutation } from "@tanstack/react-query";
import { addStep } from "../../service/eth/contractApi";
import { useAppSelector } from "../../store/store";

interface CurrentContractProps {}
const CurrentContract: React.FC<CurrentContractProps> = ({}) => {
  const nav = useNavigate();
  const user = useAppSelector((state) => state.user.user);

  const { mutate: mutateStep, isPending: isLoadingStep } = useMutation({
    mutationFn: () =>
      addStep({
        stepProcess: "Seller transfer 100eth to the buyer",
        party: "seller",
        ethAddress: user.ethAddress,
      }),
  });
  return (
    <div>
      <Header title={`My Contracts / ContractName`} />
      <div className="py-10">
        <ListComponent
          img="step"
          title="Step 1"
          subTitle="Seller transfer 100eth to the buyer"
          checkList={true}
        />
      </div>
      <div className="flex justify-end">
        <Button
          light={true}
          loading={isLoadingStep}
          onClick={() => mutateStep()}
        >
          Complete Steps
        </Button>
      </div>
    </div>
  );
};
export default CurrentContract;
