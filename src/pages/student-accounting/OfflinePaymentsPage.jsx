/**
 * OfflinePaymentsPage.jsx — Offline Payments (Student Accounting sidebar item)
 * Simple filter + list page for offline payment records
 */
import { useState } from "react";

const CLASSES=[...Array(12)].map((_,i)=>({value:String(i+1),label:`Class ${i+1}`}));

export default function OfflinePaymentsPage() {
  const [ground,setGround]=useState({class:"",section:""});
  const [results,setResults]=useState(null);

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-sm">🏠</div>
        <h1 className="text-[15px] font-bold text-slate-800">Offline Payments</h1>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 mb-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Select Ground</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Class</label>
            <select value={ground.class} onChange={e=>setGround(p=>({...p,class:e.target.value,section:""}))}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-indigo-400">
              <option value="">Select</option>
              {CLASSES.map(c=><option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Section</label>
            <select value={ground.section} onChange={e=>setGround(p=>({...p,section:e.target.value}))} disabled={!ground.class}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-indigo-400 disabled:bg-slate-50">
              <option value="">{ground.class?"Select":"Select Class First"}</option>
              {ground.class&&["A","B","C","D"].map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <button onClick={()=>setResults([])} className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg">
            🔍 Filter
          </button>
        </div>
      </div>

      {results !== null && (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {["SL","Student Name","Roll","Amount","Payment Mode","Date","Status","Action"].map(h=>(
                    <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr><td colSpan={8} className="px-4 py-10 text-center text-xs text-slate-400">No data available in table</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
