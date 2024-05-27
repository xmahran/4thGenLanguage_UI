import {
  Contract,
  ContractInput,
  ContractItem,
  ContractSeller,
  Step,
} from "../../interfaces/contractDataTypes";
import { UserRole } from "../../interfaces/dataTypes";
import { authApi } from "../interfaceApi/authApi";
import {
  AddBuyerInput,
  EthAddressOutput,
  StepCompletionInput,
  VerifyHashInput,
} from "../interfaceApi/types";

export const verifyHash = async (data: VerifyHashInput): Promise<string> => {
  const response = await authApi.post("/contract/verify", data, "json");
  return response;
};
export const addBuyer = async (data: AddBuyerInput): Promise<string> => {
  const response = await authApi.post("/contract/addbuyer", data, "json");
  return response;
};

export const loadContract = async (sellerID: any): Promise<Contract> => {
  const response = await authApi.get(`/contract/loadcontract/${sellerID}`);
  let contractData = response.content[0];
  let contractValues: ContractInput = contractData.values;
  let currItem: ContractItem = {
    itemProofImg: contractValues.itemAddress,
    itemProofImgHash: contractValues.itemHash,
    imgOracle: contractValues.itemAddressOracle,
    imgOracleHash: contractValues.itemHashOracle,
  };
  let currSeller: ContractSeller = {
    ethAddress: contractValues.sellerEthereumAddress,
    identityProofImg: contractValues.sellerIdentityProofAddress,
    identityProofImgHash: contractValues.sellerImageHash,
    identityProofType: contractValues.sellerIdentityType,
    identityProofOracle: contractValues.sellerAddressOracle,
    identityProofOracleHash: contractValues.sellerHashOracle,
  };
  let currContract: Contract = {
    id: contractData.contractID,
    name: contractData.contractName,
    type: contractValues.contractType,
    price: contractData.values.price,
    date: contractData.values.transferDate,
    item: currItem,
    seller: currSeller,
    penalty: contractData.values.penalty,
    steps: contractData.steps,
  };
  return currContract;
};
export const loadContractForOracle = async (
  sellerID: any
): Promise<Contract> => {
  const response = await authApi.get(`/contract/loadcontract/${sellerID}`);
  let contractData = response.content[0];
  let contractValues: ContractInput = contractData.values;
  let currItem: ContractItem = {
    itemProofImg: contractValues.itemAddress,
    itemProofImgHash: contractValues.itemHash,
    imgOracle: contractValues.itemAddressOracle,
    imgOracleHash: contractValues.itemHashOracle,
  };
  let currSeller: ContractSeller = {
    ethAddress: contractValues.sellerEthereumAddress,
    identityProofImg: contractValues.sellerIdentityProofAddress,
    identityProofImgHash: contractValues.sellerImageHash,
    identityProofType: contractValues.sellerIdentityType,
    identityProofOracle: contractValues.sellerAddressOracle,
    identityProofOracleHash: contractValues.sellerHashOracle,
  };
  let newSteps: Step[] = [];
  for (const step of contractData.steps) {
    if (step.status === "COMPLETED") newSteps.push(step);
  }
  let currContract: Contract = {
    id: contractData.contractID,
    name: contractData.contractName,
    type: contractValues.contractType,
    price: contractData.values.price,
    date: contractData.values.transferDate,
    item: currItem,
    seller: currSeller,
    penalty: contractData.values.penalty,
    steps: newSteps,
  };
  return currContract;
};
export const loadContractForUserSteps = async (
  sellerID: any,
  type: UserRole
): Promise<Contract> => {
  const response = await authApi.get(`/contract/loadcontract/${sellerID}`);
  let contractData = response.content[0];
  let contractValues: ContractInput = contractData.values;
  let steps: Step[] = [];
  if (type === "seller") {
    for (const step of contractData.steps) {
      console.log(step);

      if (step.party.toLowerCase() === "seller") {
        if (step.status != "COMPLETED") steps.push(step);
      }
    }
  }
  if (type === "buyer") {
    for (const step of contractData.steps) {
      if (step.party.toLowerCase() === "buyer") {
        if (step.status != "COMPLETED") steps.push(step);
      }
    }
  }
  let currItem: ContractItem = {
    itemProofImg: contractValues.itemAddress,
    itemProofImgHash: contractValues.itemHash,
    imgOracle: contractValues.itemAddressOracle,
    imgOracleHash: contractValues.itemHashOracle,
  };
  let currSeller: ContractSeller = {
    ethAddress: contractValues.sellerEthereumAddress,
    identityProofImg: contractValues.sellerIdentityProofAddress,
    identityProofImgHash: contractValues.sellerImageHash,
    identityProofType: contractValues.sellerIdentityType,
    identityProofOracle: contractValues.sellerAddressOracle,
    identityProofOracleHash: contractValues.sellerHashOracle,
  };
  let currContract: Contract = {
    id: contractData.contractID,
    name: contractData.contractName,
    type: contractValues.contractType,
    price: contractData.values.price,
    date: contractData.values.transferDate,
    item: currItem,
    seller: currSeller,
    penalty: contractData.values.penalty,
    steps: steps,
  };
  return currContract;
};

export const completeSteps = async (data: StepCompletionInput) => {
  const response = await authApi.post("/contract/completesteps", data, "json");
  return response;
};

export const getEthAddress = async (
  contractID: any
): Promise<EthAddressOutput> => {
  const response = await authApi.get(`/contract/getethaddress/${contractID}`);

  return response;
};
