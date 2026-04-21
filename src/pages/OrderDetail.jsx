import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useAppContext();

  const order = state.orders.find(
    (o) => String(o.orderId) === String(id)
  );

  if (!order) return <p>Order not found</p>;

  const items = Array.isArray(order.items) ? order.items : [];

  return (
    <div>
      <button onClick={() => navigate("/orders")}>Back</button>
      <h2>Order #{order.orderId}</h2>
      <p><strong>Customer:</strong> {order.customerName || "Unknown"}</p>
      <p><strong>Restaurant:</strong> {order.restaurant || "N/A"}</p>
      <p><strong>Status:</strong> {order.status || "N/A"}</p>
      <p><strong>Delivery Time:</strong> {order.deliveryTime || "N/A"}</p>
      {order.rating != null && order.rating !== "" && (
        <p><strong>Rating:</strong> {order.rating}</p>
      )}
      <h3>Items</h3>
      {items.length === 0 ? (
        <p>No items found</p>
      ) : (
        items.map((item, index) => {
          const subtotal = Number(item.price || 0) * Number(item.quantity || 0);
          return (
            <div key={index} style={{ border: "1px solid #eee", padding: "8px", margin: "4px" }}>
              <p><strong>Name:</strong> {item.name || "N/A"}</p>
              <p><strong>Price:</strong> ₹{item.price}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Subtotal:</strong> ₹{subtotal}</p>
            </div>
          );
        })
      )}
      <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
    </div>
  );
}

export default OrderDetail;