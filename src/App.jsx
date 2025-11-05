import { useState } from 'react';
import { Home, Users, CreditCard, User } from 'lucide-react';
import HomeView from './components/HomeView.jsx';
import CommunitiesView from './components/CommunitiesView.jsx';
import PaymentsView from './components/PaymentsView.jsx';
import ProfileView from './components/ProfileView.jsx';

const tabs = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'communities', label: 'Communities', icon: Users },
  { key: 'payments', label: 'Payments', icon: CreditCard },
  { key: 'profile', label: 'Profile', icon: User },
];

export default function App() {
  const [active, setActive] = useState('home');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/90 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 grid place-items-center text-white font-semibold">
              C
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-tight">Community Hub</h1>
              <p className="text-xs text-slate-500">Coordinate events, meetings, and plans</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 pt-6 pb-28">
        {active === 'home' && <HomeView />}
        {active === 'communities' && <CommunitiesView />}
        {active === 'payments' && <PaymentsView />}
        {active === 'profile' && <ProfileView />}
      </main>

      <nav className="fixed bottom-4 inset-x-0 z-20">
        <div className="max-w-md mx-auto">
          <div className="mx-4 rounded-2xl bg-white/90 border border-slate-200 shadow-lg shadow-slate-200/50 backdrop-blur">
            <ul className="grid grid-cols-4">
              {tabs.map(({ key, label, icon: Icon }) => {
                const isActive = active === key;
                return (
                  <li key={key}>
                    <button
                      onClick={() => setActive(key)}
                      className={`w-full px-3 py-3 flex flex-col items-center justify-center gap-1 text-xs transition-colors ${
                        isActive ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <Icon size={20} className="mb-0.5" />
                      <span className="font-medium">{label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
