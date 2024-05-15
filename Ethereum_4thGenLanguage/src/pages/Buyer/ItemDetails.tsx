import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getItemByID } from "../../service/interfaceApi/itemsApi";
import { useAppSelector } from "../../store/store";
import Header from "../../components/shared/Header";
import Loader from "../../components/shared/Loader";
import ErrorState from "../../components/shared/ErrorState";
import { ethRegExp, pinataURL } from "../../helpers/Constants";
import { Image } from "antd";
import { Rating } from "@mui/material";
import Button from "../../components/shared/Button";
import { validate } from "../../helpers/Validator";
import { valuesValidator } from "../../helpers/methods";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { ContractInput } from "../../interfaces/contractDataTypes";
import { getSellerByID } from "../../service/interfaceApi/sellerApi";
import BuyContractDialog from "./BuyContractDialog";
import { addBuyer, loadContract } from "../../service/eth/contractApi";
import { checkMetamask } from "../../service/eth/ethApi";
import { AddBuyerInput } from "../../service/interfaceApi/types";

interface ItemDetailsProps {}
const ItemDetails: React.FC<ItemDetailsProps> = ({}) => {
  const nav = useNavigate();

  const user = useAppSelector((state) => state.user.user);
  const [isOpenContract, setIsOpenContract] = useState<boolean>(false);

  const { itemID } = useParams();

  const handleChange = (name: string, value: any) => {
    setValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const {
    data: currItem,
    isLoading: isLoadingItem,
    isError: isErrorItem,
    refetch: refetchItems,
  } = useQuery({
    queryKey: ["getItemByID"],
    queryFn: () => getItemByID(itemID ? +itemID : 1),
  });

  const {
    data: currSeller,
    isLoading: isLoadingSeller,
    isSuccess: fetchedSeller,
    refetch: refetchSeller,
    isError: errorSeller,
  } = useQuery({
    queryKey: ["getSeller"],
    queryFn: () => getSellerByID(currItem?.sellerID),
    enabled: currItem ? true : false,
  });
  const { data: currContract, error: errorLoadContract } = useQuery({
    queryKey: ["loadContract"],
    queryFn: () => loadContract(currSeller?.id),
    enabled: currSeller ? true : false,
  });

  const [values, setValues] = useState<ContractInput>({
    sellerEthereumAddress: currContract?.seller?.ethAddress
      ? currContract.seller.ethAddress
      : "",
    sellerIdentityProofAddress: currContract?.seller?.identityProofImg
      ? currContract.seller.identityProofImg
      : "",
    sellerIdentityType: currContract?.seller?.identityProofType
      ? currContract.seller.identityProofType
      : "",
    sellerImageHash: currContract?.seller?.identityProofImgHash
      ? currContract.seller.identityProofImgHash
      : "",
    sellerAddressOracle: "0xB1Be0fC64A5eB38B939dC7041475Ea774b2c0173",
    sellerHashOracle: "dniewpk",
    itemAddress: currContract?.item?.itemProofImg
      ? currContract?.item?.itemProofImg
      : "",
    itemHash: currContract?.item?.itemProofImgHash
      ? currContract?.item?.itemProofImgHash
      : "",
    itemAddressOracle: "0xB1Be0fC64A5eB38B939dC7041475Ea774b2c0173",
    itemHashOracle: "dinei",
    contractType: currContract?.type ? currContract.type : "",
    transferDate: currContract?.date,
  });

  const { data: balanceResponse } = useQuery({
    queryKey: ["getAccData"],
    queryFn: () => checkMetamask(currContract?.price ? currContract.price : 0),
    enabled: currContract ? true : false,
  });

  const { mutate: buy, isPending: loadingBuy } = useMutation({
    mutationFn: (data: AddBuyerInput) => {
      return addBuyer(data);
    },
    onSuccess: () => {
      setIsOpenContract(false);
    },
  });

  const commitToBuy = () => {
    if (
      valuesValidator(values) &&
      validate([values.buyerEthereumAddress], [40], [ethRegExp])
    ) {
      if (balanceResponse?.status === "lte") {
        toast.error("Insufficent funds", {
          position: "top-center",
          className: "toast-message",
        });
      } else if (balanceResponse?.status === "no_metamask") {
        toast.info("Please install metamask", {
          position: "top-center",
          className: "toast-message",
        });
      } else if (balanceResponse?.status === "denied") {
        toast.info("You declined the process, try agin", {
          position: "top-center",
          className: "toast-message",
        });
      } else if (balanceResponse?.status === "success") {
        let data: AddBuyerInput = {
          contractID: 1,
          contractName: currContract?.name ? currContract.name : "",
          steps: currContract?.steps ? currContract.steps : [],
          values: values,
        };
        buy(data);
      }
    } else {
      toast.error("Incorrect input fields", {
        position: "top-center",
        className: "toast-message",
      });
    }
  };

  return (
    <div>
      {isLoadingItem ? (
        <div className="mt-[20%]">
          <Loader size={60} />
        </div>
      ) : isErrorItem || errorLoadContract || errorSeller ? (
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
                <span className="text-gray-300 font-normal">Name: </span>{" "}
                {currItem?.itemName}
              </label>
              <label className="text-md font-bold">
                <span className="text-gray-300 font-normal">Price: </span>{" "}
                {currItem?.itemPrice}ETH
              </label>
              <label className="text-md font-bold">
                <span className="text-gray-300 font-normal">
                  Item Description:{" "}
                </span>{" "}
                {currItem?.itemDescription}
              </label>
              <label className="text-md font-bold">
                <span className="text-gray-300 font-normal">
                  Item Location:{" "}
                </span>{" "}
                {currItem?.itemLocation}
              </label>
            </div>
            <label className="text-md font-bold text-start">
              <span className="text-gray-300 font-normal flex gap-x-2 ml-4">
                Image Hash:{" "}
                <div>
                  {currItem?.itemImgHash.map((hash, index) => (
                    <span key={index} className="text-white font-bold">
                      {hash},
                      <br />
                    </span>
                  ))}
                </div>
              </span>
            </label>
          </div>
          {currContract && (
            <BuyContractDialog
              isOpen={isOpenContract}
              onClickClose={() =>
                currContract ? setIsOpenContract(false) : {}
              }
              values={values}
              loadingBuy={loadingBuy}
              errorBuy={false}
              currContract={currContract}
              handleChange={handleChange}
              buyContract={commitToBuy}
            />
          )}
          <Header title="Seller Details" info />
          <div className="flex flex-col justify-center items-start space-y-4 py-4 ml-4">
            <label className="text-md font-bold">
              <span className="text-gray-300 font-normal">
                Full Legal Name:{" "}
              </span>{" "}
              {currSeller?.fullName}
            </label>
            <label className="text-md font-bold">
              <span className="text-gray-300 font-normal">Username: </span>{" "}
              {currSeller?.username}
            </label>

            <label className="text-md font-bold">
              <span className="text-gray-300 font-normal">Email: </span>{" "}
              {currSeller?.email}
            </label>
            <label className="text-md font-bold">
              <span className="text-gray-300 font-normal">Status: </span>{" "}
              <span className="text-green-500 font-bold">VERIFIED</span>
            </label>
            <label className="text-md font-bold">
              <span className="text-gray-300 font-normal">ETH Address: </span>{" "}
              {currSeller?.ethAddress}
            </label>
            <label className="text-md font-bold">
              <span className="text-gray-300 font-normal">Stake: </span>{" "}
              {currSeller?.stake}ETH
            </label>
            <label className="text-md font-bold">
              <span className="text-gray-300 font-normal flex gap-x-2">
                Rating: <Rating value={4} />
              </span>{" "}
            </label>
          </div>
          <Header title="Oracle Details" info />
          <div className="flex flex-col justify-center items-start space-y-4 py-4 ml-4">
            <label className="text-md font-bold">
              <span className="text-gray-300 font-normal"> Name: </span>{" "}
              {user?.username}
            </label>

            <label className="text-md font-bold">
              <span className="text-gray-300 font-normal">ETH Address: </span>{" "}
              {user?.email}
            </label>
            <label className="text-md font-bold">
              <span className="text-gray-300 font-normal flex gap-x-2">
                {" "}
                Rating: <Rating value={4} />
              </span>{" "}
            </label>
          </div>
          <div className="flex gap-x-4 justify-end mt-4">
            <Button dark loading={false} onClick={() => nav("/main/buyer")}>
              Back
            </Button>
            <Button
              light
              loading={false}
              onClick={() => {
                setIsOpenContract(true);
              }}
            >
              Commit to Buy
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
