import { useMutation, useQuery } from "@tanstack/react-query";
import Header from "../../components/shared/Header";
import Loader from "../../components/shared/Loader";
import ErrorState from "../../components/shared/ErrorState";
import EmptyState from "../../components/shared/EmptyState";
import { getIdentities } from "../../service/api/sellerApi";
import IdentityCard from "../../components/Oracle/IdentityCard";
import { verifyID } from "../../service/eth/oracleApi";
import { verifyHash } from "../../service/eth/contractApi";

interface IDVerificationProps {}

const IDVerification: React.FC<IDVerificationProps> = () => {
  const {
    data: identities,
    isLoading: isLoadingIdentity,
    isError: isErrorIdentity,
    refetch: refetchIdenties,
  } = useQuery({
    queryKey: ["getAllIdentities"],
    queryFn: () => getIdentities(),
  });

  const {
    mutate: mutateVerifyID,
    isError: isErrorVerifyID,
    isPending: isLoadingVerifyID,
  } = useMutation({
    mutationFn: (hash: string) =>
      verifyID({ hash: hash, updatedMetadata: { status: "VERIFIED" } }),
  });
  const {
    mutate: mutateVerifyHash,
    isError: isErrorVerifyHash,
    isPending: isLoadingVerifyHash,
  } = useMutation({
    mutationFn: () =>
      verifyHash({
        oracleAddress: "",
        oracleVerificationHash: "",
        type: "seller",
      }),
  });
  const oracleVerify = (hash: string) => {
    mutateVerifyID(hash);
    //  mutateVerifyHash();
  };
  return (
    <div>
      <Header title="User Identities" />
      <div className="py-10">
        {isLoadingIdentity || isLoadingVerifyID || isLoadingVerifyHash ? (
          <div className="mt-[20%]">
            <Loader size={60} />
          </div>
        ) : isErrorIdentity || isErrorVerifyID || isErrorVerifyHash ? (
          <ErrorState
            title="An unknown error has occurred"
            subTitle="Retry the process"
            loading={false}
            onClick={() => refetchIdenties()}
          />
        ) : identities?.length === 0 ? (
          <EmptyState
            title="No identities available"
            subTitle="None of the users uploaded their identities"
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
                  onClick={() => oracleVerify(identity.imgHash)}
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
