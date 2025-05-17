import { useEffect, useState } from "react";
import CreateProductModal from "./CreateProductModal";
import FilterBar from "./FilterBar";
import useShop from "../../../../services/useShop";
import { useSelector } from "react-redux";
import { selectShopProducts } from "../../../../features/shopSlice";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ManageProducts() {
  const [showModal, setShowModal] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const navigate = useNavigate()

  const { shopProducts, getProductsAtShop, filterProducts } = useShop();
  const products = useSelector(selectShopProducts);

  const applyFilters = (filters) => {
    filterProducts(filters);
  };

  const refresh = async () => {
    getProductsAtShop();
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="flex flex-col p-4 gap-6 bg-background min-h-screen">
      {/* Header */}
      <div className="hidden sm:flex justify-between items-center p-4 rounded-2xl shadow bg-secondary">
        <FilterBar onFilter={applyFilters} />
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary hover:opacity-90 text-white px-5 py-2 rounded-xl shadow transition-all"
        >
          + Add Product
        </button>
      </div>

      {/* Mobile Actions */}
      <div className="sm:hidden flex justify-between items-center mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-4 py-2 rounded-xl shadow"
        >
          + Add Product
        </button>
      </div>

      <button
        onClick={() => setFilterOpen(true)}
        className="sm:hidden fixed bottom-5 right-5 bg-primary text-white p-4 rounded-full shadow-lg z-50"
      >
        🔍
      </button>

      {/* Mobile Filter Sidebar */}
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-secondary shadow-lg z-50 p-6 flex flex-col gap-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-text">Filters</h2>
              <button onClick={() => setFilterOpen(false)} className="text-xl">✖</button>
            </div>
            <FilterBar onFilter={applyFilters} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <motion.div
            layout
            key={product.id}
            className="rounded-2xl overflow-hidden shadow-md bg-secondary p-4 transition-all hover:scale-105"
            whileHover={{ scale: 1.03 }}
            onClick={() => navigate(`/seller/product/${product.id}`, { state:{product}})}
          >
            <img
              src={product.imageUrls[0]}
              alt={product.name}
              className="w-full h-40 object-cover rounded-xl"
            />
            <h3 className="font-semibold text-text mt-2 truncate">{product.name}</h3>
            <p className="text-sm text-subheading truncate">
              {product.brand} &mdash; ${product.price}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Create Product Modal */}
      {showModal && (
        <CreateProductModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            refresh();
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
