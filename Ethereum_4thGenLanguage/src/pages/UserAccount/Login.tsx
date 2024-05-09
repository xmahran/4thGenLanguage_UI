import { useState } from "react";
import Button from "../../components/shared/Button";
import TextBox from "../../components/shared/TextBox";
import { useNavigate } from "react-router-dom";
import { validate } from "../../helpers/Validator";
import { emailRegExp, passwordRegExp } from "../../helpers/Constants";
import { useMutation } from "@tanstack/react-query";
import { loginSeller } from "../../service/api/sellerApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "../../store/features/userSlice";
import { useAppDispatch } from "../../store/store";
import { UserRole } from "../../interfaces/dataTypes";
import { loginBuyer } from "../../service/api/buyerApi";

interface LoginProps {}
const Login: React.FC<LoginProps> = ({}) => {
  const nav = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [role, setRole] = useState<UserRole>();

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setEmail(value);
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setPassword(value);
  };
  const { mutate: mutateLogin } = useMutation({
    mutationKey: ["loginCall"],
    mutationFn: (loginReqBody: any) => {
      if (role === "seller") return loginSeller(loginReqBody);
      else return loginBuyer(loginReqBody);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Unknown error has occured", {
        position: "top-center",
        className: "toast-message",
      });
      setLoading(false);
    },
    onSuccess: (response) => {
      setLoading(false);
      if (!response.token) {
        setError(true);
        toast.error("Invalid credentials", {
          position: "top-center",
          className: "toast-message",
        });
      } else {
        role === "seller" ? nav("/main/seller") : nav("/main/buyer");
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

  const loginAsSeller = () => {
    if (
      email != "" &&
      password != "" &&
      validate([email, password], [1, 10], [emailRegExp, passwordRegExp])
    ) {
      setRole("seller");
      setLoading(true);
      mutateLogin({ email: email, password: password });
    } else {
      setError(true);
      toast.error("Invalid input format", {
        position: "top-center",
        className: "toast-message",
      });
    }
  };

  const loginAsBuyer = () => {
    if (
      email != "" &&
      password != "" &&
      validate([email, password], [1, 10], [emailRegExp, passwordRegExp])
    ) {
      setRole("buyer");
      setLoading(true);
      mutateLogin({ email: email, password: password });
    } else {
      setError(true);
      toast.error("Invalid input format", {
        position: "top-center",
        className: "toast-message",
      });
    }
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
      </div>
      <div className="flex  flex-col justify-center space-y-4 mt-4">
        <div className="flex space-x-2">
          <Button
            light={true}
            loading={role === "buyer" ? loading : false}
            width="w-[170px]"
            onClick={() => loginAsBuyer()}
          >
            Login as Buyer
          </Button>
          <Button
            light={true}
            width="w-[170px]"
            loading={role === "seller" ? loading : false}
            onClick={() => loginAsSeller()}
          >
            Login as Seller
          </Button>
        </div>
        <div className="mt-4">
          <Button
            dark={true}
            loading={false}
            disabled={loading}
            onClick={() => nav("/register")}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
