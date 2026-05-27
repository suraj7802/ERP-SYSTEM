/**
 * VoucherHeadPage.jsx — matches screenshot: accounting/voucher_head
 * Split layout: Left = Add Voucher Head form | Right = Voucher Head List table
 * Table: SL, BRANCH, NAME, TYPE, ACTION
 */
import { useState } from "react";
import { Edit2, Trash2, Plus, X, Save } from "lucide-react";

const INIT=[
  {id:1,branch:"GenEduServe",name:"KPS",        type:"Expense"},
  {id:2,branch:"GenEduServe",name:"OIL",        type:"Expense"},
  {id:3,branch:"GenEduServe",name:"INVETORY",   type:"Income"},
  {id:4,branch:"GenEduServe",name:"FEE COLLECTION",type:"Income"},
  {id:5,branch:"GenEduServe",name:"PAINTS MATERIALS",type:"Expense"},
  {id:6,branch:"GenEduServe",name:"MESSION",    type:"Expense"},
  {id:7,branch:"GenEduServe",name:"LABOUR",     type:"Expense"},
  {id:8,branch:"GenEduServe",name:"OFFICE EXP", type:"Expense"},
];
const TYPE_BADGE={Income:"bg-emerald-100 text-emerald-700",Expense:"bg-red-100 text-red-700"};

function Modal({title,onClose,children}){return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"><div className="bg-white rounded-2xl shadow-2xl w-[380px]"><div className="flex items-center justify-between px-6 py-4 border-b border-slate-100"><h3 className="font-bold text-slate-800">{title}</h3><button onClick={onClose}><X size={16} className="text-slate-400"/></button></div><div className="p-6">{children}</div></div></div>;}

export default function VoucherHeadPage() {
  const [heads,setHeads]=useState(INIT);
  const [form,setForm]=useState({name:"",type:""});
  const [editItem,setEditItem]=useState(null);
  const [deleteId,setDeleteId]=useState(null);
  const [saving,setSaving]=useState(false);
  const sf=(k,v)=>setForm(p=>({...p,[k]:v}));

  const handleAdd=async(e)=>{e.preventDefault();if(!form.name||!form.type){alert("Name and Type are required");return;}setSaving(true);await new Promise(r=>setTimeout(r,500));
    setHeads(p=>[...p,{id:Date.now(),branch:"GenEduServe",...form}]);setForm({name:"",type:""});setSaving(false);};

  const handleEdit=async()=>{setSaving(true);await new Promise(r=>setTimeout(r,400));setHeads(p=>p.map(h=>h.id===editItem.id?editItem:h));setSaving(false);setEditItem(null);};
  const handleDelete=id=>{setHeads(p=>p.filter(h=>h.id!==id));setDeleteId(null);};

  return (
    <div>
      <div className="flex items-center gap-3 mb-5"><div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">🏠</div><h1 className="text-[15px] font-bold text-slate-800">Office Accounting</h1></div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Add Form */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">✏️ Add Voucher Head</h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Name <span className="text-red-500">*</span></label>
              <input value={form.name} onChange={e=>sf("name",e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400" placeholder="e.g. ELECTRICITY BILL"/></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Type <span className="text-red-500">*</span></label>
              <select value={form.type} onChange={e=>sf("type",e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-indigo-400">
                <option value="">Select</option><option>Income</option><option>Expense</option>
              </select></div>
            <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg w-full justify-center disabled:opacity-70">
              {saving?<span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>:<><Plus size={13}/> Save</>}
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-100 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100"><h3 className="text-sm font-semibold text-slate-700">☰ Voucher Head List</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-slate-50">{["SL","BRANCH","NAME","TYPE","ACTION"].map(h=><th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-slate-50">
                {heads.length===0?<tr><td colSpan={5} className="px-4 py-10 text-center text-xs text-slate-400">No data available</td></tr>:
                heads.map((h,i)=><tr key={h.id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3 text-slate-500">{i+1}</td>
                  <td className="px-4 py-3 text-slate-600">{h.branch}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800">{h.name}</td>
                  <td className="px-4 py-3"><span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${TYPE_BADGE[h.type]}`}>{h.type}</span></td>
                  <td className="px-4 py-3"><div className="flex gap-1">
                    <button onClick={()=>setEditItem({...h})} className="p-1.5 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-600"><Edit2 size={13}/></button>
                    <button onClick={()=>setDeleteId(h.id)} className="p-1.5 rounded bg-red-50 hover:bg-red-100 text-red-500"><Trash2 size={13}/></button>
                  </div></td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {editItem&&<Modal title="Edit Voucher Head" onClose={()=>setEditItem(null)}>
        <div className="space-y-4">
          <div><label className="text-[11px] font-semibold text-slate-500 mb-1 block">Name *</label><input value={editItem.name} onChange={e=>setEditItem(p=>({...p,name:e.target.value}))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"/></div>
          <div><label className="text-[11px] font-semibold text-slate-500 mb-1 block">Type *</label>
            <select value={editItem.type} onChange={e=>setEditItem(p=>({...p,type:e.target.value}))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-indigo-400">
              <option>Income</option><option>Expense</option>
            </select></div>
        </div>
        <div className="flex gap-3 mt-5"><button onClick={handleEdit} className="flex-1 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg">Save</button><button onClick={()=>setEditItem(null)} className="flex-1 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg">Cancel</button></div>
      </Modal>}
      {deleteId&&<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"><div className="bg-white rounded-2xl p-6 w-72 shadow-2xl"><h3 className="font-bold mb-2">Delete Voucher Head?</h3><p className="text-sm text-slate-500 mb-5">This cannot be undone.</p><div className="flex gap-3"><button onClick={()=>handleDelete(deleteId)} className="flex-1 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg">Delete</button><button onClick={()=>setDeleteId(null)} className="flex-1 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg">Cancel</button></div></div></div>}
    </div>
  );
}
