import { useRef, useState } from "react";
import Button from "../../components/shared/Button";
import { useNavigate } from "react-router-dom";
import StepperComponent from "../../components/shared/StepperComponent";
import TextBox from "../../components/shared/TextBox";
import LargeButton from "../../components/shared/LargeButton";
import { validate } from "../../helpers/Validator";
import { OracleScopes, User, UserRole } from "../../interfaces/dataTypes";
import {
  emailRegExp,
  ethRegExp,
  passwordRegExp,
  systemAddress,
} from "../../helpers/Constants";
import {
  registerSeller,
  uploadIdentityPhotos,
} from "../../service/interfaceApi/sellerApi";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { registerBuyer } from "../../service/interfaceApi/buyerApi";
import { registerOracle } from "../../service/eth/oracleApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { checkMetamask, sendTransaction } from "../../service/eth/ethApi";
import { toast } from "react-toastify";
import { TransactionInput } from "../../service/interfaceApi/types";

interface RegisterProps {}
const Register: React.FC<RegisterProps> = ({}) => {
  const nav = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [enable, setEnabled] = useState<boolean>(false);
  const CreateAccount = () => {
    const [username, setUsername] = useState<string>("");
    const [fullname, setFullname] = useState<string>("");
    const [scope, setScope] = useState<OracleScopes>("ids");

    const [password, setPassword] = useState<string>("");
    const [repeatedPassword, setRepeatedPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [role, setRole] = useState<UserRole>("");

    const handleChangeUsername = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      let value = event.target.value;
      setUsername(value);
    };
    const handleChangeFullname = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      let value = event.target.value;
      setFullname(value);
    };
    const handleChangePassword = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      let value = event.target.value;
      setPassword(value);
    };
    const handleChangeRepeatedPassword = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      let value = event.target.value;
      setRepeatedPassword(value);
    };
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;
      setEmail(value);
    };
    const handleChangeRole = (
      event: React.MouseEvent<HTMLElement>,
      newRole: UserRole
    ) => {
      setRole(newRole);
    };
    const handleChangeScope = (event: React.ChangeEvent<HTMLInputElement>) => {
      setScope(event.target.value as OracleScopes);
    };

    const toggleStyle = {
      "&.MuiToggleButton-primary": {
        color: "#333333",
        borderColor: "#DDDDDD",
        borderRadius: "1.5rem",
        width: "200px",
        fontFamily: "Raleway, sans-serif",
        "&:hover": {
          backgroundColor: "#2196F3",
          color: "white",
        },
      },
      "&.Mui-selected": {
        backgroundColor: "#2196F3",
        color: "white",
        "&:hover": {
          backgroundColor: "#1E88E5", // Change this to your desired hover color for selected state
        },
      },
    };
    const radioboxStyle = {
      "&.MuiRadio-root": {
        color: "#DDDDDD",
      },
      "&.Mui-checked	": {
        color: "#2196F3",
      },
    };

    return {
      jsx: (
        <div className="flex flex-col items-center justify-center space-y-5">
          <TextBox
            label="Full Legal Name"
            type="text"
            error={!validate([fullname], [10]) && fullname != ""}
            value={fullname}
            width="w-[620px]"
            helperText="Full name required"
            onChange={handleChangeFullname}
          />
          <div className="flex items-center justify-center space-x-4">
            <TextBox
              label="Username"
              width="w-[300px]"
              type="text"
              error={!validate([username], [4]) && username != ""}
              value={username}
              helperText="Min. 4 characters"
              onChange={handleChangeUsername}
            />
            <TextBox
              label="Email"
              type="email"
              error={!validate([email], [4], [emailRegExp]) && email != ""}
              onChange={handleChangeEmail}
              width="w-[300px]"
              helperText={"Please enter valid email."}
              value={email}
            />
          </div>
          <div className="flex items-center justify-center space-x-4">
            <TextBox
              label="Password"
              type="password"
              value={password}
              error={
                !validate([password], [10], [passwordRegExp]) && password != ""
              }
              width="w-[300px]"
              helperText={"Min. 10 characters, 1 uppercase, 1 symbol."}
              onChange={handleChangePassword}
            />
            <TextBox
              label="Re-enter your password"
              type="password"
              width="w-[300px]"
              onChange={handleChangeRepeatedPassword}
              value={repeatedPassword}
              error={password !== repeatedPassword && repeatedPassword != ""}
              helperText={"Passwords don't match."}
            />
          </div>
          <div className="py-6 flex flex-col items-center gap-y-4">
            <ToggleButtonGroup
              color="primary"
              exclusive
              value={role}
              className="gap-x-4"
              onChange={handleChangeRole}
            >
              <ToggleButton sx={toggleStyle} value="seller">
                Seller
              </ToggleButton>
              <ToggleButton sx={toggleStyle} value="buyer">
                Buyer
              </ToggleButton>
              <ToggleButton sx={toggleStyle} value="oracle">
                Oracle
              </ToggleButton>
            </ToggleButtonGroup>{" "}
            {role === "oracle" && (
              <div className="ml-10 flex gap-x-4 items-center">
                <label>Verification Scope:</label>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="ids"
                  name="radio-buttons-group"
                  onChange={handleChangeScope}
                  row
                >
                  <FormControlLabel
                    value="ids"
                    control={<Radio sx={radioboxStyle} />}
                    label="User Official IDs"
                  />
                  <FormControlLabel
                    value="item"
                    control={<Radio sx={radioboxStyle} />}
                    label="Item Authenticity"
                  />
                  <FormControlLabel
                    value="steps"
                    control={<Radio sx={radioboxStyle} />}
                    label="Contract Steps & Escrow"
                  />
                </RadioGroup>
              </div>
            )}
          </div>
        </div>
      ),
      validated:
        (validate(
          [username, password, email],
          [4, 10, 4],
          ["", passwordRegExp, emailRegExp]
        ) &&
          password === repeatedPassword &&
          role === "buyer") ||
        role === "seller" ||
        role === "oracle",
      data: { username, email, password, role, scope, fullname },
    };
  };
  let createAccResult = CreateAccount();

  const SetupEthData = () => {
    const [ethAddress, setEthAddress] = useState<string>("");
    const { role } = createAccResult.data;

    const [repeatedEthAddress, setRepeatedEthAddress] = useState<string>("");
    const [stake, setStake] = useState<number>();
    const handleChangeEthAddress = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      let value = event.target.value;
      setEthAddress(value);
    };
    const handleChangeRepeatedEthAddress = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      let value = event.target.value;
      setRepeatedEthAddress(value);
    };
    const handleChangeStake = (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = +event.target.value;
      setStake(value);
    };

    return {
      jsx: (
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center justify-center space-x-4">
            <TextBox
              label="Ethereum address"
              type=""
              value={ethAddress}
              onChange={handleChangeEthAddress}
              helperText="Enter valid ethereum address."
              error={
                ethAddress != "" && !validate([ethAddress], [40], [ethRegExp])
              }
            />
            <TextBox
              label="Re-enter your ethereum address"
              type=""
              error={
                repeatedEthAddress != "" && repeatedEthAddress !== ethAddress
              }
              value={repeatedEthAddress}
              helperText="Inputs don't match."
              onChange={handleChangeRepeatedEthAddress}
            />
          </div>
          {role != "buyer" && (
            <div className="flex items-center justify-center space-x-4">
              <TextBox
                label="Stake in ETH"
                type="number"
                value={stake}
                onChange={handleChangeStake}
                helperText="Enter a min. stake in ETH"
                error={false}
              />
            </div>
          )}
        </div>
      ),
      validated:
        validate(
          [ethAddress, repeatedEthAddress],
          [40, 40],
          [ethRegExp, ethRegExp]
        ) && ethAddress === repeatedEthAddress,
      data: { ethAddress, stake },
    };
  };

  const UploadIdentityProof = () => {
    const identityInputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isHoveredX, setIsHoveredX] = useState<boolean>(false);

    const onClickUpload = () => {
      if (identityInputRef.current) identityInputRef.current.click();
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files && event.target.files;
      let selectedFilesArray = [...selectedFiles];
      if (files) {
        for (const file of files) {
          selectedFilesArray.push(file);
        }
      }
      setSelectedFiles(selectedFilesArray);
    };

    return {
      jsx: (
        <div className="space-y-4">
          <div className="flex justify-center">
            <LargeButton
              icon="darkUpload"
              onClick={() => onClickUpload()}
              width={900}
              subTitle="It must be of type government social card or passport - It still needs to be verified"
              title="Upload your identity proof image"
            />
            <input
              ref={identityInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFileChange(e)}
            />
          </div>
          <div className="flex justify-center space-x-2">
            <label className="italic text-md font-extralight">
              <span className="text-[#4CAF50] font-bold">
                {selectedFiles.map((file, index) =>
                  index !== selectedFiles.length - 1
                    ? file.name + " - "
                    : file.name
                )}
              </span>
            </label>
            {selectedFiles.length !== 0 && (
              <div className="flex space-x-2">
                <img
                  src={`/svgs/${isHoveredX ? "blueX" : "darkX"}.svg`}
                  onMouseEnter={() => setIsHoveredX(true)}
                  onMouseLeave={() => setIsHoveredX(false)}
                  onClick={() => setSelectedFiles([])}
                  className="w-4 h-4 mt-1 cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>
      ),
      validated: selectedFiles.length !== 0,
      data: { selectedFiles },
    };
  };
  let setupEthDataResult = SetupEthData();
  let uploadIdentityResult = UploadIdentityProof();

  const uploadPhotos = async () => {
    const { selectedFiles } = uploadIdentityResult.data;
    const { username, role } = createAccResult.data;
    let updatedHashes: string[] = [];
    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("username", username);
      formData.append("type", role === "oracle" ? "oracle" : "user");

      try {
        const data = await uploadIdentityPhotos(formData);
        updatedHashes.push(data.ipfsHash);
      } catch (error) {
        console.log(error);
      }
    }
    return updatedHashes;
  };
  const { selectedFiles } = uploadIdentityResult.data;
  const { data: balanceResponse } = useQuery({
    queryKey: ["getAccData"],
    queryFn: () =>
      checkMetamask(
        setupEthDataResult.data.stake ? setupEthDataResult.data.stake : 0
      ),
    enabled: selectedFiles.length > 0 ? true : false,
  });

  const {
    mutate: transact,
    isPending: loadingTransaction,
    data: transaction,
  } = useMutation({
    mutationFn: (data: TransactionInput) => {
      return sendTransaction(data);
    },
    onSuccess: () => {
      toast.success("Transferred", {
        position: "top-center",
        className: "toast-message",
      });
    },
  });

  const register = async () => {
    const { role } = createAccResult.data;
    if (transaction || role === "buyer") {
      setLoading(true);
      const { username, email, password, role, scope, fullname } =
        createAccResult.data;
      const { ethAddress, stake } = setupEthDataResult.data;
      const getHashes = await uploadPhotos();
      let sellerUser: User;
      let sellerContent;
      if (role === "seller") {
        sellerUser = {
          username: username,
          stake: stake,
          fullName: fullname,
          email: email,
          password: password,
          ethAddress: ethAddress,
          role: role,
          identityPhotosHash: getHashes,
        };
        sellerContent = [sellerUser];
      }

      let buyerUser: User;
      let buyerContent;
      if (role === "buyer") {
        buyerUser = {
          username: username,
          fullName: fullname,
          email: email,
          password: password,
          ethAddress: ethAddress,
          role: role,
          identityPhotosHash: getHashes,
        };
        buyerContent = [buyerUser];
      }
      let oracleUser: User;
      let contentOracle;
      if (role === "oracle") {
        oracleUser = {
          username: username,
          fullName: fullname,
          email: email,
          password: password,
          ethAddress: ethAddress,
          role: role,
          identityPhotosHash: getHashes,
          stake: stake,
          scope: scope,
        };
        contentOracle = [oracleUser];
      }

      try {
        let registered;

        if (role === "seller") {
          registered = await registerSeller(sellerContent ? sellerContent : []);
        } else if (role === "buyer") {
          registered = await registerBuyer(buyerContent ? buyerContent : []);
        } else {
          registered = await registerOracle(contentOracle ? contentOracle : []);
        }

        nav("/");
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } else {
      toast.info("Put stake first", {
        position: "top-center",
        className: "toast-message",
      });
    }
  };
  const putStake = () => {
    const { ethAddress, stake } = setupEthDataResult.data;

    if (balanceResponse?.status === "lte") {
      toast.error("Insufficent funds", {
        position: "top-center",
        className: "toast-message",
      });
    } else if (balanceResponse?.status === "no_metamask") {
      toast.info("Please install metamask", {
        position: "top-center",
        className: "toast-message",
      });
    } else if (balanceResponse?.status === "denied") {
      toast.info("You declined the process, try agin", {
        position: "top-center",
        className: "toast-message",
      });
    } else if (balanceResponse?.status === "success") {
      transact({
        from: ethAddress,
        price: stake,
        to: systemAddress,
        web3: balanceResponse.web3,
      });
    }
  };
  return (
    <div className="flex flex-col w-screen items-center">
      <h1>Welcome</h1>
      <div className="py-10 w-[70%]">
        <StepperComponent
          steps={[
            "Create your account",
            "Set up your ethereum data",
            "Upload your data",
          ]}
          givenIcons={["user", "etharrow", "folderupload"]}
          content={[
            createAccResult.jsx,
            setupEthDataResult.jsx,
            uploadIdentityResult.jsx,
          ]}
          validated={[
            createAccResult.validated,
            setupEthDataResult.validated,
            uploadIdentityResult.validated,
          ]}
          onClickLastBtn={register}
          loadingLastBtn={loading}
        />
      </div>

      <div className="flex justify-center space-x-4 mt-10">
        <label className="mt-4 italic text-xs text-[#808080]">
          Already registered?{" "}
        </label>

        <Button
          light={true}
          loading={false}
          disabled={loading}
          onClick={() => nav("/")}
        >
          Login
        </Button>
        {createAccResult.data.role != "buyer" && (
          <Button
            dark={true}
            loading={false}
            disabled={loadingTransaction}
            onClick={() => putStake()}
          >
            Put stake
          </Button>
        )}
      </div>
    </div>
  );
};

export default Register;
