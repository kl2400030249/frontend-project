import { useEffect, useState } from "react";
import WorkshopCard from "../components/WorkshopCard";
import { getAllWorkshops, getWorkshopRegistrations } from "../api/workshopService";

export default function Workshops() {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getAllWorkshops();
        if (!mounted) return;

        // fetch registration counts for each workshop in parallel
        const enriched = await Promise.all(
          data.map(async (item) => {
            const regs = await getWorkshopRegistrations(item.id);
            const capacity = typeof item.capacity === 'number' && item.capacity > 0 ? item.capacity : 30;
            return {
              id: item.id,
              title: item.title,
              date: item.date ? String(item.date).split('T')[0] : 'TBD',
              desc: item.description || '',
              seatsFilled: regs ? regs.length : 0,
              capacity,
            };
          })
        );

        if (!mounted) return;
        setWorkshops(enriched);
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
