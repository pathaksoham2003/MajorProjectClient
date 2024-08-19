import React, { useEffect } from "react";
import Card from "../allFeatureComponents/Card";
import FilterDark from "../../assets/filter-light.svg?react";
import { useSelector, useDispatch } from "react-redux";
import {
  allProducts,
  filteredProductsSelector,
  getBrand,
  getCategory,
  getUniqueBrands,
  getUniqueCat,
  loadData,
  loadingSelector,
  ratedProducts,
  searchProducts,
  uniqueBrands,
  uniqueCategories,
} from "./allProductsSlice";
import Loading from "../../pages/Loading";
import { selectFilterState, toogleFilter } from "../allFeatureSlice";

const AllProducts = () => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);
  const filteredProducts = useSelector(filteredProductsSelector);
  const uniqCategories = useSelector(getUniqueCat);
  const uniqBrands = useSelector(getUniqueBrands);
  const sidebar = useSelector(selectFilterState);

  useEffect(() => {
    dispatch(uniqueBrands());
    dispatch(uniqueCategories());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full flex h-full overflow-scroll justify-center">

        <div className="w-full flex h-screen max-w-[1440px]">
          <div className="relative bg-background">
            <div
              className="rounded-full flex md:hidden justify-center items-center m-1.5 h-10 w-10 bg-card absolute top-1.5 left-2.5 z-30"
              onClick={() => dispatch(toogleFilter())}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                />
              </svg>
            </div>
            <div
              className={`bg-background border-r-2 h-full p-[10%] transition-left duration-800  ${
                sidebar ? "left-0" : "-left-[280px]"
              } fixed top-0 z-20 w-[200px] md:relative md:left-0 md:h-auto`}
            >
              <hr className="mb-2.5" />
              <h3
                className="text-heading cursor-pointer"
                onClick={() => {
                  dispatch(allProducts());
                  dispatch(toogleFilter());
                }}
              >
                All Products
              </h3>
              <hr className="mb-2.5" />
              <h3 className="text-heading">Search Product</h3>
              <input
                className="all-unset bg-bgc text-heading text-medium p-[2px_5px] w-[98%] m-[5px_0] rounded-[10px]"
                placeholder="Search"
                type="text"
                onChange={(e) => {
                  dispatch(searchProducts(e.target.value));
                  dispatch(toogleFilter());
                }}
              />
              <hr className="mb-2.5" />
              <h3 className="text-heading">Categories</h3>
              {uniqCategories.map((val) => (
                <div
                  key={val}
                  className="flex justify-between items-center"
                  onClick={() => {
                    dispatch(getCategory(val));
                    dispatch(toogleFilter());
                  }}
                >
                  <label className="text-heading ml-1.5">{val}</label>
                  <h5 className="text-heading opacity-80"></h5>
                </div>
              ))}
              <hr className="mb-2.5" />
              <h3 className="text-heading">Brands</h3>
              {uniqBrands.map((val) => (
                <div
                  key={val}
                  className="flex justify-between items-center"
                  onClick={() => {
                    dispatch(getBrand(val));
                    dispatch(toogleFilter());
                  }}
                >
                  <label className="text-heading ml-1.5">{val}</label>
                  <h5 className="text-heading opacity-80"></h5>
                </div>
              ))}
              <hr className="mb-2.5" />
              <h3 className="text-heading">Ratings</h3>
              <div className="flex justify-start">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <label
                    key={rating}
                    className="w-[90%]"
                    onClick={() => {
                      dispatch(ratedProducts(rating));
                      dispatch(toogleFilter());
                    }}
                  >
                    {rating}
                  </label>
                ))}
              </div>
              <hr className="mb-2.5" />
              <h3 className="text-heading">Price</h3>
            </div>
          </div>
          <div className="w-full h-full">
            <div className="bg-background grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((data) => (
                <Card
                  key={data.id}
                  data={data}
                  filteredProducts={filteredProducts}
                />
              ))}
            </div>
          </div>
        </div>
        </div>
      )}
    </>
  );
};

export default AllProducts;
