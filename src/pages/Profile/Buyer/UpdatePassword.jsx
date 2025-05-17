import { motion } from "framer-motion";

export default function UpdatePassword() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 bg-background rounded-2xl shadow"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-xl font-semibold mb-4 text-primary"
      >
        Change Password
      </motion.h2>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-primary text-background px-4 py-2 rounded mb-4"
      >
        Update Password
      </motion.button>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-background p-4 rounded shadow"
      >
        <input
          placeholder="Current Password"
          className="mb-2 p-2 w-full border rounded"
          type="password"
        />
        <input
          placeholder="New Password"
          className="mb-2 p-2 w-full border rounded"
          type="password"
        />
        <input
          placeholder="Confirm New Password"
          className="mb-4 p-2 w-full border rounded"
          type="password"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-success text-background w-full py-2 rounded"
        >
          Submit
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
