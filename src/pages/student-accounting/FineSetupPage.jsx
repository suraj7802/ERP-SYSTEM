/**
 * FineSetupPage.jsx — matches screenshot 5
 * Tabs: Fine List | Add Fine
 * Fine List: SL, GROUP NAME, FEE TYPES COVERED (badge + list), FINE TYPE, FINE VALUE, LATE FEE FREQUENCY, ACTION
 */
import { useState } from "react";

const FEE_GROUPS = ["Play To NUR","NUR To UKG","CLASS - 9","CLASS 8","Class 1","CLASS 2 - 3","CLASS- 4 - 5","PATHFINDERS","CLASS- 6 - 7","CLASS-10"];
const FINE_TYPES = ["Fixed Amount","Percentage"];
const FREQUENCY_OPTS = ["Fixed","Daily","Weekly","Monthly"];

const MONTHS_3 = ["January","February","March"];
const ALL_MONTHS = ["January","February","March","February","March","April","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];

const INIT_FINES = [
  { id:1, group:"Play To NUR",  feeTypes:ALL_MONTHS,  fineType:"Fixed Amount", fineValue:"₹200.00", freq:"Fixed" },
  { id:2, group:"CLASS - 9",    feeTypes:MONTHS_3,    fineType:"Fixed Amount", fineValue:"₹200.00", freq:"Fixed" },
  { id:3, group:"CLASS 8",      feeTypes:MONTHS_3,    fineType:"Fixed Amount", fineValue:"₹200.00", freq:"Fixed" },
  { id:4, group:"Class 1",      feeTypes:MONTHS_3,    fineType:"Fixed Amount", fineValue:"₹200.00", freq:"Fixed" },
  { id:5, group:"CLASS 2 - 3",  feeTypes:MONTHS_3,    fineType:"Fixed Amount", fineValue:"₹200.00", freq:"Fixed" },
  { id:6, group:"CLASS- 4 - 5", feeTypes:MONTHS_3,    fineType:"Fixed Amount", fineValue:"₹200.00", freq:"Fixed" },
  { id:7, group:"PATHFINDERS",  feeTypes:MONTHS_3,    fineType:"Fixed Amount", fineValue:"₹200.00", freq:"Fixed" },
  { id:8, group:"CLASS- 6 - 7", feeTypes:MONTHS_3,    fineType:"Fixed Amount", fineValue:"₹200.00", freq:"Fixed" },
  { id:9, group:"CLASS-10",     feeTypes:["January","February"], fineType:"Fixed Amount", fineValue:"₹200.00", freq:"Fixed" },
];

const Inp = (props) => <input {...props} className={`w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400 ${props.className??""}`}/>;
const Sel = ({label,value,onChange,options,required}) => (
  <div>
    {label && <label className="block text-[11px] font-semibold text-slate-600 mb-1">{label}{required&&<span className="text-red-500 ml-0.5">*</span>}</label>}
    <select value={value} onChange={onChange} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-indigo-400">
      <option value="">Select</option>
      {options.map(o=><option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

export default function FineSetupPage() {
  const [tab, setTab] = useState("list");
  const [fines, setFines] = useState(INIT_FINES);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ group:"", fineType:"Fixed Amount", fineValue:"200", freq:"Fixed", feeTypes:[] });
  const [saving, setSaving] = useState(false);

  const filtered = fines.filter(f => !search || f.group.toLowerCase().includes(search.toLowerCase()));

  const toggleSelect = (id) => setSelected(s => s.includes(id) ? s.filter(x=>x!==id) : [...s, id]);
  const toggleAll = () => setSelected(s => s.length===filtered.length ? [] : filtered.map(f=>f.id));
  const bulkDelete = () => { setFines(p=>p.filter(f=>!selected.includes(f.id))); setSelected([]); };

  const handleSave = async () => {
    if (!form.group) { alert("Fee group is required"); return; }
    setSaving(true);
    await new Promise(r=>setTimeout(r,500));
    setFines(p=>[...p,{ id:Date.now(), group:form.group, feeTypes:form.feeTypes.length?form.feeTypes:MONTHS_3, fineType:form.fineType, fineValue:`₹${form.fineValue}.00`, freq:form.freq }]);
    setForm({ group:"", fineType:"Fixed Amount", fineValue:"200", freq:"Fixed", feeTypes:[] });
    setSaving(false); setTab("list");
  };

  const TabBtn = ({ id, label }) => (
    <button onClick={()=>setTab(id)}
      className={`flex items-center gap-1.5 px-4 py-3 text-[12px] font-semibold border-b-2 transition-colors
        ${tab===id?"border-orange-500 text-orange-600":"border-transparent text-slate-500 hover:text-slate-700"}`}>
      {id==="list"?"☰":"✏"} {label}
    </button>
  );

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-sm">🏠</div>
        <h1 className="text-[15px] font-bold text-slate-800">Fine Setup</h1>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
        <div className="px-5 pt-4 border-b border-slate-100 flex gap-0">
          <TabBtn id="list" label="Fine List" />
          <TabBtn id="add" label="Add Fine" />
        </div>

        {tab === "list" ? (
          <>
            <div className="p-4 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex gap-2 items-center">
                {selected.length > 0 && (
                  <button onClick={bulkDelete} className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100">
                    🗑 Bulk Delete
                  </button>
                )}
                {["⧉","⬇","📋","📊","🖨","⊞"].map((ic,i)=>(
                  <button key={i} className="w-7 h-7 rounded border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-xs">{ic}</button>
                ))}
              </div>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..."
                className="pl-3 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400 w-56"/>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-3 py-3 w-10"><input type="checkbox" checked={selected.length===filtered.length&&filtered.length>0} onChange={toggleAll} className="rounded"/></th>
                    {["SL","Group Name","Fee Types Covered","Fine Type","Fine Value","Late Fee Frequency","Action"].map(h=>(
                      <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((row,i) => (
                    <tr key={row.id} className="hover:bg-slate-50/70">
                      <td className="px-3 py-3"><input type="checkbox" checked={selected.includes(row.id)} onChange={()=>toggleSelect(row.id)} className="rounded"/></td>
                      <td className="px-4 py-3 text-[12.5px] text-slate-700">{i+1}</td>
                      <td className="px-4 py-3 text-[12.5px] font-medium text-slate-800">{row.group}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-700 text-white mb-1">{row.feeTypes.length} fee types</span>
                        <p className="text-[11px] text-slate-500">{row.feeTypes.join(", ")}</p>
                      </td>
                      <td className="px-4 py-3 text-[12.5px] text-slate-700">{row.fineType}</td>
                      <td className="px-4 py-3 text-[12.5px] text-slate-700">{row.fineValue}</td>
                      <td className="px-4 py-3 text-[12.5px] text-slate-700">{row.freq}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5">
                          <button className="w-7 h-7 rounded bg-slate-600 hover:bg-slate-700 text-white flex items-center justify-center text-xs">✏</button>
                          <button onClick={()=>setFines(p=>p.filter(f=>f.id!==row.id))} className="w-7 h-7 rounded bg-red-600 hover:bg-red-700 text-white flex items-center justify-center text-xs">🗑</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-3">
                <span>Showing 1 to {filtered.length} of {filtered.length} entries</span>
                <select className="border border-slate-200 rounded px-2 py-1 text-[11px]" defaultValue="25">
                  {[10,25,50,100].map(n=><option key={n}>{n}</option>)}
                </select>
                <span>rows per page</span>
              </div>
              <div className="flex gap-1">
                <button className="w-6 h-6 rounded border border-slate-200 flex items-center justify-center text-xs">‹</button>
                <button className="w-6 h-6 rounded bg-indigo-600 text-white flex items-center justify-center text-xs">1</button>
                <button className="w-6 h-6 rounded border border-slate-200 flex items-center justify-center text-xs">›</button>
              </div>
            </div>
          </>
        ) : (
          <div className="p-6 max-w-xl space-y-4">
            <Sel label="Fee Group" value={form.group} onChange={e=>setForm(p=>({...p,group:e.target.value}))} options={FEE_GROUPS} required />
            <Sel label="Fine Type" value={form.fineType} onChange={e=>setForm(p=>({...p,fineType:e.target.value}))} options={FINE_TYPES} required />
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Fine Value *</label>
              <Inp type="number" value={form.fineValue} onChange={e=>setForm(p=>({...p,fineValue:e.target.value}))} />
            </div>
            <Sel label="Late Fee Frequency" value={form.freq} onChange={e=>setForm(p=>({...p,freq:e.target.value}))} options={FREQUENCY_OPTS} required />
            <div className="flex justify-end pt-2">
              <button onClick={handleSave} disabled={saving}
                className="px-8 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg disabled:opacity-60">
                {saving?"Saving...":"✚ Save"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
