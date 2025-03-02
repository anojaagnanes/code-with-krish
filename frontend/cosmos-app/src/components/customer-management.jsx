import React, { useState, useEffect } from "react";
import axios from "axios";

// This component handles customer management: listing, adding, and displaying customers.
export default function CustomerValidate() {
    // State variables for managing customers, input fields, loading status, and messages.
    const [customers, setCustomers] = useState([]);
    const [customerName, setCustomerName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Base API URL for customer-related backend requests 
    const baseURL = "http://localhost:3002/customers";

    // Fetch customer list from the backend when the component loads
    const fetchCustomers = async () => {
        try {
            const response = await axios.get(baseURL);
            setCustomers(response.data); // Update state with the fetched data
        } catch (error) {
            console.error("Failed to fetch customers:", error);
            setMessage("Failed to load customers."); // Show error message if request fails
        }
    };

    // Fetches the customers when the component is mounted
    useEffect(() => {
        fetchCustomers();
    }, []);

    // Handles adding a new customer 
    const customerValidate = async (customer) => {
        setLoading(true); // Show loading state while processing request
        setMessage("");

        try {
            await axios.post(baseURL, customer); // Send customer data to the backend
            setMessage("Customer added successfully!");
            fetchCustomers(); // Refresh the customer list after adding a new one
        } catch (error) {
            console.error("Failed to add customer:", error);
            setMessage(error.response?.data?.message || "Failed to add customer.");
        } finally {
            setLoading(false); // Stop loading state after request is completed
        }
    };

    // Handles form submission when the user adds a new customer
    const handleCustomerSubmit = (e) => {
        e.preventDefault(); // Prevent page refresh
        if (!customerName || !email || !address) {
            setMessage("All fields are required!"); // Validate input fields
            return;
        }

        // Create a new customer object with the input values
        const newCustomer = { name: customerName, email, address };
        customerValidate(newCustomer); // Call function to add customer

        // Clear input fields after submission
        setCustomerName("");
        setEmail("");
        setAddress("");
    };

    return (
        <div>
            <h2>Customer Management</h2>

            {/* Display messages for success or error */}
            {message && <p style={{ color: message.includes("Failed") ? "red" : "green" }}>{message}</p>}

            {/* Form to add a new customer */}
            <form onSubmit={handleCustomerSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                />
                <br />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />

                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <br />

                {/* Disable button while loading to prevent duplicate submissions */}
                <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Customer"}
                </button>
            </form>

            <h3>Customer List</h3>

            {/* Display the list of customers in a table */}
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Show customers if available, otherwise display a message */}
                    {customers.length > 0 ? (
                        customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.address}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No customers found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
