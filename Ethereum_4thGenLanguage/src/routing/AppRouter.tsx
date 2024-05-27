import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../pages/UserAccount/Login";
import Register from "../pages/UserAccount/Register";
import SellerLayout from "../pages/Seller/Layout";

import SellerItems from "../pages/Seller/Items";
import SellerContracts from "../pages/Seller/Contracts";
import CurrentContract from "../pages/Seller/CurrentContract";
import ItemVerification from "../pages/Oracle/ItemVerification";
import OracleLayout from "../pages/Oracle/Layout";
import IDVerification from "../pages/Oracle/IDVerification";
import EventsVerification from "../pages/Oracle/EventsVerification";
import StepsVerification from "../pages/Oracle/StepsVerification";
import HomePage from "../pages/HomePage";

import BuyerLayout from "../pages/Buyer/Layout";
import BuyerItems from "../pages/Buyer/Items";
import BuyerContracts from "../pages/Buyer/Contracts";
import ItemDetailsSeller from "../pages/Seller/ItemDetails";
import ItemDetailsBuyer from "../pages/Buyer/ItemDetails";
import ItemDetailsOracle from "../pages/Oracle/ItemDetails";
import IDInfo from "../pages/Oracle/IDInfo";
import Contracts from "../pages/Oracle/Contracts";
import Complains from "../pages/Oracle/Complains";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token !== null;
};

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/main/oracle" element={<OracleLayout />}>
          <Route path="" element={<ItemVerification />} />
          <Route path="complaints" element={<Complains />} />

          <Route path="items" element={<ItemVerification />} />
          <Route path="items/:itemID" element={<ItemDetailsOracle />} />

          <Route path="ids" element={<IDVerification />} />
          <Route path="ids/:username" element={<IDInfo />} />
          <Route path="steps" element={<Contracts />} />
          <Route path="steps/:sellerID" element={<StepsVerification />} />

          <Route path="events" element={<Contracts />} />
          <Route path="events/:contractID" element={<EventsVerification />} />
        </Route>

        <Route path="/main/seller" element={<SellerLayout />}>
          <Route path="" element={<SellerItems />} />
          <Route path="items" element={<SellerItems />} />
          <Route path="items/:itemID" element={<ItemDetailsSeller />} />
          <Route path="contracts" element={<SellerContracts />} />
          <Route path="contracts/:contractID" element={<CurrentContract />} />
        </Route>
        <Route path="/main/buyer" element={<BuyerLayout />}>
          <Route path="" element={<BuyerItems />} />
          <Route path=":itemID" element={<ItemDetailsBuyer />} />

          <Route path="contracts" element={<SellerContracts />} />
          <Route path="contracts/:contractID" element={<CurrentContract />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
