import { Item } from "../../interfaces/dataTypes";
import { authApi } from "./authApi";

export const getAllItems = async () => {
  const response = await authApi.get("/item/items");
  let items: Item[] = [];
  for (const item of response.items) {
    items.push({
      id: item.id,
      sellerID: item.content[0].sellerID,
      itemLocation: item.content[0].itemLocation,
      itemName: item.content[0].itemName,
      itemDescription: item.content[0].itemDescription,
      hasBuyer: item.content[0].hasBuyer,
      itemPrice: item.content[0].itemPrice,
      itemImgHash: item.content[0].itemImgHash,
    });
  }
  return items;
};
export const getAllItemsOracle = async () => {
  const response = await authApi.get("/item/items");
  let items: Item[] = [];
  console.log(response);
  for (const item of response.items) {
    if (!item.content[0].hasBuyer || !item.content[0].hasContract) {
      items.push({
        id: item.id,
        sellerID: item.content[0].sellerID,
        itemLocation: item.content[0].itemLocation,
        itemName: item.content[0].itemName,
        hasBuyer: item.content[0].hasBuyer,
        hasContract: item.content[0].hasContract,
        itemDescription: item.content[0].itemDescription,
        itemPrice: item.content[0].itemPrice,
        itemImgHash: item.content[0].itemImgHash,
      });
    }
  }
  return items;
};

export const getAllItemsBuyer = async () => {
  const response = await authApi.get("/item/items");
  let items: Item[] = [];
  for (const item of response.buyerItems) {
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
  return items;
};
export const getItemByID = async (itemID: number): Promise<Item> => {
  const response = await authApi.get(`/item/item/${itemID}`);
  console.log(response.currItem);
  return response.currItem;
};

export const getAllItemsHomePage = async (keyword: string) => {
  const response = await authApi.get("/item/items");
  let items: Item[] = [];
  for (const item of response.items) {
    if (item.content[0].itemDescription.includes(keyword.toLocaleLowerCase())) {
      items.push({
        id: item.id,
        sellerID: item.content[0].sellerID,
        itemLocation: item.content[0].itemLocation,
        itemName: item.content[0].itemName,
        itemDescription: item.content[0].itemDescription,
        hasBuyer: item.content[0].hasBuyer,
        itemPrice: item.content[0].itemPrice,
        itemImgHash: item.content[0].itemImgHash,
      });
    }
  }
  return items;
};
