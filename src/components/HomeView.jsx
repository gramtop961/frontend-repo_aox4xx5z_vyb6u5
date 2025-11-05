import { useMemo, useState } from 'react';
import { CalendarDays, Check, Sparkles } from 'lucide-react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Mock data to simulate admin-registered events/meetings
const sampleEvents = [
  { id: '1', title: 'Yoga Class', type: 'event', date: '2025-11-06', time: '07:00', location: 'Studio A' },
  { id: '2', title: 'Town Hall Meeting', type: 'meeting', date: '2025-11-08', time: '17:00', location: 'Main Auditorium' },
  { id: '3', title: 'Book Club', type: 'event', date: '2025-11-12', time: '18:30', location: 'Community Room' },
  { id: '4', title: 'Wellness Workshop', type: 'event', date: '2025-11-12', time: '10:00', location: 'Studio B' },
  { id: '5', title: 'Board Strategy Meeting', type: 'meeting', date: '2025-11-20', time: '15:00', location: 'Conference 2' },
  { id: '6', title: 'Neighborhood Clean-up', type: 'event', date: '2025-11-23', time: '09:00', location: 'Central Park' },
];

const plans = [
  {
    name: 'Starter',
    price: 9,
    description: 'For individuals getting started with community events.',
    features: ['Join public communities', 'View events & meetings', 'Email reminders'],
  },
  {
    name: 'Pro',
    price: 19,
    popular: true,
    description: 'Great for active members who want advanced features.',
    features: ['RSVP to events', 'Priority support', 'Calendar sync (ICS)'],
  },
  {
    name: 'Team',
    price: 49,
    description: 'Perfect for small teams organizing together.',
    features: ['Create group RSVPs', 'Shared notes & tasks', 'Export reports'],
  },
];

export default function HomeView() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate()));

  const monthMeta = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);
    const startDay = startOfMonth.getDay(); // 0-6; Sun=0

    const daysInMonth = endOfMonth.getDate();

    const grid = [];
    // Fill leading days from previous month
    for (let i = 0; i < startDay; i++) {
      const d = new Date(year, month, -startDay + i + 1);
      grid.push({ date: d, current: false });
    }
    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      grid.push({ date: new Date(year, month, d), current: true });
    }
    // Trailing days to complete 6 rows (42 cells)
    while (grid.length % 7 !== 0) {
      const last = grid[grid.length - 1].date;
      const next = new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1);
      grid.push({ date: next, current: false });
    }
    while (grid.length < 42) {
      const last = grid[grid.length - 1].date;
      const next = new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1);
      grid.push({ date: next, current: false });
    }

    return { grid };
  }, [currentMonth]);

  const eventsByDate = useMemo(() => {
    const map = new Map();
    for (const e of sampleEvents) {
      map.set(e.date, [...(map.get(e.date) || []), e]);
    }
    return map;
  }, []);

  const selectedKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
  const selectedEvents = eventsByDate.get(selectedKey) || [];

  function prevMonth() {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  }
  function nextMonth() {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  }

  function isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight flex items-center gap-2">
              <Sparkles className="opacity-90" /> Welcome back!
            </h2>
            <p className="opacity-90 mt-1">Here are your plans, upcoming events, and today's highlights.</p>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm">
            <CalendarDays size={18} />
            <span>
              {today.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Subscription plans</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={classNames(
                'rounded-xl border p-5 bg-white shadow-sm relative',
                plan.popular ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-slate-200'
              )}
            >
              {plan.popular && (
                <span className="absolute -top-2 right-4 text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full shadow">
                  Popular
                </span>
              )}
              <div className="flex items-baseline justify-between">
                <h4 className="text-base font-semibold">{plan.name}</h4>
                <div className="text-2xl font-bold">${plan.price}<span className="text-sm font-medium text-slate-500">/mo</span></div>
              </div>
              <p className="text-sm text-slate-600 mt-2">{plan.description}</p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                    <Check className="text-emerald-600 mt-0.5" size={16} /> {f}
                  </li>
                ))}
              </ul>
              <button className="mt-5 w-full rounded-lg bg-indigo-600 text-white py-2.5 text-sm font-medium hover:bg-indigo-700 transition">
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Calendar & Highlights */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Calendar</h3>
            <div className="flex items-center gap-2">
              <button onClick={prevMonth} className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm hover:bg-slate-50">Prev</button>
              <div className="px-3 py-1.5 rounded-lg bg-slate-100 text-sm font-medium">
                {currentMonth.toLocaleString(undefined, { month: 'long', year: 'numeric' })}
              </div>
              <button onClick={nextMonth} className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm hover:bg-slate-50">Next</button>
            </div>
          </div>

          <div className="grid grid-cols-7 text-xs font-medium text-slate-500 mb-2">
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => (
              <div key={d} className="text-center py-1">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-2 select-none">
            {monthMeta.grid.map(({ date, current }, idx) => {
              const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
              const dayEvents = eventsByDate.get(key) || [];
              const isToday = isSameDay(date, new Date());
              const isSelected = isSameDay(date, selectedDate);
              const hasEvents = dayEvents.length > 0;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(date)}
                  className={classNames(
                    'relative aspect-square rounded-lg p-1 sm:p-2 text-left border transition',
                    isSelected ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-slate-200 hover:bg-slate-50',
                    !current && 'opacity-50',
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className={classNames('text-sm font-medium', isToday ? 'text-indigo-600' : 'text-slate-700')}>
                      {date.getDate()}
                    </span>
                    {hasEvents && (
                      <span className="text-[10px] bg-indigo-600 text-white px-1.5 py-0.5 rounded-full">
                        {dayEvents.length}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 space-y-1">
                    {dayEvents.slice(0, 2).map((e) => (
                      <div key={e.id} className={classNames(
                        'truncate text-[10px] px-1 py-0.5 rounded',
                        e.type === 'meeting' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      )}>
                        {e.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-[10px] text-slate-500">+{dayEvents.length - 2} more</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Highlights</h3>
          {selectedEvents.length === 0 ? (
            <p className="text-sm text-slate-500">No events for this day.</p>
          ) : (
            <ul className="space-y-3">
              {selectedEvents.map((e) => (
                <li key={e.id} className="rounded-lg border border-slate-200 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">{e.title}</div>
                      <div className="text-xs text-slate-500 capitalize">{e.type}</div>
                    </div>
                    <div className="text-right text-xs text-slate-600">
                      <div>{e.time}</div>
                      <div className="text-slate-500">{e.location}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 text-xs text-slate-500">
            Tip: Days with sessions like Yoga Class are highlighted with colored tags.
          </div>
        </div>
      </section>
    </div>
  );
}
