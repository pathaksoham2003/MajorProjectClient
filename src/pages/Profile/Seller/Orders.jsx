import React from "react";

const Orders = () => {
  // Placeholder data for orders
  const orders = [
    { id: 1, product: "Laptop", status: "Shipped", date: "2022-12-01" },
    { id: 2, product: "Phone", status: "Delivered", date: "2022-12-05" },
  ];

  return (
    <section className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold text-primary mb-4">Received Orders</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="p-2 text-left text-subheading">Product</th>
            <th className="p-2 text-left text-subheading">Status</th>
            <th className="p-2 text-left text-subheading">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="p-2">{order.product}</td>
              <td className="p-2">{order.status}</td>
              <td className="p-2">{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Orders;
