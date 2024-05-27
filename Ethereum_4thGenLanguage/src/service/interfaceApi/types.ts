import { ContractInput, Event, Step } from "../../interfaces/contractDataTypes";
import { Item, User, UserRole } from "../../interfaces/dataTypes";

export interface GenereicResponse {
  status: string;
  message: string;
}
export interface HashResponse {
  //for any method that returns a hash mapped to IPFS, such as register, uploadIdentity
  ipfsHash: string;
}
export interface LoginResponse {
  userNode: User;
  userID: number;
  token: any;
}
export interface ItemResponse {
  ipfsHash: string;
  item: Item;
}
export interface DecodedResponse {
  userNode: User;
  userID: number;
}

export interface VerificationInput {
  hash?: string;
  type: any;
  id?: any;
  updatedMetadata: { status: "VERIFIED" };
}
export interface VerifyHashInput {
  oracleAddress: string;
  oracleVerificationHash: string;
  type: any;
  itemID?: any;
  stake: any;
  sellerID?: any;
}
export interface AddStepInput {
  stepProcess: string;
  party: UserRole;
  ethAddress: string;
}

export interface CreateContractInput {
  sellerID?: number;
  steps: Step[];
  itemID: any;
  values: ContractInput;
  username: string;
}
export interface AddBuyerInput {
  values: ContractInput;
  steps: Step[];
  contractID: number;
  contractName: string;
}

export interface TransactionInput {
  web3: any;
  price: any;
  from: any;
  to: any;
}
export interface ContractOutput {
  id: number;
  abi: any;
  itemID: any;
  bytecode: any;
  sellerID: number;
  name: string;
  contractAddress: any;
}

export interface StepCompletionInput {
  stepsNo: number[];
  contractID: any;
}

export interface VerifyStepsInput {
  contractID: any;
  stepsNo: number[];
  oracleAddress: any;
  stake: any;
}

export interface EthAddressOutput {
  item: {
    oracleAddress: any;
  };
  seller: {
    oracleAddress: any;
  };
}
