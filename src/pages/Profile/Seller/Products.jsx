import React, { useState } from "react";

const Products = () => {
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("Electronics");
  const [productImages, setProductImages] = useState([]);

  const handleProductImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length <= 3) setProductImages(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle product upload logic
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold text-primary mb-4">Upload New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="productTitle" className="block text-subheading mb-2">Product Title</label>
          <input
            type="text"
            id="productTitle"
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="productPrice" className="block text-subheading mb-2">Product Price</label>
          <input
            type="number"
            id="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="productCategory" className="block text-subheading mb-2">Product Category</label>
          <select
            id="productCategory"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Home Appliances</option>
            <option>Books</option>
          </select>
        </div>
        <div>
          <label htmlFor="productImages" className="block text-subheading mb-2">Product Images (max 3)</label>
          <input
            type="file"
            id="productImages"
            multiple
            onChange={handleProductImageChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded-lg mt-4 hover:bg-secondary"
        >
          Upload Product
        </button>
      </form>
    </section>
  );
};

export default Products;
