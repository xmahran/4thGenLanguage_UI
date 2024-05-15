import { Dialog, DialogContent } from "@mui/material";
import Button from "../../components/shared/Button";
import ContractTemplate from "../../components/shared/ContractTemplate";
import { ContractInput, Step } from "../../interfaces/contractDataTypes";
import ErrorState from "../../components/shared/ErrorState";

interface AddContractDialog {
  isOpen: boolean;
  onClickClose: () => void;
  createContract: () => void;
  values: ContractInput;
  steps: Step[];
  errorCreate: boolean;
  loadingCreate: boolean;
  handleChange: (name: string, value: any) => void;
  handleStepChange: (index: number, updatedStep: Step) => void;
}
const AddContractDialog: React.FC<AddContractDialog> = ({
  isOpen,
  onClickClose,
  createContract,
  values,
  steps,
  handleChange,
  handleStepChange,
  loadingCreate,
  errorCreate,
}) => {
  const dialogStyle = {
    "&.MuiDialog-paper": {
      background: "linear-gradient(180deg, #1c1c1c, #44055f, #000000)",
      borderRadius: "1.5rem",
      color: "white",
      height: "760px",
      width: "1500px",
      maxWidth: "none",
    },
  };

  return (
    <Dialog
      open={isOpen}
      PaperProps={{
        sx: dialogStyle,
      }}
    >
      <div className="flex justify-center gap-x-2 mt-4">
        <img src="/svgs/contract.svg" className="mb-1 w-7 h-7" />
        <label className="text-2xl">Create Contract</label>
      </div>
      <DialogContent>
        {!errorCreate ? (
          <div className="flex flex-col space-y-4 px-10 py-5">
            <ContractTemplate
              type="seller"
              steps={steps}
              values={values}
              onChange={handleChange}
              onChangeSteps={handleStepChange}
            />
            <div className="flex justify-center items-center gap-x-4 py-4">
              <Button
                light={true}
                loading={loadingCreate}
                onClick={createContract}
              >
                Create
              </Button>

              <Button dark={true} loading={false} onClick={onClickClose}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center p-14">
            <ErrorState
              loading={loadingCreate}
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
export default AddContractDialog;
