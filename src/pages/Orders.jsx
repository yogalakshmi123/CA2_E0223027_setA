import React from "react";
import { useAppContext } from "../context/AppContext";
import OrderCard from "../components/OrderCard";

function isValidOrder(order) {
  if (!order.items || !Array.isArray(order.items) || order.items.length === 0) return false;
  const hasValidItems = order.items.every(
    (item) => item.quantity != null && Number(item.quantity) > 0
  );
  if (!hasValidItems) return false;
  const amount = Number(order.totalAmount);
  if (isNaN(amount) || amount <= 0) return false;
  return true;
}

function Orders() {
  const { state } = useAppContext();
  const { orders, loading, error } = state;

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  const validOrders = orders.filter(isValidOrder);

  return (
    <div>
      <h2>All Valid Orders</h2>
      {validOrders.map((order) => (
        <OrderCard key={order.orderId} order={order} />
      ))}
    </div>
  );
}

export default Orders;