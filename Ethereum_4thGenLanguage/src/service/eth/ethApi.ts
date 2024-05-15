import { Web3 } from "web3";
import { authApi } from "../interfaceApi/authApi";
import { CreateContractInput } from "../interfaceApi/types";
import { systemAddress } from "../../helpers/Constants";

export const createcontract = async (
  contractData: CreateContractInput
): Promise<string> => {
  const response = authApi.post("/eth/createcontract", contractData, "json");
  return response;
};
export const checkMetamask = async (price: number) => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0]);
      const balanceInEther = web3.utils.fromWei(balance, "ether");
      const priceInWei = web3.utils.toWei("0.001", "ether");
      console.log(balanceInEther);
      if (+balanceInEther < price) {
        return { status: "lte" };
      } else {
        const transaction = await web3.eth.sendTransaction({
          from: accounts[0],
          to: systemAddress,
          value: priceInWei,
          gas: 1000000,
        });
        console.log(transaction);
        return {
          status: "success",
          account: accounts[0],
          transaction: transaction,
        };
      }
    } catch (error: any) {
      if (error.code === 4001) {
        return { status: "denied" };
      } else {
        return { status: "error", error: error };
      }
    }
  } else {
    return { status: "no_metamask" };
  }
};
