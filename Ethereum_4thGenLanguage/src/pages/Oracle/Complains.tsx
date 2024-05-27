import { useQuery } from "@tanstack/react-query";
import Header from "../../components/shared/Header";
import ListComponent from "../../components/shared/ListComponent";
import Loader from "../../components/shared/Loader";
import ErrorState from "../../components/shared/ErrorState";
import EmptyState from "../../components/shared/EmptyState";
import { getAllComplaints } from "../../service/interfaceApi/buyerApi";

interface ComplainsProps {}
const Complains: React.FC<ComplainsProps> = () => {
  const {
    data: complaints,
    refetch: refetchComplaints,
    isLoading: isLoadingComp,
    isError: isErrorComp,
  } = useQuery({
    queryKey: ["getComp"],
    queryFn: () => getAllComplaints(),
  });
  return (
    <div>
      <Header
        title="Buyer Complaints"
        refresh
        onClickRefresh={() => refetchComplaints()}
      />
      <div className="py-10 w-[90%]">
        {isLoadingComp ? (
          <div className="mt-[10%]">
            <Loader size={60} />
          </div>
        ) : isErrorComp ? (
          <ErrorState
            title="An unknown error has occurred"
            subTitle="Retry the process"
            loading={false}
            onClick={() => refetchComplaints()}
          />
        ) : complaints?.length === 0 ? (
          <EmptyState
            title="No complains available"
            subTitle="No complains were added"
            buttonTitle="OK"
            loading={false}
            onClick={() => {}}
          />
        ) : (
          complaints?.map((complain, index) => (
            <div key={index}>
              <ListComponent
                oracle
                title={complain.complainTitle}
                img="darkEvents"
                subTitle={complain.description}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Complains;
