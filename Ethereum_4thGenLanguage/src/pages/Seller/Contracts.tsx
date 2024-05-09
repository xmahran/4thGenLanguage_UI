import { useNavigate } from "react-router-dom";
import Header from "../../components/shared/Header";
import ListComponent from "../../components/shared/ListComponent";

interface ContractsProps {}
const Contracts: React.FC<ContractsProps> = ({}) => {
  const nav = useNavigate();
  return (
    <div>
      <Header title="My Contracts" />
      <div className="py-10">
        <ListComponent
          img="contract"
          title="Contract 1"
          onClick={() => nav("1")}
        />
      </div>
    </div>
  );
};

export default Contracts;
