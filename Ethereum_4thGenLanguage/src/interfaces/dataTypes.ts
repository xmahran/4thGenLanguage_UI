export interface User {
  id?: number;
  username: string;
  email: string;
  ethAddress: string;
  role: UserRole;
  password: string;
  identityPhotosHash: string[];
}
export interface Item {
  id?: number;
  sellerID: number;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  itemImgHash: string;
}

export interface UserIdentity {
  imgHash: string;
  username: string;
}

export type UserRole = "seller" | "buyer" | "";
