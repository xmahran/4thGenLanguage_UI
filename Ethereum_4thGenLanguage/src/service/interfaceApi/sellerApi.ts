import { Item, User, UserIdentity } from "../../interfaces/dataTypes";
import { authApi } from "./authApi";
import {
  DecodedResponse,
  HashResponse,
  ItemResponse,
  LoginResponse,
} from "./types";
import { jwtDecode } from "jwt-decode";

export const registerSeller = async (content: any[]): Promise<HashResponse> => {
  const response = await authApi.post("/seller/register", content, "json");
  return response;
};
export const uploadIdentityPhotos = async (
  formData: FormData
): Promise<HashResponse> => {
  const response = await authApi.post(
    "/seller/uploadIdentity",
    formData,
    "formData"
  );
  return response;
};
export const loginSeller = async (
  loginData: LoginResponse
): Promise<LoginResponse> => {
  const response = await authApi.post("/seller/login", loginData, "json");
  if (response === "Failed") return response;
  const decodedResponse = jwtDecode(response.token) as DecodedResponse;

  let userNode = decodedResponse.userNode;
  const currUser: User = {
    id: decodedResponse.userID,
    email: userNode.email,
    username: userNode.username,
    password: userNode.password,
    fullName: userNode.fullName,
    stake: userNode.stake,
    ethAddress: userNode.ethAddress,
    identityPhotosHash: userNode.identityPhotosHash,
    role: "seller",
  };
  const modifiedResponse: LoginResponse = {
    userID: decodedResponse.userID,
    userNode: currUser,
    token: response.token,
  };
  return modifiedResponse;
};
export const getSellerItems = async (sellerID: any): Promise<Item[]> => {
  const response = await authApi.get(`/item/selleritems/${sellerID}`);
  let items: Item[] = [];
  console.log(response);
  for (const record of response.currSellerItems) {
    let itemID = record.id;
    let itemContent = record.content[0];
    items.push({
      id: itemID,
      sellerID: itemContent.sellerID,
      itemLocation: itemContent.itemLocation,
      itemName: itemContent.itemName,
      hasContract: itemContent.hasContract,
      itemDescription: itemContent.itemDescription,
      itemPrice: itemContent.itemPrice,
      itemImgHash: itemContent.itemImgHash,
    });
  }
  return items;
};
export const postItem = async (formData: FormData): Promise<ItemResponse> => {
  const response = await authApi.post("/item/additem", formData, "formData");
  return response;
};
export const getSellerByID = async (id?: number): Promise<User> => {
  let token = localStorage.getItem("token");
  let decodedResponse;
  if (token) {
    decodedResponse = jwtDecode(token) as DecodedResponse;
  }

  const response = await authApi.get(
    `/seller/getseller/${id ? id : decodedResponse?.userID}`
  );

  return response.currSeller;
};

export const getIdentities = async () => {
  const response = await authApi.get("/seller/identities");
  let identities: UserIdentity[] = [];
  for (const identity of response.identities) {
    identities.push({
      imgHash: identity.ipfs_pin_hash,
      username: identity.metadata.name.split("identity")[0],
    });
  }
  return identities;
};
