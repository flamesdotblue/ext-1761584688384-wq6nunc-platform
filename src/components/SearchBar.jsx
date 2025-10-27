import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, ChefHat } from 'lucide-react';

const DISHES = [
  { id: 'masala-dosa', name: 'Masala Dosa', tags: ['South', 'Vegetarian', 'Gluten-free'], allergens: [] },
  { id: 'idli-sambar', name: 'Idli Sambar', tags: ['South', 'Vegan'], allergens: [] },
  { id: 'butter-chicken', name: 'Butter Chicken', tags: ['North'], allergens: ['Dairy'] },
  { id: 'dal-makhani', name: 'Dal Makhani', tags: ['North', 'Vegetarian'], allergens: ['Dairy'] },
  { id: 'puchka', name: 'Puchka (Pani Puri)', tags: ['East', 'Vegan'], allergens: ['Gluten'] },
  { id: 'dhokla', name: 'Khaman Dhokla', tags: ['West', 'Vegetarian'], allergens: ['Gluten'] },
  { id: 'litti-chokha', name: 'Litti Chokha', tags: ['Central', 'Vegetarian'], allergens: ['Gluten'] },
];

export default function SearchBar({ value, onChange, onSelect }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  const results = useMemo(() => {
    if (!value) return DISHES.slice(0, 6);
    return DISHES.filter((d) => d.name.toLowerCase().includes(value.toLowerCase()) || d.tags.some(t => t.toLowerCase().includes(value.toLowerCase()))).slice(0, 8);
  }, [value]);

  useEffect(() => {
    if (!open) setActiveIndex(-1);
  }, [open]);

  const onKeyDown = (e) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) setOpen(true);
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      const item = results[activeIndex];
      onSelect?.(item);
      setOpen(false);
      inputRef.current?.blur();
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div className="relative" role="search">
      <label htmlFor="dish-search" className="sr-only">Search dishes or ingredients</label>
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-neutral-900/60 px-3 py-2 focus-within:ring-2 focus-within:ring-[#FFD700]">
        <Search className="h-5 w-5 text-white/60" aria-hidden="true" />
        <input
          id="dish-search"
          ref={inputRef}
          value={value}
          onChange={(e) => { onChange?.(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search dishes, ingredients, or regions (e.g. dosa, dairy-free)"
          className="w-full bg-transparent outline-none placeholder:text-white/50"
          role="combobox"
          aria-expanded={open}
          aria-controls="search-listbox"
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? `option-${results[activeIndex]?.id}` : undefined}
        />
        <button className="hidden sm:inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#3CB371] to-[#FFD700] px-3 py-1.5 text-neutral-900 text-sm font-semibold" aria-label="Explore seasonal menu">
          <ChefHat className="h-4 w-4" /> Seasonal
        </button>
      </div>

      {open && (
        <ul
          id="search-listbox"
          ref={listRef}
          role="listbox"
          className="absolute z-30 mt-2 max-h-72 w-full overflow-auto rounded-lg border border-white/10 bg-neutral-900/95 backdrop-blur shadow-lg"
        >
          {results.length === 0 && (
            <li className="px-3 py-2 text-white/70">No matches</li>
          )}
          {results.map((item, idx) => (
            <li
              id={`option-${item.id}`}
              key={item.id}
              role="option"
              aria-selected={idx === activeIndex}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => { onSelect?.(item); setOpen(false); }}
              className={`cursor-pointer px-3 py-2 hover:bg-white/10 ${idx === activeIndex ? 'bg-white/10' : ''}`}
            >
              <div className="font-medium">{item.name}</div>
              <div className="mt-0.5 text-xs text-white/70">{item.tags.join(' • ')}{item.allergens.length ? ` • Allergens: ${item.allergens.join(', ')}` : ''}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
