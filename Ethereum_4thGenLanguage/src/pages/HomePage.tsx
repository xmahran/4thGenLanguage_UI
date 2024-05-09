import Header from "../components/shared/Header";
import Login from "./UserAccount/Login";

interface HomePageProps {}
const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div className="flex w-screen gap-x-10 ">
      <div className="lg:w-1/5 mdl:w-1/4 bg-[#1c1c1c] h-[800px] rounded-3xl shadow-3xl mt-5 relative">
        <div className="flex flex-col items-center p-4 gap-y-4">
          <img src="/logo.png" className="w-20 h-20" />
          <label className="text-xl font-bold">Welcome</label>
          <Login />
        </div>
        <a
          href="/oracle"
          className="absolute bottom-0 left-0 right-0 p-4 text-center text-sm underline"
        >
          Oracle
        </a>
      </div>

      <div className="h-auto overflow-y-auto w-[70%]">
        <Header title="Featured Items" />
      </div>
    </div>
  );
};

export default HomePage;
