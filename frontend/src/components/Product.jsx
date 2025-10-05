import { useEffect, useState } from "react";
import ProductInput from "./ProductInput";
import ProductList from "./ProductList";

const Product = () => {
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  };

  const deleteProduct = (id) => {
    fetch(`/api/products/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(() => getProducts())
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container">
      <div className="main-h">
      <div className="info-header">
        <p><strong>Developed by:</strong> Kapil Thakur</p>
        <p><strong>UID:</strong> 24BCS80042 | <strong>Section:</strong> 625 | <strong>Group:</strong> A</p>
        <p><strong>Under Guidance of:</strong> Mayank Sharma</p>
      </div>
      <h1 className="header">Product CRUD</h1>        
      </div>

      <ProductInput getProducts={getProducts} />
      <div className="product-list">
        <ProductList products={products} deleteProduct={deleteProduct} />
      </div>
    </div>
  );
};

export default Product;