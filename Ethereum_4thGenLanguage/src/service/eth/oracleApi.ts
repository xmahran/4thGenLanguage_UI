import { jwtDecode } from "jwt-decode";
import { Event } from "../../interfaces/contractDataTypes";
import { authApi } from "../interfaceApi/authApi";
import {
  DecodedResponse,
  HashResponse,
  LoginResponse,
  VerificationInput,
} from "../interfaceApi/types";
import { User } from "../../interfaces/dataTypes";

export const registerOracle = async (content: any[]): Promise<HashResponse> => {
  const response = await authApi.post("/oracle/register", content, "json");
  return response;
};
export const loginOracle = async (
  loginData: LoginResponse
): Promise<LoginResponse> => {
  const response = await authApi.post("/oracle/login", loginData, "json");
  if (response === "Failed") return response;
  const decodedResponse = jwtDecode(response.token) as DecodedResponse;

  let userNode = decodedResponse.userNode;
  const currUser: User = {
    id: decodedResponse.userID,
    email: userNode.email,
    username: userNode.username,
    password: userNode.password,
    ethAddress: userNode.ethAddress,
    fullName: userNode.fullName,
    stake: userNode.stake,
    scope: userNode.scope,
    identityPhotosHash: userNode.identityPhotosHash,
    role: "oracle",
  };
  const modifiedResponse: LoginResponse = {
    userID: decodedResponse.userID,
    userNode: currUser,
    token: response.token,
  };
  return modifiedResponse;
};

export const verifyID = async (data: VerificationInput): Promise<string> => {
  const response = await authApi.put("/oracle/updatestatus", data, "json");
  return response;
};

export const verifyItem = async (data: VerificationInput): Promise<string> => {
  const response = await authApi.put("/oracle/updatestatus", data, "json");
  return response;
};

export const listenToEvents = async (): Promise<Event[]> => {
  const response = await authApi.get("/oracle/listen");
  let events = response.events;
  return events;
};
