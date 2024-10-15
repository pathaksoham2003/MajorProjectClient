import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { checkoutProduct, getSpecificProduct } from "../utils/api";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [mainImage, setImage] = useState();
  const getData = async () => {
    const response = await axios.get(`${getSpecificProduct}/${id}`);
    setProduct(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      className="flex-1 flex flex-col align-middle items-center min-h-screen"
      style={{ backgroundColor: "var(--bgc)" }}
    >
      <div className="max-w-[1024px] w-full">
        <div className="flex flex-col mt-5 sm:flex-row w-full">
          <div className="sm:w-1/2">
            <div className="w-full flex justify-center aspect-square bg-nav">
              <img className="h-full" src={product.mainimage} />
            </div>
            <div className="w-full flex bg-nav">
              <div className="w-[100px] bg-white aspect-square overflow-hidden px-3 ">
                <img className="object-contain" src={product.eximg1} />
              </div>
              <div className="w-[100px] bg-white aspect-square overflow-hidden px-3">
                <img className="object-contain" src={product.eximg2} />
              </div>
            </div>
          </div>
          <div className="sm:w-1/2 px-10">
            <h1 style={{ color: "var(--h)" }} className="text-2xl font-bold">
              {product.name}
            </h1>
            <h1 style={{ color: "var(--h)" }}>{product.brand}</h1>
            <h1 style={{ color: "var(--h)" }}>{product.category}</h1>
            <h1 style={{ color: "var(--h)" }}>₹ {product.price}</h1>
            <p style={{ color: "var(--h)" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et sunt
              non ea rerum dolorum voluptatibus labore, dolore fuga aperiam ut
              temporibus quidem nihil quas molestias dolores accusamus
              reiciendis assumenda praesentium. Voluptatibus, sed. Pariatur
              eveniet accusamus dolorem nam vitae sint ad, illum debitis, cumque
              incidunt atque qui hic minima adipisci officia vero rerum ipsum
              vel iusto saepe. A aperiam voluptates suscipit voluptatum
              cupiditate beatae ullam laboriosam magni autem quasi veniam neque
              quidem enim exercitationem, excepturi error accusamus. Pariatur,
              est! Est facere iure a? Totam, sit culpa, ex non minima tenetur
              expedita sequi eum fugit at veritatis debitis nisi cum. Nulla
              veniam rem impedit.
            </p>
            <div className="flex py-5">
              <button
                className="bg-primary rounded-lg px-5 py-2 text-white font-semibold mx-2"
                type="submit"
              >
                Add to cart
              </button>
              <form action={checkoutProduct} method="POST">
                <button
                  className="bg-primary rounded-lg px-5 py-2 text-white font-semibold mx-2"
                  type="submit"
                >
                  Checkout
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
