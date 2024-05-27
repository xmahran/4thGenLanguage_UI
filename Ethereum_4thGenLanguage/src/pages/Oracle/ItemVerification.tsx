import { useQuery } from "@tanstack/react-query";
import Header from "../../components/shared/Header";
import { getAllItemsOracle } from "../../service/interfaceApi/itemsApi";
import ItemCard from "../../components/ItemsPage/ItemCard";
import Loader from "../../components/shared/Loader";
import ErrorState from "../../components/shared/ErrorState";
import EmptyState from "../../components/shared/EmptyState";
import { useNavigate } from "react-router-dom";

interface ItemVerificationProps {}

const ItemVerification: React.FC<ItemVerificationProps> = () => {
  const nav = useNavigate();
  const {
    data: items,
    isLoading: isLoadingItems,
    isError: isErrorItems,
    refetch: refetchItems,
  } = useQuery({
    queryKey: ["getAllItems"],
    queryFn: () => getAllItemsOracle(),
  });

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
            subTitle="No items were found to verify"
            buttonTitle="OK"
            loading={false}
            onClick={() => {}}
          />
        ) : (
          <div className="grid grid-cols-3 justify-center items-center">
            {items?.map((item, index) => (
              <div key={index} className="flex justify-center">
                <ItemCard
                  item={item}
                  onClick={() => nav(item.id ? item.id + "" : 1 + "")}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemVerification;
