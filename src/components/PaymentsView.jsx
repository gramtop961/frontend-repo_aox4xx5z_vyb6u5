export default function PaymentsView() {
  const invoices = [
    { id: 'INV-1001', date: '2025-10-12', amount: 19, status: 'Paid' },
    { id: 'INV-1002', date: '2025-11-12', amount: 19, status: 'Due' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Billing & payments</h2>
        <p className="text-sm text-slate-600">Manage your subscription and view invoices.</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-base font-semibold mb-3">Current plan</h3>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="font-medium">Pro — $19/mo</div>
            <div className="text-sm text-slate-500">Renews monthly. Cancel anytime.</div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg border border-slate-200 text-sm hover:bg-slate-50">Update payment</button>
            <button className="px-4 py-2 rounded-lg bg-rose-600 text-white text-sm hover:bg-rose-700">Cancel plan</button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-base font-semibold mb-3">Invoices</h3>
        <div className="divide-y divide-slate-200">
          {invoices.map((inv) => (
            <div key={inv.id} className="py-3 flex items-center justify-between text-sm">
              <div className="font-medium">{inv.id}</div>
              <div className="text-slate-500">{inv.date}</div>
              <div className="font-medium">${inv.amount}.00</div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {inv.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
