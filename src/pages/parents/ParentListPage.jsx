/**
 * ParentListPage.jsx
 * Module : parents
 * Page   : Parents List — matches screenshot 6
 */
import { useState } from "react";
import { usePageTitle } from "../../hooks";
import { PageHeader, Card, Button, SearchInput } from "../../components/ui";

const SAMPLE_PARENTS = [
  { id: 1, name: "ARBIND KUMAR MANJHI", occupation: "", mobile: "", email: "" },
  { id: 2, name: "ARBIND KUMAR MANJHI", occupation: "", mobile: "", email: "" },
  { id: 3, name: "ARBIND KUMAR MANJHI", occupation: "", mobile: "", email: "" },
  { id: 4, name: "RAMENDRA SINGH",      occupation: "", mobile: "", email: "" },
  { id: 5, name: "RAMENDRA SINGH",      occupation: "", mobile: "", email: "" },
  { id: 6, name: "RAMENDRA SINGH",      occupation: "", mobile: "", email: "" },
  { id: 7, name: "KAMLESHWAR SINGH",    occupation: "", mobile: "", email: "" },
  { id: 8, name: "KAMLESHWAR SINGH",    occupation: "", mobile: "", email: "" },
  { id: 9, name: "KAMLESHWAR SINGH",    occupation: "", mobile: "", email: "" },
  { id: 10, name: "KAMLESHWAR SINGH",   occupation: "", mobile: "", email: "" },
  { id: 11, name: "RAVINDRA YADAV",     occupation: "", mobile: "", email: "" },
  { id: 12, name: "RAVINDRA YADAV",     occupation: "", mobile: "", email: "" },
];

export default function ParentListPage() {
  usePageTitle("Parents List");
  const [search, setSearch] = useState("");
  const [data] = useState(SAMPLE_PARENTS);

  const filtered = data.filter(r =>
    !search || r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader title="Parents List" subtitle="All registered parents" icon="👨‍👩‍👧">
        <Button size="sm" onClick={() => alert("Navigate to Add Parent")}>+ Add Parent</Button>
      </PageHeader>

      <Card title="Parents List" action={
        <SearchInput value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." />
      }>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["SL","Guardian Name","Occupation","Mobile No","Email","Action"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((row, i) => (
                <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-4 py-3 text-[12.5px] text-slate-700">{i + 1}</td>
                  <td className="px-4 py-3 text-[12.5px] text-slate-700 font-medium">{row.name}</td>
                  <td className="px-4 py-3 text-[12.5px] text-slate-700">{row.occupation || "—"}</td>
                  <td className="px-4 py-3 text-[12.5px] text-slate-700">{row.mobile || "—"}</td>
                  <td className="px-4 py-3 text-[12.5px] text-slate-700">{row.email || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs border border-slate-300">⊙</button>
                      <button className="w-7 h-7 rounded bg-red-600 hover:bg-red-700 text-white flex items-center justify-center text-xs">🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Showing 1 to {filtered.length} of {filtered.length} entries</span>
          <div className="flex gap-1">
            <Button size="xs" variant="secondary">‹</Button>
            <Button size="xs" variant="secondary">›</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
