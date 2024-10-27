import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Product = ({ onAddProduct }) => {
  const [product, setProduct] = useState({ id: "", nom: "", prix: "" });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const ajouterProduit = () => {
    if (product.id && product.nom && product.prix) {
      onAddProduct(product);
      setProduct({ id: "", nom: "", prix: "" });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Ajouter Produit</h2>
      <form className="row g-3">
        <div className="col-md-4">
          <label htmlFor="productId" className="form-label">
            ID du produit
          </label>
          <input
            type="text"
            className="form-control"
            id="productId"
            name="id"
            value={product.id}
            onChange={handleChange}
            placeholder="ID du produit"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="productNom" className="form-label">
            Nom du produit
          </label>
          <input
            type="text"
            className="form-control"
            id="productNom"
            name="nom"
            value={product.nom}
            onChange={handleChange}
            placeholder="Nom du produit"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="productPrix" className="form-label">
            Prix du produit
          </label>
          <input
            type="number"
            className="form-control"
            id="productPrix"
            name="prix"
            value={product.prix}
            onChange={handleChange}
            placeholder="Prix du produit"
          />
        </div>
        <div className="col-12">
          <button
            type="button"
            className="btn btn-primary"
            onClick={ajouterProduit}
          >
            Ajouter Produit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Product;
