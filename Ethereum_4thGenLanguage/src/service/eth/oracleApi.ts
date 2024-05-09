import { Event } from "../../interfaces/contractDataTypes";
import { authApi } from "../api/authApi";
import { VerificationInput } from "../api/types";

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
