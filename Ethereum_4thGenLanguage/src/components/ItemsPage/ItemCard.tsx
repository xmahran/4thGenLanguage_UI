import { Image } from "antd";
import ImgButton from "../shared/ImgButton";
import { Item } from "../../interfaces/dataTypes";
import { pinataURL } from "../../helpers/Constants";

interface ItemCardProps {
  item: Item;
  onClick: () => void;
  oracle?: string;
}
const ItemCard: React.FC<ItemCardProps> = ({ item, onClick, oracle }) => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="hover:scale-125 transition ease-in-out duration-300 w-[300px] p-4">
          <Image
            src={`${pinataURL}/${item.itemImgHash[0]}`}
            width={250}
            height={350}
            loading={"lazy"}
          />
          <div className="flex justify-between">
            <div className="flex flex-col space-y-1 ml-2 items-start">
              <label className="text-lg font-bold">
                {item.itemName}
                <span className="italic text-green-500 text-md ml-4">
                  {item.itemPrice}ETH
                </span>
              </label>
              <label className="text-sm">{item.itemDescription}</label>
            </div>
            {oracle === "item" ? (
              <ImgButton
                hoveredImg="purpleCheck"
                img="whiteCheck"
                onClick={onClick}
                className="cursor-pointer"
              />
            ) : (
              <ImgButton
                hoveredImg="purpleRight"
                img="whiteRight"
                onClick={onClick}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemCard;
