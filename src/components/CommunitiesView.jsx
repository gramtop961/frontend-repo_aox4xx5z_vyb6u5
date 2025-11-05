export default function CommunitiesView() {
  const communities = [
    { id: 1, name: 'Wellness Circle', members: 142, about: 'Weekly yoga, mindfulness and wellness events.' },
    { id: 2, name: 'Book Lovers', members: 87, about: 'Monthly book clubs, author meetups and reviews.' },
    { id: 3, name: 'Neighborhood Action', members: 203, about: 'Local improvement projects and town hall meetings.' },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Communities</h2>
        <p className="text-sm text-slate-600">Browse and join spaces that match your interests.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {communities.map((c) => (
          <div key={c.id} className="rounded-xl border border-slate-200 p-5 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">{c.name}</h3>
              <span className="text-xs text-slate-500">{c.members} members</span>
            </div>
            <p className="text-sm text-slate-600 mt-2">{c.about}</p>
            <button className="mt-4 w-full rounded-lg bg-slate-900 text-white py-2 text-sm font-medium hover:bg-slate-800 transition">
              Join community
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
