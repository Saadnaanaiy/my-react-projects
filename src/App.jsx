import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Client from "./ExOne/Client";
import Product from "./ExOne/Product";
import Vendre from "./ExOne/Vendre";
import Facture from "./ExOne/Facture";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [ventes, setVentes] = useState([]);

  useEffect(() => {
    const newListeClients = JSON.parse(localStorage.getItem("clients")) || [];
    const newListeProduits = JSON.parse(localStorage.getItem("produits")) || [];
    const newListeVentes = JSON.parse(localStorage.getItem("ventes")) || [];

    setClients(newListeClients);
    setProducts(newListeProduits);
    setVentes(newListeVentes);
  }, []);

  const ajouterClient = (client) => {
    const listeClient = [...clients, client];
    setClients(listeClient);
    localStorage.setItem("clients", JSON.stringify(listeClient));
  };

  const ajouterProduit = (product) => {
    const listeProduit = [...products, product];
    setProducts(listeProduit);
    localStorage.setItem("produits", JSON.stringify(listeProduit));
  };

  const ajouterVente = (vente) => {
    const listeVente = [...ventes, vente];
    setVentes(listeVente);
    localStorage.setItem("ventes", JSON.stringify(listeVente));
  };

  return (
    <Router>
      <nav
        style={{ backgroundColor: "#eee", fontSize:"17px", letterSpacing:"2px" }}
        className="navbar navbar-expand-lg"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Gestion de Ventes
          </a>

          <div
            style={{ marginLeft: "16%" }}
            className="collapse navbar-collapse"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Ajouter Client
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/product">
                  Ajouter Produit
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/vendre">
                  Ajouter Vente
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/facture">
                  Facture
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Client onAddClient={ajouterClient} />} />
          <Route
            path="/product"
            element={<Product onAddProduct={ajouterProduit} />}
          />
          <Route
            path="/vendre"
            element={
              <Vendre
                clients={clients}
                products={products}
                onAddVente={ajouterVente}
              />
            }
          />
          <Route
            path="/facture"
            element={
              <Facture ventes={ventes} clients={clients} products={products} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
