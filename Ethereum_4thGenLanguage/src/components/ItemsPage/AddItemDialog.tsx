import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextBox from "../shared/TextBox";
import Button from "../shared/Button";
import LargeButton from "../shared/LargeButton";

interface AddItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onClickAdd: () => void;
  loadingAdd: boolean;
  onClickUpload: () => void;
  onChangeItemName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeItemPrice: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeItemDescription: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeItemImg: (event: React.ChangeEvent<HTMLInputElement>) => void;
  itemName: string;
  itemDescription: string;
  itemPrice?: number;
  itemImgRef: any;
}

const AddItemDialog: React.FC<AddItemDialogProps> = ({
  isOpen,
  onClose,
  onClickAdd,
  loadingAdd,
  onClickUpload,
  onChangeItemName,
  onChangeItemPrice,
  onChangeItemDescription,
  onChangeItemImg,
  itemName,
  itemPrice,
  itemDescription,
  itemImgRef,
}) => {
  const dialogStyle = {
    "&.MuiDialog-paper": {
      background: "linear-gradient(180deg, #1c1c1c, #44055f, #000000)",
      borderRadius: "1.5rem",
      color: "white",
      width: "1000px",
      height: "500px",
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
        <img src="/svgs/plus.svg" className="mb-1" />
        <label className="text-xl"> Add items</label>
      </div>
      <DialogContent>
        <div className="flex flex-col gap-y-4 p-4">
          <div className="flex gap-x-4">
            <TextBox
              label="Item name"
              type="text"
              value={itemName}
              onChange={onChangeItemName}
            />
            <TextBox
              label="Item price in ETH"
              type="number"
              value={itemPrice}
              onChange={onChangeItemPrice}
            />
          </div>
          <div className="flex gap-x-4 justify-center">
            <TextBox
              label="Item description"
              type="text"
              value={itemDescription}
              onChange={onChangeItemDescription}
              width="w-[515px]"
            />
            <input
              className="hidden"
              type="file"
              accept="image/*"
              ref={itemImgRef}
              onChange={onChangeItemImg}
            />
          </div>
          <LargeButton
            title="Upload item image"
            subTitle="Add an item image to be displayed to the buyer later"
            icon="upload"
            onClick={onClickUpload}
            hoverIcon="purpleUpload"
            width={400}
          />
          <div className="flex justify-center items-center mt-10 gap-x-4">
            <Button light={true} loading={loadingAdd} onClick={onClickAdd}>
              Add
            </Button>
            <Button dark={true} loading={false} onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
