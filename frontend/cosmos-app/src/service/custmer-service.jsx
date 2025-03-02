import axios from 'axios';

// Define the base URL for the customers API
const baseURL = "http://localhost:3002/customers";

// Function to validate a customer by creating an order
const customerValidate = async (order) => {
    try {
        // Sending a POST request to the customers API to validate the order
        const response = await axios.post(baseURL, order);

        // If the request is successful, return the response data (typically customer info)
        return response.data;
    } catch (error) {
        // If there is an error during the request, log the error to the console
        console.error("Error creating order:", error);

        // Throw the error so it can be handled by the caller
        throw error;
    }
};

// Export the customerValidate function to be used in other parts of the application
export default customerValidate;
