import { toast } from "react-toastify";
import HomeBar from "../../components/shared/HomeBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { clearUser, setUser } from "../../store/features/userSlice";
import { useQuery } from "@tanstack/react-query";
import { getSellerByID } from "../../service/api/sellerApi";
import Loader from "../../components/shared/Loader";
import { useEffect } from "react";
import ErrorState from "../../components/shared/ErrorState";

interface MainProps {}

const Layout: React.FC<MainProps> = ({}) => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const {
    data: currSeller,
    isLoading: isLoadingSeller,
    isSuccess: fetchedSeller,
    refetch: refetchSeller,
    isError: errorSeller,
  } = useQuery({
    queryKey: ["getSeller"],
    queryFn: () => getSellerByID(),
  });

  useEffect(() => {
    if (fetchedSeller) {
      dispatch(setUser(currSeller));
    }
  }, [currSeller, fetchedSeller]);

  const handleItemClick = (path: string) => {
    if (path === "logout") {
      localStorage.removeItem("token");
      nav("/");
      dispatch(clearUser());
      toast.success(`Logged out!`, {
        position: "top-center",
        className: "toast-message",
      });
    } else {
      nav(path);
    }
  };
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="flex w-screen gap-x-10 ">
      <div className="w-1/5 bg-[#1c1c1c] h-[800px] rounded-3xl shadow-3xl mt-5 sticky top-5">
        <div className="flex flex-col items-center p-4 gap-y-4">
          <img src="/logo.png" className="w-20 h-20" />
          <label className="text-xl font-bold">Profile</label>
          {/* <div className="text-start flex flex-col gap-y-4">
            <label className="text-md bg-gradient-to-r from-indigo-700 to-purple-700 inline-block text-transparent bg-clip-text">
              <span className="text-white font-bold">Username: </span>{" "}
              {user.username}
            </label>
            <label className="text-md bg-gradient-to-r from-indigo-700 to-purple-700 inline-block text-transparent bg-clip-text">
              <span className="text-white font-bold">Email: </span> {user.email}
            </label>{" "}
            <label className="text-md bg-gradient-to-r from-indigo-700 to-purple-700 inline-block text-transparent bg-clip-text">
              <span className="text-white font-bold">Ethereum Address: </span>{" "}
              {user.email}
            </label>{" "}
          </div> */}
        </div>
      </div>
      <div className="flex flex-col w-[65%]">
        <div className="h-full">
          <HomeBar
            items={[
              { title: "Items", path: "items" },
              { title: "Contracts", path: "contracts" },
              { title: "Logout", path: "logout" },
            ]}
            onItemClick={handleItemClick}
          />
          <div className="p-10 h-auto overflow-y-auto">
            {isLoadingSeller && !fetchedSeller ? (
              <div className="p-20 flex justify-center mt-[10%]">
                {" "}
                <Loader size={60} />
              </div>
            ) : errorSeller ? (
              <ErrorState
                title="Error!"
                subTitle="An unknown error occured while fetching user data"
                loading={false}
                onClick={() => refetchSeller()}
              />
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Layout;
