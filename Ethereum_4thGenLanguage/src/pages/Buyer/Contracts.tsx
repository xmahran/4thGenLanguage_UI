import { useState } from "react";
import Header from "../../components/shared/Header";
import StdTextBox from "../../components/shared/StdTextBox";
import Button from "../../components/shared/Button";
import ContractTemplate from "../../components/shared/ContractTemplate";

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
            <ContractTemplate />
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
          <div>current</div>
        )}
      </div>
    </div>
  );
};

export default Contracts;
