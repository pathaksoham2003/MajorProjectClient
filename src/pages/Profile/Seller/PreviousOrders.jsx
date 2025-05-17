import React from "react";

const PreviousOrders = () => {
  // Placeholder data for previous orders
  const orders = [
    { id: 1, product: "TV", status: "Delivered", date: "2022-11-15" },
    { id: 2, product: "Washing Machine", status: "Delivered", date: "2022-11-20" },
  ];

  return (
    <section className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold text-primary mb-4">Previous Orders</h2>
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

export default PreviousOrders;
