export interface User {
  id?: number;
  username: string;
  email: string;
  fullName?: string;
  ethAddress: string;
  role: UserRole;
  scope?: OracleScopes;
  password: string;
  stake?: number;
  identityPhotosHash: string[];
}
export interface Item {
  id?: number;
  sellerID: number;
  itemName: string;
  itemDescription: string;
  itemLocation: string;
  itemPrice: number;
  itemImgHash: string[];
}

export interface UserIdentity {
  imgHash: string;
  username: string;
}
export type OracleScopes = "ids" | "item" | "steps" | "";

export type UserRole = "seller" | "buyer" | "oracle" | "";
