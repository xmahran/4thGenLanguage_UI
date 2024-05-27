import { jwtDecode } from "jwt-decode";
import { Event } from "../../interfaces/contractDataTypes";
import { authApi } from "../interfaceApi/authApi";
import {
  ContractOutput,
  DecodedResponse,
  HashResponse,
  LoginResponse,
  VerificationInput,
  VerifyStepsInput,
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

export const getOracleByID = async (id?: number): Promise<User> => {
  let token = localStorage.getItem("token");
  let decodedResponse;
  if (token) {
    decodedResponse = jwtDecode(token) as DecodedResponse;
  }

  const response = await authApi.get(
    `/oracle/getoracle/${id ? id : decodedResponse?.userID}`
  );

  return response.currOracle;
};
export const getOracleByEthAddress = async (address: any): Promise<User> => {
  const response = await authApi.get(`/oracle/getoraclebyeth/${address}`);

  return response.currOracle;
};
export const verifyID = async (data: VerificationInput): Promise<string> => {
  const response = await authApi.put("/oracle/updatestatus", data, "json");
  return response;
};

export const verifyItem = async (data: VerificationInput): Promise<string> => {
  const response = await authApi.put("/oracle/updatestatus", data, "json");
  return response;
};
export const verifySteps = async (data: VerifyStepsInput): Promise<string> => {
  const response = await authApi.post("/oracle/verifysteps", data, "json");
  return response;
};

export const listenToEvents = async (contractID: any): Promise<Event[]> => {
  const response = await authApi.get(`/oracle/listen/${contractID}`);
  let events = response.events;
  return events;
};
export const getIdentityUser = async (username: string): Promise<User> => {
  const response = await authApi.get(`/oracle/getidentity/${username}`);
  return response.currUser;
};

export const getAllContracts = async (): Promise<ContractOutput[]> => {
  const response = await authApi.get(`/contract/getcontracts`);
  let contracts = response.contracts;
  return contracts;
};
