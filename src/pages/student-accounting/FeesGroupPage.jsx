/**
 * FeesGroupPage.jsx — matches screenshot: fees/group
 * Tabs: Fees Group List | Add Fees Group
 * Clone Fees Group / Fine Setup section
 * Table: SL, NAME, FEES TYPE (monthly breakdown), DESCRIPTION, ACTION
 */
import { useState } from "react";
import { Copy, FileText, FileDown, Printer, Columns, ChevronLeft, ChevronRight, Edit2, Trash2, Search, X, Plus } from "lucide-react";

const MONTHS = ["January","February","March","April","May","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];

const INIT_GROUPS = [
  { id:1, name:"Play To NUR", feesType: MONTHS.map((m,i)=>`${m} - ₹1150.00`), description:"MONTHLY TUTION FEE" },
  { id:2, name:"NUR To UKG",  feesType: MONTHS.map((m,i)=>`${m} - ₹1350.00`), description:"MONTHLY TUTION FEE" },
  { id:3, name:"Class 1-5",   feesType: MONTHS.map((m,i)=>`${m} - ₹1500.00`), description:"MONTHLY TUTION FEE" },
];

const ACADEMIC_SESSIONS = ["2024-25","2025-26","2026-27"];

function Modal({title,onClose,children}){
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-2xl shadow-2xl w-[500px] max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100"><h3 className="font-bold text-slate-800">{title}</h3><button onClick={onClose}><X size={16} className="text-slate-400"/></button></div>
      <div className="p-6">{children}</div>
    </div></div>;
}

export default function FeesGroupPage() {
  const [tab,setTab]=useState("list");
  const [groups,setGroups]=useState(INIT_GROUPS);
  const [search,setSearch]=useState("");
  const [page,setPage]=useState(1);
  const [editItem,setEditItem]=useState(null);
  const [deleteId,setDeleteId]=useState(null);
  const [cloneForm,setCloneForm]=useState({session:"",group:"",shiftDate:false});
  const [addForm,setAddForm]=useState({name:"",amount:"",description:""});
  const [saving,setSaving]=useState(false);

  const filtered=groups.filter(g=>!search||g.name.toLowerCase().includes(search.toLowerCase()));
  const PER=25;const total=Math.max(1,Math.ceil(filtered.length/PER));
  const rows=filtered.slice((page-1)*PER,page*PER);

  const handleAdd=async()=>{if(!addForm.name||!addForm.amount)return;setSaving(true);await new Promise(r=>setTimeout(r,600));
    setGroups(p=>[...p,{id:Date.now(),name:addForm.name,feesType:MONTHS.map(m=>`${m} - ₹${addForm.amount}`),description:addForm.description||"MONTHLY TUTION FEE"}]);
    setAddForm({name:"",amount:"",description:""});setSaving(false);setTab("list");};

  const handleEdit=async()=>{setSaving(true);await new Promise(r=>setTimeout(r,500));
    setGroups(p=>p.map(g=>g.id===editItem.id?editItem:g));setSaving(false);setEditItem(null);};

  const handleDelete=id=>{setGroups(p=>p.filter(g=>g.id!==id));setDeleteId(null);};

  const Inp=(props)=><input {...props} className={`w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400 ${props.className??""}`}/>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-5"><div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">🏠</div><h1 className="text-[15px] font-bold text-slate-800">Fees Group</h1></div>
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
        {/* Tabs */}
        <div className="px-5 pt-4 border-b border-slate-100 flex gap-6">
          {[["list","☰ Fees Group List"],["add","✏️ Add Fees Group"]].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${tab===k?"border-indigo-600 text-indigo-600":"border-transparent text-slate-500 hover:text-slate-700"}`}>{l}</button>
          ))}
        </div>

        {tab==="list" ? (
          <div className="p-5">
            {/* Clone Section */}
            <div className="bg-slate-50 rounded-xl border border-slate-100 p-5 mb-5">
              <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2"><Copy size={13}/> Clone Fees Group / Fine Setup</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
                <div><label className="text-[11px] font-semibold text-slate-500 mb-1 block">Source Academic Session *</label>
                  <select value={cloneForm.session} onChange={e=>setCloneForm(p=>({...p,session:e.target.value}))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-indigo-400">
                    <option value="">Select</option>{ACADEMIC_SESSIONS.map(s=><option key={s}>{s}</option>)}
                  </select></div>
                <div><label className="text-[11px] font-semibold text-slate-500 mb-1 block">Fees Group *</label>
                  <Inp value={cloneForm.group} onChange={e=>setCloneForm(p=>({...p,group:e.target.value}))} placeholder="Enter fees group name"/></div>
                <div>
                  <label className="flex items-center gap-2 text-sm text-slate-600 mb-2 cursor-pointer">
                    <input type="checkbox" checked={cloneForm.shiftDate} onChange={e=>setCloneForm(p=>({...p,shiftDate:e.target.checked}))} className="accent-indigo-600"/> Shift Due Date (+1 Year)
                  </label>
                  <button className="flex items-center gap-2 px-5 py-2 bg-slate-700 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg w-full justify-center">
                    <Copy size={13}/> Clone
                  </button>
                </div>
              </div>
            </div>

            {/* Table toolbar */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-1">{[<Copy size={13}/>,<FileText size={13}/>,<FileDown size={13}/>,<FileDown size={13}/>,<Printer size={13}/>,<Columns size={13}/>].map((ic,i)=><button key={i} className="p-1.5 rounded hover:bg-slate-100 text-slate-500">{ic}</button>)}</div>
              <div className="relative"><Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." className="pl-8 pr-4 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400 w-48"/></div>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-xl">
              <table className="w-full text-sm">
                <thead><tr className="bg-slate-50">{["SL","NAME","FEES TYPE","DESCRIPTION","ACTION"].map(h=><th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">{h}</th>)}</tr></thead>
                <tbody className="divide-y divide-slate-50">
                  {rows.length===0?<tr><td colSpan={5} className="px-4 py-10 text-center text-xs text-slate-400">No data available in table</td></tr>:
                  rows.map((g,i)=><tr key={g.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 text-slate-500">{(page-1)*PER+i+1}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{g.name}</td>
                    <td className="px-4 py-3 text-slate-600 text-xs leading-6">{g.feesType.map((ft,fi)=><div key={fi}>{ft}</div>)}</td>
                    <td className="px-4 py-3 text-slate-600">{g.description}</td>
                    <td className="px-4 py-3"><div className="flex gap-1">
                      <button onClick={()=>setEditItem({...g})} className="p-1.5 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-600"><Edit2 size={13}/></button>
                      <button onClick={()=>setDeleteId(g.id)} className="p-1.5 rounded bg-red-50 hover:bg-red-100 text-red-500"><Trash2 size={13}/></button>
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
                <button onClick={()=>setPage(p=>Math.min(total,p+1))} disabled={page===total} className="p-1 rounded hover:bg-slate-100 disabled:opacity-40"><ChevronRight size={14}/></button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 max-w-lg">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Add New Fees Group</h3>
            <div className="space-y-4">
              <div><label className="text-[11px] font-semibold text-slate-500 mb-1 block">Group Name *</label><Inp value={addForm.name} onChange={e=>setAddForm(p=>({...p,name:e.target.value}))} placeholder="e.g. Play To NUR"/></div>
              <div><label className="text-[11px] font-semibold text-slate-500 mb-1 block">Monthly Amount (₹) *</label><Inp type="number" value={addForm.amount} onChange={e=>setAddForm(p=>({...p,amount:e.target.value}))} placeholder="e.g. 1150"/></div>
              <div><label className="text-[11px] font-semibold text-slate-500 mb-1 block">Description</label><Inp value={addForm.description} onChange={e=>setAddForm(p=>({...p,description:e.target.value}))} placeholder="e.g. MONTHLY TUTION FEE"/></div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={handleAdd} disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg disabled:opacity-70">
                {saving?<span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>:<Plus size={13}/>} Save Group
              </button>
              <button onClick={()=>setTab("list")} className="px-5 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg">Cancel</button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editItem&&<Modal title="Edit Fees Group" onClose={()=>setEditItem(null)}>
        <div className="space-y-4">
          <div><label className="text-[11px] font-semibold text-slate-500 mb-1 block">Group Name *</label><input value={editItem.name} onChange={e=>setEditItem(p=>({...p,name:e.target.value}))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"/></div>
          <div><label className="text-[11px] font-semibold text-slate-500 mb-1 block">Description</label><input value={editItem.description} onChange={e=>setEditItem(p=>({...p,description:e.target.value}))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"/></div>
        </div>
        <div className="flex gap-3 mt-5"><button onClick={handleEdit} disabled={saving} className="flex-1 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg">{saving?"Saving...":"Save Changes"}</button><button onClick={()=>setEditItem(null)} className="flex-1 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg">Cancel</button></div>
      </Modal>}

      {/* Delete Confirm */}
      {deleteId&&<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"><div className="bg-white rounded-2xl p-6 w-72 shadow-2xl"><h3 className="font-bold mb-2">Delete Fees Group?</h3><p className="text-sm text-slate-500 mb-5">This action cannot be undone.</p><div className="flex gap-3"><button onClick={()=>handleDelete(deleteId)} className="flex-1 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg">Delete</button><button onClick={()=>setDeleteId(null)} className="flex-1 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg">Cancel</button></div></div></div>}
    </div>
  );
}
