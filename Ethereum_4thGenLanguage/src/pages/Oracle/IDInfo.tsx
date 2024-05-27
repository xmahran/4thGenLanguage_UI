import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import Header from "../../components/shared/Header";
import Loader from "../../components/shared/Loader";
import ErrorState from "../../components/shared/ErrorState";
import { pinataURL } from "../../helpers/Constants";
import { Image } from "antd";
import Button from "../../components/shared/Button";
import { getIdentityUser, verifyItem } from "../../service/eth/oracleApi";
import { useEffect } from "react";
import { verifyHash } from "../../service/eth/contractApi";
import { toast } from "react-toastify";

interface IDInfoProps {}
const IDInfo: React.FC<IDInfoProps> = ({}) => {
  const nav = useNavigate();

  const user = useAppSelector((state) => state.user.user);

  const { username } = useParams();

  const {
    data: currUser,
    isError: errorUser,
    isLoading: isLoadingUser,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["getIdentityUser"],
    queryFn: () => getIdentityUser(username ? username : ""),
  });

  useEffect(() => {
    refetchUser();
  }, [username]);

  const {
    mutate: mutateVerifyItem,
    isError: isErrorVerifyItem,
    isPending: isLoadingVerifyItem,
  } = useMutation({
    mutationFn: () =>
      verifyItem({
        id: currUser?.id,
        type: currUser?.role,
        updatedMetadata: { status: "VERIFIED" },
      }),
  });
  const {
    mutate: mutateVerifyHash,
    isError: isErrorVerifyHash,
    isPending: isLoadingVerifyHash,
  } = useMutation({
    mutationFn: () =>
      verifyHash({
        oracleAddress: user.ethAddress,
        oracleVerificationHash: user.identityPhotosHash[0],
        type: currUser?.role,
        stake: user.stake,
        sellerID: currUser?.id,
      }),
    onSuccess: () => {
      console.log(user);
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
    mutateVerifyItem();
    if (currUser?.role != "buyer") mutateVerifyHash();
  };

  return (
    <div>
      {isLoadingUser ? (
        <div className="mt-[20%]">
          <Loader size={60} />
        </div>
      ) : errorUser || isErrorVerifyHash || isErrorVerifyItem ? (
        <ErrorState
          title="An unknown error has occured"
          subTitle="Retry the process"
          loading={false}
          onClick={() => refetchUser()}
        />
      ) : (
        <div>
          <Header title={`Identities / ${currUser?.username}'s IDs`} />
          <div className="py-10">
            <div className="flex h-[400px] gap-x-10">
              {currUser?.identityPhotosHash.map((imgHash, index) => (
                <Image
                  src={`${pinataURL}/${imgHash}`}
                  width={250}
                  key={index}
                  height={350}
                  loading={"lazy"}
                />
              ))}
            </div>
          </div>
          <Header title="User Details" info />
          <div>
            <div className="flex flex-col justify-center items-start  text-start space-y-4 py-4 ml-4">
              <label className="text-md font-bold">
                <span className="text-[#333333] font-normal">Name: </span>{" "}
                {currUser?.fullName}
              </label>
              <label className="text-md font-bold">
                <span className="text-[#333333] font-normal">Role: </span>{" "}
                {currUser?.role}
              </label>
              {user.role === "seller" && (
                <label className="text-md font-bold">
                  <span className="text-[#333333] font-normal">Stake: </span>{" "}
                  {currUser?.stake}
                </label>
              )}
              <label className="text-md font-bold">
                <span className="text-[#333333] font-normal">Username: </span>{" "}
                {currUser?.username}
              </label>
              <label className="text-md font-bold">
                <span className="text-[#333333] font-normal">Email: </span>{" "}
                {currUser?.email}
              </label>
              <label className="text-md font-bold">
                <span className="text-[#333333] font-normal">
                  Ethereum Address:{" "}
                </span>{" "}
                {currUser?.ethAddress}
              </label>
            </div>
            <label className="text-md font-bold text-start">
              <span className="text-[#333333] font-normal flex gap-x-2 ml-4">
                Image Hash:{" "}
                <div>
                  {currUser?.identityPhotosHash.map((hash, index) => (
                    <span key={index} className="font-bold">
                      {hash},
                      <br />
                    </span>
                  ))}
                </div>
              </span>
            </label>
          </div>

          <div className="flex gap-x-4 justify-end mt-4 mr-5">
            <Button
              dark
              loading={false}
              onClick={() => nav("/main/oracle/items")}
            >
              Back
            </Button>
            <Button
              light
              loading={isLoadingVerifyHash || isLoadingVerifyItem}
              onClick={() => verify()}
            >
              Verify User
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IDInfo;
