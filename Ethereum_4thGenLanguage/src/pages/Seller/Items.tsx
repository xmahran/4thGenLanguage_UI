import ItemCard from "../../components/ItemsPage/ItemCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSellerItems, postItem } from "../../service/api/sellerApi";
import Loader from "../../components/shared/Loader";
import EmptyState from "../../components/shared/EmptyState";
import ErrorState from "../../components/shared/ErrorState";
import { useRef, useState } from "react";
import CustomDialog from "../../components/ItemsPage/AddItemDialog";
import { Item } from "../../interfaces/dataTypes";
import { toast } from "react-toastify";
import { useAppSelector } from "../../store/store";
import Header from "../../components/shared/Header";

interface PostItemPageProps {}

const Items: React.FC<PostItemPageProps> = ({}) => {
  const itemImgRef = useRef<HTMLInputElement>(null);
  const user = useAppSelector((state) => state.user.user);

  const {
    data: sellerItems,
    isLoading: isLoadingFetch,
    isError: isErrorFetch,
    refetch: refetchItems,
  } = useQuery({
    queryKey: ["getSellerItems"],
    queryFn: () => getSellerItems(user.id),
    enabled: !!user.id,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [itemName, setItemName] = useState<string>("");
  const [itemDescription, setItemDescription] = useState<string>("");
  const [itemPrice, setItemPrice] = useState<number>();
  const [selectedImage, setSelectedImage] = useState<File>();
  const queryClient = useQueryClient();

  const addItems = () => {
    setIsOpen(true);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setItemName(value);
  };
  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value;
    setItemDescription(value);
  };
  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = +event.target.value;
    setItemPrice(value);
  };
  const handleItemImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) setSelectedImage(file);
  };
  const handleImgUpload = () => {
    if (itemImgRef.current) {
      itemImgRef.current.click();
    }
  };
  const getFormData = (): FormData => {
    let formData = new FormData();
    if (selectedImage) {
      formData.append("file", selectedImage);
      formData.append("sellerID", String(user.id));
      formData.append("itemName", itemName);
      formData.append("itemDescription", itemDescription);
      formData.append("itemPrice", String(itemPrice));
    }
    return formData;
  };
  //enabled: use it to handle await etc.. (order)
  const {
    mutate: mutatePostItems,
    isPending: isLoadingPost,
    isError: isErrorPost,
  } = useMutation({
    mutationKey: ["postItems"],
    mutationFn: (formData: FormData) => {
      return postItem(formData);
    },
    onSuccess: (newItems) => {
      setIsOpen(false);
      // queryClient.invalidateQueries({ queryKey: ["getSellerItems"] });
      let newItem = newItems.item;
      console.log(newItems);
      queryClient.setQueryData(["getSellerItems"], (oldItems: Item[]) => [
        ...oldItems,
        newItem,
      ]);
    },
    onError: () => {
      setIsOpen(false);
      toast.error("Unknown error has occured while adding an item", {
        position: "top-center",
        className: "toast-message",
      });
    },
  });

  const onClickPostItem = () => {
    let currFormData = getFormData();
    mutatePostItems(currFormData);
  };

  return (
    <div>
      <Header title="My Items" onClickAdd={addItems} add={true} />
      <CustomDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onClickAdd={() => onClickPostItem()}
        loadingAdd={isLoadingPost}
        onClickUpload={handleImgUpload}
        onChangeItemName={handleChangeName}
        onChangeItemPrice={handleChangePrice}
        onChangeItemDescription={handleChangeDescription}
        onChangeItemImg={handleItemImgChange}
        itemName={itemName}
        itemDescription={itemDescription}
        itemPrice={itemPrice}
        itemImgRef={itemImgRef}
      />
      <div className="py-10">
        {isLoadingFetch ? (
          <div className="mt-[20%]">
            <Loader size={60} />
          </div>
        ) : sellerItems?.length === 0 ? (
          <EmptyState
            title="No items available"
            subTitle="You can add items to display it here"
            buttonTitle="Add items"
            loading={false}
            onClick={addItems}
          />
        ) : isErrorFetch || isErrorPost ? (
          <ErrorState
            title="An unknown error has occured"
            subTitle="Retry the process"
            loading={false}
            onClick={() => refetchItems()}
          />
        ) : (
          <div className="grid grid-cols-3 justify-center items-center">
            {sellerItems?.map((item, index) => (
              <div key={index} className="flex justify-center">
                <ItemCard item={item} onClick={() => {}} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Items;
