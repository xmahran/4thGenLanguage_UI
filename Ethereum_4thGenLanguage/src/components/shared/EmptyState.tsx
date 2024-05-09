import Button from "./Button";

interface EmptyStateProps {
  title: string;
  subTitle: string;
  buttonTitle: string;
  onClick: () => void;
  loading: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  subTitle,
  buttonTitle,
  onClick,
  loading,
}) => {
  return (
    <div className="flex justify-center">
      <div>
        <div className="w-full text-center mx-auto py-12">
          <img
            className="w-44 h-44 mx-auto"
            src="https://res.cloudinary.com/daqsjyrgg/image/upload/v1690261234/di7tvpnzsesyo7vvsrq4.svg"
            alt="image empty states"
          />
          <p className="font-medium text-lg text-center">{title}</p>
          <p className="text-gray-500 text-center">{subTitle} </p>
          <div className="mt-8">
            <Button light={true} loading={loading} onClick={onClick}>
              {buttonTitle}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmptyState;
