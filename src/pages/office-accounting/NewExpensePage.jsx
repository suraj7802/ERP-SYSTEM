/**
 * NewExpensePage.jsx — matches screenshot: accounting/voucher_expense
 * Same structure as Deposit but for expenses
 */
import { useState } from "react";
import { Plus, Edit2, Trash2, X, Copy, FileText, FileDown, Printer, Columns, ChevronLeft, ChevronRight, Search } from "lucide-react";

const ACCOUNTS=["Kps","Main Account"];
const VOUCHER_HEADS=["KPS","OIL","PAINTS MATERIALS","MESSION","LABOUR","OFFICE EXP"];
const PAY_MODES=["Cash","UPI","Bank Transfer","Cheque","DD"];

function Modal({title,onClose,children}){return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"><div className="bg-white rounded-2xl shadow-2xl w-[480px] max-h-[90vh] overflow-y-auto"><div className="flex items-center justify-between px-6 py-4 border-b border-slate-100"><h3 className="font-bold text-slate-800">{title}</h3><button onClick={onClose}><X size={16} className="text-slate-400"/></button></div><div className="p-6">{children}</div></div></div>;}

function ExpenseForm({init,onSave,onCancel}){
  const [form,setForm]=useState(init||{account:"",voucherHead:"",refNo:"",description:"",payVia:"Cash",amount:"",date:new Date().toISOString().slice(0,10)});
  const sf=(k,v)=>setForm(p=>({...p,[k]:v}));
  const SEL=({label,k,opts})=><div><label className="text-[11px] font-semibold text-slate-500 mb-1 block">{label}</label><select value={form[k]} onChange={e=>sf(k,e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-indigo-400"><option value="">Select</option>{opts.map(o=><option key={o}>{o}</option>)}</select></div>;
  const INP=({label,k,type="text",placeholder=""})=><div><label className="text-[11px] font-semibold text-slate-500 mb-1 block">{label}</label><input type={type} value={form[k]} onChange={e=>sf(k,e.target.value)} placeholder={placeholder} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"/></div>;
  return <div className="space-y-4">
    <div className="grid grid-cols-2 gap-3"><SEL label="Account Name *" k="account" opts={ACCOUNTS}/><SEL label="Voucher Head *" k="voucherHead" opts={VOUCHER_HEADS}/></div>
    <div className="grid grid-cols-2 gap-3"><INP label="Ref No" k="refNo" placeholder="Reference"/><INP label="Description" k="description" placeholder="Note"/></div>
    <div className="grid grid-cols-2 gap-3"><SEL label="Pay Via *" k="payVia" opts={PAY_MODES}/><INP label="Amount (₹) *" k="amount" type="number" placeholder="0.00"/></div>
    <INP label="Date *" k="date" type="date"/>
    <div className="flex gap-3 pt-2">
      <button onClick={()=>onSave(form)} className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg w-full justify-center"><Plus size={13}/> Add Expense</button>
      <button onClick={onCancel} className="px-5 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg w-full text-center">Cancel</button>
    </div>
  </div>;
}

export default function NewExpensePage() {
  const [tab,setTab]=useState("list");
  const [expenses,setExpenses]=useState([]);
  const [editItem,setEditItem]=useState(null);
  const [deleteId,setDeleteId]=useState(null);
  const [search,setSearch]=useState(""); const [page,setPage]=useState(1);
  const PER=25;
  const filtered=expenses.filter(e=>!search||e.account.toLowerCase().includes(search.toLowerCase()));
  const total=Math.max(1,Math.ceil(filtered.length/PER));
  const rows=filtered.slice((page-1)*PER,page*PER);

  const fmtDate=d=>{const dt=new Date(d);return `${String(dt.getDate()).padStart(2,"0")}.${dt.toLocaleString("default",{month:"short"})}.${dt.getFullYear()}`;};
  const handleAdd=form=>{if(!form.account||!form.amount){alert("Required fields missing");return;}setExpenses(p=>[...p,{...form,id:Date.now(),date:fmtDate(form.date)}]);setTab("list");};
  const handleEdit=form=>{setExpenses(p=>p.map(x=>x.id===editItem.id?{...form,id:editItem.id,date:fmtDate(form.date)}:x));setEditItem(null);};
  const handleDelete=id=>{setExpenses(p=>p.filter(e=>e.id!==id));setDeleteId(null);};

  return (
    <div>
      <div className="flex items-center gap-3 mb-5"><div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">🏠</div><h1 className="text-[15px] font-bold text-slate-800">Office Accounting</h1></div>
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
        <div className="px-5 pt-4 border-b border-slate-100 flex gap-6">
          {[["list","☰ Expense List"],["add","✏️ Add Expense"]].map(([k,l])=>(
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
              <table className="w-full text-sm min-w-[700px]">
                <thead><tr className="bg-slate-50">{["ACCOUNT NAME","VOUCHER HEAD","REF NO","DESCRIPTION","PAY VIA","AMOUNT","DATE","ACTION"].map(h=><th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 whitespace-nowrap">{h}</th>)}</tr></thead>
                <tbody className="divide-y divide-slate-50">
                  {rows.length===0?<tr><td colSpan={8} className="px-4 py-10 text-center text-xs text-slate-400">No data available in table</td></tr>:
                  rows.map(e=><tr key={e.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 font-semibold text-slate-800">{e.account}</td>
                    <td className="px-4 py-3 text-slate-600">{e.voucherHead}</td>
                    <td className="px-4 py-3 text-slate-600">{e.refNo||"—"}</td>
                    <td className="px-4 py-3 text-slate-600">{e.description||"—"}</td>
                    <td className="px-4 py-3 text-slate-600">{e.payVia}</td>
                    <td className="px-4 py-3 font-semibold text-red-600">₹{Number(e.amount).toLocaleString()}</td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{e.date}</td>
                    <td className="px-4 py-3"><div className="flex gap-1">
                      <button onClick={()=>setEditItem({...e,date:new Date().toISOString().slice(0,10)})} className="p-1.5 rounded bg-indigo-50 text-indigo-600"><Edit2 size={13}/></button>
                      <button onClick={()=>setDeleteId(e.id)} className="p-1.5 rounded bg-red-50 text-red-500"><Trash2 size={13}/></button>
                    </div></td>
                  </tr>)}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
              <span>Showing {filtered.length===0?0:(page-1)*PER+1} to {Math.min(page*PER,filtered.length)} of {filtered.length} entries</span>
              <div className="flex items-center gap-2">
                <select className="border border-slate-200 rounded px-2 py-1 text-xs"><option>25</option></select><span>rows per page</span>
                <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} className="p-1 rounded hover:bg-slate-100 disabled:opacity-40"><ChevronLeft size={14}/></button>
                <button onClick={()=>setPage(p=>Math.min(total,p+1))} disabled={page===total} className="p-1 rounded hover:bg-slate-100 disabled:opacity-40"><ChevronRight size={14}/></button>
              </div>
            </div>
          </div>
        ):(
          <div className="p-6 max-w-lg"><h3 className="text-sm font-semibold text-slate-700 mb-4">Add New Expense</h3><ExpenseForm onSave={handleAdd} onCancel={()=>setTab("list")}/></div>
        )}
      </div>
      {editItem&&<Modal title="Edit Expense" onClose={()=>setEditItem(null)}><ExpenseForm init={editItem} onSave={handleEdit} onCancel={()=>setEditItem(null)}/></Modal>}
      {deleteId&&<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"><div className="bg-white rounded-2xl p-6 w-72 shadow-2xl"><h3 className="font-bold mb-2">Delete Expense?</h3><p className="text-sm text-slate-500 mb-5">Cannot be undone.</p><div className="flex gap-3"><button onClick={()=>handleDelete(deleteId)} className="flex-1 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg">Delete</button><button onClick={()=>setDeleteId(null)} className="flex-1 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg">Cancel</button></div></div></div>}
    </div>
  );
}
