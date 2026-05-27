import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/authSlice";
import { usePageTitle } from "../../hooks";
import { WelcomeBanner, StatCard, Card, ProgressBar } from "../../components/ui";
import { AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Users, GraduationCap, UserCheck, BookOpen, AlertCircle, Clock } from "lucide-react";

const FEE_DATA=[{month:"Jan",total:2,collected:0.5,remaining:1.5},{month:"Feb",total:2.5,collected:0.8,remaining:1.7},{month:"Mar",total:5,collected:2,remaining:3},{month:"Apr",total:18.5,collected:10,remaining:8.5},{month:"May",total:6,collected:3.2,remaining:2.8},{month:"Jun",total:3,collected:2.8,remaining:0.2},{month:"Jul",total:2.8,collected:2.6,remaining:0.2},{month:"Aug",total:2.7,collected:2.5,remaining:0.2},{month:"Sep",total:2.8,collected:2.6,remaining:0.2},{month:"Oct",total:2.9,collected:2.7,remaining:0.2},{month:"Nov",total:3,collected:2.8,remaining:0.2},{month:"Dec",total:3.2,collected:3,remaining:0.2}];
const DONUT=[{name:"Income",value:75,color:"#22d3ee"},{name:"Expense",value:25,color:"#f43f5e"}];
const ATTEND=[{day:"Mon",present:92,absent:8},{day:"Tue",present:88,absent:12},{day:"Wed",present:95,absent:5},{day:"Thu",present:90,absent:10},{day:"Fri",present:85,absent:15},{day:"Sat",present:78,absent:22}];
const ACTIVITIES=[
  {icon:"📋",bg:"bg-indigo-50",title:"New student admitted",detail:"Aryan Kumar — Class 5A",time:"2m ago"},
  {icon:"💰",bg:"bg-emerald-50",title:"Fee payment received",detail:"₹12,500 from Priya Sharma",time:"15m ago"},
  {icon:"📝",bg:"bg-amber-50",title:"Exam result published",detail:"Class 10 — Math Final",time:"1h ago"},
  {icon:"⚠️",bg:"bg-red-50",title:"Teacher absent",detail:"Mr. Ramesh Kumar — Physics",time:"2h ago"},
  {icon:"📚",bg:"bg-blue-50",title:"Library book issued",detail:"Physics Vol.2 to Roll 347",time:"3h ago"},
];

function Tip({active,payload,label}){if(!active||!payload?.length)return null;return <div className="bg-white border border-slate-200 rounded-lg shadow-lg px-3 py-2 text-xs"><p className="font-semibold text-slate-700 mb-1">{label}</p>{payload.map((p,i)=><p key={i} style={{color:p.color}}>{p.name}: {p.value}M</p>)}</div>;}

export default function DashboardPage() {
  usePageTitle("Dashboard");
  const user=useSelector(selectUser);
  return (
    <div>
      <WelcomeBanner name={user?.name??"Demo"}/>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Employees" value={1}     gradient="bg-gradient-to-br from-indigo-500 to-indigo-600" icon={Users}        change={-100} sparkData={[2,3,1,5,4,1,0]}/>
        <StatCard label="Students"  value={1293}  gradient="bg-gradient-to-br from-cyan-500 to-teal-500"     icon={GraduationCap} change={-100} sparkData={[8,10,9,12,13,12,12]}/>
        <StatCard label="Parents"   value={1942}  gradient="bg-gradient-to-br from-blue-500 to-blue-600"     icon={UserCheck}     change={-99}  sparkData={[15,18,16,19,19,19,19]}/>
        <StatCard label="Teachers"  value={0}     gradient="bg-gradient-to-br from-pink-500 to-rose-500"     icon={BookOpen}      change={0}    sparkData={[0,0,0,0,0,0,0]}/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
        <Card title="Income Vs Expense Of May" className="lg:col-span-2">
          <div className="p-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart><Pie data={DONUT} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={3} dataKey="value">{DONUT.map((e,i)=><Cell key={i} fill={e.color}/>)}</Pie><Tooltip/></PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-2">{DONUT.map(d=><div key={d.name} className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{background:d.color}}/><span className="text-xs text-slate-500">{d.name}</span></div>)}</div>
          </div>
        </Card>
        <Card title="Annual Fee Summary" className="lg:col-span-3">
          <div className="p-4">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={FEE_DATA} margin={{top:5,right:10,left:0,bottom:0}}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/><stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/></linearGradient>
                  <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/><stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/><XAxis dataKey="month" tick={{fontSize:10,fill:"#94a3b8"}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:10,fill:"#94a3b8"}} axisLine={false} tickLine={false} tickFormatter={v=>`${v}M`}/>
                <Tooltip content={<Tip/>}/><Legend iconType="circle" iconSize={8} wrapperStyle={{fontSize:11}}/>
                <Area type="monotone" dataKey="total"     name="Total"     stroke="#6366f1" fill="url(#g1)" strokeWidth={2} dot={{r:3,fill:"#6366f1"}}/>
                <Area type="monotone" dataKey="collected" name="Collected" stroke="#22d3ee" fill="url(#g2)" strokeWidth={2} dot={{r:3,fill:"#22d3ee"}}/>
                <Area type="monotone" dataKey="remaining" name="Remaining" stroke="#f43f5e" fill="url(#g3)" strokeWidth={2} dot={{r:3,fill:"#f43f5e"}}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card title="Weekend Attendance">
          <div className="p-4">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={ATTEND} barSize={18}><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/><XAxis dataKey="day" tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false}/><Tooltip/><Legend iconType="circle" iconSize={8} wrapperStyle={{fontSize:11}}/><Bar dataKey="present" name="Present" fill="#22d3ee" radius={[4,4,0,0]}/><Bar dataKey="absent" name="Absent" fill="#f43f5e" radius={[4,4,0,0]}/></BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <div className="space-y-3">
          <Card><div className="p-4"><div className="flex justify-between items-center mb-2"><span className="text-sm font-semibold text-slate-700">Fee Collection</span><span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">This Month</span></div><p className="text-2xl font-bold text-slate-800">₹1.02Cr</p><p className="text-xs text-slate-400 mb-3">of ₹1.35Cr total</p><ProgressBar value={76} color="indigo"/></div></Card>
          <Card><div className="p-4 flex gap-4 items-center"><AlertCircle size={18} className="text-amber-500 flex-shrink-0"/><div><p className="text-sm font-semibold text-slate-700">Pending Fees</p><p className="text-xl font-bold text-amber-600">₹32.4L</p><p className="text-xs text-slate-400">From 142 students</p></div></div></Card>
          <Card><div className="p-4"><p className="text-sm font-semibold text-slate-700 mb-3">Today's Attendance</p><div className="flex gap-6"><div><p className="text-xl font-bold text-emerald-600">1,108</p><p className="text-xs text-slate-400">Present</p></div><div><p className="text-xl font-bold text-red-500">185</p><p className="text-xs text-slate-400">Absent</p></div></div><ProgressBar value={86} color="emerald" className="mt-3"/></div></Card>
        </div>
      </div>
      <Card title="Recent Activities">
        <div className="divide-y divide-slate-50">
          {ACTIVITIES.map((a,i)=>(
            <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50/60 transition-colors">
              <div className={`w-8 h-8 rounded-lg ${a.bg} flex items-center justify-center flex-shrink-0 text-sm`}>{a.icon}</div>
              <div className="flex-1 min-w-0"><p className="text-[12px] font-semibold text-slate-700">{a.title}</p><p className="text-[11px] text-slate-400">{a.detail}</p></div>
              <span className="text-[10px] text-slate-400 flex items-center gap-1"><Clock size={10}/>{a.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
