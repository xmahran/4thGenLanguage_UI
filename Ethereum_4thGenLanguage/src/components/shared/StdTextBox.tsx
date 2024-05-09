import { Input } from "@mui/material";

interface StdTextBoxProps {
  placeholder: string;
  className?: string;
}

const StdTextBox: React.FC<StdTextBoxProps> = ({ placeholder, className }) => {
  const ariaLabel = { "aria-label": "description" };

  return (
    <Input
      placeholder="Placeholder"
      sx={{
        color: "white",
      }}
      color="secondary"
      className={className}
      inputProps={ariaLabel}
    />
  );
};
export default StdTextBox;
