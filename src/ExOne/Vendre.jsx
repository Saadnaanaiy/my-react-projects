import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Vendre = ({ clients, products, onAddVente }) => {
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const ajouterVente = () => {
    if (selectedClientId && selectedProductId && quantity) {
      const client = clients.find((client) => client.id === selectedClientId);
      const product = products.find(
        (product) => product.id === selectedProductId
      );

      if (client && product) {
        const vendre = {
          clientId: client.id,
          client: client.nom,
          product: product.nom,
          quantity: parseInt(quantity),
          price: product.prix,
        };
        onAddVente(vendre);
        setSelectedClientId("");
        setSelectedProductId("");
        setQuantity("");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Ajouter Vendre</h2>
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="clientSelect" className="form-label">
            Sélectionner un client
          </label>
          <select
            className="form-select"
            id="clientSelect"
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
          >
            <option value="">Sélectionner un client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="productSelect" className="form-label">
            Sélectionner un produit
          </label>
          <select
            className="form-select"
            id="productSelect"
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
          >
            <option value="">Sélectionner un produit</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.nom} - {product.prix}€
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="quantityInput" className="form-label">
            Quantité
          </label>
          <input
            type="number"
            className="form-control"
            id="quantityInput"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantité"
          />
        </div>

        <div className="col-12">
          <button
            type="button"
            className="btn btn-primary"
            onClick={ajouterVente}
          >
            Ajouter Vendre
          </button>
        </div>
      </form>
    </div>
  );
};

export default Vendre;
