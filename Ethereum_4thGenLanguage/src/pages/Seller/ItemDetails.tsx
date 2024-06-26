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
import TextBox from "../../components/shared/TextBox";
import { validate } from "../../helpers/Validator";
import { valuesValidator } from "../../helpers/methods";
import { toast } from "react-toastify";
import { createcontract } from "../../service/eth/ethApi";
import { useState } from "react";
import { ContractInput, Step } from "../../interfaces/contractDataTypes";
import AddContractDialog from "./AddContractDialog";

interface ItemDetailsProps {}
const ItemDetails: React.FC<ItemDetailsProps> = ({}) => {
  const nav = useNavigate();

  const user = useAppSelector((state) => state.user.user);
  const [isOpenContract, setIsOpenContract] = useState<boolean>(false);

  const [steps, setSteps] = useState<Step[]>([]);
  const [contractType, setContractType] = useState<string>();

  const [values, setValues] = useState<ContractInput>({
    sellerEthereumAddress: "",
    sellerIdentityProofAddress: "",
    sellerIdentityType: "",
    sellerImageHash: "",
    sellerAddressOracle: "0xB1Be0fC64A5eB38B939dC7041475Ea774b2c0173",
    sellerHashOracle: "dniewpk",
    itemAddress: "",
    itemHash: "",
    itemAddressOracle: "0xB1Be0fC64A5eB38B939dC7041475Ea774b2c0173",
    itemHashOracle: "dinei",
    contractType: "",
    transferDate: new Date().toLocaleDateString("en-GB"),
  });
  const { itemID } = useParams();

  const handleChange = (name: string, value: any) => {
    setValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleStepChange = (index: number, updatedStep: Step) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = updatedStep;
    setSteps(updatedSteps);
  };
  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setContractType(value);
    let updatedValues = { ...values };
    updatedValues.contractType = value;
    setValues(updatedValues);
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
    data: contractAddress,
    isPending: isLoadingCreateContract,
    isError: isErrorCreateContract,
    mutate: mutateCreate,
  } = useMutation({
    mutationKey: ["createContract"],
    mutationFn: () =>
      createcontract({
        sellerID: user.id,
        steps: steps,
        username: user.username,
        values: values,
      }),
    onSuccess: () => {
      toast.success("Created your contract successfully", {
        position: "top-center",
        className: "toast-message",
      });
      setIsOpenContract(false);
    },
    onError: () => {
      toast.error("Unknown error occcured, try again", {
        position: "top-center",
        className: "toast-message",
      });
      setIsOpenContract(false);
    },
  });

  const createContractFunction = () => {
    if (
      valuesValidator(values) &&
      validate([values.sellerEthereumAddress], [40], [ethRegExp])
    ) {
      mutateCreate();
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
      ) : isErrorItem ? (
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
          <AddContractDialog
            isOpen={isOpenContract}
            onClickClose={() => setIsOpenContract(false)}
            steps={steps}
            values={values}
            loadingCreate={isLoadingCreateContract}
            errorCreate={isErrorCreateContract}
            handleChange={handleChange}
            handleStepChange={handleStepChange}
            createContract={createContractFunction}
          />

          <Header title="Seller Details" info />
          <div className="flex flex-col justify-center items-start space-y-4 py-4 ml-4">
            <label className="text-md font-bold">
              <span className="text-gray-300 font-normal">
                Full Legal Name:{" "}
              </span>{" "}
              {user?.fullName}
            </label>
            <label className="text-md font-bold">
              <span className="text-gray-300 font-normal">Username: </span>{" "}
              {user?.username}
            </label>

            <label className="text-md font-bold">
              <span className="text-gray-300 font-normal">Email: </span>{" "}
              {user?.email}
            </label>
            <label className="text-md font-bold">
              <span className="text-gray-300 font-normal">Status: </span>{" "}
              <span className="text-green-500 font-bold">VERIFIED</span>
            </label>
            <label className="text-md font-bold">
              <span className="text-gray-300 font-normal">ETH Address: </span>{" "}
              {user?.ethAddress}
            </label>
            <label className="text-md font-bold">
              <span className="text-gray-300 font-normal">Stake: </span>{" "}
              {user?.stake}ETH
            </label>
            <label className="text-md font-bold">
              <span className="text-gray-300 font-normal flex gap-x-2">
                Rating: <Rating name="read-only" value={4} readOnly />
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
                Rating: <Rating name="read-only" value={4} readOnly />
              </span>{" "}
            </label>
          </div>
          <div className="flex gap-x-4 justify-end mt-4">
            <TextBox
              label="Contract Type"
              type="text"
              value={contractType}
              onChange={handleChangeType}
            />

            <Button
              dark
              loading={false}
              onClick={() => nav("/main/seller/items")}
            >
              Back
            </Button>
            <Button
              light
              loading={false}
              onClick={() => {
                contractType
                  ? setIsOpenContract(true)
                  : toast.error("Enter required input field", {
                      position: "top-center",
                      className: "toast-message",
                    });
              }}
            >
              Create Contract
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
