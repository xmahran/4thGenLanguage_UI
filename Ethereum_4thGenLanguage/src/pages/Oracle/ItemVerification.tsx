import { useMutation, useQuery } from "@tanstack/react-query";
import Header from "../../components/shared/Header";
import { getAllItems } from "../../service/interfaceApi/itemsApi";
import ItemCard from "../../components/ItemsPage/ItemCard";
import Loader from "../../components/shared/Loader";
import ErrorState from "../../components/shared/ErrorState";
import EmptyState from "../../components/shared/EmptyState";
import { verifyItem } from "../../service/eth/oracleApi";
import { verifyHash } from "../../service/eth/contractApi";

interface ItemVerificationProps {}

const ItemVerification: React.FC<ItemVerificationProps> = () => {
  const {
    data: items,
    isLoading: isLoadingItems,
    isError: isErrorItems,
    refetch: refetchItems,
  } = useQuery({
    queryKey: ["getAllItems"],
    queryFn: () => getAllItems(),
  });
  const {
    mutate: mutateVerifyItem,
    isError: isErrorVerifyItem,
    isPending: isLoadingVerifyItem,
  } = useMutation({
    mutationFn: (hash: string) =>
      verifyItem({ hash: hash, updatedMetadata: { status: "VERIFIED" } }),
  });
  const {
    mutate: mutateVerifyHash,
    isError: isErrorVerifyHash,
    isPending: isLoadingVerifyHash,
  } = useMutation({
    mutationFn: () =>
      verifyHash({
        oracleAddress: "",
        oracleVerificationHash: "",
        type: "item",
      }),
  });
  const verify = (hash: string) => {
    mutateVerifyItem(hash);
    mutateVerifyHash();
  };

  return (
    <div>
      <Header title="Items" />
      <div className="py-10">
        {isLoadingItems || isLoadingVerifyItem || isLoadingVerifyHash ? (
          <div className="mt-[20%]">
            <Loader size={60} />
          </div>
        ) : isErrorItems || isErrorVerifyItem || isErrorVerifyHash ? (
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
                <ItemCard
                  item={item}
                  onClick={() => verify(item.itemImgHash)}
                  oracle={"item"}
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
