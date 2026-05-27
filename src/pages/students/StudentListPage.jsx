/**
 * StudentListPage.jsx — Full-featured student management page
 */
import { useState } from "react";
import { usePageTitle } from "../../hooks";
import {
  PageHeader, Card, DataTable, Badge, Button,
  SearchInput, Select, Pagination, Modal,
  Input, Textarea, Avatar,
} from "../../components/ui";
import { Users, Download, Plus, Eye, Edit2, Trash2, Filter, Upload } from "lucide-react";

const MOCK = [
  { id:1, roll:"H1341", name:"Jaysal Kumari",  class:"3", section:"A", dob:"12 Mar 2015", gender:"Female", fees:"paid",    phone:"9876543210", blood:"O+" },
  { id:2, roll:"F732",  name:"Ragani Kumari",  class:"3", section:"B", dob:"05 Jul 2015", gender:"Female", fees:"pending", phone:"9876543211", blood:"A+" },
  { id:3, roll:"G1133", name:"Anmol Sharma",   class:"3", section:"C", dob:"22 Jan 2015", gender:"Male",   fees:"paid",    phone:"9876543212", blood:"B+" },
  { id:4, roll:"I1706", name:"Aryan Kumar",    class:"2", section:"B", dob:"15 Sep 2016", gender:"Male",   fees:"partial", phone:"9876543213", blood:"AB+" },
  { id:5, roll:"F731",  name:"Sherya Kumari",  class:"3", section:"C", dob:"30 Apr 2015", gender:"Female", fees:"paid",    phone:"9876543214", blood:"O-" },
  { id:6, roll:"J1877", name:"Krity Singh",    class:"3", section:"D", dob:"08 Nov 2015", gender:"Female", fees:"pending", phone:"9876543215", blood:"B-" },
  { id:7, roll:"J2167", name:"Anish Kumar",    class:"2", section:"D", dob:"17 Feb 2016", gender:"Male",   fees:"paid",    phone:"9876543216", blood:"A-" },
  { id:8, roll:"K3421", name:"Priya Sharma",   class:"4", section:"A", dob:"03 Jun 2014", gender:"Female", fees:"paid",    phone:"9876543217", blood:"O+" },
  { id:9, roll:"L2001", name:"Rahul Verma",    class:"5", section:"B", dob:"11 Aug 2013", gender:"Male",   fees:"partial", phone:"9876543218", blood:"AB-" },
  { id:10,roll:"M3309", name:"Sneha Gupta",    class:"6", section:"A", dob:"25 Dec 2012", gender:"Female", fees:"paid",    phone:"9876543219", blood:"B+" },
];

const FEE_BADGE = { paid:"success", pending:"danger", partial:"warning" };
const CLASS_OPT = [{ value:"", label:"All Classes" }, ...Array.from({length:12},(_,i)=>({ value:String(i+1), label:`Class ${i+1}` }))];
const SEC_OPT   = [{ value:"", label:"All Sections" }, ...["A","B","C","D"].map(s=>({ value:s, label:`Section ${s}` }))];
const FEE_OPT   = [{ value:"", label:"All Status" }, { value:"paid",label:"Paid" }, { value:"pending",label:"Pending" }, { value:"partial",label:"Partial" }];

export default function StudentListPage() {
  usePageTitle("Students");
  const [search,setSearch]=useState(""); const [cls,setCls]=useState(""); const [section,setSection]=useState(""); const [feeStatus,setFee]=useState(""); const [page,setPage]=useState(1); const [addOpen,setAddOpen]=useState(false); const [viewRow,setViewRow]=useState(null);
  const PAGE_SIZE=8;
  const filtered=MOCK.filter(s=>(!search||s.name.toLowerCase().includes(search.toLowerCase())||s.roll.toLowerCase().includes(search.toLowerCase()))&&(!cls||s.class===cls)&&(!section||s.section===section)&&(!feeStatus||s.fees===feeStatus));
  const paginated=filtered.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE);
  const COLUMNS=[
    {key:"roll",label:"Roll No",render:v=><span className="font-mono text-[11px] text-indigo-600 font-semibold">{v}</span>},
    {key:"name",label:"Student",render:(v,r)=><div className="flex items-center gap-2.5"><Avatar name={v} size="sm"/><div><p className="font-semibold text-slate-800 text-[12px]">{v}</p><p className="text-[10px] text-slate-400">{r.gender} · {r.blood}</p></div></div>},
    {key:"class",label:"Class",render:(v,r)=><span className="font-medium">{v}/{r.section}</span>},
    {key:"dob",label:"D.O.B."},
    {key:"phone",label:"Phone"},
    {key:"fees",label:"Fee Status",render:v=><Badge variant={FEE_BADGE[v]}>{v.charAt(0).toUpperCase()+v.slice(1)}</Badge>},
    {key:"id",label:"Actions",sortable:false,render:(_,r)=><div className="flex gap-1"><button onClick={()=>setViewRow(r)} className="p-1.5 rounded-md hover:bg-blue-50 text-blue-500"><Eye size={13}/></button><button className="p-1.5 rounded-md hover:bg-amber-50 text-amber-500"><Edit2 size={13}/></button><button className="p-1.5 rounded-md hover:bg-red-50 text-red-500"><Trash2 size={13}/></button></div>},
  ];
  return (
    <div>
      <PageHeader title="Student Details" subtitle="Manage all enrolled students" icon={<Users size={18}/>}>
        <Button variant="secondary" size="sm" icon={<Upload size={13}/>}>Import</Button>
        <Button variant="secondary" size="sm" icon={<Download size={13}/>}>Export</Button>
        <Button size="sm" icon={<Plus size={13}/>} onClick={()=>setAddOpen(true)}>Add Student</Button>
      </PageHeader>
      
      <Card noPadding>
        <div className="flex gap-2 flex-wrap p-4 border-b border-slate-100">
          <SearchInput value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or roll..." className="w-52"/>
          <Select value={cls} onChange={e=>{setCls(e.target.value);setPage(1);}} options={CLASS_OPT} className="w-36"/>
          <Select value={section} onChange={e=>{setSection(e.target.value);setPage(1);}} options={SEC_OPT} className="w-36"/>
          <Select value={feeStatus} onChange={e=>{setFee(e.target.value);setPage(1);}} options={FEE_OPT} className="w-36"/>
          <Button variant="secondary" size="sm" icon={<Filter size={12}/>} onClick={()=>{setSearch("");setCls("");setSection("");setFee("");setPage(1);}}>Clear</Button>
          <span className="ml-auto text-[11px] text-slate-500">{filtered.length} students</span>
        </div>
        <DataTable columns={COLUMNS} data={paginated}/>
        <Pagination page={page} total={filtered.length} pageSize={PAGE_SIZE} onPageChange={setPage}/>
      </Card>
      <Modal open={!!viewRow} onClose={()=>setViewRow(null)} title="Student Details" size="md">
        {viewRow&&<div className="space-y-4"><div className="flex items-center gap-4 pb-4 border-b border-slate-100"><Avatar name={viewRow.name} size="lg"/><div><h3 className="font-bold text-slate-800">{viewRow.name}</h3><p className="text-xs text-slate-400">{viewRow.roll} · Class {viewRow.class}/{viewRow.section}</p><Badge variant={FEE_BADGE[viewRow.fees]} className="mt-1">{viewRow.fees}</Badge></div></div><div className="grid grid-cols-2 gap-3">{[["Date of Birth",viewRow.dob],["Gender",viewRow.gender],["Blood Group",viewRow.blood],["Phone",viewRow.phone],["Class",`${viewRow.class}/${viewRow.section}`],["Roll No",viewRow.roll]].map(([l,v])=><div key={l} className="bg-slate-50 rounded-lg p-3"><p className="text-[10px] text-slate-400 font-medium">{l}</p><p className="text-[13px] font-semibold text-slate-700 mt-0.5">{v}</p></div>)}</div><div className="flex gap-2 pt-2"><Button size="sm" className="flex-1">Edit Student</Button><Button size="sm" variant="secondary" className="flex-1">ID Card</Button></div></div>}
      </Modal>
      <Modal open={addOpen} onClose={()=>setAddOpen(false)} title="Add New Student" size="lg">
        <div className="grid grid-cols-2 gap-4"><Input label="Full Name *" placeholder="Student full name"/><Input label="Roll Number *" placeholder="Admission roll no."/><Select label="Class *" options={CLASS_OPT}/><Select label="Section *" options={SEC_OPT}/><Input label="Date of Birth *" type="date"/><Select label="Gender *" options={[{value:"",label:"Select"},{value:"male",label:"Male"},{value:"female",label:"Female"}]}/><Input label="Phone" placeholder="Parent contact"/><Input label="Blood Group" placeholder="e.g. O+"/><div className="col-span-2"><Textarea label="Address" placeholder="Full residential address" rows={2}/></div></div>
        <div className="flex gap-2 mt-5"><Button className="flex-1">Save Student</Button><Button variant="secondary" className="flex-1" onClick={()=>setAddOpen(false)}>Cancel</Button></div>
      </Modal>
    </div>
  );
}
