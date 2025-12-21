import { useEffect, useState } from "react";
import WorkshopCard from "../components/WorkshopCard";

export default function Workshops() {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    const urlBase = import.meta.env.VITE_API_URL || '';
    fetch(urlBase + '/api/workshops')
      .then((res) => res.json())
      .then((data) =>
        setWorkshops(
          data.map((item) => ({
            id: item._id || item.id,
            title: item.title,
            date: item.date ? item.date.split('T')[0] : 'TBD',
            desc: item.desc || ''
          }))
        )
      ).catch(() => setWorkshops([]));
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
