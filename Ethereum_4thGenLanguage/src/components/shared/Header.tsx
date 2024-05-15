import { Box } from "@mui/material";
import ImgButton from "./ImgButton";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import TextBox from "./TextBox";

interface HeaderProps {
  title: string;
  refresh?: boolean;
  add?: boolean;
  info?: boolean;
  onClickAdd?: () => void;
  item?: boolean;
  onClickRefresh?: () => void;
  width?: number;
  search?: boolean;
}
const Header: React.FC<HeaderProps> = ({
  title,
  add,
  onClickAdd,
  info,
  search,
  refresh,
  onClickRefresh,
  item,
}) => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <Box borderBottom={1} borderColor="grey.300" padding={2} width={1200}>
      <div className="flex justify-between">
        {title.includes("/") ? (
          <h1 className="text-start text-3xl mt-3">
            <Link
              to={`/main/${
                user.role === "buyer" ? "buyer" : "seller"
              }/contracts`}
              className="hover:bg-[#1c1c1c]"
            >
              {title.split("/")[0]}
            </Link>
            / {title.split("/")[1]}
          </h1>
        ) : (
          <h1 className={`text-start ${item ? "text-lg" : "text-3xl"} mt-3`}>
            {title}
          </h1>
        )}
        {add && (
          <ImgButton
            hoveredImg="purplePlus"
            img="plus"
            onClick={onClickAdd ? onClickAdd : () => {}}
            className="w-10 h-10 mt-4 cursor-pointer"
          />
        )}
        {refresh && (
          <ImgButton
            hoveredImg="purpleRefresh"
            img="refresh"
            onClick={onClickRefresh ? onClickRefresh : () => {}}
            className="w-8 h-8 mt-4 cursor-pointer"
          />
        )}
        {info && <img src="/svgs/info.svg" className="w-8 h-8 mt-4" />}
        {search && (
          <div className="flex">
            <img src="/svgs/search.svg" />{" "}
            <TextBox type="text" label="Search by item description" />
          </div>
        )}
      </div>
    </Box>
  );
};
export default Header;
