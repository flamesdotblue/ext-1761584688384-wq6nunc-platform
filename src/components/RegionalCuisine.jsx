import { useMemo, useState } from 'react';
import { Star, MapPin, Info, Leaf, FlameKindling as Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ALL_DISHES = [
  { id: 'rogan-josh', name: 'Rogan Josh', region: 'North', state: 'Kashmir', veg: false, img: 'https://images.unsplash.com/photo-1604908177521-635fdcfb1a5d?q=80&w=1200&auto=format&fit=crop', calories: 480, macros: { p: 35, c: 22, f: 28 }, allergens: [], about: 'A Kashmiri aromatic curry with tender meat and warming spices.' },
  { id: 'masala-dosa', name: 'Masala Dosa', region: 'South', state: 'Karnataka', veg: true, img: 'https://images.unsplash.com/photo-1600626339693-077a0318cfb4?q=80&w=1200&auto=format&fit=crop', calories: 380, macros: { p: 9, c: 58, f: 12 }, allergens: ['Gluten'], about: 'Fermented rice-lentil crepe with spiced potatoes; a South Indian staple.' },
  { id: 'puchka', name: 'Puchka (Pani Puri)', region: 'East', state: 'West Bengal', veg: true, img: 'https://images.unsplash.com/photo-1628294896516-52df3c24e0a4?q=80&w=1200&auto=format&fit=crop', calories: 190, macros: { p: 5, c: 34, f: 4 }, allergens: ['Gluten'], about: 'Crispy puris filled with tangy water and potato-chickpea mix.' },
  { id: 'dhokla', name: 'Khaman Dhokla', region: 'West', state: 'Gujarat', veg: true, img: 'https://images.unsplash.com/photo-1625944520776-0b83cf154b2e?q=80&w=1200&auto=format&fit=crop', calories: 260, macros: { p: 11, c: 42, f: 6 }, allergens: [], about: 'Steamed gram flour cakes tempered with mustard and curry leaves.' },
  { id: 'litti', name: 'Litti Chokha', region: 'Central', state: 'Bihar', veg: true, img: 'https://images.unsplash.com/photo-1596797038530-2c107229f2d2?q=80&w=1200&auto=format&fit=crop', calories: 420, macros: { p: 12, c: 60, f: 14 }, allergens: ['Gluten'], about: 'Wheat balls stuffed with spiced sattu, served with mashed veg.' },
];

const REGIONS = ['North', 'South', 'East', 'West', 'Central'];

function Stars({ value, onChange, label }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          role="radio"
          aria-checked={value >= i}
          onClick={() => onChange?.(i)}
          className={`p-1 rounded ${value >= i ? 'text-[#FFD700]' : 'text-white/40'} hover:text-[#FFD700] focus-visible:ring-2 focus-visible:ring-[#FFD700]`}
        >
          <Star className={`h-4 w-4 ${value >= i ? 'fill-current' : ''}`} />
          <span className="sr-only">{i} star</span>
        </button>
      ))}
    </div>
  );
}

export default function RegionalCuisine({ query, onSelectDish }) {
  const [region, setRegion] = useState('North');
  const [ratings, setRatings] = useState({});
  const [filterVeg, setFilterVeg] = useState(false);

  const filtered = useMemo(() => {
    let arr = ALL_DISHES.filter((d) => d.region === region);
    if (query) {
      const q = query.toLowerCase();
      arr = arr.filter((d) => d.name.toLowerCase().includes(q) || d.state.toLowerCase().includes(q));
    }
    if (filterVeg) arr = arr.filter((d) => d.veg);
    return arr;
  }, [region, query, filterVeg]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">Regional Highlights</h2>
        <div className="flex items-center gap-2" role="tablist" aria-label="Filter by Indian regions">
          {REGIONS.map((r) => (
            <button
              key={r}
              role="tab"
              aria-selected={r === region}
              onClick={() => setRegion(r)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors border ${r === region ? 'bg-[#FF7F50] text-neutral-900 border-transparent' : 'bg-white/5 text-white/90 border-white/10 hover:bg-white/10'}`}
            >
              {r}
            </button>
          ))}
          <label className="ml-2 inline-flex items-center gap-2 text-sm text-white/90">
            <input type="checkbox" className="h-4 w-4 accent-[#3CB371]" checked={filterVeg} onChange={(e) => setFilterVeg(e.target.checked)} />
            <span className="inline-flex items-center gap-1"><Leaf className="h-4 w-4 text-[#3CB371]" /> Vegetarian only</span>
          </label>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {filtered.map((d) => (
            <motion.article
              key={d.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="rounded-xl border border-white/10 bg-neutral-900/60 overflow-hidden focus-within:ring-2 focus-within:ring-[#FFD700]"
            >
              <img src={d.img} alt="" className="h-40 w-full object-cover" />
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold">{d.name}</h3>
                    <div className="mt-0.5 flex items-center gap-2 text-sm text-white/70">
                      <MapPin className="h-4 w-4" /> {d.region} • {d.state}
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#FFD700]/20 text-[#FFD700] text-xs">~{d.calories} kcal</span>
                </div>
                <p className="mt-2 text-sm text-white/80">{d.about}</p>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {d.veg && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#3CB371]/20 text-[#3CB371] text-xs"><Leaf className="h-3.5 w-3.5" /> Veg</span>
                    )}
                    {d.allergens.length > 0 && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#FF7F50]/20 text-[#FF7F50] text-xs">Allergens: {d.allergens.join(', ')}</span>
                    )}
                  </div>
                  <Stars value={ratings[d.id] || 0} onChange={(v) => setRatings((r) => ({ ...r, [d.id]: v }))} label={`Rate ${d.name}`} />
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <button onClick={() => onSelectDish?.(d)} className="px-3 py-1.5 rounded-md bg-gradient-to-r from-[#FF7F50] to-[#FFD700] text-neutral-900 text-sm font-semibold">Select</button>
                  <button className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 text-sm">Nutrition</button>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-6 rounded-xl border border-white/10 p-4 bg-neutral-900/60">
        <h4 className="font-semibold">Cultural note</h4>
        <p className="mt-1 text-sm text-white/80">Discover the origin and significance of each dish — from festive specialties to daily staples. Our content highlights ingredients, history, and regional traditions to enrich your dining experience.</p>
      </div>
    </div>
  );
}
