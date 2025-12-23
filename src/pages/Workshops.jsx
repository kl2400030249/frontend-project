import { useEffect, useState } from "react";
import WorkshopCard from "../components/WorkshopCard";
import { getAllWorkshops } from "../api/workshopService";

export default function Workshops() {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getAllWorkshops();
        if (!mounted) return;
        setWorkshops(
          data.map((item) => ({
            id: item.id,
            title: item.title,
            date: item.date ? String(item.date).split('T')[0] : 'TBD',
            desc: item.description || '',
          }))
        );
      } catch (_) {
        if (mounted) setWorkshops([]);
      }
    })();
    return () => {
      mounted = false;
    };
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
