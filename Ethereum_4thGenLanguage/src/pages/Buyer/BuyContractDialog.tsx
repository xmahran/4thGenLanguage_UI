import { Dialog, DialogContent } from "@mui/material";
import Button from "../../components/shared/Button";
import ContractTemplate from "../../components/shared/ContractTemplate";
import ErrorState from "../../components/shared/ErrorState";
import { Contract, Step } from "../../interfaces/contractDataTypes";
import { useEffect, useState } from "react";

interface BuyContractDialogProps {
  isOpen: boolean;
  onClickClose: () => void;
  buyContract: () => void;
  values: any;
  errorBuy: boolean;
  currContract: Contract;
  loadingBuy: boolean;
  handleChange: (name: string, value: any) => void;
}
const BuyContractDialog: React.FC<BuyContractDialogProps> = ({
  isOpen,
  onClickClose,
  errorBuy,
  loadingBuy,
  currContract,
  buyContract,
  values,
  handleChange,
}) => {
  const dialogStyle = {
    "&.MuiDialog-paper": {
      background: "#F7F7F7",
      borderRadius: "1.5rem",
      color: "#333333",
      height: "760px",
      width: "1500px",
      maxWidth: "none",
    },
  };

  useEffect(() => {
    updateValues();
  }, [currContract]);

  const [currSteps, _setCurrSteps] = useState<Step[]>(currContract.steps);
  const updateValues = () => {
    values.sellerEthereumAddress = currContract?.seller?.ethAddress || "";
    values.sellerIdentityProofAddress =
      currContract?.seller?.identityProofImg || "";
    values.sellerIdentityType = currContract?.seller?.identityProofType || "";
    values.sellerImageHash = currContract?.seller?.identityProofImgHash || "";
    values.itemAddress = currContract?.item?.itemProofImg || "";
    values.itemHash = currContract?.item?.itemProofImgHash || "";
    values.contractType = currContract?.type || "";
    values.price = currContract?.price;
    values.penalty = currContract?.penalty;
    values.transferDate = currContract?.date || "";
  };

  return (
    <Dialog
      open={isOpen}
      PaperProps={{
        sx: dialogStyle,
      }}
    >
      <div className="flex justify-center gap-x-2 mt-4">
        <img src="/svgs/darkContract.svg" className="mb-1 w-7 h-7" />
        <label className="text-2xl">Contract Details</label>
      </div>
      <DialogContent>
        {!errorBuy ? (
          <div className="flex flex-col space-y-4 px-10 py-5">
            <ContractTemplate
              type="buyer"
              values={values}
              onChange={handleChange}
              buyerSteps={currSteps}
            />
            <div className="flex justify-center items-center gap-x-4 py-4">
              <Button light={true} loading={loadingBuy} onClick={buyContract}>
                Buy
              </Button>

              <Button dark={true} loading={false} onClick={onClickClose}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center p-14">
            <ErrorState
              loading={loadingBuy}
              onClick={onClickClose}
              title="Error!"
              subTitle="An unknown error occured while create this contract"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default BuyContractDialog;
