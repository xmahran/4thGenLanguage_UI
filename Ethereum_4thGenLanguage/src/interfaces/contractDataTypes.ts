import { UserRole } from "./dataTypes";

export interface Contract {
  id?: number;
  name: string;
  type: string;
  buyer?: ContractBuyer;
  seller?: ContractSeller;
  item: ContractItem;
  steps: Step[];
  date: string;
  price: number;
  penalty: number;
}

export interface Step {
  party: UserRole;
  stepProcess: string;
  stepNumber?: number;
  status: string;
}

export interface ContractItem {
  itemProofImg: string;
  itemProofImgHash: string;
  imgOracle?: string;
  imgOracleHash?: string;
  verified?: boolean;
}

export interface ContractBuyer {
  ethAddress: string;
  identityProofType: string;
  identityProofImg: string;
  identityProofImgHash: string;
  identityProofOracle?: string;
  identityProofOracleHash?: string;
  verified?: boolean;
}
export interface ContractSeller {
  ethAddress: string;
  identityProofType: string;
  identityProofImg: string;
  identityProofImgHash: string;
  identityProofOracle?: string;
  identityProofOracleHash?: string;
  verified?: boolean;
}

export interface Event {
  eventName: string;
  argsNames: any[];
  argsValues: any[];
}

export interface ContractInput {
  contractType: string;
  buyerEthereumAddress?: string;
  buyerIdentityProofAddress?: string;
  buyerIdentityType?: string;
  buyerImageHash?: string;
  buyerHashOracle?: string;
  buyerAddressOracle?: string;
  sellerEthereumAddress: string;
  sellerIdentityProofAddress: string;
  sellerIdentityType: string;
  sellerImageHash: string;
  sellerHashOracle: string;
  sellerAddressOracle: string;
  itemAddress: string;
  itemHash: string;
  itemAddressOracle: string;
  itemHashOracle: string;
  price?: number;
  penalty?: number;
  transferDate?: string;
}
