import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectFilterOptions } from "../../../../features/shopSlice";
import useShop from "../../../../services/useShop";

export default function FilterBar({ onFilter }) {
  const options = useSelector(selectFilterOptions);
  const [selected, setSelected] = useState({});
  const { getFilterOptions } = useShop();

  useEffect(() => {
    getFilterOptions();
  }, []);

  const handleChange = (key, value) => {
    setSelected((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onFilter(selected);
  };

  return (
    <div className="w-full bg-background rounded-2xl shadow-lg p-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between sticky top-0 z-20">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full">
        <div>
          <label className="text-subheading text-sm">Category</label>
          <select
            className="w-full p-2 rounded-xl bg-secondary text-text shadow"
            onChange={(e) => handleChange("category", e.target.value)}
          >
            <option value="">All</option>
            {options?.categories?.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-subheading text-sm">Brand</label>
          <select
            className="w-full p-2 rounded-xl bg-secondary text-text shadow"
            onChange={(e) => handleChange("brand", e.target.value)}
          >
            <option value="">All</option>
            {options?.brands?.map((brand) => (
              <option key={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-subheading text-sm">Gender</label>
          <select
            className="w-full p-2 rounded-xl bg-secondary text-text shadow"
            onChange={(e) => handleChange("gender", e.target.value)}
          >
            <option value="">All</option>
            {options?.genders?.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-subheading text-sm">Sort By</label>
          <select
            className="w-full p-2 rounded-xl bg-secondary text-text shadow"
            onChange={(e) => handleChange("sortBy", e.target.value)}
          >
            <option value="">Default</option>
            {options?.sortOptions?.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-subheading text-sm">Discount</label>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            className="w-full"
            onChange={(e) => handleChange("discount", e.target.value)}
          />
          <p className="text-xs text-text mt-1">Min: {selected.discount || 0}%</p>
        </div>
      </div>

      <button
        onClick={handleApply}
        className="mt-2 md:mt-0 bg-primary text-white px-6 py-2 rounded-xl shadow hover:opacity-90 transition-all"
      >
        Apply Filters
      </button>
    </div>
  );
}
