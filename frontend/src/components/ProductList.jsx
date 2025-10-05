const ProductList = ({ products, deleteProduct }) => {
  return (
    <>
      {products && products.length > 0 ? (
        products.map((p) => (
          <div className="product-card" key={p._id}>
            <span>{p.name}</span>
            <span>Price: ${p.price}</span>
            <span>Qty: {p.quantity}</span>
            <span>Category: {p.category}</span>
            <div className="card-buttons">
              {/* future Edit button can go here */}
              <button onClick={() => deleteProduct(p._id)}>Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center" }}>* No products available *</p>
      )}
    </>
  );
};

export default ProductList;