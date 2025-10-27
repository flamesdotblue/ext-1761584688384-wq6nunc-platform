import { useMemo, useState } from 'react';
import { Calendar, Plus, Trash2 } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DEFAULT_MEALS = ['Breakfast', 'Lunch', 'Dinner'];

const CATALOG = [
  { id: 'masala-dosa', name: 'Masala Dosa', macros: { p: 9, c: 58, f: 12 }, kcal: 380, tags: ['Vegetarian'] },
  { id: 'dal-makhani', name: 'Dal Makhani', macros: { p: 19, c: 38, f: 18 }, kcal: 410, tags: ['Vegetarian'] },
  { id: 'grilled-paneer', name: 'Grilled Paneer', macros: { p: 26, c: 8, f: 14 }, kcal: 320, tags: ['Vegetarian', 'Gluten-free'] },
  { id: 'idli', name: 'Idli', macros: { p: 8, c: 44, f: 2 }, kcal: 220, tags: ['Vegan'] },
  { id: 'tandoori-chicken', name: 'Tandoori Chicken', macros: { p: 35, c: 6, f: 12 }, kcal: 320, tags: [] },
];

export default function MealPlanner() {
  const [plan, setPlan] = useState(() => {
    const p = {};
    DAYS.forEach((d) => {
      p[d] = DEFAULT_MEALS.map((m) => ({ name: m, items: [] }));
    });
    return p;
  });
  const [filter, setFilter] = useState({ veg: false, vegan: false, gf: false });

  const filteredCatalog = useMemo(() => {
    return CATALOG.filter((i) => {
      if (filter.vegan && !i.tags.includes('Vegan')) return false;
      if (filter.veg && !i.tags.includes('Vegetarian')) return false;
      if (filter.gf && !i.tags.includes('Gluten-free')) return false;
      return true;
    });
  }, [filter]);

  const totals = useMemo(() => {
    let kcal = 0, p = 0, c = 0, f = 0;
    for (const day of DAYS) {
      for (const meal of plan[day]) {
        for (const item of meal.items) {
          kcal += item.kcal;
          p += item.macros.p; c += item.macros.c; f += item.macros.f;
        }
      }
    }
    return { kcal, p, c, f };
  }, [plan]);

  const onDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'copy';
  };
  const onDropToMeal = (e, dayIndex, mealIndex) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    const dayKey = DAYS[dayIndex];
    setPlan((prev) => {
      const next = structuredClone(prev);
      next[dayKey][mealIndex].items.push(data);
      return next;
    });
  };

  const removeItem = (dayKey, mealIndex, idx) => {
    setPlan((prev) => {
      const next = structuredClone(prev);
      next[dayKey][mealIndex].items.splice(idx, 1);
      return next;
    });
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="md:w-80 shrink-0 rounded-xl border border-white/10 bg-neutral-900/60 p-4" aria-label="Meal catalog">
          <h3 className="font-semibold">Meal Catalog</h3>
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 accent-[#3CB371]" checked={filter.veg} onChange={(e) => setFilter((f) => ({ ...f, veg: e.target.checked }))} /> Veg
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 accent-[#3CB371]" checked={filter.vegan} onChange={(e) => setFilter((f) => ({ ...f, vegan: e.target.checked }))} /> Vegan
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 accent-[#3CB371]" checked={filter.gf} onChange={(e) => setFilter((f) => ({ ...f, gf: e.target.checked }))} /> Gluten-free
            </label>
          </div>
          <ul className="mt-3 space-y-2" role="list">
            {filteredCatalog.map((i) => (
              <li key={i.id} draggable onDragStart={(e) => onDragStart(e, i)} className="cursor-grab active:cursor-grabbing rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <div className="font-medium text-sm">{i.name}</div>
                <div className="text-xs text-white/70">{i.kcal} kcal • P{i.macros.p}/C{i.macros.c}/F{i.macros.f}</div>
              </li>
            ))}
          </ul>
        </aside>

        <section className="flex-1">
          <div className="rounded-xl border border-white/10 bg-neutral-900/60 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2"><Calendar className="h-5 w-5" /> Weekly Planner</h3>
              <div className="text-sm text-white/80">Total: {totals.kcal} kcal • P{totals.p} C{totals.c} F{totals.f}</div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Planner grid">
              {DAYS.map((day, di) => (
                <div key={day} className="rounded-lg border border-white/10 bg-white/5 overflow-hidden">
                  <div className="px-3 py-2 font-semibold bg-white/10" aria-label={`Day ${day}`}>{day}</div>
                  <div className="p-3 space-y-3">
                    {DEFAULT_MEALS.map((m, mi) => (
                      <div key={m} onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDropToMeal(e, di, mi)} className="rounded-md border border-dashed border-white/15 p-2 min-h-[84px]">
                        <div className="text-xs text-white/70">{m}</div>
                        <ul className="mt-1 space-y-1">
                          {plan[day][mi].items.map((it, idx) => (
                            <li key={`${it.id}-${idx}`} className="flex items-center justify-between gap-2 rounded bg-neutral-900/70 px-2 py-1 text-sm">
                              <span>{it.name}</span>
                              <button onClick={() => removeItem(day, mi, idx)} className="p-1 rounded hover:bg-white/10" aria-label={`Remove ${it.name}`}>
                                <Trash2 className="h-4 w-4 text-white/70" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button className="px-3 py-1.5 rounded-md bg-gradient-to-r from-[#3CB371] to-[#FFD700] text-neutral-900 text-sm font-semibold">Save Plan</button>
              <button className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 text-sm">Schedule</button>
              <button className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 text-sm">Export</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
