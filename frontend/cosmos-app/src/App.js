import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import OrderManagement from './components/order-management';
import CustomerValidate from './components/customer-management';
import ProductDetail from './service/product-service';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <Navigation url="/order-management" nav="Order Management" />
            <Navigation url="/customer-management" nav="Customer Management" />
            <Navigation url="/productForm" nav="Inventery managment" />
          </ul>
        </nav>

        <Routes>
          <Route path="/order-management" element={<OrderManagement />} />
          <Route path="/customer-management" element={<CustomerValidate />} />
          <Route path="/productForm" element={<ProductDetail />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Navigation({ url, nav }) {
  return (
    <li>
      <Link to={url}>{nav}</Link>
    </li>
  );
}

export default App;
