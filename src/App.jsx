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
import { USERID } from "./utils/api";
function App() {
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
                <ProtectedRouter user={USERID}>
                  <FavoriteProducts />
                 </ProtectedRouter>
              }
            />
            <Route path="cart/:id" element={<CartProducts />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
