import { Dialog, DialogContent } from "@mui/material";
import TextBox from "../../components/shared/TextBox";
import Button from "../../components/shared/Button";
import { ContractOutput } from "../../service/interfaceApi/types";

interface AddComplainDialogProps {
  isOpen: boolean;
  onClickClose: () => void;
  loadingAdd: boolean;
  addComplain: (contract: ContractOutput) => void;
  onChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDescription: (event: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  description: string;
}
const AddComplainDialog: React.FC<AddComplainDialogProps> = ({
  isOpen,
  title,
  description,
  onChangeDescription,
  loadingAdd,
  onChangeTitle,
  onClickClose,
  addComplain,
}) => {
  const dialogStyle = {
    "&.MuiDialog-paper": {
      background: "#F7F7F7",
      borderRadius: "1.5rem",
      color: "#333333",
      height: "400",
      width: "600",
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
        <img src="/svgs/darkContract.svg" className="mb-1 w-7 h-7" />
        <label className="text-2xl">File a complaint</label>
      </div>
      <DialogContent>
        <div className="flex flex-col gap-y-4 p-4">
          <TextBox
            label="Complain title"
            type="text"
            value={title}
            onChange={onChangeTitle}
            width="w-[515px]"
          />

          <TextBox
            label="Complain description"
            type="text"
            value={description}
            onChange={onChangeDescription}
            width="w-[515px]"
          />
          <div className="flex justify-center items-center mt-10 gap-x-4">
            <Button light={true} loading={loadingAdd} onClick={addComplain}>
              Add
            </Button>
            <Button dark={true} loading={false} onClick={onClickClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AddComplainDialog;
