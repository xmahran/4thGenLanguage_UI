import { Rating } from "@mui/material";
import Accordion from "../../components/shared/Accordion";
import HomeBar from "../../components/shared/HomeBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useQuery } from "@tanstack/react-query";
import { getOracleByID } from "../../service/eth/oracleApi";
import { useEffect } from "react";
import { clearUser, setUser } from "../../store/features/userSlice";
import Loader from "../../components/shared/Loader";
import ErrorState from "../../components/shared/ErrorState";
import { toast } from "react-toastify";

interface MainProps {}

const Layout: React.FC<MainProps> = ({}) => {
  const nav = useNavigate();

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
  const dispatch = useAppDispatch();

  const {
    data: currOracle,
    isLoading: isLoadingOracle,
    isSuccess: fetchedOracle,
    refetch: refetchOracle,
    isError: errorOracle,
  } = useQuery({
    queryKey: ["getOracle"],
    queryFn: () => getOracleByID(),
  });

  useEffect(() => {
    if (fetchedOracle) {
      dispatch(setUser(currOracle));
    }
  }, [currOracle, fetchedOracle]);
  const user = useAppSelector((state) => state.user.user);

  const items =
    user.scope === "item"
      ? [
          { title: "Item Verification", path: "items" },
          { title: "Events", path: "events" },
          { title: "Buyer Complaints", path: "complaints" },
          { title: "Logout", path: "logout" },
        ]
      : user.scope === "ids"
      ? [
          { title: "ID Verification", path: "ids" },
          { title: "Events", path: "events" },
          { title: "Buyer Complaints", path: "complaints" },
          { title: "Logout", path: "logout" },
        ]
      : [
          { title: "Steps Verification", path: "steps" },
          { title: "Events", path: "events" },
          { title: "Buyer Complaints", path: "complaints" },
          { title: "Logout", path: "logout" },
        ];

  return (
    <div className="flex w-screen gap-x-10">
      <div className="w-[30%] bg-[#FFFFFF] h-[800px] rounded-3xl shadow-3xl mt-5 sticky top-5 border border-[#EAEAEA]">
        <div className="flex flex-col items-center p-4 gap-y-4">
          <img src="/logo.png" className="w-20 h-20" />
          <label className="text-xl font-bold">Oracle</label>
          <Accordion title={"Full Legal Name"}>{user.fullName}</Accordion>
          <Accordion title={"Email"}>{user.email}</Accordion>
          <Accordion title={"Username"}>{user.username}</Accordion>
          <Accordion title={"Ethereum Address"}>{user.ethAddress}</Accordion>
          <Accordion title={"Scope"}>{user.scope}</Accordion>
          <Accordion title={"Stake"}>{user.stake}ETH</Accordion>

          <div className="flex gap-x-4 font-bold text-[#4CAF50]">
            <label>VERIFIED</label>
            <Rating name="read-only" value={4} size="medium" readOnly />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="h-full">
          <HomeBar items={items} onItemClick={handleItemClick} />
          <div className="p-10 h-auto overflow-y-auto">
            {isLoadingOracle && !fetchedOracle ? (
              <div className="p-20 flex justify-center mt-[10%]">
                {" "}
                <Loader size={60} />
              </div>
            ) : errorOracle ? (
              <ErrorState
                title="Error!"
                subTitle="An unknown error occured while fetching user data"
                loading={false}
                onClick={() => refetchOracle()}
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
