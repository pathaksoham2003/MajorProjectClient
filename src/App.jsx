import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FavoriteProducts from "./features/favoriteProducts/FavoriteProducts";
import CartProducts from "./features/cartProducts/CartProducts";
import AllProducts from "./features/allProducts/AllProducts";
import Root from "./Root";
import ProtectedRouter from "./pages/components/ProtectedRouter.jsx";
import GoogleLogin from "./pages/components/GoogleLogin";
import Profile from "./pages/Profile.jsx";
import Product from "./pages/Product.jsx";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
            <Route path="products/" element={<AllProducts />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="welcome" element={<GoogleLogin />} />
            <Route path="favorite" element={<FavoriteProducts />} />
            <Route path="cart" element={<CartProducts />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
