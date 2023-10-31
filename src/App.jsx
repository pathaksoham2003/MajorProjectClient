import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FavoriteProducts from "./features/favoriteProducts/FavoriteProducts";
import CartProducts from "./features/cartProducts/CartProducts";
import ProtectedRouter from "./pages/components/ProtectedRouter";
import AllProducts from "./features/allProducts/AllProducts";
import Root from "./Root";
import GoogleLogin from "./pages/components/GoogleLogin";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userInfo/userSlice";
function App() {
  const user = useSelector(selectUser);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
            <Route path="products/" element={<AllProducts />} />
            <Route path="welcome/" element={<GoogleLogin />} />
            <Route
              path="favorite/:user_id"
              element={
                <ProtectedRouter user={user.user_id}>
                  <FavoriteProducts />
                </ProtectedRouter>
              }
            />
            <Route path="cart/:user_id" element={<ProtectedRouter user={user.user_id}>
                  <CartProducts />
                 </ProtectedRouter>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
