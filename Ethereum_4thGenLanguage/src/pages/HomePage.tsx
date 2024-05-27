import { useEffect, useState } from "react";
import Header from "../components/shared/Header";
import Items from "./Items";
import Login from "./UserAccount/Login";
import { useQuery } from "@tanstack/react-query";
import { getAllItemsHomePage } from "../service/interfaceApi/itemsApi";
import { toast } from "react-toastify";

interface HomePageProps {}
const HomePage: React.FC<HomePageProps> = () => {
  const [keyword, setKeyword] = useState<string>("");

  const handleChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };
  const [searchLoad, setSearchLoad] = useState<boolean>(false);
  const {
    data: items,
    isLoading: isLoadingItems,
    isError: isErrorItems,
    isSuccess: success,
    refetch: refetchItems,
  } = useQuery({
    queryKey: ["getAllItems"],
    queryFn: () => getAllItemsHomePage(keyword),
  });
  const search = () => {
    if (keyword) {
      setSearchLoad(true);
      refetchItems();
    } else {
      toast.error("Enter search keyword", {
        position: "top-center",
        className: "toast-message",
      });
    }
  };
  useEffect(() => {
    if (success) setSearchLoad(false);
  }, [items, success]);
  return (
    <div className="flex w-screen gap-x-10 ">
      <div className="lg:w-1/5 mdl:w-1/4 bg-[#FFFFFF] h-[800px] rounded-3xl shadow-3xl mt-5 relative border border-[#EAEAEA]">
        <div className="flex flex-col items-center p-4 gap-y-4">
          <img src="/logo.png" className="w-20 h-20" />
          <label className="text-xl font-bold">Welcome</label>
          <Login />
          <a
            href="/"
            className="absolute bottom-0 left-0 right-0 p-4 text-center text-sm  underline"
          >
            About
          </a>
          <a
            href="/"
            className="absolute bottom-0 left-28 right-0 p-4 text-center text-sm  underline"
          >
            Help
          </a>
          <a
            href="/"
            className="absolute bottom-0 left-0 right-32 p-4 text-center text-sm  underline"
          >
            Contact
          </a>
        </div>
      </div>

      <div className="h-auto overflow-y-auto w-[70%]">
        <Header
          title="Featured Items"
          search
          onChangeKeyword={handleChangeKeyword}
          onClickSearch={search}
        />
        <Items
          isErrorItems={isErrorItems}
          isLoadingItems={isLoadingItems || searchLoad}
          items={items ? items : []}
          refetchItems={refetchItems}
        />
      </div>
    </div>
  );
};

export default HomePage;
