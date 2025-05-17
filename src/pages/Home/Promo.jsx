import { Link } from "react-router-dom";

export default function Promo() {
    return (
      <div className="relative overflow-hidden bg-background">
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-text sm:text-6xl">
                Summer styles are finally here
              </h1>
              <p className="mt-4 text-xl text-text">
                This year, our new summer collection will shelter you from the harsh elements of a world that doesn't care
                if you live or die.
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            alt=""
                            src="https://www.jamega.in/wp-content/uploads/2020/08/portait-young-handsome-man_1303-9709-300x300.jpg"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="https://images.bewakoof.com/t1080/women-s-green-be-stupid-odie-graphic-printed-oversized-t-shirt-591184-1721129979-1.jpg"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="https://5.imimg.com/data5/SELLER/Default/2022/6/CX/GX/LV/143080486/img-20201014-wa0085-500x500.jpg"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="https://cdn.pixabay.com/photo/2023/08/25/07/37/shoes-8212405_1280.jpg"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="https://media.istockphoto.com/id/1293366109/photo/this-one-match-perfect-with-me.jpg?s=2048x2048&w=is&k=20&c=aipF63e5nI-DxreysL9XbP9S_kYbbVeBQAw5d3qzSUs="
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="https://m.media-amazon.com/images/I/41c7J3SIyxL._SX300_SY300_QL70_FMwebp_.jpg"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="https://m.media-amazon.com/images/I/81Z1scL6HvL._SX679_.jpg "
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  
                <Link
                  to="/products"
                  className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                >
                  Shop Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }