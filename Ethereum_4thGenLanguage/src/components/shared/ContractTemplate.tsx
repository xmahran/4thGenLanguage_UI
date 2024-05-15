import { ContractInput, Step } from "../../interfaces/contractDataTypes";
import { UserRole } from "../../interfaces/dataTypes";
import ContractSteps from "./ContractSteps";
import StdTextBox from "./StdTextBox";

interface ContractTemplateProps {
  type?: UserRole;
  values: any;
  steps?: Step[];
  buyerSteps?: Step[];
  onChange: (name: string, value: any) => void;
  onChangeSteps?: (index: number, updatedStep: Step) => void;
}

const ContractTemplate: React.FC<ContractTemplateProps> = ({
  type,
  values,
  steps,
  onChange,
  buyerSteps,
  onChangeSteps,
}) => {
  return (
    <label className="text-lg leading-10 tracking-widest justify-center">
      A bilateral sales contract under oracle between buyer whose Ethereum
      address is{" "}
      <StdTextBox
        className="ml-2"
        value={values.buyerEthereumAddress}
        onChange={(e) => onChange("buyerEthereumAddress", e.target.value)}
        placeholder="Ethereum Address"
        disabled={type === "seller" ? true : false}
      />{" "}
      and whose identity proof image is stored encrypted at address{" "}
      <StdTextBox
        className="ml-2"
        value={values.buyerIdentityProofAddress}
        onChange={(e) => onChange("buyerIdentityProofAddress", e.target.value)}
        placeholder="Address"
        disabled={type === "seller" ? true : false}
      />
      and where said identity proof image is{" "}
      <StdTextBox
        className="ml-2"
        value={values.buyerIdentityType}
        onChange={(e) => onChange("buyerIdentityType", e.target.value)}
        placeholder="Identity Type"
        disabled={type === "seller" ? true : false}
      />
      and where said identity proof image in unencrypted format has hash{" "}
      <StdTextBox
        className="ml-2"
        value={values.buyerImageHash}
        onChange={(e) => onChange("buyerImageHash", e.target.value)}
        placeholder="Image Hash"
        disabled={type === "seller" ? true : false}
      />
      and where said identity proof image already verified by oracle whose
      address {"ADDRESS"} is and where said oracle verification hash is {"HASH"}{" "}
      and seller whose Ethereum address is{" "}
      <StdTextBox
        className="ml-2"
        value={values.sellerEthereumAddress}
        onChange={(e) => onChange("sellerEthereumAddress", e.target.value)}
        placeholder="Ethereum Address"
        disabled={type === "buyer" ? true : false}
      />
      and whose identity proof image is stored encrypted at address{" "}
      <StdTextBox
        className="ml-2"
        value={values.sellerIdentityProofAddress}
        onChange={(e) => onChange("sellerIdentityProofAddress", e.target.value)}
        placeholder="Address"
        disabled={type === "buyer" ? true : false}
      />
      and where said identity proof image is{" "}
      <StdTextBox
        className="ml-2"
        value={values.sellerIdentityType}
        onChange={(e) => onChange("sellerIdentityType", e.target.value)}
        placeholder="Identity Type"
        disabled={type === "buyer" ? true : false}
      />
      and where said identity proof image in unencrypted format has hash{" "}
      <StdTextBox
        className="ml-2"
        value={values.sellerImageHash}
        onChange={(e) => onChange("sellerImageHash", e.target.value)}
        placeholder="Image Hash"
        disabled={type === "buyer" ? true : false}
      />
      and where said identity proof image already verified by oracle whose
      address is {`ADDRESS`} and where said oracle verification hash is {`HASH`}{" "}
      For selling of an item supplied by said seller whose item proof image is
      stored at{" "}
      <StdTextBox
        className="ml-2"
        value={values.itemAddress}
        onChange={(e) => onChange("itemAddress", e.target.value)}
        placeholder="Item Address"
        disabled={type === "buyer" ? true : false}
      />
      and where said proof image hash is{" "}
      <StdTextBox
        className="ml-2"
        value={values.itemHash}
        onChange={(e) => onChange("itemHash", e.target.value)}
        placeholder="Item Hash"
        disabled={type === "buyer" ? true : false}
      />
      and where said item proof image already verified by oracle whose address
      is {`ADDRESS`} and where said oracle verification hash {`HASH`} in
      exchange of{" "}
      <StdTextBox
        className="ml-2"
        value={values.price}
        onChange={(e) => onChange("price", e.target.value)}
        placeholder="Price"
        disabled={type === "buyer" ? true : false}
      />{" "}
      tokens transferred from buyer's wallet to seller's wallet, by said buyer
      on {new Date().toLocaleDateString("en-GB")} as latest. Stipulating in case
      of breach from buyer penalty of{" "}
      <StdTextBox
        className="ml-2"
        value={values.penalty}
        onChange={(e) => onChange("penalty", e.target.value)}
        placeholder="Penalty"
        disabled={type === "buyer" ? true : false}
      />
      incase of breach from seller penalty of comprising steps of: <br />
      <ContractSteps
        currSteps={steps ? steps : []}
        buyerSteps={buyerSteps}
        type={type ? type : ""}
        onChange={onChangeSteps ? onChangeSteps : () => {}}
      />
    </label>
  );
};

export default ContractTemplate;
