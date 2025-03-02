import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function OrderManagement() {
    // States to manage form inputs and UI feedback
    const [customerId, setCustomerId] = useState(""); // Customer ID
    const [productId, setProductId] = useState(""); // Product ID
    const [price, setPrice] = useState(""); // Price of the product
    const [quantity, setQuantity] = useState(""); // Quantity of the product
    const [loading, setLoading] = useState(false); // Loading state for form submission
    const [message, setMessage] = useState(""); // Message for success or error feedback
    const [orders, setOrders] = useState([]); // State to store fetched orders
    const [customers, setCustomers] = useState([]); // State to store fetched customers

    // API URLs for orders and customers
    const baseURL = "http://localhost:3000/orders/";  // Orders API
    const customerBaseURL = "http://localhost:3002/customers"; // Customers API 

    // Function to fetch orders from the API
    const fetchOrders = async () => {
        try {
            const response = await axios.get(baseURL); // Fetching orders from the server
            setOrders(response.data); // Update state with fetched orders
        } catch (error) {
            console.error("Failed to fetch orders:", error);
            setMessage("Failed to load orders."); // Display error message
        }
    };

    // Function to fetch customers from the API
    const fetchCustomers = async () => {
        try {
            const response = await axios.get(customerBaseURL); // Fetching customers from the server
            setCustomers(response.data); // Update state with fetched customers
        } catch (error) {
            console.error("Failed to fetch customers:", error);
            setMessage("Failed to load customers."); // Display error message
        }
    };

    // Fetch orders and customers when the component mounts
    useEffect(() => {
        fetchOrders(); // Fetch orders on mount
        fetchCustomers(); // Fetch customers on mount
    }, []);

    // Function to create a new order
    const createOrder = useCallback(async (order) => {
        setLoading(true); // Set loading state to true when submitting
        setMessage(""); // Reset message before submission

        try {
            const response = await axios.post(baseURL, order); // Send POST request to create order
            console.log("Order successfully created:", response.data);
            setMessage("Order created successfully!"); // Display success message
            fetchOrders(); // Refresh the orders list
        } catch (error) {
            console.error("Failed to create order:", error);
            setMessage(error.response?.data?.message || "Failed to create order."); // Display error message
        } finally {
            setLoading(false); // Set loading state to false after request is complete
        }
    }, []);

    // Function to update the status of an existing order
    const updateOrderStatus = async (orderId, status) => {
        setLoading(true); // Set loading state to true when updating status
        setMessage(""); // Reset message before update

        try {
            const response = await axios.patch(`${baseURL}${orderId}/status`, { status }); // Send PATCH request to update order status
            console.log("Order status updated:", response.data);
            setMessage("Order status updated successfully!"); // Display success message
            fetchOrders(); // Refresh the orders list
        } catch (error) {
            console.error("Failed to update order status:", error);
            setMessage(error.response?.data?.message || "Failed to update order status."); // Display error message
        } finally {
            setLoading(false); // Set loading state to false after request is complete
        }
    };

    // Form submission handler to create a new order
    const handleOrderSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Ensure all form fields are filled before submitting
        if (!customerId || !productId || !price || !quantity) {
            setMessage("All fields are required!"); // Display error message if fields are missing
            return;
        }

        // Create order object with the form data
        const order = {
            customerId,
            items: [
                {
                    productId,
                    price: parseFloat(price), // Convert price to number
                    quantity: parseInt(quantity, 10), // Convert quantity to integer
                }
            ]
        };

        console.log("Order submitted:", order); // Log the order being submitted
        createOrder(order); // Call the createOrder function to submit the order
    };

    // Function to find customer details based on customerId
    const getCustomerDetails = (customerId) => {
        return customers.find((customer) => customer.id === customerId); // Return customer object if found
    };

    return (
        <div>
            <h2>Order Management</h2>

            {/* Display message feedback (success or error) */}
            {message && <p style={{ color: message.includes("Failed") ? "red" : "green" }}>{message}</p>}

            {/* Order creation form */}
            <form onSubmit={handleOrderSubmit}>
                <label htmlFor="customerId">Customer ID</label>
                <input
                    type="text"
                    id="customerId"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)} // Update state when input changes
                    required
                />
                <br />

                <label htmlFor="productId">Product ID</label>
                <input
                    type="text"
                    id="productId"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)} // Update state when input changes
                    required
                />
                <br />

                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} // Update state when input changes
                    required
                />
                <br />

                <label htmlFor="quantity">Quantity</label>
                <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)} // Update state when input changes
                    required
                />
                <br />

                <button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Order"} {/* Display loading text when submitting */}
                </button>
            </form>

            {/* Display list of orders */}
            <h3>Order List</h3>
            {orders.length === 0 ? (
                <p>No orders found.</p> // Display message if no orders exist
            ) : (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th>Product ID</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map over orders and display them in a table */}
                        {orders.map((order) => {
                            const customer = getCustomerDetails(order.customerId); // Get customer details by ID
                            return (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{customer ? customer.name : "Unknown"}</td> {/* Display customer name */}
                                    <td>{order.items[0].productId}</td>
                                    <td>{order.items[0].price}</td>
                                    <td>{order.items[0].quantity}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        {/* Dropdown to update order status */}
                                        <select
                                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                            value={order.status}
                                        >
                                            <option value="PENDING">Pending</option>
                                            <option value="CONFIRMED">Confirmed</option>
                                            <option value="SHIPPED">Shipped</option>
                                            <option value="DELIVERED">Delivered</option>
                                            <option value="CANCELLED">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
}
