import { useQuery } from "@tanstack/react-query";
import Header from "../../components/shared/Header";
import ListComponent from "../../components/shared/ListComponent";
import Loader from "../../components/shared/Loader";
import ErrorState from "../../components/shared/ErrorState";
import EmptyState from "../../components/shared/EmptyState";
import { listenToEvents } from "../../service/eth/oracleApi";
import { useParams } from "react-router-dom";

interface EventsVerificationProps {}
const EventsVerification: React.FC<EventsVerificationProps> = () => {
  const { contractID } = useParams();
  const {
    data: events,
    refetch: refetchEvents,
    isLoading: isLoadingEvents,
    isError: isErrorEvents,
  } = useQuery({
    queryKey: ["listenToEvents"],
    queryFn: () => listenToEvents(contractID),
  });
  return (
    <div>
      <Header title="Events" refresh onClickRefresh={() => refetchEvents()} />
      <div className="py-10 w-[90%]">
        {isLoadingEvents ? (
          <div className="mt-[10%]">
            <Loader size={60} />
          </div>
        ) : isErrorEvents ? (
          <ErrorState
            title="An unknown error has occurred"
            subTitle="Retry the process"
            loading={false}
            onClick={() => refetchEvents()}
          />
        ) : events?.length === 0 ? (
          <EmptyState
            title="No events available"
            subTitle="No events were committed"
            buttonTitle="OK"
            loading={false}
            onClick={() => {}}
          />
        ) : (
          events?.map((event, index) => (
            <div key={index}>
              <ListComponent
                oracle
                title={event.eventName}
                img="darkEvents"
                subTitle={event.argsNames
                  .map((name, index) => `${name}: ${event.argsValues[index]}`)
                  .join(", ")}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventsVerification;
