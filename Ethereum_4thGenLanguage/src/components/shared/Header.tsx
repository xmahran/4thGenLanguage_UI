import { Box } from "@mui/material";
import ImgButton from "./ImgButton";
import TextBox from "./TextBox";

interface HeaderProps {
  title: string;
  refresh?: boolean;
  add?: boolean;
  info?: boolean;
  onClickAdd?: () => void;
  item?: boolean;
  onClickSearch?: () => void;
  onClickRefresh?: () => void;
  onChangeKeyword?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  keyword?: string;
  width?: number;
  search?: boolean;
}
const Header: React.FC<HeaderProps> = ({
  title,
  add,
  onClickAdd,
  width,
  info,
  onChangeKeyword,
  keyword,
  search,
  refresh,
  onClickRefresh,
  onClickSearch,
  item,
}) => {
  return (
    <Box borderBottom={1} borderColor="grey.300" padding={2} width={"90%"}>
      <div className="flex justify-between">
        {title.includes("/") ? (
          <h1 className="text-start text-3xl mt-3">/ {title.split("/")[1]}</h1>
        ) : (
          <h1 className={`text-start ${item ? "text-lg" : "text-3xl"} mt-3`}>
            {title}
          </h1>
        )}
        {add && (
          <ImgButton
            hoveredImg="bluePlus"
            img="darkPlus"
            onClick={onClickAdd ? onClickAdd : () => {}}
            className="w-10 h-10 mt-4 cursor-pointer"
          />
        )}
        {refresh && (
          <ImgButton
            hoveredImg="blueRefresh"
            img="darkRefresh"
            onClick={onClickRefresh ? onClickRefresh : () => {}}
            className="w-8 h-8 mt-4 cursor-pointer"
          />
        )}
        {info && <img src="/svgs/info.svg" className="w-8 h-8 mt-4" />}
        {search && (
          <div className="flex">
            <img
              src="/svgs/darkSearch.svg"
              className="hover:opacity-75 cursor-pointer"
              onClick={onClickSearch}
            />{" "}
            <TextBox
              type="text"
              label="Search by item description"
              value={keyword}
              onChange={onChangeKeyword}
            />
          </div>
        )}
      </div>
    </Box>
  );
};
export default Header;
