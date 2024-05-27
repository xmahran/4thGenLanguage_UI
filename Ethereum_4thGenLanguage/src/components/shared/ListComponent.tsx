import { Checkbox, Tooltip } from "@mui/material";

interface ListComponent {
  onClick?: () => void;
  img: string;
  oracle?: boolean;
  checked?: boolean;
  disabled?: boolean;
  onChangeCheckbox?: () => void;
  checkList?: boolean;
  title: string;
  subTitle?: string;
  completed?: boolean;
}
const ListComponent: React.FC<ListComponent> = ({
  onClick,
  img,
  checkList,
  onChangeCheckbox,
  oracle,
  disabled,
  checked,
  title,
  subTitle,
  completed,
}) => {
  return (
    <div
      className={`rounded-2xl ${
        subTitle ? "h-[100px]" : "h-[70px]"
      } p-4 shadow-none flex items-center scale-100 justify-between gap-x-4 cursor-pointer 
           hover:bg-[#EAEAEA] border border-[#EAEAEA]`}
      onClick={!disabled ? onClick : () => {}}
    >
      <div className="flex items-center gap-x-4">
        <img src={`/svgs/${img}.svg`} className="w-7 h-7" />
        <div className="flex flex-col mt-1">
          <label className="font-bold text-lg text-start">{title}</label>
          {subTitle &&
            (oracle ? (
              <Tooltip title={subTitle} arrow>
                <label className="text-sm text-start">{subTitle}</label>
              </Tooltip>
            ) : (
              <label className="text-sm text-start">{subTitle}</label>
            ))}
        </div>
      </div>
      {checkList && !disabled ? (
        <Checkbox
          sx={{
            "& .MuiSvgIcon-root": {
              fill: "#2196F3",
            },
          }}
          disabled={disabled}
          checked={checked}
          onChange={onChangeCheckbox}
        />
      ) : !oracle && !disabled ? (
        <img src="/svgs/darkRight.svg" />
      ) : (
        completed && <img src="/svgs/greenTick.svg" className="w-7 h-7" />
      )}
    </div>
  );
};
export default ListComponent;
