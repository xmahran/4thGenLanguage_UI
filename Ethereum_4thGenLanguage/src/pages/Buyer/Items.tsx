import ItemCard from "../../components/ItemsPage/ItemCard";
import EmptyState from "../../components/shared/EmptyState";
import ErrorState from "../../components/shared/ErrorState";
import Loader from "../../components/shared/Loader";
import { useQuery } from "@tanstack/react-query";
import {
  getAllItems,
  getAllItemsBuyer,
} from "../../service/interfaceApi/itemsApi";
import Header from "../../components/shared/Header";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkValidity } from "../../service/interfaceApi/buyerApi";

interface ItemsProps {
  homepage?: boolean;
}
const Items: React.FC<ItemsProps> = ({ homepage }) => {
  const nav = useNavigate();
  const {
    data: items,
    isLoading: isLoadingItems,
    isError: isErrorItems,
    refetch: refetchItems,
  } = useQuery({
    queryKey: ["getAllItems"],
    queryFn: () => (homepage ? getAllItems() : getAllItemsBuyer()),
  });
  const {
    data: verified,
    isLoading: isLoadingVerified,
    isError: isErrorVerified,
  } = useQuery({
    queryKey: ["getVerificationBuyer"],
    queryFn: () => checkValidity(),
    enabled: !homepage,
  });

  return (
    <div>
      {!homepage && <Header title="Items" />}
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
        ) : items?.length === 0 || (!verified && !homepage) ? (
          <EmptyState
            title="No items available"
            subTitle="None of the sellers uploaded any item or oracle didn't verify you yet"
            buttonTitle="OK"
            loading={false}
            onClick={() => {}}
          />
        ) : verified || homepage ? (
          <div className="grid grid-cols-3 justify-center items-center">
            {items?.map((item, index) => (
              <div key={index} className="flex justify-center">
                <ItemCard
                  item={item}
                  onClick={() =>
                    !homepage
                      ? nav(item.id ? item.id + "" : 1 + "")
                      : toast.info("Please login to view item details", {
                          position: "top-center",
                          className: "toast-message",
                        })
                  }
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
