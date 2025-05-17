import { useState } from "react";
import { motion } from "framer-motion";

export default function Profile() {
  const [user, setUser] = useState({
    id: "123",
    name: "John Doe",
    email: "john@example.com",
    password: "********",
    phoneNumber: "1234567890",
    isEmailVerified: true,
    dob: "1990-01-01",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  return (
    <motion.div
      className="p-6 bg-background text-text rounded-lg shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h2
        className="text-2xl font-bold mb-4 text-subheading"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        Profile
      </motion.h2>

      <ul className="space-y-2">
        {Object.entries(user).map(([key, value]) => (
          <li key={key} className="flex justify-between border-b border-gray-200 pb-1">
            <span className="font-medium capitalize">{key}</span>
            <span>{String(value)}</span>
          </li>
        ))}
      </ul>

      <button
        className="mt-4 px-4 py-2 rounded bg-primary text-white hover:bg-primary/90 transition"
        onClick={() => setIsEditing(true)}
      >
        Edit Profile
      </button>

      {isEditing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-background text-text p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
            {Object.entries(editedUser).map(([key, value]) => (
              <div key={key} className="mb-3">
                <label className="block text-sm mb-1 capitalize">{key}</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded bg-background text-text border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={value}
                  onChange={(e) =>
                    setEditedUser((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                />
              </div>
            ))}

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary/90"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-success text-white rounded hover:bg-success/90"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
