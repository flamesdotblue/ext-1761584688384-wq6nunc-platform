import { useState } from 'react';
import { ChefHat, User, Star, ShieldCheck } from 'lucide-react';
import HeroSection from './components/HeroSection';
import SearchBar from './components/SearchBar';
import RegionalCuisine from './components/RegionalCuisine';
import MealPlanner from './components/MealPlanner';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedDish, setSelectedDish] = useState(null);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#FF7F50] via-[#FFD700] to-[#3CB371] grid place-items-center">
              <ChefHat className="h-5 w-5 text-neutral-900" aria-hidden="true" />
            </div>
            <a href="#" className="font-semibold tracking-tight text-white" aria-label="Smart Canteen Home">
              SpiceTrail Canteen
            </a>
          </div>
          <nav aria-label="Primary" className="hidden md:flex items-center gap-6 text-sm">
            <a href="#regions" className="text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] rounded">Regional</a>
            <a href="#planner" className="text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] rounded">Meal Planner</a>
            <a href="#loyalty" className="text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] rounded">Loyalty</a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-[#FF7F50]" aria-label="View Rewards">
              <Star className="h-4 w-4 text-[#FFD700]" />
              <span className="text-sm">Rewards</span>
            </button>
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gradient-to-r from-[#FF7F50] to-[#FFD700] text-neutral-900 font-medium focus-visible:ring-2 focus-visible:ring-[#3CB371]" aria-label="Sign in or Register">
              <User className="h-4 w-4" />
              <span className="text-sm">Sign in</span>
            </button>
          </div>
        </div>
      </header>

      <main id="main" className="relative">
        <HeroSection onSelectDish={setSelectedDish} />
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
          <div className="rounded-xl bg-neutral-900/80 border border-white/10 p-4 sm:p-6">
            <SearchBar value={query} onChange={setQuery} onSelect={setSelectedDish} />
          </div>
        </section>

        <section id="regions" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
          <RegionalCuisine query={query} onSelectDish={setSelectedDish} />
        </section>

        <section id="planner" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
          <MealPlanner />
        </section>

        <section id="loyalty" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#3CB371]/20 via-transparent to-[#FF7F50]/20 p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
              <div>
                <h3 className="text-xl font-semibold">Loyalty Program</h3>
                <p className="text-white/80 mt-1 max-w-2xl">Earn points for trying new dishes, leaving reviews, and referring friends. Unlock tiers for exclusive chef specials and festival menus.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-sm font-medium">Gold Tier</div>
                <div className="px-3 py-1 rounded-full bg-[#3CB371]/20 text-[#3CB371] text-sm font-medium">1,250 pts</div>
                <button className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-[#FFD700]">View Benefits</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-16 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-white/70 text-sm">© {new Date().getFullYear()} SpiceTrail Canteen. Celebrating Indian regional flavors.</p>
          <div className="flex items-center gap-3 text-sm text-white/70">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            <span>WCAG AA targeted • PWA ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
