import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:3001/products';

const ProductManage = () => {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Fetch all products from the backend
    const fetchProducts = async () => {
        try {
            const response = await axios.get(baseURL);
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch products:', error.response?.data || error);
            setMessage('Failed to load products.');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Add new product to the backend
    const handleProductSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!productName.trim() || !price || !quantity) {
            setMessage('All fields are required!');
            return;
        }

        const newProduct = {
            name: productName.trim(),
            price: parseFloat(price),
            quantity: parseInt(quantity, 10),
        };

        setLoading(true);
        try {
            await axios.post(baseURL, newProduct); // Post request to add new product
            setMessage('Product added successfully!');
            fetchProducts(); // Refresh the product list after adding the new product
            setProductName('');
            setPrice('');
            setQuantity('');
        } catch (error) {
            console.error('Error adding product:', error.response?.data || error);
            setMessage(error.response?.data?.message || 'Failed to add product.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Product Management</h2>

            {/* Displaying Message (if any) */}
            {message && <p style={{ color: message.includes('Failed') ? 'red' : 'green' }}>{message}</p>}

            {/* Product Form */}
            <form onSubmit={handleProductSubmit}>
                <label htmlFor="name">Product Name</label>
                <input
                    type="text"
                    id="name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="quantity">Quantity</label>
                <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Product'}
                </button>
            </form>

            {/* Product List */}
            <h3>Product List</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No products found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductManage;
