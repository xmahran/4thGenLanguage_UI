import { toast } from "react-toastify";
import HomeBar from "../../components/shared/HomeBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { clearUser, setUser } from "../../store/features/userSlice";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/shared/Loader";
import { useEffect } from "react";
import ErrorState from "../../components/shared/ErrorState";
import { getBuyerByID } from "../../service/interfaceApi/buyerApi";
import Accordion from "../../components/shared/Accordion";
import { Rating } from "@mui/material";

interface MainProps {}

const Layout: React.FC<MainProps> = ({}) => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const {
    data: currBuyer,
    isLoading: isLoadingBuyer,
    isSuccess: fetchedBuyer,
    refetch: refetchBuyer,
    isError: errorBuyer,
  } = useQuery({
    queryKey: ["getBuyer"],
    queryFn: () => getBuyerByID(),
  });

  useEffect(() => {
    if (fetchedBuyer) {
      dispatch(setUser(currBuyer));
    }
  }, [currBuyer, fetchedBuyer]);

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
      <div className="w-[30%] bg-[#FFFFFF] h-[800px] rounded-3xl shadow-3xl mt-5 sticky top-5 border border-[#EAEAEA]">
        <div className="flex flex-col items-center p-4 gap-y-4">
          <img src="/logo.png" className="w-20 h-20" />
          <label className="text-xl font-bold">Profile</label>
          <Accordion title={"Full Legal Name"}>{user.fullName}</Accordion>
          <Accordion title={"Email"}>{user.email}</Accordion>
          <Accordion title={"Username"}>{user.username}</Accordion>
          <Accordion title={"Ethereum Address"}>{user.ethAddress}</Accordion>
          <div className="flex gap-x-4 font-bold text-[#4CAF50]">
            <label>VERIFIED</label>
            <Rating name="read-only" value={4} size="medium" readOnly />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="h-full">
          <HomeBar
            items={[
              { title: "Home", path: "" },
              { title: "Contracts", path: "contracts" },
              { title: "Logout", path: "logout" },
            ]}
            onItemClick={handleItemClick}
          />
          <div className="p-10 h-auto overflow-y-auto">
            {isLoadingBuyer && !fetchedBuyer ? (
              <div className="p-20 flex justify-center mt-[10%]">
                {" "}
                <Loader size={60} />
              </div>
            ) : errorBuyer ? (
              <ErrorState
                title="Error!"
                subTitle="An unknown error occured while fetching user data"
                loading={false}
                onClick={() => refetchBuyer()}
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
