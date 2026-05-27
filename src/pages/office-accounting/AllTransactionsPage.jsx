/**
 * AllTransactionsPage.jsx — matches screenshot 18
 * Office Accounting → Transactions table:
 * ACCOUNT NAME, TYPE, VOUCHER HEAD, REF NO, DESCRIPTION, PAY VIA, AMOUNT, DR, CR, BALANCE, DATE
 */
import { useState } from "react";

export default function AllTransactionsPage() {
  const [search, setSearch] = useState("");
  const [data] = useState([]);

  const filtered = data.filter(r =>
    !search || r.accountName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-sm">🏠</div>
        <h1 className="text-[15px] font-bold text-slate-800">Office Accounting</h1>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
          <span className="text-slate-500 text-sm">☰</span>
          <h3 className="text-sm font-semibold text-slate-700">Transactions</h3>
        </div>

        <div className="p-4 flex items-center justify-between gap-3">
          <div className="flex gap-2">
            {["⧉","⬇","📋","📊","🖨","⊞"].map((ic,i)=>(
              <button key={i} className="w-7 h-7 rounded border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-xs">{ic}</button>
            ))}
          </div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..."
            className="pl-3 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400 w-56"/>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[1100px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Account Name","Type","Voucher Head","Ref No","Description","Pay Via","Amount","DR","CR","Balance","Date"].map(h=>(
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((row,i)=>(
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/70">
                  <td className="px-4 py-3 text-[12.5px]">{row.accountName}</td>
                  <td className="px-4 py-3 text-[12.5px]">{row.type}</td>
                  <td className="px-4 py-3 text-[12.5px]">{row.voucherHead}</td>
                  <td className="px-4 py-3 text-[12.5px]">{row.refNo}</td>
                  <td className="px-4 py-3 text-[12.5px]">{row.description}</td>
                  <td className="px-4 py-3 text-[12.5px]">{row.payVia}</td>
                  <td className="px-4 py-3 text-[12.5px]">{row.amount}</td>
                  <td className="px-4 py-3 text-[12.5px]">{row.dr}</td>
                  <td className="px-4 py-3 text-[12.5px]">{row.cr}</td>
                  <td className="px-4 py-3 text-[12.5px]">{row.balance}</td>
                  <td className="px-4 py-3 text-[12.5px]">{row.date}</td>
                </tr>
              )) : (
                <tr><td colSpan={11} className="px-4 py-12 text-center text-xs text-slate-400">No data available in table</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>Showing 0 to 0 of 0 entries</span>
            <select className="border border-slate-200 rounded px-2 py-1 text-[11px]" defaultValue="25">
              {[10,25,50,100].map(n=><option key={n}>{n}</option>)}
            </select>
          </div>
          <div className="flex gap-1">
            <button className="w-6 h-6 rounded border border-slate-200 flex items-center justify-center text-xs">‹</button>
            <button className="w-6 h-6 rounded border border-slate-200 flex items-center justify-center text-xs">›</button>
          </div>
        </div>
      </div>
    </div>
  );
}
