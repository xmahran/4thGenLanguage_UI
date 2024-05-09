import HomeBar from "../../components/shared/HomeBar";
import { Outlet, useNavigate } from "react-router-dom";

interface MainProps {}

const Layout: React.FC<MainProps> = ({}) => {
  const nav = useNavigate();

  const handleItemClick = (path: string) => {
    nav(path);
  };

  return (
    <div className="flex w-screen gap-x-10 ">
      <div className="w-1/5 bg-[#1c1c1c] h-[800px] rounded-3xl shadow-3xl mt-5 relative sticky top-5">
        <div className="flex flex-col items-center p-4 gap-y-4">
          <img src="/logo.png" className="w-20 h-20" />
          <label className="text-xl font-bold">Oracle</label>
        </div>
        <a
          href="/"
          className="absolute bottom-0 left-0 right-0 p-4 text-center text-sm  underline"
        >
          Home
        </a>
      </div>
      <div className="flex flex-col w-[65%]">
        <div className="h-full">
          <HomeBar
            items={[
              { title: "Item Verification", path: "items" },
              { title: "ID Verification", path: "ids" },
              { title: "Steps Verification", path: "steps" },
              { title: "Events", path: "events" },
            ]}
            onItemClick={handleItemClick}
          />
          <div className="p-10 h-auto overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Layout;
