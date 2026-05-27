/**
 * AccountPage.jsx — matches screenshot: accounting (Account List + Create Account)
 * Table: SL, ACCOUNT NAME, ACCOUNT NUMBER, DESCRIPTION, DATE, ACTION
 */
import { useState } from "react";
import { Edit2, Trash2, Plus, X, Copy, FileText, FileDown, Printer, Columns, ChevronLeft, ChevronRight, Search } from "lucide-react";

const INIT=[
  {id:1,name:"Kps",number:"",description:"",date:"01.Apr.2026"},
  {id:2,name:"Main Account",number:"SB-1234567890",description:"Primary school account",date:"01.Apr.2026"},
];

function Modal({title,onClose,children}){return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"><div className="bg-white rounded-2xl shadow-2xl w-[440px]"><div className="flex items-center justify-between px-6 py-4 border-b border-slate-100"><h3 className="font-bold text-slate-800">{title}</h3><button onClick={onClose}><X size={16} className="text-slate-400"/></button></div><div className="p-6">{children}</div></div></div>;}
function Inp(props){return <input {...props} className={`w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400 ${props.className??""}`}/>;}

export default function AccountPage() {
  const [tab,setTab]=useState("list");
  const [accounts,setAccounts]=useState(INIT);
  const [addForm,setAddForm]=useState({name:"",number:"",description:"",date:new Date().toISOString().slice(0,10)});
  const [editItem,setEditItem]=useState(null);
  const [deleteId,setDeleteId]=useState(null);
  const [search,setSearch]=useState(""); const [page,setPage]=useState(1); const [saving,setSaving]=useState(false);
  const PER=25;
  const filtered=accounts.filter-(a=>!search||a.name.toLowerCase().includes(search.toLowerCase()));
  const total=Math.max(1,Math.ceil(filtered.length/PER));
  const rows=filtered.slice((page-1)*PER,page*PER);
  const sa=(k,v)=>setAddForm(p=>({...p,[k]:v}));

  const handleAdd=async()=>{if(!addForm.name.trim()){alert("Account name is required");return;}setSaving(true);await new Promise(r=>setTimeout(r,600));
    const d=new Date(addForm.date);const fmtd=`${String(d.getDate()).padStart(2,"0")}.${d.toLocaleString("default",{month:"short"})}.${d.getFullYear()}`;
    setAccounts(p=>[...p,{...addForm,id:Date.now(),date:fmtd}]);setAddForm({name:"",number:"",description:"",date:new Date().toISOString().slice(0,10)});setSaving(false);setTab("list");};

  const handleEdit=async()=>{setSaving(true);await new Promise(r=>setTimeout(r,500));setAccounts(p=>p.map(a=>a.id===editItem.id?editItem:a));setSaving(false);setEditItem(null);};
  const handleDelete=id=>{setAccounts(p=>p.filter(a=>a.id!==id));setDeleteId(null);};

  return (
    <div>
      <div className="flex items-center gap-3 mb-5"><div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">🏠</div><h1 className="text-[15px] font-bold text-slate-800">Office Accounting</h1></div>
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
        <div className="px-5 pt-4 border-b border-slate-100 flex gap-6">
          {[["list","☰ Account List"],["add","✏️ Create Account"]].map(([k,l])=>(
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
                <thead><tr className="bg-slate-50">{["SL","ACCOUNT NAME","ACCOUNT NUMBER","DESCRIPTION","DATE","ACTION"].map(h=><th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">{h}</th>)}</tr></thead>
                <tbody className="divide-y divide-slate-50">
                  {rows.length===0?<tr><td colSpan={6} className="px-4 py-10 text-center text-xs text-slate-400">No data available in table</td></tr>:
                  rows.map((a,i)=><tr key={a.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 text-slate-500">{(page-1)*PER+i+1}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{a.name}</td>
                    <td className="px-4 py-3 text-slate-600">{a.number||"—"}</td>
                    <td className="px-4 py-3 text-slate-600">{a.description||"—"}</td>
                    <td className="px-4 py-3 text-slate-600">{a.date}</td>
                    <td className="px-4 py-3"><div className="flex gap-1">
                      <button onClick={()=>setEditItem({...a})} className="p-1.5 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-600"><Edit2 size={13}/></button>
                      <button onClick={()=>setDeleteId(a.id)} className="p-1.5 rounded bg-red-50 hover:bg-red-100 text-red-500"><Trash2 size={13}/></button>
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
          <div className="p-6 max-w-lg">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Create New Account</h3>
            <div className="space-y-4">
              <div><label className="text-[11px] font-semibold text-slate-500 mb-1 block">Account Name *</label><Inp value={addForm.name} onChange={e=>sa("name",e.target.value)} placeholder="e.g. Main School Account"/></div>
              <div><label className="text-[11px] font-semibold text-slate-500 mb-1 block">Account Number</label><Inp value={addForm.number} onChange={e=>sa("number",e.target.value)} placeholder="Bank account number"/></div>
              <div><label className="text-[11px] font-semibold text-slate-500 mb-1 block">Description</label><input value={addForm.description} onChange={e=>sa("description",e.target.value)} placeholder="Optional description" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"/></div>
              <div><label className="text-[11px] font-semibold text-slate-500 mb-1 block">Date</label><Inp type="date" value={addForm.date} onChange={e=>sa("date",e.target.value)}/></div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={handleAdd} disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg disabled:opacity-70">
                {saving?<span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>:<Plus size={13}/>} Save Account
              </button>
              <button onClick={()=>setTab("list")} className="px-5 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg">Cancel</button>
            </div>
          </div>
        )}
      </div>
      {editItem&&<Modal title="Edit Account" onClose={()=>setEditItem(null)}>
        <div className="space-y-4">
          <div><label className="text-[11px] font-semibold text-slate-500 mb-1 block">Account Name *</label><Inp value={editItem.name} onChange={e=>setEditItem(p=>({...p,name:e.target.value}))}/></div>
          <div><label className="text-[11px] font-semibold text-slate-500 mb-1 block">Account Number</label><Inp value={editItem.number} onChange={e=>setEditItem(p=>({...p,number:e.target.value}))}/></div>
          <div><label className="text-[11px] font-semibold text-slate-500 mb-1 block">Description</label><Inp value={editItem.description} onChange={e=>setEditItem(p=>({...p,description:e.target.value}))}/></div>
        </div>
        <div className="flex gap-3 mt-5"><button onClick={handleEdit} disabled={saving} className="flex-1 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg">{saving?"Saving...":"Save Changes"}</button><button onClick={()=>setEditItem(null)} className="flex-1 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg">Cancel</button></div>
      </Modal>}
      {deleteId&&<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"><div className="bg-white rounded-2xl p-6 w-72 shadow-2xl"><h3 className="font-bold mb-2">Delete Account?</h3><p className="text-sm text-slate-500 mb-5">This action cannot be undone.</p><div className="flex gap-3"><button onClick={()=>handleDelete(deleteId)} className="flex-1 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg">Delete</button><button onClick={()=>setDeleteId(null)} className="flex-1 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg">Cancel</button></div></div></div>}
    </div>
  );
}
