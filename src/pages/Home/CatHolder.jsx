import React, { useEffect, useState } from "react";
import { getAllProductsByCategory } from "../../utils/api";
import Slider from "react-slick";
// REFER THIS FOR THE SLIDERS https://react-slick.neostack.com/docs/get-started
const CatHolder = ({ category }) => {
  const [products, setProducts] = useState([]);

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    infinite:true,
    autoplay:true,
    autoplaySpeed:3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const fetchCatPro = async (category) => {
    const response = await fetch(`${getAllProductsByCategory}/${category}`);
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchCatPro(category);
  }, []);
  return (
    <>
      <h3
        className="text-text text-5xl pt-16 pb-4 px-4"
      >
        {category.toUpperCase()}
      </h3>
      <div className="h-[500px] px-5">
       <Slider auto {...settings}>
        {products?.map((product) => {
          return <Card data={product} />;
        })}
      </Slider>
      </div>
    </>
  );
};

export default CatHolder;
