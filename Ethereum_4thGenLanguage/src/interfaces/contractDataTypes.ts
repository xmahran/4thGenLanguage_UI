import { UserRole } from "./dataTypes";

export interface Contract {
  name: string;
  type: string;
  buyer: ContractBuyer;
  seller: ContractSeller;
  item: ContractItem;
  steps: Step[];
  date: string;
  amount: number;
}

export interface Step {
  party: UserRole;
  stepProcess: string;
  stepNumber: number;
}

export interface ContractItem {
  itemProofImg: string;
  itemProofImgHash: string;
  imgOracle: string;
  imgOracleHash: string;
  verified: boolean;
}

export interface ContractBuyer {
  ethAddress: string;
  identityProofType: string;
  identityProofImg: string;
  identityProofImgHash: string;
  identityProofOracle: string;
  identityProofOracleHash: string;
  verified: boolean;
}
export interface ContractSeller {
  ethAddress: string;
  identityProofType: string;
  identityProofImg: string;
  identityProofImgHash: string;
  identityProofOracle: string;
  identityProofOracleHash: string;
  verified: boolean;
}

export interface Event {
  eventName: string;
  argsNames: any[];
  argsValues: any[];
}
