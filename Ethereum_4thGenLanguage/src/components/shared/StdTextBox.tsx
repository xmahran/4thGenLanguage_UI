import { Input } from "@mui/material";

interface StdTextBoxProps {
  placeholder: string;
  className?: string;
  width?: number;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: any;
}

const StdTextBox: React.FC<StdTextBoxProps> = ({
  placeholder,
  className,
  width,
  disabled,
  onChange,
  value,
}) => {
  return (
    <Input
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={onChange}
      sx={{
        color: "#333333",
        width: `${width}px`,
      }}
      className={className}
    />
  );
};
export default StdTextBox;
