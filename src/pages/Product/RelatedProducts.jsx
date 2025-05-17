const RelatedProducts = () => {
    return (
      <div className="max-w-[1200px] w-full mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-text">Related Products</h2>
        <div className="flex items-center gap-2 relative">
          <button className="absolute left-0 z-10 bg-primary text-white w-8 h-8 rounded-full">❮</button>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pl-10 pr-10">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="w-[200px] bg-nav p-4 rounded-lg shadow">
                <div className="aspect-square bg-white mb-2"></div>
                <p className="text-sm text-center text-text">Product {item}</p>
              </div>
            ))}
          </div>
          <button className="absolute right-0 z-10 bg-primary text-white w-8 h-8 rounded-full">❯</button>
        </div>
      </div>
    );
  };
  
  export default RelatedProducts;
  