import { Web3 } from "web3";
import { authApi } from "../interfaceApi/authApi";
import { CreateContractInput, TransactionInput } from "../interfaceApi/types";
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
      console.log("currContract");

      if (+balanceInEther < price) {
        return { status: "lte" };
      } else {
        return {
          status: "success",
          account: accounts[0],
          price: priceInWei,
          web3: web3,
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

export const sendTransaction = async (data: TransactionInput) => {
  let web3 = data.web3;
  let from = data.from;
  let price = data.price;
  const transaction = await web3.eth.sendTransaction({
    from: from,
    to: systemAddress,
    value: price,
    gas: 1000000,
  });
  return transaction;
};
