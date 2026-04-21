import React, { useState } from "react";
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

function Filter() {
  const { state } = useAppContext();
  const [input, setInput] = useState("");
  const [searched, setSearched] = useState(false);

  const validOrders = state.orders.filter(isValidOrder);

  const handleSearch = () => setSearched(true);

  const filtered = input.trim()
    ? validOrders.filter((o) =>
        o.restaurant &&
        o.restaurant.toLowerCase().includes(input.trim().toLowerCase())
      )
    : [];

  return (
    <div>
      <h2>Filter Orders</h2>
      <input
        data-testid="filter-input"
        type="text"
        placeholder="Enter restaurant name"
        value={input}
        onChange={(e) => { setInput(e.target.value); setSearched(false); }}
      />
      <button onClick={handleSearch}>Search</button>

      {searched && input.trim() === "" && (
        <p style={{ color: "red" }}>Please enter a restaurant name</p>
      )}
      {searched && input.trim() !== "" && filtered.length === 0 && (
        <p>No results found</p>
      )}
      {searched && filtered.map((order) => (
        <OrderCard key={order.orderId} order={order} />
      ))}
    </div>
  );
}

export default Filter;