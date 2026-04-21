import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

function Stats() {
  const { state } = useAppContext();
  const { orders } = state;

  const totalOrders = orders.length;

  const deliveredOrders = orders.reduce(
    (count, o) =>
      o.status && o.status.toLowerCase() === "delivered" ? count + 1 : count,
    0
  );

  const cancelledOrders = orders.reduce(
    (count, o) =>
      o.status && o.status.toLowerCase() === "cancelled" ? count + 1 : count,
    0
  );

  useEffect(() => {
    window.appState = { totalOrders, deliveredOrders, cancelledOrders };
  }, [totalOrders, deliveredOrders, cancelledOrders]);

  return (
    <div>
      <h2>Order Statistics</h2>
      <p data-testid="total-orders">Total Orders: {totalOrders}</p>
      <p data-testid="delivered-orders">Delivered Orders: {deliveredOrders}</p>
      <p data-testid="cancelled-orders">Cancelled Orders: {cancelledOrders}</p>
    </div>
  );
}

export default Stats;