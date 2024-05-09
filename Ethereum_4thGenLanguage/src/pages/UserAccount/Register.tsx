import { useRef, useState } from "react";
import Button from "../../components/shared/Button";
import { useNavigate } from "react-router-dom";
import StepperComponent from "../../components/shared/StepperComponent";
import TextBox from "../../components/shared/TextBox";
import LargeButton from "../../components/shared/LargeButton";
import { validate } from "../../helpers/Validator";
import { User, UserRole } from "../../interfaces/dataTypes";
import {
  emailRegExp,
  ethRegExp,
  passwordRegExp,
} from "../../helpers/Constants";
import {
  registerSeller,
  uploadIdentityPhotos,
} from "../../service/api/sellerApi";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { registerBuyer } from "../../service/api/buyerApi";

interface RegisterProps {}
const Register: React.FC<RegisterProps> = ({}) => {
  const nav = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const CreateAccount = () => {
    const [username, setUsername] = useState<string>("");
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

    const toggleStyle = {
      "&.MuiToggleButton-primary	": {
        color: "white",
        border: "none",
        borderRadius: "1.5rem",
        width: "200px",
        font: "bold",
        fontFamily: "Raleway, sans-serif",
      },
      "&.Mui-selected	": {
        backgroundImage: "linear-gradient(90deg, #303F9F, #7B1FA2)",
      },
    };

    return {
      jsx: (
        <div className="flex flex-col items-center justify-center space-y-5">
          <div className="flex items-center justify-center space-x-4">
            <TextBox
              label="Username"
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
              helperText={"Min. 10 characters, 1 uppercase, 1 symbol."}
              onChange={handleChangePassword}
            />
            <TextBox
              label="Re-enter your password"
              type="password"
              onChange={handleChangeRepeatedPassword}
              value={repeatedPassword}
              error={password !== repeatedPassword && repeatedPassword != ""}
              helperText={"Passwords don't match."}
            />
          </div>
          <div className="py-6">
            <ToggleButtonGroup
              color="primary"
              exclusive
              value={role}
              onChange={handleChangeRole}
            >
              <ToggleButton sx={toggleStyle} value="seller">
                Seller
              </ToggleButton>
              <ToggleButton sx={toggleStyle} value="buyer">
                Buyer
              </ToggleButton>
            </ToggleButtonGroup>{" "}
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
        role === "seller",
      data: { username, email, password, role },
    };
  };

  const SetupEthData = () => {
    const [ethAddress, setEthAddress] = useState<string>("");
    const [repeatedEthAddress, setRepeatedEthAddress] = useState<string>("");

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

    return {
      jsx: (
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
      ),
      validated:
        validate(
          [ethAddress, repeatedEthAddress],
          [40, 40],
          [ethRegExp, ethRegExp]
        ) && ethAddress === repeatedEthAddress,
      data: { ethAddress },
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
              icon="whiteUpload"
              hoverIcon="purpleUpload"
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
              <span className="text-green-500">
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
                  src={`/svgs/${isHoveredX ? "purpleX" : "x"}.svg`}
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
  let createAccResult = CreateAccount();
  let setupEthDataResult = SetupEthData();
  let uploadIdentityResult = UploadIdentityProof();

  const uploadPhotos = async () => {
    const { selectedFiles } = uploadIdentityResult.data;
    const { username } = createAccResult.data;
    let updatedHashes: string[] = [];
    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("username", username);
      try {
        const data = await uploadIdentityPhotos(formData);
        updatedHashes.push(data.ipfsHash);
      } catch (error) {
        console.log(error);
      }
    }
    return updatedHashes;
  };

  const register = async () => {
    setLoading(true);
    const { username, email, password, role } = createAccResult.data;
    const { ethAddress } = setupEthDataResult.data;
    const getHashes = await uploadPhotos();
    const seller: User = {
      username: username,
      email: email,
      password: password,
      ethAddress: ethAddress,
      role: role,
      identityPhotosHash: getHashes,
    };
    const content = [seller];
    try {
      let registered;
      if (role === "seller") registered = await registerSeller(content);
      else registered = await registerBuyer(content);
      nav("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
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
        <label className="mt-4 italic text-xs font-extralight">
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
      </div>
    </div>
  );
};

export default Register;
