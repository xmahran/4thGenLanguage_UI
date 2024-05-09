import { Dialog, DialogContent } from "@mui/material";
import Button from "../../components/shared/Button";
import { Item } from "../../interfaces/dataTypes";
import Header from "../../components/shared/Header";
import { useQuery } from "@tanstack/react-query";
import { getSellerByID } from "../../service/api/sellerApi";

interface ItemDetailsProps {
  isOpen: boolean;
  item: Item;
  onClickClose: () => void;
  onClickBuy: () => void;
}
const ItemDetailsDialog: React.FC<ItemDetailsProps> = ({
  isOpen,
  item,
  onClickBuy,
  onClickClose,
}) => {
  const {
    data: currSeller,
    isLoading: isLoadingSeller,
    isSuccess: fetchedSeller,
    refetch: refetchSeller,
    isError: errorSeller,
  } = useQuery({
    queryKey: ["getSeller"],
    queryFn: () => getSellerByID(item.sellerID),
  });
  const dialogStyle = {
    "&.MuiDialog-paper": {
      background: "linear-gradient(180deg, #1c1c1c, #44055f, #000000)",
      borderRadius: "1.5rem",
      color: "white",
      width: "1200px",
      height: "760px",
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
        <img src="/svgs/info.svg" className="mb-1" />
        <label className="text-xl">Details</label>
      </div>
      <DialogContent>
        <Header title="Item Details" item />
        <div className="flex flex-col justify-center items-start space-y-4 py-4 ml-4">
          <label className="text-md font-bold">
            <span className="text-gray-300 font-normal">Name: </span>{" "}
            {item.itemName}
          </label>
          <label className="text-md font-bold">
            <span className="text-gray-300 font-normal">Price: </span>{" "}
            {item.itemPrice}
          </label>

          <label className="text-md font-bold">
            <span className="text-gray-300 font-normal">Item: </span>{" "}
            {item.itemDescription}
          </label>
          <label className="text-md font-bold">
            <span className="text-gray-300 font-normal">Hash: </span>{" "}
            {item.itemImgHash}
          </label>
        </div>
        <Header title="Seller Details" item />
        <div className="flex flex-col justify-center items-start space-y-4 py-4 ml-4">
          <label className="text-md font-bold">
            <span className="text-gray-300 font-normal">Username: </span>{" "}
            {currSeller?.username}
          </label>

          <label className="text-md font-bold">
            <span className="text-gray-300 font-normal">Email: </span>{" "}
            {currSeller?.email}
          </label>
          <label className="text-md font-bold">
            <span className="text-gray-300 font-normal">Status: </span>{" "}
            <span className="text-green-500 font-bold">VERIFIED</span>
          </label>
          <label className="text-md font-bold">
            <span className="text-gray-300 font-normal">ETH Address: </span>{" "}
            {currSeller?.ethAddress}
          </label>
        </div>
        <div className="flex justify-center items-center gap-x-4 py-4">
          <Button light={true} loading={false} onClick={onClickBuy}>
            Buy
          </Button>
          <Button dark={true} loading={false} onClick={onClickClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ItemDetailsDialog;
