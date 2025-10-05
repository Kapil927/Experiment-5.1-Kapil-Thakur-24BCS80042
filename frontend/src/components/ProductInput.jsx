// ProductInput.jsx
import { useState } from "react";

const BASE_URL = "https://products-el0c.onrender.com";

const ProductInput = ({ getProducts }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    category: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProduct = () => {
    if (!form.name || !form.price || !form.quantity || !form.category) {
      alert("All fields required");
      return;
    }

    fetch(`${BASE_URL}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(() => {
        getProducts();
        setForm({ name: "", price: "", quantity: "", category: "" });
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="product-input-container">
      <input 
        name="name" 
        placeholder="Name" 
        value={form.name} 
        onChange={handleChange} 
      />
      <input 
        name="price" 
        type="number" 
        placeholder="Price" 
        value={form.price} 
        onChange={handleChange} 
      />
      <input 
        name="quantity" 
        type="number" 
        placeholder="Quantity" 
        value={form.quantity} 
        onChange={handleChange} 
      />
      <select name="category" value={form.category} onChange={handleChange}>
        <option value="">Select Category</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Food">Food</option>
        <option value="Books">Books</option>
        <option value="Furniture">Furniture</option>
        <option value="Sports">Sports</option>
        <option value="Others">Others</option>
      </select>

      <button onClick={addProduct}>Add Product</button>
    </div>
  );
};

export default ProductInput;
