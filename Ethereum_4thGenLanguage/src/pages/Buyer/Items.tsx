import ItemCard from "../../components/ItemsPage/ItemCard";
import EmptyState from "../../components/shared/EmptyState";
import ErrorState from "../../components/shared/ErrorState";
import Loader from "../../components/shared/Loader";
import { useQuery } from "@tanstack/react-query";
import { getAllItemsBuyer } from "../../service/interfaceApi/itemsApi";
import Header from "../../components/shared/Header";
import { useNavigate } from "react-router-dom";
import { checkValidity } from "../../service/interfaceApi/buyerApi";

interface ItemsProps {}
const Items: React.FC<ItemsProps> = ({}) => {
  const nav = useNavigate();
  const {
    data: items,
    isLoading: isLoadingItems,
    isError: isErrorItems,
    refetch: refetchItems,
  } = useQuery({
    queryKey: ["getAllItems"],
    queryFn: () => getAllItemsBuyer(),
  });
  const {
    data: verified,
    isLoading: isLoadingVerified,
    isError: isErrorVerified,
  } = useQuery({
    queryKey: ["getVerificationBuyer"],
    queryFn: () => checkValidity(),
  });

  return (
    <div>
      <Header title="Items" />
      <div className="py-10">
        {isLoadingItems || isLoadingVerified ? (
          <div className="mt-[20%]">
            <Loader size={60} />
          </div>
        ) : isErrorItems || isErrorVerified ? (
          <ErrorState
            title="An unknown error has occurred"
            subTitle="Retry the process"
            loading={false}
            onClick={() => refetchItems()}
          />
        ) : items?.length === 0 || !verified ? (
          <EmptyState
            title="No items available"
            subTitle="None of the sellers uploaded any item or oracle didn't verify you yet"
            buttonTitle="OK"
            loading={false}
            onClick={() => {}}
          />
        ) : verified ? (
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
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Items;
