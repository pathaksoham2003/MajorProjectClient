import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from './pages/NotFound';
import Login from "./pages/Login";
import Register from "./pages/Register";
import FavoriteProducts from "./features/favoriteProducts/FavoriteProducts";
import CartProducts from "./features/cartProducts/CartProducts";
import ProtectedRouter from './pages/components/ProtectedRouter';

function App() {
  const user = localStorage.getItem("user");
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="favorite/:id" element={<ProtectedRouter user={user}>
              <FavoriteProducts />
            </ProtectedRouter>} />
            <Route path="cart/:id" element={<CartProducts />} />
            <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
