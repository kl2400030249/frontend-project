import { useParams } from "react-router-dom";

export default function WorkshopDetails() {
  const { id } = useParams();

  return (
    <div className="container">
      <h1 className="title">Workshop #{id}</h1>

      <button className="btn btn-success">Register</button>

      <h2 className="sub-title">Training Materials</h2>
      <ul className="material-list">
        <li>📄 PDF Notes</li>
        <li>🎥 Session Recording</li>
      </ul>

      <button className="btn btn-primary" style={{ marginTop: "20px" }}>
        Join Live Session
      </button>
    </div>
  );
}
