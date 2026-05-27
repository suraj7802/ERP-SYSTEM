/**
 * PreviousDuesPage.jsx — matches screenshot: fees/previous_dues
 * Tabs: Import CSV | Class-Section Wise
 * CSV Import with Download Sample, Choose File, Import button
 */
import { useState } from "react";
import { Upload, Download, Filter } from "lucide-react";

const CLASSES=[...Array(12)].map((_,i)=>({value:String(i+1),label:`Class ${i+1}`}));

export default function PreviousDuesPage() {
  const [tab,setTab]=useState("csv");
  const [file,setFile]=useState(null);
  const [importing,setImporting]=useState(false);
  const [importResult,setImportResult]=useState(null);
  const [ground,setGround]=useState({class:"",section:""});
  const [students,setStudents]=useState([]);
  const [hasFiltered,setHasFiltered]=useState(false);
  const [saving,setSaving]=useState(false);
  const [dues,setDues]=useState({});

  const handleImport=async()=>{
    if(!file){alert("Please choose a CSV file");return;}
    setImporting(true);await new Promise(r=>setTimeout(r,1200));
    setImportResult({success:true,message:`Imported successfully! ${Math.floor(Math.random()*50)+10} records processed.`});
    setImporting(false);setFile(null);
  };

  const handleFilter=()=>{
    if(!ground.class){alert("Please select a class");return;}
    const mock=[
      {id:1,roll:"H1341",name:"Jaysal Kumari",prevDue:0},{id:2,roll:"F732",name:"Ragani Kumari",prevDue:2300},
      {id:3,roll:"G1133",name:"Anmol Sharma",prevDue:0},{id:4,roll:"I1706",name:"Aryan Kumar",prevDue:4600},
      {id:5,roll:"F731",name:"Sherya Kumari",prevDue:1150},
    ];
    setStudents(mock);setDues(mock.reduce((a,s)=>({...a,[s.id]:s.prevDue}),{}));setHasFiltered(true);
  };

  const handleSave=async()=>{setSaving(true);await new Promise(r=>setTimeout(r,700));setSaving(false);alert("Previous dues saved successfully!");};

  return (
    <div>
      <div className="flex items-center gap-3 mb-5"><div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">🏠</div><h1 className="text-[15px] font-bold text-slate-800">Previous Dues</h1></div>
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
        {/* Tabs */}
        <div className="px-5 pt-4 border-b border-slate-100 flex gap-6">
          {[["csv","Import CSV"],["class","Class-Section Wise"]].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${tab===k?"border-indigo-600 text-indigo-600":"border-transparent text-slate-500 hover:text-slate-700"}`}>{l}</button>
          ))}
        </div>

        {tab==="csv" ? (
          <div className="p-6 max-w-lg">
            <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">📋 Previous Dues - CSV Import</h3>
            <p className="text-sm text-slate-500 mb-4">Upload a CSV with columns: <code className="bg-slate-100 px-1 rounded">register_no</code>, <code className="bg-slate-100 px-1 rounded">student_name</code>, <code className="bg-slate-100 px-1 rounded">amount</code>. First row = header. <em>student_name</em> is optional/reference only — matching is done by <strong>register_no</strong>.</p>
            {importResult&&<div className={`mb-4 p-3 rounded-lg border text-sm font-medium ${importResult.success?"bg-emerald-50 border-emerald-200 text-emerald-700":"bg-red-50 border-red-200 text-red-700"}`}>{importResult.success?"✅":"❌"} {importResult.message}</div>}
            <div className="space-y-4">
              <div>
                <button onClick={()=>{const a=document.createElement("a");a.href="data:text/csv;charset=utf-8,register_no,student_name,amount\nH1341,Jaysal Kumari,1150\nF732,Ragani Kumari,2300";a.download="sample_previous_dues.csv";a.click();}}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg border border-slate-200">
                  <Download size={13}/> Download Sample CSV
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">CSV File *</label>
                <div className="flex items-center gap-3">
                  <label className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded-lg cursor-pointer border border-slate-200">
                    Choose file<input type="file" accept=".csv" onChange={e=>setFile(e.target.files[0])} className="hidden"/>
                  </label>
                  <span className="text-sm text-slate-400">{file?file.name:"No file chosen"}</span>
                </div>
              </div>
              <button onClick={handleImport} disabled={importing||!file}
                className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg disabled:opacity-60">
                {importing?<span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>:<Upload size={13}/>} Import
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5">
            <div className="bg-slate-50 rounded-xl border border-slate-100 p-5 mb-5">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">Select Ground</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Class</label>
                  <select value={ground.class} onChange={e=>setGround(p=>({...p,class:e.target.value,section:""}))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-indigo-400">
                    <option value="">Select</option>{CLASSES.map(c=><option key={c.value} value={c.value}>{c.label}</option>)}
                  </select></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Section</label>
                  <select value={ground.section} onChange={e=>setGround(p=>({...p,section:e.target.value}))} disabled={!ground.class} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-indigo-400 disabled:bg-slate-50">
                    <option value="">{ground.class?"Select":"Select Class First"}</option>
                    {["A","B","C","D"].map(s=><option key={s}>{s}</option>)}
                  </select></div>
              </div>
              <div className="flex justify-end"><button onClick={handleFilter} className="flex items-center gap-2 px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg border border-slate-200"><Filter size={13}/> Filter</button></div>
            </div>
            {hasFiltered&&(
              <div className="border border-slate-100 rounded-xl overflow-hidden">
                <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">Class {ground.class}{ground.section?`/${ground.section}`:""} — Students</span>
                  <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg">
                    {saving?<span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>:null} Save
                  </button>
                </div>
                <table className="w-full text-sm">
                  <thead><tr className="bg-slate-50">{["SL","ROLL NO","NAME","PREVIOUS DUE (₹)"].map(h=><th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">{h}</th>)}</tr></thead>
                  <tbody className="divide-y divide-slate-50">
                    {students.map((s,i)=><tr key={s.id} className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 text-slate-500">{i+1}</td>
                      <td className="px-4 py-3 font-mono text-indigo-600 font-semibold text-[11px]">{s.roll}</td>
                      <td className="px-4 py-3 font-semibold text-slate-800">{s.name}</td>
                      <td className="px-4 py-3"><input type="number" value={dues[s.id]||0} onChange={e=>setDues(p=>({...p,[s.id]:+e.target.value}))} className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-400 w-32"/></td>
                    </tr>)}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
