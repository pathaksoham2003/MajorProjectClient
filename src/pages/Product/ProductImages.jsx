const ProductImages = ({ imageUrls = [], mainImage, setMainImage }) => {
    return (
      <div className="sticky top-0 sm:w-1/2 h-fit">
        <div className="aspect-square bg-nav flex justify-center items-center">
          <img src={mainImage} alt="Main Product" className="max-h-full object-contain" />
        </div>
        <div className="flex gap-3 py-3 overflow-x-auto">
          {imageUrls.map((url, idx) => (
            <div
              key={idx}
              onClick={() => setMainImage(url)}
              className="w-[100px] h-[100px] bg-white overflow-hidden border border-primary cursor-pointer"
            >
              <img src={url} alt={`img-${idx}`} className="w-full h-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ProductImages;
  