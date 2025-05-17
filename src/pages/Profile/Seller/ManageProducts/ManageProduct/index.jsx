import {useState} from "react";
import {motion} from "framer-motion";
import useProduct from "../../../../../services/useProduct";
import {useLocation, useParams} from "react-router-dom";
import EditProductModal from "./EditProductModal";
import ManageCoupon from "./ManageCoupon";

const ManageProduct = () => {
  const {id: productId} = useParams();
  const {updateProductDetails} = useProduct();
  const {product} = useLocation().state;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    discount: product.discount,
    category: product.category,
    brand: product.brand,
    gender: product.gender,
  });

  const handleProductUpdate = async (e) => {
    e.preventDefault();
    const response = await updateProductDetails(productId, formData);
    if (response.success) {
      setIsEditModalOpen(false);
    }
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Product Details Section */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        className="bg-background/20 rounded-lg shadow-lg p-6 mb-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-text">{product.name}</h1>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Edit Product
          </button>
        </div>
        <div className="flex gap-4">
          <div className="space-y-4">
            <div>
              <p className="text-text/80">Brand</p>
              <p className="text-text">{product.brand}</p>
            </div>
            <div>
              <p className="text-text/80">Category</p>
              <p className="text-text">{product.category}</p>
            </div>
            <div>
              <p className="text-text/80">Price</p>
              <p className="text-text">${product.price}</p>
            </div>
            <div>
              <p className="text-text/80">Discount</p>
              <p className="text-text">{product.discount}%</p>
            </div>
            <div>
              <p className="text-text/80">Gender</p>
              <p className="text-text capitalize">{product.gender}</p>
            </div>
          </div>
          <div>
            <p className="text-text/80 mb-2">Description</p>
            <p className="text-text whitespace-pre-line">{product.description}</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-text/80 mb-2">Product Images</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {product.imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Product ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Coupons Section */}
      <ManageCoupon productId={productId} />

      {/* Edit Product Modal */}
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleProductUpdate}
      />
    </div>
  );
};

export default ManageProduct;
