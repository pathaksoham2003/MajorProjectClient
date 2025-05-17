import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setProducts, setLoading, setError, setFilters, clearFilters, setPage } from "../../features/productSlice";
import { FiChevronLeft, FiChevronRight, FiFilter } from "react-icons/fi";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";
import useProduct from "../../services/useProduct";

const ProductCardSkeleton = () => (
  <div className="relative h-auto flex flex-col bg-white/50 border-2 p-1 pb-4 border-gray-200 rounded-2xl m-2 backdrop-blur-sm">
    <div className="absolute top-3 left-3 w-16 h-6 bg-gray-200 rounded-lg animate-pulse" />
    <div className="absolute top-3 right-3 w-10 h-10 bg-gray-200 rounded-xl animate-pulse" />

    <div className="w-full bg-gray-100 rounded-2xl overflow-hidden aspect-square">
      <div className="w-full h-full bg-gray-200 animate-pulse" />
    </div>

    <div className="px-3">
      <div className="h-[75px] overflow-hidden pt-3">
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
      </div>
      <div className="flex items-center mb-5">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="w-5 h-5 bg-gray-200 rounded-full animate-pulse mr-1" />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div>
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </div>
  </div>
);

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { getAllProducts, filterProducts } = useProduct();
  
  // Get products state from Redux
  const { 
    items: products, 
    loading, 
    error, 
    pagination,
    filters 
  } = useSelector((state) => state.product);

  // Handle URL parameters and initial load
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      dispatch(setFilters({ ...filters, category: category.charAt(0).toUpperCase() + category.slice(1) }));
    }
  }, [searchParams]);

  const fetchProducts = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const result = await getAllProducts(pagination.currentPage);
      if (result.success) {
        dispatch(setProducts(result.data));
      } else {
        dispatch(setError(result.message));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const applyFilters = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const result = await filterProducts(filters, pagination.currentPage);
      if (result.success) {
        dispatch(setProducts(result.data));
      } else {
        dispatch(setError(result.message));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Only fetch products if no filters are applied
  useEffect(() => {
    if (Object.keys(filters).length === 0) {
      fetchProducts();
    }
  }, [pagination.currentPage]);

  // Apply filters with debounce
  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      const timeoutId = setTimeout(() => {
        applyFilters();
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [filters, pagination.currentPage]);

  const handleFilterChange = (name, value) => {
    dispatch(setFilters({ ...filters, [name]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setIsFilterOpen(false);
  };

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1440px] mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filter Sidebar - Hidden on mobile/tablet */}
          <div className="hidden lg:block">
            <FilterSidebar 
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                <strong className="font-bold">Error! </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                // Loading skeleton
                Array.from({ length: 8 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              ) : (
                products.map(product => (
                  <ProductCard key={product.id} data={product} />
                ))
              )}
            </div>

            {/* Pagination */}
            {!loading && pagination.totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="p-2 rounded-lg bg-secondary text-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>
                
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    return (
                      page === 1 ||
                      page === pagination.totalPages ||
                      Math.abs(page - pagination.currentPage) <= 1
                    );
                  })
                  .map((page, index, array) => {
                    if (index > 0 && page - array[index - 1] > 1) {
                      return (
                        <React.Fragment key={`ellipsis-${page}`}>
                          <span className="px-2">...</span>
                          <button
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 rounded-lg ${
                              page === pagination.currentPage
                                ? "bg-primary text-white"
                                : "bg-secondary text-text hover:bg-gray-200"
                            }`}
                          >
                            {page}
                          </button>
                        </React.Fragment>
                      );
                    }
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg ${
                          page === pagination.currentPage
                            ? "bg-primary text-white"
                            : "bg-secondary text-text hover:bg-gray-200"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="p-2 rounded-lg bg-secondary text-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
                >
                  <FiChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Total Products Count */}
            {!loading && (
              <div className="text-center mt-4 text-subheading">
                Showing {products.length} of {pagination.totalProducts} products
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Filter Button - Visible only on mobile/tablet */}
      <button
        onClick={() => setIsFilterOpen(true)}
        className="fixed bottom-6 right-6 lg:hidden bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors z-50"
      >
        <FiFilter className="w-6 h-6" />
      </button>

      {/* Mobile Filter Sidebar */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300 ${isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsFilterOpen(false)}
      >
        <div 
          className={`absolute right-0 top-0 h-full w-[300px] bg-white transform transition-transform duration-300 ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-4">
            <FilterSidebar 
              filters={filters}
              onFilterChange={(name, value) => {
                handleFilterChange(name, value);
                setIsFilterOpen(false);
              }}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
