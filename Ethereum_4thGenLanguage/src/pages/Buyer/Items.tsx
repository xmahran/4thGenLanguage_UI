import ItemCard from "../../components/ItemsPage/ItemCard";
import EmptyState from "../../components/shared/EmptyState";
import ErrorState from "../../components/shared/ErrorState";
import Loader from "../../components/shared/Loader";
import { useQuery } from "@tanstack/react-query";
import { getAllItems } from "../../service/api/itemsApi";
import Header from "../../components/shared/Header";
import { useState } from "react";
import ItemDetailsDialog from "./ItemDetailsDialog";

interface ItemsProps {}
const Items: React.FC<ItemsProps> = () => {
  const [isOpenItem, setIsOpenItem] = useState<boolean>(false);
  const {
    data: items,
    isLoading: isLoadingItems,
    isError: isErrorItems,
    refetch: refetchItems,
  } = useQuery({
    queryKey: ["getAllItems"],
    queryFn: () => getAllItems(),
  });
  const onClickCloseDialog = () => {
    setIsOpenItem(false);
  };
  const onClickBuyDialog = () => {
    setIsOpenItem(false);
  };
  return (
    <div>
      <Header title="Items" />
      <div className="py-10">
        {isLoadingItems ? (
          <div className="mt-[20%]">
            <Loader size={60} />
          </div>
        ) : isErrorItems ? (
          <ErrorState
            title="An unknown error has occurred"
            subTitle="Retry the process"
            loading={false}
            onClick={() => refetchItems()}
          />
        ) : items?.length === 0 ? (
          <EmptyState
            title="No items available"
            subTitle="None of the sellers uploaded any item"
            buttonTitle="OK"
            loading={false}
            onClick={() => {}}
          />
        ) : (
          <div className="grid grid-cols-3 justify-center items-center">
            {items?.map((item, index) => (
              <div key={index} className="flex justify-center">
                <ItemCard item={item} onClick={() => setIsOpenItem(true)} />
                <ItemDetailsDialog
                  isOpen={isOpenItem}
                  item={item}
                  onClickBuy={onClickBuyDialog}
                  onClickClose={onClickCloseDialog}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Items;
