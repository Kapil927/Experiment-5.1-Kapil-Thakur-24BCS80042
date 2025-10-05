import { useEffect, useState } from "react";
import ProductInput from "./ProductInput";
import ProductList from "./ProductList";

const BASE_URL = "https://products-el0c.onrender.com";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = () => {
    setLoading(true);
    fetch(`${BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const deleteProduct = (id) => {
    fetch(`${BASE_URL}/api/products/${id}`, { method: "DELETE" })
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
        <h1 className="header">Products</h1>
      </div>

      <ProductInput getProducts={getProducts} />
      
      <div className="product-list">
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
            <p className="loader-text">Loading products...</p>
          </div>
        ) : (
          <ProductList products={products} deleteProduct={deleteProduct} />
        )}
      </div>
    </div>
  );
};

export default Product;