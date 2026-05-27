/**
 * FeesPayInvoicePage.jsx — matches screenshot 8 (fees/invoice_list)
 * Select Ground: Class (optional), Section → Filter → invoice list table
 */
import { useState } from "react";

const CLASSES=[...Array(12)].map((_,i)=>({value:String(i+1),label:`Class ${i+1}`}));

const Sel=({label,value,onChange,options,disabled,placeholder})=>(
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <select value={value} onChange={e=>onChange(e.target.value)} disabled={disabled}
      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-indigo-400 disabled:bg-slate-50">
      <option value="">{placeholder||"Select"}</option>
      {options.map(o=><option key={typeof o==="object"?o.value:o} value={typeof o==="object"?o.value:o}>{typeof o==="object"?o.label:o}</option>)}
    </select>
  </div>
);

export default function FeesPayInvoicePage() {
  const [ground,setGround]=useState({class:"",section:""});
  const [results,setResults]=useState(null);

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-sm">🏠</div>
        <h1 className="text-[15px] font-bold text-slate-800">Fees Pay / Invoice</h1>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 mb-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Select Ground</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <Sel label="Class" value={ground.class} onChange={v=>setGround(p=>({...p,class:v,section:""}))} options={CLASSES}/>
          <Sel label="Section" value={ground.section} onChange={v=>setGround(p=>({...p,section:v}))} disabled={!ground.class}
            placeholder={ground.class?"Select":"Select Class First"}
            options={ground.class?["A","B","C","D"]:[]}/>
        </div>
        <div className="flex justify-end">
          <button onClick={()=>setResults([])} className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg">
            🔍 Filter
          </button>
        </div>
      </div>

      {results !== null && (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-8 text-center text-sm text-slate-400">
          No invoices found for the selected criteria.
        </div>
      )}
    </div>
  );
}
