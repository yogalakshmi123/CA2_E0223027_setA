import React from "react";
import { useNavigate } from "react-router-dom";

function OrderCard({ order }) {
  const navigate = useNavigate();

  return (
    <div
      data-testid="order-item"
      onClick={() => navigate(`/orders/${order.orderId}`)}
      style={{ cursor: "pointer", border: "1px solid #ccc", margin: "8px", padding: "12px" }}
    >
      <p><strong>Order ID:</strong> {order.orderId}</p>
      <p><strong>Customer:</strong> {order.customerName || "Unknown"}</p>
      <p><strong>Restaurant:</strong> {order.restaurant}</p>
      <p><strong>Total:</strong> ₹{order.totalAmount}</p>
      <p><strong>Status:</strong> {order.status}</p>
      {order.rating != null && order.rating !== "" && (
        <p><strong>Rating:</strong> {order.rating}</p>
      )}
    </div>
  );
}

export default OrderCard;