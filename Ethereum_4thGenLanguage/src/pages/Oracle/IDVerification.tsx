import { useQuery } from "@tanstack/react-query";
import Header from "../../components/shared/Header";
import Loader from "../../components/shared/Loader";
import ErrorState from "../../components/shared/ErrorState";
import EmptyState from "../../components/shared/EmptyState";
import { getIdentities } from "../../service/interfaceApi/sellerApi";
import IdentityCard from "../../components/Oracle/IdentityCard";
import { useNavigate } from "react-router-dom";

interface IDVerificationProps {}

const IDVerification: React.FC<IDVerificationProps> = () => {
  const nav = useNavigate();
  const {
    data: identities,
    isLoading: isLoadingIdentity,
    isError: isErrorIdentity,
    refetch: refetchIdenties,
  } = useQuery({
    queryKey: ["getAllIdentities"],
    queryFn: () => getIdentities(),
  });

  return (
    <div className="w-[90%]">
      <Header title="User Identities" />
      <div className="py-10">
        {isLoadingIdentity ? (
          <div className="mt-[20%]">
            <Loader size={60} />
          </div>
        ) : isErrorIdentity ? (
          <ErrorState
            title="An unknown error has occurred"
            subTitle="Retry the process"
            loading={false}
            onClick={() => refetchIdenties()}
          />
        ) : identities?.length === 0 ? (
          <EmptyState
            title="No identities available"
            subTitle="No user identities found to verify"
            buttonTitle="OK"
            loading={false}
            onClick={() => {}}
          />
        ) : (
          <div className="grid grid-cols-3 justify-center items-center">
            {identities?.map((identity, index) => (
              <div key={index} className="flex justify-center">
                <IdentityCard
                  identity={identity}
                  onClick={() => nav(identity.username)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IDVerification;
