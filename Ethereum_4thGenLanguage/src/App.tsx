import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRouter from "./routing/AppRouter";

function App() {
  return (
    <>
      <ToastContainer />
      <AppRouter />
    </>
  );
}

export default App;
