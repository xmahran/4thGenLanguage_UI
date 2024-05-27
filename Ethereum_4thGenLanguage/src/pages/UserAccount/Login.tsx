import { useState } from "react";
import Button from "../../components/shared/Button";
import TextBox from "../../components/shared/TextBox";
import { useNavigate } from "react-router-dom";
import { validate } from "../../helpers/Validator";
import { emailRegExp, passwordRegExp } from "../../helpers/Constants";
import { useMutation } from "@tanstack/react-query";
import { loginSeller } from "../../service/interfaceApi/sellerApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "../../store/features/userSlice";
import { useAppDispatch } from "../../store/store";
import { UserRole } from "../../interfaces/dataTypes";
import { loginBuyer } from "../../service/interfaceApi/buyerApi";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { loginOracle } from "../../service/eth/oracleApi";

interface LoginProps {}
const Login: React.FC<LoginProps> = ({}) => {
  const nav = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [role, setRole] = useState<UserRole>("buyer");

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setEmail(value);
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setPassword(value);
  };
  const handleChangeRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value as UserRole);
  };
  const { mutate: mutateLogin, isPending: loadingLogin } = useMutation({
    mutationKey: ["loginCall"],
    mutationFn: (loginReqBody: any) => {
      if (role === "seller") return loginSeller(loginReqBody);
      else if (role === "buyer") return loginBuyer(loginReqBody);
      else {
        return loginOracle(loginReqBody);
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Unknown error has occured", {
        position: "top-center",
        className: "toast-message",
      });
    },
    onSuccess: (response) => {
      if (!response.token) {
        setError(true);
        toast.error("Invalid credentials", {
          position: "top-center",
          className: "toast-message",
        });
      } else {
        role === "seller"
          ? nav("/main/seller/items")
          : role === "buyer"
          ? nav("/main/buyer")
          : nav("/main/oracle/items");
        let currUser = response.userNode;
        dispatch(setUser(currUser));
        localStorage.setItem("token", response.token);
        toast.success(`Logged in!`, {
          position: "top-center",
          className: "toast-message",
        });
      }
    },
  });

  const login = () => {
    if (
      email != "" &&
      password != "" &&
      validate([email, password], [1, 10], [emailRegExp, passwordRegExp])
    ) {
      mutateLogin({ email: email, password: password });
    } else {
      setError(true);
      toast.error("Invalid input format", {
        position: "top-center",
        className: "toast-message",
      });
    }
  };

  const radioboxStyle = {
    "&.MuiRadio-root": {
      color: "#DDDDDD",
    },
    "&.Mui-checked	": {
      color: "#2196F3",
    },
  };
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-center space-y-5 py-10">
        <TextBox
          label="Email"
          type="email"
          error={error}
          value={email}
          onChange={handleChangeEmail}
        />
        <TextBox
          label="Password"
          type="password"
          error={error}
          value={password}
          onChange={handleChangePassword}
        />
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="buyer"
          name="radio-buttons-group"
          onChange={handleChangeRole}
          row
        >
          <FormControlLabel
            value="buyer"
            control={<Radio size="small" sx={radioboxStyle} />}
            label="Buyer"
          />
          <FormControlLabel
            value="seller"
            control={<Radio size="small" sx={radioboxStyle} />}
            label="Seller"
          />
          <FormControlLabel
            value="oracle"
            control={<Radio size="small" sx={radioboxStyle} />}
            label="Oracle"
          />
        </RadioGroup>
      </div>
      <div className="flex space-x-2">
        <Button
          light={true}
          loading={loadingLogin}
          width="w-[170px]"
          onClick={() => login()}
        >
          Login
        </Button>
        <Button
          dark={true}
          loading={false}
          width="w-[170px]"
          disabled={loadingLogin}
          onClick={() => nav("/register")}
        >
          Register
        </Button>
        {/* <Button
            light={true}
            width="w-[170px]"
            loading={role === "seller" ? loading : false}
            onClick={() => loginAsSeller()}
          >
            Login as Seller
          </Button> */}
      </div>
    </div>
  );
};

export default Login;
