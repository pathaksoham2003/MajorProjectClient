import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite, selectFavorites, setFavorites } from '../../features/favoriteSlice';
import useFavorite from '../../services/useFavorite';
import { toast } from 'react-toastify';

const ProductCard = ({ data }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const { addToFavorites, removeFromFavorites, getFavorites } = useFavorite();
  const [stars, setStars] = useState([]);
  const isFavorite = favorites.some(fav => fav.id === data.id);


  useEffect(() => {
    const loadFavorites = async () => {
      const response = await getFavorites();
      if (response.success) {
        dispatch(setFavorites(response.data));
      }
    };
    loadFavorites();
  }, []);

  useEffect(() => {
    const filled = parseInt(data.rating || 0);
    const unfilled = 5 - filled;

    const starsArray = [
      ...Array(filled).fill(<FaStar className="text-yellow-400" size={20} />),
      ...Array(unfilled).fill(<FaStar className="text-gray-500" size={20} />),
    ];

    setStars(starsArray);
  }, [data.rating]);

  const handleAddToFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      if (isFavorite) {
        const response = await removeFromFavorites(data.id);
        if (response.success) {
          dispatch(removeFavorite(data.id));
          toast.info('Removed from favorites.');
        }
      } else {
        const response = await addToFavorites(data.id);
        if (response.success) {
          dispatch(addFavorite(response.data));
          toast.success('Added to favorites!');
        }
      }
    } catch (error) {
      toast.error('Error updating favorites.');
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <Link
      to={`/product/${data.id}`}
      className="relative h-auto flex flex-col bg-subheading/20 border-2 p-1 pb-4 border-card rounded-2xl m-2"
    >
      <div className="absolute top-3 left-3 bg-yellow-400 font-bold text-gray-900 z-20 rounded-lg px-2">
        NEW
      </div>
      <div
        className="absolute top-3 right-3 bg-red-100 hover:bg-red-200 shadow-lg p-2 items-center rounded-xl z-20"
        onClick={handleAddToFavorite}
      >
        {isFavorite ? (
          <FaHeart className="text-danger" size={25} />
        ) : (
          <FaRegHeart className="text-danger" size={25} />
        )}
      </div>

      <div className="w-full bg-white rounded-2xl overflow-hidden aspect-square z-10">
        <img
          src={data.imageUrls?.[0]}
          alt={data.name}
          className="w-full object-cover z-10 rounded-[10px]"
        />
      </div>

      <div className="px-3">
        <div className="h-[75px] overflow-hidden pt-3">
          <h2 className="text-text text-xl">{data.name}</h2>
        </div>
        <div className="flex items-center mb-5">
          {stars.map((star, index) => (
            <span key={index}>{star}</span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-text/20 text-sm line-through">
              <span>&#8377; </span>
              {data.price}
            </h2>
            <h2 className="text-text font-semibold text-xl">
              <span>&#8377; </span>
              {data.price}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};

export default ProductCard;
