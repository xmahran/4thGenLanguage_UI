import { Item } from "../../interfaces/dataTypes";
import { authApi } from "./authApi";

export const getAllItems = async () => {
  const response = await authApi.get("/item/items");
  let items: Item[] = [];
  for (const item of response.items) {
    items.push({
      id: item.id,
      sellerID: item.content[0].sellerID,
      itemName: item.content[0].itemName,
      itemDescription: item.content[0].itemDescription,
      itemPrice: item.content[0].itemPrice,
      itemImgHash: item.content[0].itemImgHash,
    });
  }
  console.log(items);
  return items;
};
