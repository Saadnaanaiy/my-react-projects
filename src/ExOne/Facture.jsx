import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Facture.css";

const Facture = ({ ventes, clients, products }) => {
  const [selectedClientId, setSelectedClientId] = useState("");
  const [countDown, setCountDown] = useState(0);
  const [showList, setShowList] = useState(false);
  const [listItems, setListItems] = useState([]);
  const [listTitle, setListTitle] = useState("");

  useEffect(() => {
    let timer;
    if (countDown > 0) {
      timer = setInterval(() => {
        setCountDown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countDown]);

  const changerClient = (event) => {
    setSelectedClientId(event.target.value);
    setCountDown(2);
  };

  const filteredVentes = ventes.filter(
    (vente) => vente.clientId === selectedClientId
  );

  const total = filteredVentes.reduce((acc, currentItem) => {
    return acc + currentItem.quantity * parseFloat(currentItem.price);
  }, 0);

  const handleShowList = (type) => {
    let items = [];
    let title = "";

    if (type === "clients") {
      items = clients;
      title = "Liste des Clients";
    } else if (type === "products") {
      items = products;
      title = "Liste des Produits";
    }

    setListItems(items);
    setListTitle(title);
    setShowList(true);
  };

  return (
    <div className="container mt-4">
      <h2>Facture</h2>
      <span>
        <section>
          <h5
            style={{
              backgroundColor: "lightblue",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            Nombre des Clients :{" "}
            <strong
              style={{ padding: "10px 20px", fontSize: "18px", color: "#333" }}
              className="badge bg-info"
              onClick={() => handleShowList("clients")}
              role="button"
            >
              {clients.length}
            </strong>
          </h5>

          <h5
            style={{
              backgroundColor: "lightgreen",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            Nombre des produits :{" "}
            <strong
              style={{ padding: "10px 20px", fontSize: "18px", color: "#333" }}
              className="badge bg-success"
              onClick={() => handleShowList("products")}
              role="button"
            >
              {products.length}
            </strong>
          </h5>
        </section>
      </span>

      <div className="mb-3">
        <label htmlFor="client-select" className="form-label">
          Sélectionnez un client:
        </label>
        <select
          id="client-select"
          className="form-select"
          value={selectedClientId}
          onChange={changerClient}
        >
          <option value="" disabled>
            Choisissez un client
          </option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.nom}
            </option>
          ))}
        </select>
      </div>

      {countDown > 0 ? (
        <div
          style={{ marginTop: "13%" }}
          className="loading d-flex justify-content-center"
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden"></span>
          </div>
          <p
            className="anime"
            style={{
              marginLeft: "10px",
              marginTop: "4px",
              letterSpacing: "5px",
            }}
          >
            Loading...
          </p>
        </div>
      ) : (
        <>
          {filteredVentes.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Produit</th>
                  <th scope="col">Quantité</th>
                  <th scope="col">Prix Unitaire</th>
                  <th scope="col">Prix Total</th>
                </tr>
              </thead>
              <tbody>
                {filteredVentes.map((vente, index) => (
                  <tr key={index}>
                    <td>{vente.product}</td>
                    <td>{vente.quantity}</td>
                    <td>{vente.price} $</td>
                    <td>{(vente.price * vente.quantity).toFixed(2)} $</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} style={{ textAlign: "right" }}>
                    Total :
                  </td>
                  <td style={{ backgroundColor: "tomato", color: "white" }}>
                    {total.toFixed(2)} $
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>Aucune vente pour ce client.</p>
          )}
          <button
            className="btn btn-primary mt-3"
            onClick={() => window.print()}
          >
            Imprimer
          </button>
        </>
      )}

      {showList && (
        <div className="popup-list">
          <h5>{listTitle}</h5>
          <ul>
            {listItems.length > 0 ? (
              listItems.map((item, index) => (
                <li key={index}>{item.nom}</li>
              ))
            ) : (
              <li>Aucun élément trouvé.</li>
            )}
          </ul>
          <button onClick={() => setShowList(false)} className="btn btn-danger">
            Fermer
          </button>
        </div>
      )}
    </div>
  );
};

export default Facture;
