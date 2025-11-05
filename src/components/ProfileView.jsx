export default function ProfileView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Profile</h2>
        <p className="text-sm text-slate-600">Update your personal information and preferences.</p>
      </div>

      <form className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 max-w-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First name</label>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Jane" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last name</label>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Doe" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="jane@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea rows={4} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Tell us about yourself..." />
        </div>
        <div className="flex items-center gap-3">
          <button type="button" className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm hover:bg-slate-800">Save changes</button>
          <button type="button" className="px-4 py-2 rounded-lg border border-slate-200 text-sm hover:bg-slate-50">Reset</button>
        </div>
      </form>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm max-w-xl">
        <h3 className="text-base font-semibold mb-3">Notifications</h3>
        <div className="space-y-3 text-sm">
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="accent-indigo-600" />
            Email reminders for events & meetings
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="accent-indigo-600" />
            Weekly digest summary
          </label>
        </div>
      </div>
    </div>
  );
}
