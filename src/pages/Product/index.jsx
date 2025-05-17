
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProduct from "../../services/useProduct";
import ProductImages from "./ProductImages";
import ProductDetails from "./ProductDetails";
import RelatedProducts from "./RelatedProducts";
import ReviewForm from "./ReviewForm";

const Product = () => {
  const { id } = useParams();
  const { getProductDetails, productDetails } = useProduct();
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    getProductDetails(id);
  }, [id]);

  useEffect(() => {
    if (productDetails?.imageUrls?.length) {
      setMainImage(productDetails.imageUrls[0]);
    }
  }, [productDetails]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-background">
      <div className="max-w-[1440px] w-full flex sm:flex-row flex-col gap-6 mt-6">
        <ProductImages
          imageUrls={productDetails?.imageUrls}
          mainImage={mainImage}
          setMainImage={setMainImage}
        />
        <ProductDetails productDetails={productDetails} />
      </div>
      <RelatedProducts />
      <ReviewForm />
    </div>
  );
};

export default Product;
