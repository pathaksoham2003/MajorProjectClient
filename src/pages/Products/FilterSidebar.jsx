import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import useProduct from "../../services/useProduct";
import { FiFilter, FiX, FiChevronDown } from "react-icons/fi";

const FilterSidebarSkeleton = () => {
  return (
    <div className="w-full lg:w-72 bg-white rounded-xl shadow-lg p-6 lg:sticky lg:top-24">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
          <div className="w-20 h-6 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="w-24 h-6 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="space-y-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="filter-group">
            <div className="flex justify-between items-center mb-3">
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};

const FilterSidebar = ({ filters, onFilterChange, onClearFilters }) => {
  const [filterOptions, setFilterOptions] = useState(null);
  const { getFilterOptions } = useProduct();

  useEffect(() => {
    const fetchFilterOptions = async () => {
      const result = await getFilterOptions();
      if (result.success) {
        setFilterOptions(result.data);
      }
    };
    fetchFilterOptions();
  }, []);

  if (!filterOptions) return <FilterSidebarSkeleton />;

  return (
    <div className="w-full lg:w-72 bg-white rounded-xl shadow-lg p-6 lg:sticky lg:top-24">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <FiFilter className="text-primary text-xl" />
          <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <FiX className="text-lg" />
            Clear All
          </button>
          <button
            onClick={onClearFilters}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FiX className="text-xl text-gray-600" />
          </button>
        </div>
      </div>

      <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
        {/* Category Filter */}
        <div className="filter-group">
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center justify-between">
            Category
            <FiChevronDown className="text-gray-400" />
          </h3>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange("category", e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          >
            <option value="">All Categories</option>
            {filterOptions.categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Brand Filter */}
        <div className="filter-group">
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center justify-between">
            Brand
            <FiChevronDown className="text-gray-400" />
          </h3>
          <select
            value={filters.brand}
            onChange={(e) => onFilterChange("brand", e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          >
            <option value="">All Brands</option>
            {filterOptions.brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        {/* Gender Filter */}
        <div className="filter-group">
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center justify-between">
            Gender
            <FiChevronDown className="text-gray-400" />
          </h3>
          <select
            value={filters.gender}
            onChange={(e) => onFilterChange("gender", e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          >
            <option value="">All Genders</option>
            {filterOptions.genders.map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="filter-group">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Max Price</h3>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange("maxPrice", e.target.value)}
              placeholder="Enter max price"
              className="w-full pl-8 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        {/* Rating Filter */}
        <div className="filter-group">
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center justify-between">
            Minimum Rating
            <FiChevronDown className="text-gray-400" />
          </h3>
          <select
            value={filters.minRating}
            onChange={(e) => onFilterChange("minRating", e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          >
            <option value="">Any Rating</option>
            <option value="4">4★ & above</option>
            <option value="3">3★ & above</option>
            <option value="2">2★ & above</option>
            <option value="1">1★ & above</option>
          </select>
        </div>

        {/* Discount Filter */}
        <div className="filter-group">
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center justify-between">
            Discount
            <FiChevronDown className="text-gray-400" />
          </h3>
          <select
            value={filters.discount}
            onChange={(e) => onFilterChange("discount", e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          >
            <option value="">Any Discount</option>
            {filterOptions.discount.map(discount => (
              <option key={discount} value={discount}>{discount}% & above</option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className="filter-group">
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center justify-between">
            Sort By
            <FiChevronDown className="text-gray-400" />
          </h3>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange("sortBy", e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          >
            <option value="">Recommended</option>
            {filterOptions.sortOptions.map(option => (
              <option key={option} value={option}>
                {option.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

FilterSidebar.propTypes = {
  filters: PropTypes.shape({
    category: PropTypes.string,
    brand: PropTypes.string,
    gender: PropTypes.string,
    minRating: PropTypes.string,
    maxPrice: PropTypes.string,
    discount: PropTypes.string,
    sortBy: PropTypes.string,
    search: PropTypes.string
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired
};

export default FilterSidebar;
