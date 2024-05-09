import { useState } from "react";
import Header from "../../components/shared/Header";
import StdTextBox from "../../components/shared/StdTextBox";
import Button from "../../components/shared/Button";

interface ContractsProps {}
const Contracts: React.FC<ContractsProps> = () => {
  const [createContract, setCreateContract] = useState<boolean>(false);

  return (
    <div>
      <Header
        title="Contracts"
        add
        onClickAdd={() => setCreateContract(true)}
      />
      <div className="py-10">
        {createContract ? (
          <div className="flex flex-col">
            <label className="text-lg">
              A bilateral sales contract under oracle between buyer whose
              Ethereum address is{" "}
              <StdTextBox className="ml-2" placeholder="Ethereum Address" /> and
              whose identity proof image is stored encrypted at address{" "}
              <StdTextBox className="ml-2" placeholder="Address" />
              and where said identity proof image is{" "}
              <StdTextBox className="ml-2" placeholder="Identity Type" />
              and where said identity proof image in unencrypted format has hash{" "}
              <StdTextBox className="ml-2" placeholder="Image Hash" />
              and where said identity proof image already verified by oracle
              whose address {"ADDRESS"} is and where said oracle verification
              hash is {"HASH"} and seller whose Ethereum address is{" "}
              <StdTextBox className="ml-2" placeholder="Ethereum Address" />
              and whose identity proof image is stored encrypted at address{" "}
              <StdTextBox className="ml-2" placeholder="Address" />
              and where said identity proof image is{" "}
              <StdTextBox className="ml-2" placeholder="Identity Type" />
              and where said identity proof image in unencrypted format has hash{" "}
              <StdTextBox className="ml-2" placeholder="Image Hash" />
              and where said identity proof image already verified by oracle
              whose address is {`ADDRESS`} and where said oracle verification
              hash is {`HASH`} For selling of an item supplied by said seller
              whose item proof image is stored at{" "}
              <StdTextBox className="ml-2" placeholder="Item Address" />
              and where said proof image hash is{" "}
              <StdTextBox className="ml-2" placeholder="Item Hash" />
              and where said item proof image already verified by oracle whose
              address is {`ADDRESS`} and where said oracle verification hash{" "}
              {`HASH`} in exchange of{" "}
              <StdTextBox className="ml-2" placeholder="Price" /> tokens
              transferred from buyer's wallet to seller's wallet, by said buyer
              on {`CURRENT_DATE`} as latest. Stipulating in case of breach from
              buyer penalty of{" "}
              <StdTextBox className="ml-2" placeholder="Penalty" />
              incase of breach from seller penalty of comprising steps of: step
              1: some text fullfilled by said buyer. followed by: step 2: some
              text fullfilled by said seller.
            </label>
            <div className="flex justify-end py-10 px-4 gap-x-4">
              <Button
                dark
                loading={false}
                onClick={() => setCreateContract(false)}
              >
                Close
              </Button>
              <Button light loading={false} onClick={() => {}}>
                Create
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <h1>current</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contracts;
