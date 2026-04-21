import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import Filter from "./pages/Filter";
import Stats from "./pages/Stats";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <nav>
          <Link to="/orders">Orders</Link> |{" "}
          <Link to="/filter">Filter</Link> |{" "}
          <Link to="/stats">Stats</Link>
        </nav>
        <Routes>
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="*" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;