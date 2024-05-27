import { useNavigate } from "react-router-dom";
import Header from "../../components/shared/Header";
import ListComponent from "../../components/shared/ListComponent";
import { useQuery } from "@tanstack/react-query";
import { getAllContracts } from "../../service/eth/oracleApi";
import Loader from "../../components/shared/Loader";
import ErrorState from "../../components/shared/ErrorState";
import EmptyState from "../../components/shared/EmptyState";

interface ContractsProps {}
const Contracts: React.FC<ContractsProps> = ({}) => {
  const nav = useNavigate();
  const {
    data: contracts,
    isLoading: isLoadingContracts,
    isError: isErrorContracts,
    refetch: refetchContracts,
  } = useQuery({
    queryKey: ["getAllContracts"],
    queryFn: () => getAllContracts(),
  });
  return (
    <div className="w-[90%]">
      <Header title="My Contracts" />
      <div className="py-10">
        {isLoadingContracts ? (
          <div className="mt-[20%]">
            <Loader size={60} />
          </div>
        ) : isErrorContracts ? (
          <ErrorState
            title="An unknown error has occurred"
            subTitle="Retry the process"
            loading={false}
            onClick={() => refetchContracts()}
          />
        ) : contracts?.length === 0 ? (
          <EmptyState
            title="No contracts available"
            subTitle="No contracts were created"
            buttonTitle="OK"
            loading={false}
            onClick={() => {}}
          />
        ) : (
          contracts?.map((contract, index) => (
            <ListComponent
              key={index}
              img="darkContract"
              title={contract.name}
              onClick={() =>
                window.location.href.includes("steps")
                  ? nav(`${contract.sellerID}`)
                  : nav(`${contract.id}`)
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Contracts;
