import { Checkbox } from "@mui/material";

interface ListComponent {
  onClick?: () => void;
  img: string;
  checked?: boolean;
  onChangeCheckbox?: () => void;
  checkList?: boolean;
  title: string;
  subTitle?: string;
}
const ListComponent: React.FC<ListComponent> = ({
  onClick,
  img,
  checkList,
  onChangeCheckbox,
  checked,
  title,
  subTitle,
}) => {
  return (
    <div
      className={`rounded-2xl ${
        subTitle ? "h-[100px]" : "h-[70px]"
      } p-4 shadow-none flex items-center scale-100 justify-between gap-x-4 cursor-pointer hover:bg-[#1C1C1C]`}
      onClick={onClick}
    >
      <div className="flex items-center gap-x-4">
        <img src={`/svgs/${img}.svg`} className="w-7 h-7" />
        <div className="flex flex-col mt-1">
          <label className="font-bold text-lg text-start">{title}</label>
          {subTitle && <label className="text-sm">{subTitle}</label>}
        </div>
      </div>
      {checkList ? (
        <Checkbox
          sx={{
            "& .MuiSvgIcon-root": {
              fill: "#7B1FA2",
            },
          }}
          checked={checked}
          onChange={onChangeCheckbox}
        />
      ) : (
        <img src="/svgs/whiteRight.svg" />
      )}
    </div>
  );
};
export default ListComponent;
