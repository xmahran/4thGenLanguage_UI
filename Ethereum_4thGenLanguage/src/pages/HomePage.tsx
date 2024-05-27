import Header from "../components/shared/Header";
import Items from "./Buyer/Items";
import Login from "./UserAccount/Login";

interface HomePageProps {}
const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div className="flex w-screen gap-x-10 ">
      <div className="lg:w-1/5 mdl:w-1/4 bg-[#FFFFFF] h-[800px] rounded-3xl shadow-3xl mt-5 relative border border-[#EAEAEA]">
        <div className="flex flex-col items-center p-4 gap-y-4">
          <img src="/logo.png" className="w-20 h-20" />
          <label className="text-xl font-bold">Welcome</label>
          <Login />
          <a
            href="/"
            className="absolute bottom-0 left-0 right-0 p-4 text-center text-sm  underline"
          >
            About
          </a>
          <a
            href="/"
            className="absolute bottom-0 left-28 right-0 p-4 text-center text-sm  underline"
          >
            Help
          </a>
          <a
            href="/"
            className="absolute bottom-0 left-0 right-32 p-4 text-center text-sm  underline"
          >
            Contact
          </a>
        </div>
      </div>

      <div className="h-auto overflow-y-auto w-[70%]">
        <Header title="Featured Items" search />
        <Items homepage />
      </div>
    </div>
  );
};

export default HomePage;
