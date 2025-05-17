import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useParams,
} from "react-router-dom";
import Home from "./pages/Home/index.jsx";
// import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorite from "./pages/Favorite/index.jsx";
import Root from "./Root";
import ProtectedRouter from "./components/ProtectedRouter.jsx";
import Product from "./pages/Product/index.jsx";
import Products from "./pages/Products";
import Success from "./pages/Payment/Success.jsx";
import Failed from "./pages/Payment/Failed.jsx";
import VerifyEmail from "./pages/VerifyEmail/index.jsx";
import Seller from "./pages/Profile/Seller/index.jsx";
import Buyer from "./pages/Profile/Buyer/index.jsx";
import Favorites from "./pages/Profile/Buyer/Favorites.jsx";
import BuyerCart from "./pages/Profile/Buyer/Cart.jsx";
import PreviousOrders from "./pages/Profile/Buyer/PreviousOrders.jsx";
import CurrentOrders from "./pages/Profile/Buyer/CurrentOrders.jsx";
import UpdatePassword from "./pages/Profile/Buyer/UpdatePassword.jsx";
import Profile from "./pages/Profile/Buyer/Profile.jsx";
import Addresses from "./pages/Profile/Buyer/Address/index.jsx";
import DashboardOverview from "./pages/Profile/Seller/DashboardOverview.jsx";
import Orders from "./pages/Profile/Seller/Orders.jsx";
// import Products from "./pages/Profile/Seller/Products.jsx";
import ShopDetails from "./pages/Profile/Seller/Shop/index.jsx";
import ManageInventory from "./pages/Profile/Seller/ManageInventory/index.jsx";
import ManageProducts from "./pages/Profile/Seller/ManageProducts/index.jsx";
import NotFound from "./pages/NotFound.jsx";
import Cart from "./pages/Cart/index.jsx";
import ManageCoupons from "./pages/Profile/Seller/ManageCoupons/index.jsx";
import ManageProduct from "./pages/Profile/Seller/ManageProducts/ManageProduct/index.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
            <Route path="products/" element={<Products />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="buyer" element={<Buyer />}>
              <Route index element={<Profile />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="cart" element={<BuyerCart />} />
              <Route path="addresses" element={<Addresses />} />
              <Route path="previous-orders" element={<PreviousOrders />} />
              <Route path="current-orders" element={<CurrentOrders />} />
              <Route path="update-password" element={<UpdatePassword />} />
            </Route>
            <Route path="seller" element={<Seller />}>
              <Route index element={<DashboardOverview />} />
              <Route path="shop-details" element={<ShopDetails />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<ManageProducts />} />
              <Route path="coupons" element={<ManageCoupons />} />
              <Route path="inventory" element={<ManageInventory />} />
              <Route path="previous-orders" element={<PreviousOrders />} />
              <Route path="product/:id" element={<ManageProduct />} />
            </Route>
            <Route path="favorite" element={<Favorite />} />
            <Route path="cart" element={<Cart />} />
            <Route path="success" element={<Success />} />
            <Route path="failed" element={<Failed />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
