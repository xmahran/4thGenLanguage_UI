import {
  Contract,
  ContractInput,
  ContractItem,
  ContractSeller,
} from "../../interfaces/contractDataTypes";
import { authApi } from "../interfaceApi/authApi";
import {
  AddBuyerInput,
  AddStepInput,
  VerifyHashInput,
} from "../interfaceApi/types";

export const addStep = async (data: AddStepInput): Promise<string> => {
  const response = await authApi.post("/contract/addstep", data, "json");
  return response;
};

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
