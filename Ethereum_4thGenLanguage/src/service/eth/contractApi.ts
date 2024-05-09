import { authApi } from "../api/authApi";
import { AddStepInput, VerifyHashInput } from "../api/types";

export const addStep = async (data: AddStepInput): Promise<string> => {
  const response = await authApi.post("/contract/addstep", data, "json");
  return response;
};

export const verifyHash = async (data: VerifyHashInput): Promise<string> => {
  const response = await authApi.post("/contract/verify", data, "json");
  return response;
};
