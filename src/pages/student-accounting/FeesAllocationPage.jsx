/**
 * FeesAllocationPage.jsx — matches screenshot: fees/allocation
 * Select Ground: Class*, Section*, Fee Group* → Filter → shows student table
 */
import { useState } from "react";
import { Filter, Save, X } from "lucide-react";

const CLASSES=[...Array(12)].map((_,i)=>({value:String(i+1),label:`Class ${i+1}`}));
const SECTIONS=["A","B","C","D","E"];
const FEE_GROUPS=["Play To NUR","NUR To UKG","Class 1-5","Class 6-8","Class 9-10","Class 11-12"];

const MOCK_STUDENTS=[
  {id:1,roll:"H1341",name:"Jaysal Kumari", feeGroup:"Play To NUR",allocated:true},
  {id:2,roll:"F732", name:"Ragani Kumari", feeGroup:"",            allocated:false},
  {id:3,roll:"G1133",name:"Anmol Sharma",  feeGroup:"Play To NUR",allocated:true},
  {id:4,roll:"I1706",name:"Aryan Kumar",   feeGroup:"",            allocated:false},
  {id:5,roll:"F731", name:"Sherya Kumari", feeGroup:"Play To NUR",allocated:true},
  {id:6,roll:"J1877",name:"Krity Singh",   feeGroup:"",            allocated:false},
];

export default function FeesAllocationPage() {
  const [ground,setGround]=useState({class:"",section:"",feeGroup:""});
  const [filtered,setFiltered]=useState([]);
  const [allocations,setAllocations]=useState({});
  const [saving,setSaving]=useState(false);
  const [saved,setSaved]=useState(false);
  const [hasFiltered,setHasFiltered]=useState(false);

  const setG=(k,v)=>setGround(p=>({...p,[k]:v}));

  const handleFilter=()=>{
    if(!ground.class){alert("Please select a class");return;}
    const students=MOCK_STUDENTS.map(s=>({...s,feeGroup:ground.feeGroup||s.feeGroup}));
    setFiltered(students);
    setAllocations(students.reduce((a,s)=>({...a,[s.id]:s.feeGroup}),""));
    setHasFiltered(true);
  };

  const handleSave=async()=>{setSaving(true);await new Promise(r=>setTimeout(r,700));setSaving(false);setSaved(true);setTimeout(()=>setSaved(false),2000);};

  const SEL=({label,value,onChange,options,disabled})=>(
    <div><label className="block text-sm font-medium text-slate-700 mb-1">{label} <span className="text-red-500">*</span></label>
      <select value={value} onChange={e=>onChange(e.target.value)} disabled={disabled}
        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400 bg-white disabled:bg-slate-50 disabled:text-slate-400">
        <option value="">{disabled?"Select Class First":"Select"}</option>
        {options.map(o=><option key={typeof o==="object"?o.value:o} value={typeof o==="object"?o.value:o}>{typeof o==="object"?o.label:o}</option>)}
      </select></div>
  );

  return (
    <div>
      <div className="flex items-center gap-3 mb-5"><div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">🏠</div><h1 className="text-[15px] font-bold text-slate-800">Fees Allocation</h1></div>
      {saved&&<div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700 font-medium">✅ Fees allocation saved successfully!</div>}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 mb-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Select Ground</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <SEL label="Class" value={ground.class} onChange={v=>setG("class",v)} options={CLASSES}/>
          <SEL label="Section" value={ground.section} onChange={v=>setG("section",v)} options={SECTIONS} disabled={!ground.class}/>
          <SEL label="Fee Group" value={ground.feeGroup} onChange={v=>setG("feeGroup",v)} options={FEE_GROUPS}/>
        </div>
        <div className="flex justify-end">
          <button onClick={handleFilter} className="flex items-center gap-2 px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg border border-slate-200">
            <Filter size={13}/> Filter
          </button>
        </div>
      </div>

      {hasFiltered && (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-700">Students — Class {ground.class}{ground.section?`/${ground.section}`:""}</h3>
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg">
              {saving?<span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>:<Save size={13}/>} Save Allocation
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-slate-50">{["SL","ROLL NO","STUDENT NAME","FEE GROUP","STATUS"].map(h=><th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((s,i)=><tr key={s.id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3 text-slate-500">{i+1}</td>
                  <td className="px-4 py-3 font-mono text-indigo-600 font-semibold text-[11px]">{s.roll}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800">{s.name}</td>
                  <td className="px-4 py-3">
                    <select value={allocations[s.id]||""} onChange={e=>setAllocations(p=>({...p,[s.id]:e.target.value}))}
                      className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-400 bg-white min-w-[160px]">
                      <option value="">— None —</option>
                      {FEE_GROUPS.map(g=><option key={g}>{g}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    {allocations[s.id]?<span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700">Allocated</span>:<span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700">Pending</span>}
                  </td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
