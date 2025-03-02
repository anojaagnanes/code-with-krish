# Order Management System - Microservices Architecture

This project implements an **Order Management System** with three microservices:
1. **Order Service**
2. **Inventory Service**
3. **Customer Service**

Each microservice is responsible for specific tasks, enabling a distributed system for order creation, customer validation, and inventory management.


## Microservices Overview

### 1️⃣ **Order Service**

#### Responsibilities:
- Handles order creation and tracking.
- Validates customer existence via `Customer Service`.
- Checks product stock availability via `Inventory Service`.
- Stores order details and maintains a one-to-many relationship:
  - **One customer → Many orders**
  - **One order → Many order items**

#### Key Endpoints:

- **Create an Order**
  - `POST /orders`
  - Validates customer and product availability before creating an order.

- **Get All Orders**
  - `GET /orders`
  - Fetches all orders in the system.

- **Get Order by ID**
  - `GET /orders/:id`
  - Fetches order details by order ID.

---

### 2️⃣ **Inventory Service**

#### Responsibilities:
- Manages the product catalog and stock levels.
- Reduces stock when an order is placed.
- Provides product details to `Order Service` for validation.

#### Key Endpoints:

- **Get All Products**
  - `GET /products`
  - Fetches all products.

- **Validate Stock Availability**
  - `GET /products/:id/validate?quantity=x`
  - Returns whether the required quantity of the product is available in stock.

- **Update Product Stock**
  - `PATCH /products/:id/reduce`
  - Reduces the stock quantity for a product when an order is confirmed.

---

### 3️⃣ **Customer Service**

#### Responsibilities:
- Manages customer profiles.
- Provides customer details to `Order Service` for validation.

#### Key Endpoints:

- **Create a New Customer**
  - `POST /customers`
  - Adds a new customer to the system.

- **Get All Customers**
  - `GET /customers`
  - Fetches all customers.

- **Get Customer by ID**
  - `GET /customers/:id`
  - Fetches a customer's details by ID.

---

## High-Level Flow

1. **Order Placement**:
   - The customer places an order via the `Order Service`.
   
2. **Customer Validation**:
   - `Order Service` fetches customer details from `Customer Service` to validate the customer exists.

3. **Stock Validation**:
   - `Order Service` checks stock availability for the requested products via `Inventory Service`.

4. **Order Confirmation**:
   - If stock is available:
     - `Order Service` confirms the order.
     - `Inventory Service` updates stock by reducing the quantity based on the order.
     - `Order Service` stores the order details and returns a success response to the customer.

