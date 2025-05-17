import React from "react";
import { motion } from "framer-motion";

const DashboardOverview = () => {
  const totalSales = 500;
  const totalRevenue = 20000;

  return (
    <motion.section
      className="bg-white p-6 rounded-lg shadow-md mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-2xl font-semibold text-primary mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-4 bg-secondary text-white rounded-lg">
          <h3 className="text-xl">Total Sales</h3>
          <p className="text-2xl">{totalSales}</p>
        </div>
        <div className="p-4 bg-secondary text-white rounded-lg">
          <h3 className="text-xl">Total Revenue</h3>
          <p className="text-2xl">${totalRevenue}</p>
        </div>
      </div>
    </motion.section>
  );
};

export default DashboardOverview;
