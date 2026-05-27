/**
 * CollectFeesPage.jsx — Collect Fees (Student Accounting)
 * Select Ground: Class*, Section*, Fee Group* → Filter → student table with collect action
 */
import { useState } from "react";

const CLASSES=[...Array(12)].map((_,i)=>({value:String(i+1),label:`Class ${i+1}`}));
const FEE_GROUPS=["Play To NUR","NUR To UKG","Class 1-5","Class 6-8","Class 9-10","Class 11-12"];

const MOCK=[
  {id:1,roll:"H1341",name:"Jaysal Kumari",  due:"₹1150.00",paid:"₹0.00",  balance:"₹1150.00",status:"Due"},
  {id:2,roll:"F732", name:"Ragani Kumari",  due:"₹1150.00",paid:"₹1150.00",balance:"₹0.00",  status:"Paid"},
  {id:3,roll:"G1133",name:"Anmol Sharma",   due:"₹1150.00",paid:"₹500.00", balance:"₹650.00", status:"Partial"},
  {id:4,roll:"I1706",name:"Aryan Kumar",    due:"₹1150.00",paid:"₹0.00",   balance:"₹1150.00",status:"Due"},
];

const Sel=({label,value,onChange,options,disabled,placeholder})=>(
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">{label} <span className="text-red-500">*</span></label>
    <select value={value} onChange={e=>onChange(e.target.value)} disabled={disabled}
      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-indigo-400 disabled:bg-slate-50">
      <option value="">{placeholder||"Select"}</option>
      {options.map(o=><option key={typeof o==="object"?o.value:o} value={typeof o==="object"?o.value:o}>{typeof o==="object"?o.label:o}</option>)}
    </select>
  </div>
);

export default function CollectFeesPage() {
  const [ground,setGround]=useState({class:"",section:"",feeGroup:""});
  const [results,setResults]=useState(null);

  const handleFilter=()=>{
    if(!ground.class){alert("Please select a class");return;}
    setResults(MOCK);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-sm">🏠</div>
        <h1 className="text-[15px] font-bold text-slate-800">Collect Fees</h1>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 mb-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Select Ground</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <Sel label="Class" value={ground.class} onChange={v=>setGround(p=>({...p,class:v,section:""}))} options={CLASSES}/>
          <Sel label="Section" value={ground.section} onChange={v=>setGround(p=>({...p,section:v}))} disabled={!ground.class}
            placeholder={ground.class?"Select":"Select Class First"}
            options={ground.class?["A","B","C","D"]:[]}/> 
          <Sel label="Fee Group" value={ground.feeGroup} onChange={v=>setGround(p=>({...p,feeGroup:v}))} options={FEE_GROUPS}/>
        </div>
        <div className="flex justify-end">
          <button onClick={handleFilter} className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg">
            🔍 Filter
          </button>
        </div>
      </div>

      {results && (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-700">Student List</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {["Roll","Student Name","Due Amount","Paid","Balance","Status","Action"].map(h=>(
                    <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {results.map(row=>(
                  <tr key={row.id} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3 text-[12.5px] text-slate-700">{row.roll}</td>
                    <td className="px-4 py-3 text-[12.5px] font-medium text-slate-800">{row.name}</td>
                    <td className="px-4 py-3 text-[12.5px] text-slate-700">{row.due}</td>
                    <td className="px-4 py-3 text-[12.5px] text-slate-700">{row.paid}</td>
                    <td className="px-4 py-3 text-[12.5px] text-slate-700">{row.balance}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border
                        ${row.status==="Paid"?"text-emerald-700 border-emerald-400":row.status==="Partial"?"text-amber-700 border-amber-400":"text-red-700 border-red-400"}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={()=>alert(`Collect fees for ${row.name}`)}
                        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg">
                        Collect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
