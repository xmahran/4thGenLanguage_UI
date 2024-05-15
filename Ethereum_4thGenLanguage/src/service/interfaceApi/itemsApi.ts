import { Item } from "../../interfaces/dataTypes";
import { authApi } from "./authApi";

export const getAllItems = async () => {
  const response = await authApi.get("/item/items");
  let items: Item[] = [];
  console.log(response.items);
  for (const item of response.items) {
    items.push({
      id: item.id,
      sellerID: item.content[0].sellerID,
      itemLocation: item.content[0].itemLocation,
      itemName: item.content[0].itemName,
      itemDescription: item.content[0].itemDescription,
      itemPrice: item.content[0].itemPrice,
      itemImgHash: item.content[0].itemImgHash,
    });
  }
  console.log(items);
  return items;
};
export const getItemByID = async (itemID: number): Promise<Item> => {
  const response = await authApi.get(`/item/item/${itemID}`);
  return response.currItem;
};
