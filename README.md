# Full-Stack Application with Microservices Integration

## Overview

This project integrates multiple microservices (Order Service, Customer Service, and Inventory Service) with a React-based frontend. The application allows users to manage customers, products, and orders in a seamless distributed system.Backend Using next.js for connection , databse using mysql

### Microservices
1. **Order Service** (http://localhost:3000)
2. **Inventory Service** (http://localhost:3001)
3. **Customer Service** (http://localhost:3002)

### Key Features:
- **Order Validation**: 
  - Validate if a customer exists (via Customer Service).
  - Check product stock availability (via Inventory Service).
  - Reduce product stock upon order confirmation.
- **Product Management**: 
  - Add new products.
  - List all products.
- **Customer Management**: 
  - Add new customers.
  - List all customers.
- **Order Management**: 
  - Place new orders.
  - List all orders.
  - Update order status.

---

## Backend Setup

### 1. Order Service

- **GET /customers/:id**: Fetch customer details for validation.
- **GET /products/:id/validate?quantity=x**: Validate product availability in inventory.
- **POST /orders**: Place a new order after customer and product validation.
- **GET /orders/:id**: Fetch order details, including customer information.

### 2. Inventory Service

- **PATCH /products/:id/quantity**: Reduce stock after an order placement.
- **GET /products**: List all products.
- **POST /products**: Add new products.

### 3. Customer Service

- **POST /customers**: Add new customer.
- **GET /customers**: List all customers.




