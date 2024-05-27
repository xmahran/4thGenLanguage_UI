import { useNavigate } from "react-router-dom";
import Header from "../../components/shared/Header";
import ListComponent from "../../components/shared/ListComponent";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllContracts } from "../../service/eth/oracleApi";
import EmptyState from "../../components/shared/EmptyState";
import ErrorState from "../../components/shared/ErrorState";
import Loader from "../../components/shared/Loader";
import { useAppSelector } from "../../store/store";
import Button from "../../components/shared/Button";
import { useState } from "react";
import AddComplainDialog from "../Buyer/AddComplainDialog";
import { toast } from "react-toastify";
import { addComplain } from "../../service/interfaceApi/buyerApi";
import { ContractOutput } from "../../service/interfaceApi/types";
import { Complain } from "../../interfaces/dataTypes";

interface ContractsProps {}
const Contracts: React.FC<ContractsProps> = ({}) => {
  const nav = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };
  const { mutate: mutateAddComplain, isPending: isLoadingComplain } =
    useMutation({
      mutationKey: ["addComplain"],
      mutationFn: (data: any[]) => {
        return addComplain(data);
      },
      onSuccess: () => {
        setIsOpen(false);
        toast.success("Added a complain successfully!", {
          position: "top-center",
          className: "toast-message",
        });
      },
      onError: () => {
        setIsOpen(false);
        toast.error("Unknown error has occured while adding an item", {
          position: "top-center",
          className: "toast-message",
        });
      },
    });

  const handleAddComplain = (contract: ContractOutput) => {
    if (title && description) {
      let complain: Complain = {
        sellerID: contract.sellerID,
        buyerID: user.id,
        contractID: contract.id,
        complainTitle: title,
        description: description,
      };
      const data = [complain];
      mutateAddComplain(data);
    } else {
      toast.error("Enter missing fields", {
        position: "top-center",
        className: "toast-message",
      });
    }
  };
  const {
    data: contracts,
    isLoading: isLoadingContracts,
    isError: isErrorContracts,
    refetch: refetchContracts,
  } = useQuery({
    queryKey: ["getAllContracts"],
    queryFn: () => getAllContracts(),
  });
  return (
    <div className="w-[90%]">
      <Header title="My Contracts" />
      <div className="py-10">
        {isLoadingContracts ? (
          <div className="mt-[20%]">
            <Loader size={60} />
          </div>
        ) : isErrorContracts ? (
          <ErrorState
            title="An unknown error has occurred"
            subTitle="Retry the process"
            loading={false}
            onClick={() => refetchContracts()}
          />
        ) : contracts?.length === 0 ? (
          <EmptyState
            title="No contracts available"
            subTitle="No contracts were created"
            buttonTitle="OK"
            loading={false}
            onClick={() => {}}
          />
        ) : (
          contracts?.map((contract, index) =>
            user.role === "buyer" ? (
              <div className="flex flex-col gap-y-2 w-[90%]" key={index}>
                <AddComplainDialog
                  isOpen={isOpen}
                  onClickClose={handleCloseDialog}
                  loadingAdd={isLoadingComplain}
                  addComplain={() => handleAddComplain(contract)}
                  onChangeTitle={handleChangeTitle}
                  onChangeDescription={handleChangeDescription}
                  title={title}
                  description={description}
                />
                <ListComponent
                  key={index}
                  img="darkContract"
                  title={contract.name}
                  onClick={() => nav("1")}
                />
                <div className="self-end">
                  <Button
                    dark
                    loading={false}
                    onClick={() => handleOpenDialog()}
                  >
                    File a complaint
                  </Button>
                </div>
              </div>
            ) : (
              <ListComponent
                key={index}
                img="darkContract"
                title={contract.name}
                onClick={() => nav("1")}
              />
            )
          )
        )}
      </div>
    </div>
  );
};

export default Contracts;
