import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFavorite from '../../services/useFavorite';
import { FiHeart, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { getFavorites, removeFromFavorites } = useFavorite();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const result = await getFavorites();
      if (result.success) {
        setFavorites(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to fetch favorites');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (productId) => {
    try {
      const result = await removeFromFavorites(productId);
      if (result.success) {
        setFavorites(favorites.filter(fav => fav.id !== productId));
        toast.info('Removed from favorites.');
      } else {
        setError(result.message);
        toast.error(result.message || 'Failed to remove from favorites');
      }
    } catch (err) {
      setError('Failed to remove from favorites');
      toast.error('Failed to remove from favorites');
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center bg-bgc">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center bg-bgc">
        <div className="text-danger text-center">
          <p className="text-lg">{error}</p>
          <button
            onClick={fetchFavorites}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-bgc py-8">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-text">My Favorites</h1>
          <div className="flex items-center gap-2 text-subheading">
            <FiHeart className="text-xl" />
            <span>{favorites.length} items</span>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <FiHeart className="w-16 h-16 mx-auto text-subheading mb-4" />
            <h2 className="text-xl font-medium text-text mb-2">Your favorites list is empty</h2>
            <p className="text-subheading mb-6">Add items to your favorites to see them here</p>
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all duration-200"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((favorite) => (
              <div
                key={favorite.id}
                className="bg-background rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200"
              >
                <div className="relative aspect-square">
                  <img
                    src={favorite.imageUrls[0]}
                    alt={favorite.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleRemoveFavorite(favorite.id)}
                    className="absolute top-2 text-white right-2 p-2 bg-danger/70 rounded-lg shadow-md hover:bg-danger hover:text-white transition-all duration-200"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-text mb-2 line-clamp-1">
                    {favorite.name}
                  </h3>
                  <p className="text-text/70 mb-4 line-clamp-2">
                    {favorite.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-text">
                      ₹{favorite.price}
                    </span>
                    <button
                      onClick={() => navigate(`/product/${favorite.id}`)}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all duration-200"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorite;