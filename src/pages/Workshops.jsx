import { useEffect, useState } from "react";
import WorkshopCard from "../components/WorkshopCard";

export default function Workshops() {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=6")
      .then((res) => res.json())
      .then((data) =>
        setWorkshops(
          data.map((item) => ({
            id: item.id,
            title: item.title,
            date: "2025-04-01",
          }))
        )
      );
  }, []);

  return (
    <div className="container">
      <h1 className="title">Upcoming Workshops</h1>

      <div className="grid grid-3">
        {workshops.map((w) => (
          <WorkshopCard key={w.id} data={w} />
        ))}
      </div>
    </div>
  );
}
