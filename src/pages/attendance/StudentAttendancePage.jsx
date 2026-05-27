/**
 * StudentAttendancePage.jsx — Mark daily student attendance
 */
import { useState } from "react";
import { usePageTitle } from "../../hooks";
import { PageHeader, Card, Badge, Button, Select, DataTable } from "../../components/ui";
import { UserCheck, CheckCircle, XCircle, Clock, Save } from "lucide-react";

const STUDENTS = [
  {id:1,roll:"H1341",name:"Jaysal Kumari",class:"3",section:"A",status:"present"},
  {id:2,roll:"F732", name:"Ragani Kumari",class:"3",section:"A",status:"absent"},
  {id:3,roll:"G1133",name:"Anmol Sharma", class:"3",section:"A",status:"present"},
  {id:4,roll:"I1706",name:"Aryan Kumar",  class:"3",section:"A",status:"late"},
  {id:5,roll:"F731", name:"Sherya Kumari",class:"3",section:"A",status:"present"},
  {id:6,roll:"J1877",name:"Krity Singh",  class:"3",section:"A",status:"leave"},
  {id:7,roll:"J2167",name:"Anish Kumar",  class:"3",section:"A",status:"present"},
  {id:8,roll:"K3421",name:"Priya Sharma", class:"3",section:"A",status:"present"},
];
const STATUS_OPT=[{value:"present",label:"Present"},{value:"absent",label:"Absent"},{value:"late",label:"Late"},{value:"leave",label:"Leave"}];
const STATUS_BADGE={present:"success",absent:"danger",late:"warning",leave:"info"};
const CLASS_OPT=[{value:"",label:"Select Class"},...Array.from({length:12},(_,i)=>({value:String(i+1),label:`Class ${i+1}`}))];
const SEC_OPT=[{value:"",label:"Select Section"},...["A","B","C","D"].map(s=>({value:s,label:`Section ${s}`}))];

export default function StudentAttendancePage() {
  usePageTitle("Attendance");
  const [attendance,setAttendance]=useState(STUDENTS.reduce((a,s)=>({...a,[s.id]:s.status}),{}));
  const [cls,setCls]=useState("3"); const [section,setSection]=useState("A");
  const today=new Date().toLocaleDateString("en-GB",{weekday:"long",day:"2-digit",month:"long",year:"numeric"});
  const counts=Object.values(attendance).reduce((a,s)=>({...a,[s]:(a[s]||0)+1}),{});
  const update=(id,status)=>setAttendance(p=>({...p,[id]:status}));
  const markAll=(status)=>setAttendance(STUDENTS.reduce((a,s)=>({...a,[s.id]:status}),{}));

  const COLUMNS=[
    {key:"roll",label:"Roll No",render:v=><span className="font-mono text-[11px] text-indigo-600 font-semibold">{v}</span>},
    {key:"name",label:"Student",render:v=><span className="font-semibold text-slate-800">{v}</span>},
    {key:"id",label:"Status",sortable:false,render:(_,r)=>(
      <div className="flex gap-1">
        {STATUS_OPT.map(opt=>(
          <button key={opt.value} onClick={()=>update(r.id,opt.value)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all border ${attendance[r.id]===opt.value ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300"}`}>
            {opt.label}
          </button>
        ))}
      </div>
    )},
    {key:"id",label:"Mark",sortable:false,render:(_,r)=><Badge variant={STATUS_BADGE[attendance[r.id]]}>{attendance[r.id]}</Badge>},
  ];

  return (
    <div>
      <PageHeader title="Student Attendance" subtitle={today} icon={<UserCheck size={18}/>}>
        <Button variant="success" size="sm" icon={<Save size={13}/>}>Save Attendance</Button>
      </PageHeader>
      
      <Card noPadding>
        <div className="flex gap-2 flex-wrap p-4 border-b border-slate-100">
          <Select value={cls}     onChange={e=>setCls(e.target.value)}     options={CLASS_OPT} className="w-36"/>
          <Select value={section} onChange={e=>setSection(e.target.value)} options={SEC_OPT}   className="w-36"/>
          <div className="flex gap-2 ml-auto">
            <Button size="sm" variant="success"   onClick={()=>markAll("present")}>All Present</Button>
            <Button size="sm" variant="secondary" onClick={()=>markAll("absent")}>All Absent</Button>
          </div>
        </div>
        <DataTable columns={COLUMNS} data={STUDENTS}/>
      </Card>
    </div>
  );
}
