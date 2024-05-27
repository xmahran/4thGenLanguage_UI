import { Image } from "antd";
import ImgButton from "../shared/ImgButton";
import { UserIdentity } from "../../interfaces/dataTypes";
import { pinataURL } from "../../helpers/Constants";

interface IdentityCardProps {
  identity: UserIdentity;
  onClick: () => void;
}
const IdentityCard: React.FC<IdentityCardProps> = ({ identity, onClick }) => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="hover:scale-125 transition ease-in-out duration-300 w-[300px] p-4">
          <Image
            src={`${pinataURL}/${identity.imgHash}`}
            width={250}
            height={350}
            loading={"lazy"}
          />
          <div className="flex justify-between mt-4">
            <label className="text-lg font-bold">
              {identity.username}'s IDs
            </label>
            <ImgButton
              hoveredImg="blueRight"
              img="darkRight"
              onClick={onClick}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default IdentityCard;
