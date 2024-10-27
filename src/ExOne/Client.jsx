import { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Client = ({ onAddClient }) => {
  const [client, setClient] = useState({ id: "", nom: "", email: "" });
  const [message, setMessage] = useState([]);
  const idRef = useRef(null);
  const nomRef = useRef(null);
  const emailRef = useRef(null);

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleAddClient = () => {
    const { id, nom, email } = client;

    idRef.current.style.border = "1px solid #ced4da";
    nomRef.current.style.border = "1px solid #ced4da";
    emailRef.current.style.border = "1px solid #ced4da";

    if (id && nom && email) {
      onAddClient(client);
      setClient({ id: "", nom: "", email: "" });
      idRef.current.style.border = "2px solid green";
      nomRef.current.style.border = "2px solid green";
      emailRef.current.style.border = "2px solid green";
      setMessage([]);
    } else {
      if (!id) idRef.current.style.border = "2px solid red";
      if (!nom) nomRef.current.style.border = "2px solid red";
      if (!email) emailRef.current.style.border = "2px solid red";
      setMessage([
        { id: !id ? "Erreur de ID" : "" },
        { nom: !nom ? "Erreur de Nom" : "" },
        { email: !email ? "Erreur de Email" : "" },
      ]);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Ajouter Client</h2>

      {message.length > 0 && (
        <div className="alert alert-danger">
          {message.map((item, index) => (
            <div key={index}>
              {item.id && <li>{item.id}</li>}
              {item.nom && <li>{item.nom}</li>}
              {item.email && <li>{item.email}</li>}
            </div>
          ))}
        </div>
      )}

      <form className="row g-3">
        <div className="col-md-4">
          <label htmlFor="clientId" className="form-label">
            ID du client
          </label>
          <input
            type="text"
            className="form-control"
            id="clientId"
            name="id"
            value={client.id}
            onChange={handleChange}
            placeholder="ID du client"
            ref={idRef}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="clientNom" className="form-label">
            Nom du client
          </label>
          <input
            type="text"
            className="form-control"
            id="clientNom"
            name="nom"
            value={client.nom}
            onChange={handleChange}
            placeholder="Nom du client"
            ref={nomRef}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="clientEmail" className="form-label">
            Email du client
          </label>
          <input
            type="email"
            className="form-control"
            id="clientEmail"
            name="email"
            value={client.email}
            onChange={handleChange}
            placeholder="Email du client"
            ref={emailRef}
          />
        </div>
        <div className="col-12">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddClient}
          >
            Ajouter Client
          </button>
        </div>
      </form>
    </div>
  );
};

export default Client;
