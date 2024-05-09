import { jwtDecode } from "jwt-decode";
import { authApi } from "./authApi";
import { DecodedResponse, HashResponse, LoginResponse } from "./types";
import { User } from "../../interfaces/dataTypes";

export const registerBuyer = async (content: any[]): Promise<HashResponse> => {
  const response = await authApi.post("/buyer/register", content, "json");
  return response;
};
export const getBuyerByID = async () => {
  let token = localStorage.getItem("token");
  let decodedResponse;
  if (token) {
    decodedResponse = jwtDecode(token) as DecodedResponse;
  }
  const response = await authApi.get(
    `/buyer/getbuyer/${decodedResponse?.userID}`
  );
  return response.currBuyer;
};
export const loginBuyer = async (
  loginData: LoginResponse
): Promise<LoginResponse> => {
  const response = await authApi.post("/buyer/login", loginData, "json");
  if (response === "Failed") return response;
  const decodedResponse = jwtDecode(response.token) as DecodedResponse;

  let userNode = decodedResponse.userNode;
  const currUser: User = {
    id: decodedResponse.userID,
    email: userNode.email,
    username: userNode.username,
    password: userNode.password,
    ethAddress: userNode.ethAddress,
    identityPhotosHash: userNode.identityPhotosHash,
    role: "buyer",
  };
  const modifiedResponse: LoginResponse = {
    userID: decodedResponse.userID,
    userNode: currUser,
    token: response.token,
  };
  return modifiedResponse;
};
