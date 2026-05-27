import { useState } from "react";
import { usePageTitle } from "../../hooks";
import { PageHeader, Card, Badge, Button, DataTable, SearchInput, Select, Pagination, Modal, Input } from "../../components/ui";
import { DollarSign, Plus, Receipt, AlertCircle, Download } from "lucide-react";

const FEES=[
  {id:1,name:"Aryan Kumar",  roll:"I1706",class:"2/B",total:12500,paid:12500,due:0,     status:"paid",    date:"01 May 2026"},
  {id:2,name:"Priya Sharma", roll:"K3421",class:"4/A",total:12500,paid:6000, due:6500,  status:"partial", date:"15 Apr 2026"},
  {id:3,name:"Ragani Kumari",roll:"F732", class:"3/B",total:12500,paid:0,    due:12500, status:"pending", date:"—"},
  {id:4,name:"Jaysal Kumari",roll:"H1341",class:"3/A",total:12500,paid:12500,due:0,     status:"paid",    date:"03 May 2026"},
  {id:5,name:"Anmol Sharma", roll:"G1133",class:"3/C",total:12500,paid:12500,due:0,     status:"paid",    date:"02 May 2026"},
  {id:6,name:"Sneha Gupta",  roll:"M3309",class:"6/A",total:15000,paid:7500, due:7500,  status:"partial", date:"10 Apr 2026"},
  {id:7,name:"Rahul Verma",  roll:"L2001",class:"5/B",total:15000,paid:0,    due:15000, status:"pending", date:"—"},
];
const FEE_BADGE={paid:"success",pending:"danger",partial:"warning"};
const FEE_OPT=[{value:"",label:"All Status"},{value:"paid",label:"Paid"},{value:"pending",label:"Pending"},{value:"partial",label:"Partial"}];

export default function FeeCollectionPage() {
  usePageTitle("Fee Collection");
  const [search,setSearch]=useState(""); const [status,setStatus]=useState(""); const [page,setPage]=useState(1); const [open,setOpen]=useState(false);
  const filtered=FEES.filter(f=>(!search||f.name.toLowerCase().includes(search.toLowerCase())||f.roll.includes(search))&&(!status||f.status===status));
  const COLUMNS=[
    {key:"name",label:"Student",render:v=><span className="font-semibold text-slate-800">{v}</span>},
    {key:"roll",label:"Roll No",render:v=><span className="font-mono text-[11px] text-indigo-600 font-semibold">{v}</span>},
    {key:"class",label:"Class"},
    {key:"total",label:"Total",render:v=>`₹${v.toLocaleString()}`},
    {key:"paid",label:"Paid",render:v=><span className="text-emerald-600 font-semibold">₹{v.toLocaleString()}</span>},
    {key:"due",label:"Due",render:v=><span className={v>0?"text-red-500 font-semibold":"text-slate-400"}>₹{v.toLocaleString()}</span>},
    {key:"status",label:"Status",render:v=><Badge variant={FEE_BADGE[v]}>{v.charAt(0).toUpperCase()+v.slice(1)}</Badge>},
    {key:"date",label:"Last Paid"},
    {key:"id",label:"Actions",sortable:false,render:(_,r)=><div className="flex gap-1"><Button size="xs" icon={<Receipt size={11}/>}>Receipt</Button>{r.due>0&&<Button size="xs" variant="warning">Collect</Button>}</div>},
  ];
  return (
    <div>
      <PageHeader title="Student Accounting" subtitle="Fee collection and receipt management" icon={<DollarSign size={18}/>}>
        <Button variant="secondary" size="sm" icon={<Download size={13}/>}>Export</Button>
        <Button size="sm" icon={<Plus size={13}/>} onClick={()=>setOpen(true)}>Collect Fee</Button>
      </PageHeader>
      
      <Card noPadding>
        <div className="flex gap-2 flex-wrap p-4 border-b border-slate-100">
          <SearchInput value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search student or roll..." className="w-52"/>
          <Select value={status} onChange={e=>{setStatus(e.target.value);setPage(1);}} options={FEE_OPT} className="w-36"/>
          <span className="ml-auto text-[11px] text-slate-500">{filtered.length} records</span>
        </div>
        <DataTable columns={COLUMNS} data={filtered}/>
        <Pagination page={page} total={filtered.length} pageSize={10} onPageChange={setPage}/>
      </Card>
      <Modal open={open} onClose={()=>setOpen(false)} title="Collect Fee" size="md">
        <div className="space-y-4">
          <Input label="Student Roll No / Name" placeholder="Search student..."/>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Amount" type="number" placeholder="₹0.00"/>
            <Select label="Payment Mode" options={[{value:"cash",label:"Cash"},{value:"upi",label:"UPI"},{value:"online",label:"Online Transfer"}]}/>
          </div>
          <Input label="Transaction ID" placeholder="Optional for cash"/>
          <Input label="Remarks" placeholder="Optional note"/>
          <div className="flex gap-2 pt-2">
            <Button className="flex-1" icon={<Receipt size={14}/>}>Collect & Generate Receipt</Button>
            <Button variant="secondary" className="flex-1" onClick={()=>setOpen(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
