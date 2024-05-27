import { TextField } from "@mui/material";

interface TextBoxProps {
  label: string;
  value?: any;
  error?: boolean;
  width?: string;
  type: string;
  className?: string;
  helperText?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const TextBox: React.FC<TextBoxProps> = ({
  label,
  type,
  width,
  value,
  onChange,
  className,
  error,
  helperText,
}) => {
  const textStyle = {
    "&.MuiTextField-root": {
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#2196F3",
        borderRadius: "1.5rem",
      },
      "&:focus .MuiOutlinedInput-notchedOutline": {
        borderColor: "#2196F3",
        borderRadius: "1.5rem",
      },
      "&:focus-within .MuiOutlinedInput-notchedOutline": {
        borderColor: "#2196F3",
        borderRadius: "1.5rem",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent",
      },
      "& .MuiInputLabel-root": {
        color: "#333333",
        fontFamily: "Raleway, sans-serif",
        fontSize: "0.875rem",
      },
      "& .Mui-error .MuiOutlinedInput-notchedOutline": {
        borderColor: "red",
        borderRadius: "1.5rem",
      },
      "& .MuiFormHelperText-root": {
        position: "absolute",
        bottom: "-1.2rem",
      },
    },
  };

  return (
    <TextField
      label={label}
      error={error}
      sx={textStyle}
      onChange={onChange}
      type={type}
      value={value}
      helperText={error ? helperText : ""}
      variant="outlined"
      className={`${width ? width : "w-[270px]"} ${className}`}
      required
      inputProps={{
        style: {
          backgroundColor: "#EAEAEA",
          borderColor: "#DDDDDD",
          color: "#333333",
          height: "20px",
          fontFamily: "Raleway, sans-serif",
          fontSize: "0.875rem",
          borderRadius: "1.5rem",
        },
      }}
    />
  );
};

export default TextBox;
