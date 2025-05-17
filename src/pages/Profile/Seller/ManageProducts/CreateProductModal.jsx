import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useSelector } from "react-redux";

export default function CreateProductModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({ gender: "unisex" });
  const [images, setImages] = useState([]);
  const ref = useRef();
  const shop = useSelector((state) => state.shop.shopData);

  const submit = async () => {
    try {
      const formData = new FormData();

      for (const key in form) {
        formData.append(key, form[key]);
      }

      images.forEach((img) => {
        formData.append("images", img.file); // .file contains File object
      });

      formData.append("shopId", shop.id);

      await axios.post("http://localhost:8002/api/pro", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onSuccess();
    } catch (error) {
      console.error("Form submission failed:", error);
      alert("Failed to create product. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const files = [...e.target.files].slice(0, 3);
    const imageObjects = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages(imageObjects);
  };

  const moveImage = (index, direction) => {
    const newImages = [...images];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newImages.length) return;

    [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
    setImages(newImages);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-auto">
      <motion.div
        ref={ref}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-white p-6 rounded-xl w-[90%] max-w-3xl space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Name" className="p-2 border rounded" onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Brand" className="p-2 border rounded" onChange={(e) => setForm({ ...form, brand: e.target.value })} />
          <input placeholder="Price" type="number" className="p-2 border rounded" onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <input placeholder="Discount" type="number" className="p-2 border rounded" onChange={(e) => setForm({ ...form, discount: e.target.value })} />
          <select className="p-2 border rounded" onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option value="">Select Category</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Home & Kitchen</option>
            <option>Sports</option>
            <option>Beauty</option>
            <option>Stationary</option>
            <option>Toys</option>
            <option>Other</option>
          </select>
          <select className="p-2 border rounded" onChange={(e) => setForm({ ...form, gender: e.target.value })}>
            <option value="unisex">Unisex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          rows={3}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input type="file" multiple accept="image/*" className="w-full p-2 border rounded" onChange={handleImageChange} />

        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-2">
            {images.map((img, idx) => (
              <div key={idx} className="relative border rounded p-2">
                <img src={img.preview} alt="preview" className="w-full h-32 object-cover rounded" />
                <div className="flex justify-between mt-1 text-sm">
                  <button
                    disabled={idx === 0}
                    onClick={() => moveImage(idx, -1)}
                    className="text-blue-600 hover:underline disabled:opacity-30"
                  >
                    Up
                  </button>
                  <button
                    disabled={idx === images.length - 1}
                    onClick={() => moveImage(idx, 1)}
                    className="text-blue-600 hover:underline disabled:opacity-30"
                  >
                    Down
                  </button>
                </div>
                {idx === 0 && (
                  <div className="absolute top-1 right-1 bg-green-600 text-white text-xs px-2 py-0.5 rounded">
                    Primary
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end space-x-2 pt-4">
          <button onClick={submit} className="bg-green-600 text-white px-4 py-2 rounded">
            Add
          </button>
          <button onClick={onClose} className="text-red-600 font-semibold">
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}
