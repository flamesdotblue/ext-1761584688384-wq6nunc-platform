import { useEffect, useMemo, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChefHat, FireIcon as Fire, MapPin, Star } from 'lucide-react';

const slides = [
  {
    id: 'butter-chicken',
    title: 'Butter Chicken',
    region: 'North India • Punjab',
    desc: 'Creamy tomato gravy with tender chicken, a beloved classic.',
    img: 'https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=1200&auto=format&fit=crop',
    calories: 520,
    special: 'Chef\'s Special',
  },
  {
    id: 'masala-dosa',
    title: 'Masala Dosa',
    region: 'South India • Karnataka',
    desc: 'Crispy lentil-rice crepe filled with spiced potatoes.',
    img: 'https://images.unsplash.com/photo-1604908177079-0e3a8e3c8307?q=80&w=1200&auto=format&fit=crop',
    calories: 380,
    special: 'Dish of the Day',
  },
  {
    id: 'puchka',
    title: 'Puchka (Pani Puri)',
    region: 'East India • Bengal',
    desc: 'Crisp puris filled with tangy spiced water and potatoes.',
    img: 'https://images.unsplash.com/photo-1628294896516-52df3c24e0a4?q=80&w=1200&auto=format&fit=crop',
    calories: 190,
    special: 'Festival Pick',
  },
];

export default function HeroSection({ onSelectDish }) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const active = slides[index % slides.length];

  useEffect(() => {
    intervalRef.current = setInterval(() => setIndex((i) => i + 1), 6000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section className="relative h-[70vh] min-h-[520px] w-full" aria-label="Featured Indian dishes">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/cEecEwR6Ehj4iT8T/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/50 to-neutral-950/80" />
      </div>

      <div className="relative z-10 h-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-8">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7F50] text-neutral-900 text-sm font-semibold">
              <ChefHat className="h-4 w-4" /> Smart Canteen
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700] text-neutral-900 text-sm font-semibold">
              <Calendar className="h-4 w-4" /> Seasonal Menu Live
            </span>
          </div>

          <div className="relative max-w-3xl" role="group" aria-roledescription="carousel" aria-label="Featured dishes carousel">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active.id} variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Explore India\'s Regional Flavors</h1>
                <p className="mt-3 text-white/85 text-base sm:text-lg max-w-2xl">Build personalized meal plans with accurate nutrition, rate dishes, and earn rewards — all in an accessible, mobile-first experience.</p>

                <div className="mt-6 rounded-xl overflow-hidden bg-neutral-900/70 border border-white/10">
                  <div className="grid md:grid-cols-2 gap-0">
                    <img src={active.img} width={800} height={480} alt={active.title} className="h-56 md:h-72 w-full object-cover" />
                    <div className="p-4 sm:p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl sm:text-2xl font-bold">{active.title}</h2>
                          <span className="text-xs sm:text-sm text-white/70">{active.region}</span>
                        </div>
                        <p className="mt-2 text-white/80">{active.desc}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#3CB371]/20 text-[#3CB371]">~{active.calories} kcal</span>
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#FFD700]/20 text-[#FFD700]">
                            <Star className="h-3.5 w-3.5 fill-current" /> {active.special}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#FF7F50]/20 text-[#FF7F50]">
                            <MapPin className="h-3.5 w-3.5" /> Regional pick
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-3">
                        <button onClick={() => onSelectDish?.(active)} className="px-4 py-2 rounded-md bg-gradient-to-r from-[#FF7F50] to-[#FFD700] text-neutral-900 font-semibold focus-visible:ring-2 focus-visible:ring-[#3CB371]">
                          Try this dish
                        </button>
                        <button className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-[#FFD700]">
                          Add to planner
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sr-only" aria-live="polite">Slide {index % slides.length + 1} of {slides.length}: {active.title}</div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 flex items-center gap-2" role="tablist" aria-label="Select featured slide">
              {slides.map((s, i) => (
                <button key={s.id} onClick={() => setIndex(i)} role="tab" aria-selected={i === index % slides.length} aria-controls={`slide-${s.id}`} className={`h-2.5 w-6 rounded-full transition-colors ${i === index % slides.length ? 'bg-[#FFD700]' : 'bg-white/30 hover:bg-white/60'}`}>
                  <span className="sr-only">{s.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
