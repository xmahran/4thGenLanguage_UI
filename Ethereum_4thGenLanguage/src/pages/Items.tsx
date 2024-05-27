import Loader from "../components/shared/Loader";
import ErrorState from "../components/shared/ErrorState";
import EmptyState from "../components/shared/EmptyState";
import ItemCard from "../components/ItemsPage/ItemCard";
import { toast } from "react-toastify";
import { Item } from "../interfaces/dataTypes";

interface ItemsProps {
  isLoadingItems: boolean;
  isErrorItems: boolean;
  items: Item[];
  refetchItems: () => void;
}
const Items: React.FC<ItemsProps> = ({
  isErrorItems,
  isLoadingItems,
  items,
  refetchItems,
}) => {
  return (
    <div>
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
            subTitle="None of the sellers uploaded any item or oracle didn't verify you yet"
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
                  onClick={() =>
                    toast.info("Login to see item details", {
                      position: "top-center",
                      className: "toast-message",
                    })
                  }
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
