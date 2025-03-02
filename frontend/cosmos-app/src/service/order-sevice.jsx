import axios from 'axios';
// Define the base URL for the customers API
const baseURL = "http://localhost:3000/orders";

const createOrder = async (order) => {
    try {
        const response = await axios.post(baseURL, order);
        return response.data;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
};

export default createOrder;
