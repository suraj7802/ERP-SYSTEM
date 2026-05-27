/**
 * FeesTypePage.jsx — matches screenshots 1 & 2
 * Tabs: Fees Type List | Add Fees Type
 * List: SL, NAME, FEE CODE, DESCRIPTION, ACTION
 */
import { useState } from "react";

const INIT_FEES = [
  { id:1,  name:"January",               code:"january",                desc:"Monthly Fee"   },
  { id:2,  name:"February",              code:"february",               desc:"Monthly Fee"   },
  { id:3,  name:"March",                 code:"march",                  desc:"Monthly Fee"   },
  { id:4,  name:"April",                 code:"april",                  desc:"Monthly Fee"   },
  { id:5,  name:"Prospectus/Registration",code:"prospectus/registration",desc:"YEARLY"       },
  { id:6,  name:"Admission",             code:"admission",              desc:"ONE TIME"      },
  { id:7,  name:"Pupil Fund",            code:"pupil-fund",             desc:"YEARLY"        },
  { id:8,  name:"Examination Fee",       code:"examination-fee",        desc:"YEARLY"        },
  { id:9,  name:"Development Fee",       code:"development-fee",        desc:"YEARLY"        },
  { id:10, name:"Festival",              code:"festival",               desc:"YEARLY"        },
  { id:11, name:"Belt + Diary + ID Card",code:"belt-+-diary-+-id-card", desc:"YEARLY"        },
  { id:12, name:"Hostel Fee",            code:"hostel-fee",             desc:"MONTHLY"       },
  { id:13, name:"MAY",                   code:"may",                    desc:"MONTHLY FEE"   },
  { id:14, name:"JUNE",                  code:"june",                   desc:"MONTHLY FEE"   },
  { id:15, name:"JULY",                  code:"july",                   desc:"MONTHLY FEE"   },
  { id:16, name:"AUGUST",               code:"august",                  desc:"MONTHLY FEE"   },
  { id:17, name:"SEPTEMBER",            code:"september",               desc:"MONTHLY FEE"   },
];

const Inp = (props) => <input {...props} className={`w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400 ${props.className??""}`}/>;

export default function FeesTypePage() {
  const [tab, setTab] = useState("list");
  const [fees, setFees] = useState(INIT_FEES);
  const [form, setForm] = useState({ name:"", desc:"" });
  const [search, setSearch] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [saving, setSaving] = useState(false);

  const filtered = fees.filter(f =>
    !search ||
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.code.toLowerCase().includes(search.toLowerCase())
  );

  const toCode = (name) => name.toLowerCase().replace(/\s+/g, "-");

  const handleSave = async () => {
    if (!form.name.trim()) { alert("Name is required"); return; }
    setSaving(true);
    await new Promise(r => setTimeout(r, 500));
    if (editItem) {
      setFees(p => p.map(f => f.id === editItem.id ? { ...f, name: form.name, code: toCode(form.name), desc: form.desc } : f));
      setEditItem(null);
    } else {
      setFees(p => [...p, { id: Date.now(), name: form.name, code: toCode(form.name), desc: form.desc }]);
    }
    setForm({ name:"", desc:"" }); setSaving(false); setTab("list");
  };

  const startEdit = (row) => { setEditItem(row); setForm({ name: row.name, desc: row.desc }); setTab("add"); };

  const TabBtn = ({ id, label }) => (
    <button onClick={() => { setTab(id); if(id==="list") { setEditItem(null); setForm({name:"",desc:""}); } }}
      className={`flex items-center gap-1.5 px-4 py-3 text-[12px] font-semibold border-b-2 transition-colors
        ${tab===id ? "border-orange-500 text-orange-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}>
      {id==="list" ? "☰" : "✏"} {label}
    </button>
  );

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-sm">🏠</div>
        <h1 className="text-[15px] font-bold text-slate-800">Fees Type</h1>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
        <div className="px-5 pt-4 border-b border-slate-100 flex gap-0">
          <TabBtn id="list" label="Fees Type List" />
          <TabBtn id="add" label="Add Fees Type" />
        </div>

        {tab === "list" ? (
          <>
            <div className="p-4 flex items-center justify-between gap-3">
              <div className="flex gap-2 text-slate-400 text-xs">
                {["⧉","⬇","📋","📊","🖨","⊞"].map((ic,i)=>(
                  <button key={i} className="w-7 h-7 rounded border border-slate-200 hover:bg-slate-50 flex items-center justify-center">{ic}</button>
                ))}
              </div>
              <div className="relative">
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..."
                  className="pl-3 pr-8 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400 w-56"/>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {["SL","Name","Fee Code","Description","Action"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((row,i) => (
                    <tr key={row.id} className={`hover:bg-slate-50/70 transition-colors ${row.id===11?"bg-amber-50/40":""}`}>
                      <td className="px-4 py-2.5 text-[12.5px] text-slate-700">{i+1}</td>
                      <td className="px-4 py-2.5 text-[12.5px] text-slate-800 font-medium">{row.name}</td>
                      <td className="px-4 py-2.5 text-[12.5px] text-slate-600">{row.code}</td>
                      <td className="px-4 py-2.5 text-[12.5px] text-slate-600">{row.desc}</td>
                      <td className="px-4 py-2.5">
                        <div className="flex gap-1.5">
                          <button onClick={() => startEdit(row)} className="w-7 h-7 rounded bg-slate-600 hover:bg-slate-700 text-white flex items-center justify-center text-xs">✏</button>
                          <button onClick={() => setFees(p=>p.filter(f=>f.id!==row.id))} className="w-7 h-7 rounded bg-red-600 hover:bg-red-700 text-white flex items-center justify-center text-xs">🗑</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length===0 && (
                    <tr><td colSpan={5} className="px-4 py-10 text-center text-xs text-slate-400">No data available in table</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Showing 1 to {filtered.length} of {filtered.length} entries</span>
              <div className="flex gap-1">
                <button className="w-6 h-6 rounded border border-slate-200 flex items-center justify-center text-xs hover:bg-slate-50">‹</button>
                <button className="w-6 h-6 rounded bg-indigo-600 text-white flex items-center justify-center text-xs">1</button>
                <button className="w-6 h-6 rounded border border-slate-200 flex items-center justify-center text-xs hover:bg-slate-50">›</button>
              </div>
            </div>
          </>
        ) : (
          <div className="p-8 max-w-2xl mx-auto space-y-5">
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-right text-sm text-slate-600">Name <span className="text-red-500">*</span></label>
              <div className="col-span-2"><Inp value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} /></div>
            </div>
            <div className="grid grid-cols-3 items-start gap-4">
              <label className="text-right text-sm text-slate-600 pt-2">Description</label>
              <div className="col-span-2">
                <textarea className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400 resize-none" rows={4}
                  value={form.desc} onChange={e=>setForm(p=>({...p,desc:e.target.value}))} />
              </div>
            </div>
            <div className="flex justify-center pt-2">
              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 px-8 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-60">
                {saving ? "Saving..." : "✚ Save"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
