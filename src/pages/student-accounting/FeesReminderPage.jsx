/**
 * FeesReminderPage.jsx — matches screenshot: fees/reminder
 * Tabs: Reminder List | Add Reminder
 * Table: SL, FREQUENCY (Before/After), DAYS, NOTIFY (Student/Guardian), ACTION
 */
import { useState } from "react";
import { Edit2, Trash2, Plus, X, Copy, FileText, FileDown, Printer, Columns, ChevronLeft, ChevronRight, Search } from "lucide-react";

const INIT=[
  {id:1,frequency:"Before",days:1,notifyStudent:true,notifyGuardian:true},
  {id:2,frequency:"After", days:1,notifyStudent:true,notifyGuardian:true},
];

function ReminderForm({init,onSave,onCancel}){
  const [form,setForm]=useState(init||{frequency:"Before",days:1,notifyStudent:true,notifyGuardian:true});
  const sf=(k,v)=>setForm(p=>({...p,[k]:v}));
  return <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <div><label className="text-[11px] font-semibold text-slate-500 mb-1 block">Frequency *</label>
        <select value={form.frequency} onChange={e=>sf("frequency",e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-indigo-400">
          <option>Before</option><option>After</option>
        </select></div>
      <div><label className="text-[11px] font-semibold text-slate-500 mb-1 block">Days *</label>
        <input type="number" min={1} max={30} value={form.days} onChange={e=>sf("days",+e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"/></div>
    </div>
    <div><label className="text-[11px] font-semibold text-slate-500 mb-2 block">Notify</label>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer"><input type="checkbox" checked={form.notifyStudent} onChange={e=>sf("notifyStudent",e.target.checked)} className="accent-indigo-600"/> Student</label>
        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer"><input type="checkbox" checked={form.notifyGuardian} onChange={e=>sf("notifyGuardian",e.target.checked)} className="accent-indigo-600"/> Guardian</label>
      </div>
    </div>
    <div className="flex gap-3 pt-2">
      <button onClick={()=>onSave(form)} className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg"><Plus size={13}/> {init?"Update":"Add"} Reminder</button>
      <button onClick={onCancel} className="px-5 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg">Cancel</button>
    </div>
  </div>;
}

export default function FeesReminderPage() {
  const [tab,setTab]=useState("list");
  const [reminders,setReminders]=useState(INIT);
  const [editItem,setEditItem]=useState(null);
  const [deleteId,setDeleteId]=useState(null);
  const [search,setSearch]=useState("");
  const [page,setPage]=useState(1);
  const PER=25;

  const filtered=reminders.filter(r=>!search||r.frequency.toLowerCase().includes(search.toLowerCase()));
  const total=Math.max(1,Math.ceil(filtered.length/PER));
  const rows=filtered.slice((page-1)*PER,page*PER);

  const handleAdd=form=>{setReminders(p=>[...p,{...form,id:Date.now()}]);setTab("list");};
  const handleEdit=form=>{setReminders(p=>p.map(r=>r.id===editItem.id?{...form,id:editItem.id}:r));setEditItem(null);};
  const handleDelete=id=>{setReminders(p=>p.filter(r=>r.id!==id));setDeleteId(null);};

  return (
    <div>
      <div className="flex items-center gap-3 mb-5"><div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">🏠</div><h1 className="text-[15px] font-bold text-slate-800">Fees Reminder</h1></div>
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
        <div className="px-5 pt-4 border-b border-slate-100 flex gap-6">
          {[["list","☰ Reminder List"],["add","✏️ Add Reminder"]].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${tab===k?"border-indigo-600 text-indigo-600":"border-transparent text-slate-500 hover:text-slate-700"}`}>{l}</button>
          ))}
        </div>
        {tab==="list"?(
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-1">{[<Copy size={13}/>,<FileText size={13}/>,<FileDown size={13}/>,<FileDown size={13}/>,<Printer size={13}/>,<Columns size={13}/>].map((ic,i)=><button key={i} className="p-1.5 rounded hover:bg-slate-100 text-slate-500">{ic}</button>)}</div>
              <div className="relative"><Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." className="pl-8 pr-4 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400 w-48"/></div>
            </div>
            <div className="border border-slate-100 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead><tr className="bg-slate-50">{["SL","FREQUENCY","DAYS","NOTIFY","ACTION"].map(h=><th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">{h}</th>)}</tr></thead>
                <tbody className="divide-y divide-slate-50">
                  {rows.length===0?<tr><td colSpan={5} className="px-4 py-10 text-center text-xs text-slate-400">No data available in table</td></tr>:
                  rows.map((r,i)=><tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 text-slate-500">{(page-1)*PER+i+1}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{r.frequency}</td>
                    <td className="px-4 py-3 text-slate-600">{r.days}</td>
                    <td className="px-4 py-3 text-slate-600 text-xs leading-5">
                      {r.notifyStudent&&<div>- Student</div>}{r.notifyGuardian&&<div>- Guardian</div>}
                    </td>
                    <td className="px-4 py-3"><div className="flex gap-1">
                      <button onClick={()=>{setEditItem(r);}} className="p-1.5 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-600"><Edit2 size={13}/></button>
                      <button onClick={()=>setDeleteId(r.id)} className="p-1.5 rounded bg-red-50 hover:bg-red-100 text-red-500"><Trash2 size={13}/></button>
                    </div></td>
                  </tr>)}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
              <span>Showing {filtered.length===0?0:(page-1)*PER+1} to {Math.min(page*PER,filtered.length)} of {filtered.length} entries</span>
              <div className="flex items-center gap-2">
                <select className="border border-slate-200 rounded px-2 py-1 text-xs"><option>25</option><option>50</option></select>
                <span>rows per page</span>
                <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} className="p-1 rounded hover:bg-slate-100 disabled:opacity-40"><ChevronLeft size={14}/></button>
                {[...Array(total)].map((_,i)=><button key={i} onClick={()=>setPage(i+1)} className={`w-7 h-7 rounded text-[11px] font-semibold ${page===i+1?"bg-indigo-600 text-white":"hover:bg-slate-100 text-slate-600"}`}>{i+1}</button>)}
                <button onClick={()=>setPage(p=>Math.min(total,p+1))} disabled={page===total} className="p-1 rounded hover:bg-slate-100 disabled:opacity-40"><ChevronRight size={14}/></button>
              </div>
            </div>
          </div>
        ):(
          <div className="p-6 max-w-md">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Add New Reminder</h3>
            <ReminderForm onSave={handleAdd} onCancel={()=>setTab("list")}/>
          </div>
        )}
      </div>
      {/* Edit Modal */}
      {editItem&&<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-2xl shadow-2xl w-[400px]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100"><h3 className="font-bold text-slate-800">Edit Reminder</h3><button onClick={()=>setEditItem(null)}><X size={16} className="text-slate-400"/></button></div>
          <div className="p-6"><ReminderForm init={editItem} onSave={handleEdit} onCancel={()=>setEditItem(null)}/></div>
        </div></div>}
      {deleteId&&<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"><div className="bg-white rounded-2xl p-6 w-72 shadow-2xl"><h3 className="font-bold mb-2">Delete Reminder?</h3><p className="text-sm text-slate-500 mb-5">This cannot be undone.</p><div className="flex gap-3"><button onClick={()=>handleDelete(deleteId)} className="flex-1 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg">Delete</button><button onClick={()=>setDeleteId(null)} className="flex-1 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg">Cancel</button></div></div></div>}
    </div>
  );
}
