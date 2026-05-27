/**
 * EmployeeListPage.jsx
 * Module : hr
 * Page   : Employee List (matches Employee tabs screenshot)
 */
import { useState } from "react";
import { usePageTitle } from "../../hooks";
import {
  PageHeader, Card, Button, Badge, DataTable, SearchInput, Tabs, Avatar,
} from "../../components/ui";

const ROLE_TABS = [
  { id: "admin", label: "Admin" },
  { id: "teacher", label: "Teacher" },
  { id: "accountant", label: "Accountant" },
  { id: "librarian", label: "Librarian" },
  { id: "receptionist", label: "Receptionist" },
  { id: "id_card", label: "ID Card" },
  { id: "4th_grade", label: "4th Grade" },
];

export default function EmployeeListPage() {
  usePageTitle("Employee List");

  const [activeTab, setActiveTab] = useState("admin");
  const [search, setSearch] = useState("");
  const [data] = useState([]);

  const columns = [
    { key: "sl", label: "SL", sortable: false },
    {
      key: "photo",
      label: "Photo",
      sortable: false,
      render: (_, row) => <Avatar name={row.name || "E"} size="sm" />,
    },
    { key: "branch", label: "Branch" },
    { key: "staffId", label: "Staff ID" },
    { key: "name", label: "Name" },
    { key: "designation", label: "Designation" },
    { key: "department", label: "Department" },
    { key: "email", label: "Email" },
    { key: "mobileNo", label: "Mobile No" },
    {
      key: "twoFA",
      label: "2FA",
      render: (v) => (
        <Badge variant={v ? "success" : "default"}>{v ? "On" : "Off"}</Badge>
      ),
    },
    {
      key: "action",
      label: "Action",
      sortable: false,
      render: () => (
        <div className="flex gap-1.5">
          <Button size="xs" variant="outline">View</Button>
          <Button size="xs" variant="warning">Edit</Button>
          <Button size="xs" variant="danger">Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Employee"
        subtitle="Staff & employee management"
        icon="👔"
      >
        <Button size="sm" onClick={() => alert("Navigate to Add Employee")}>
          + Add Employee
        </Button>
      </PageHeader>

      {/* Role tabs */}
      <div className="flex gap-0 border-b border-slate-200 mb-4 overflow-x-auto">
        {ROLE_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-3 text-[12px] font-semibold whitespace-nowrap transition-colors border-b-2
              ${activeTab === tab.id
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              }`}
          >
            <span className="text-sm">👤</span>
            {tab.label}
          </button>
        ))}
      </div>

      <Card
        action={
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
        }
      >
        <DataTable
          columns={columns}
          data={data}
          emptyText="No data available in table"
        />
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Showing 0 to 0 of 0 entries</span>
          <div className="flex gap-1">
            <Button size="xs" variant="secondary">‹</Button>
            <Button size="xs" variant="secondary">›</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
