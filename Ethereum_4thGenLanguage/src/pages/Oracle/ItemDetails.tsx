import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getItemByID } from "../../service/interfaceApi/itemsApi";
import { useAppSelector } from "../../store/store";
import Header from "../../components/shared/Header";
import Loader from "../../components/shared/Loader";
import ErrorState from "../../components/shared/ErrorState";
import { pinataURL } from "../../helpers/Constants";
import { Image } from "antd";
import { Rating } from "@mui/material";
import Button from "../../components/shared/Button";
import { getSellerByID } from "../../service/interfaceApi/sellerApi";
import { verifyHash } from "../../service/eth/contractApi";
import { verifyItem } from "../../service/eth/oracleApi";
import { toast } from "react-toastify";

interface ItemDetailsProps {}
const ItemDetails: React.FC<ItemDetailsProps> = ({}) => {
  const nav = useNavigate();

  const user = useAppSelector((state) => state.user.user);

  const { itemID } = useParams();

  const {
    data: currItem,
    isLoading: isLoadingItem,
    isError: isErrorItem,
    refetch: refetchItems,
  } = useQuery({
    queryKey: ["getItemByID"],
    queryFn: () => getItemByID(itemID ? +itemID : 1),
  });
  const { data: currSeller, isError: errorSeller } = useQuery({
    queryKey: ["getSeller"],
    queryFn: () => getSellerByID(currItem?.sellerID),
    enabled: currItem ? true : false,
  });

  const {
    mutate: mutateVerifyItem,
    isError: isErrorVerifyItem,
    isPending: isLoadingVerifyItem,
  } = useMutation({
    mutationFn: (itemID: any) =>
      verifyItem({
        id: itemID,
        type: "item",
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
        type: "item",
        itemID: itemID,
        stake: user.stake,
      }),
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
  const verify = (itemID: any) => {
    mutateVerifyItem(itemID);
    mutateVerifyHash();
  };

  return (
    <div>
      {isLoadingItem ? (
        <div className="mt-[20%]">
          <Loader size={60} />
        </div>
      ) : isErrorItem || isErrorVerifyHash || isErrorVerifyItem ? (
        <ErrorState
          title="An unknown error has occured"
          subTitle="Retry the process"
          loading={false}
          onClick={() => refetchItems()}
        />
      ) : (
        <div>
          <Header title={`Items / ${currItem?.itemName}`} />
          <div className="py-10">
            <div className="flex h-[400px] gap-x-10">
              {currItem?.itemImgHash.map((imgHash, index) => (
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
          <Header title="Item Details" info />
          <div>
            <div className="flex flex-col justify-center items-start  text-start space-y-4 py-4 ml-4">
              <label className="text-md font-bold">
                <span className="text-[#333333] font-normal">Name: </span>{" "}
                {currItem?.itemName}
              </label>
              <label className="text-md font-bold">
                <span className="text-[#333333] font-normal">Price: </span>{" "}
                {currItem?.itemPrice}ETH
              </label>
              <label className="text-md font-bold">
                <span className="text-[#333333] font-normal">
                  Item Description:{" "}
                </span>{" "}
                {currItem?.itemDescription}
              </label>
              <label className="text-md font-bold">
                <span className="text-[#333333] font-normal">
                  Item Location:{" "}
                </span>{" "}
                {currItem?.itemLocation}
              </label>
            </div>
            <label className="text-md font-bold text-start">
              <span className="text-[#333333] font-normal flex gap-x-2 ml-4">
                Image Hash:{" "}
                <div>
                  {currItem?.itemImgHash.map((hash, index) => (
                    <span key={index} className="font-bold">
                      {hash},
                      <br />
                    </span>
                  ))}
                </div>
              </span>
            </label>
          </div>

          <Header title="Seller Details" info />
          <div className="flex flex-col justify-center items-start space-y-4 py-4 ml-4">
            <label className="text-md font-bold">
              <span className="text-[#333333] font-normal">
                Full Legal Name:{" "}
              </span>{" "}
              {currSeller?.fullName}
            </label>
            <label className="text-md font-bold">
              <span className="text-[#333333] font-normal">Username: </span>{" "}
              {currSeller?.username}
            </label>

            <label className="text-md font-bold">
              <span className="text-[#333333] font-normal">Email: </span>{" "}
              {currSeller?.email}
            </label>
            <label className="text-md font-bold">
              <span className="text-[#333333] font-normal">Status: </span>{" "}
              <span className="text-[#4CAF50] font-bold">VERIFIED</span>
            </label>
            <label className="text-md font-bold">
              <span className="text-[#333333] font-normal">ETH Address: </span>{" "}
              {currSeller?.ethAddress}
            </label>
            <label className="text-md font-bold">
              <span className="text-[#333333] font-normal">Stake: </span>{" "}
              {currSeller?.stake}ETH
            </label>
            <label className="text-md font-bold">
              <span className="text-[#333333] font-normal flex gap-x-2">
                Rating: <Rating name="read-only" value={5} readOnly />
              </span>{" "}
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
              onClick={() => verify(itemID)}
            >
              Verify Item
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
