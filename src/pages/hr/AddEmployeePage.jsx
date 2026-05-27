/**
 * AddEmployeePage.jsx
 * Module : hr
 * Page   : Add Employee (matches screenshots 8 & 9)
 */
import { useState } from "react";
import { usePageTitle } from "../../hooks";
import { PageHeader, Card, Button, Input, Select } from "../../components/ui";

const ROLES = ["Admin", "Teacher", "Accountant", "Librarian", "Receptionist", "4th Grade"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const GENDERS = ["Male", "Female", "Other"];

const DEPARTMENTS = [
  "MATHS","SCIENCE","HINDI","ENGLISH","SST","TRANSPORT",
  "HOUSE KEEPING","COOK","LIBRARIAN","ACCOUNTANT","SECURITY","COMPUTER",
  "PRIMARY SECTION (Class 1-5)","MIDDLE SECTION (Class 6-8)",
];

const DESIGNATIONS = [
  "CHAIRMAN","DIRECTOR","SECRETARY","VICE PRINCIPAL",
  "PGT (Post Graduate Teacher)","TGT (Trained Graduate Teacher)",
  "NTT (Nursery Teacher)","COMPUTER TEACHER",
  "PET (Physical Education Teacher)","Special Educator",
  "ACCOUNTANT","ACCOUNTS ASSISTANT","CASHIER","TRANSPORT MANAGER",
];

export default function AddEmployeePage() {
  usePageTitle("Add Employee");

  const [form, setForm] = useState({
    role: "", joiningDate: "", designation: "", department: "",
    qualification: "", experienceDetails: "", totalExperience: "",
    name: "", gender: "", religion: "", bloodGroup: "", dateOfBirth: "",
    mobileNo: "", email: "", presentAddress: "", permanentAddress: "",
    photo: null,
  });
  const [saving, setSaving] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((f) => ({ ...f, photo: file }));
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    alert("Employee added successfully!");
  };

  return (
    <div>
      <PageHeader title="Add Employee" subtitle="Add new employee" icon="👤">
        <Button size="sm" variant="secondary">⬆ Multiple Import</Button>
      </PageHeader>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Academic / Job Details */}
        <Card>
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-amber-600">🏫 Academic Details</h3>
          </div>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Role *"
              value={form.role}
              onChange={set("role")}
              options={ROLES.map((r) => ({ value: r, label: r }))}
              required
            />
            <Input
              label="Joining Date *"
              type="date"
              value={form.joiningDate}
              onChange={set("joiningDate")}
              required
            />
            <Select
              label="Designation *"
              value={form.designation}
              onChange={set("designation")}
              options={DESIGNATIONS.map((d) => ({ value: d, label: d }))}
              required
            />
            <Select
              label="Department *"
              value={form.department}
              onChange={set("department")}
              options={DEPARTMENTS.map((d) => ({ value: d, label: d }))}
              required
            />
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Qualification *
              </label>
              <textarea
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 resize-none"
                rows={2}
                value={form.qualification}
                onChange={set("qualification")}
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Experience Details
              </label>
              <textarea
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 resize-none"
                rows={2}
                value={form.experienceDetails}
                onChange={set("experienceDetails")}
              />
            </div>
            <Input
              label="Total Experience"
              value={form.totalExperience}
              onChange={set("totalExperience")}
              placeholder="e.g. 5 years"
            />
          </div>
        </Card>

        {/* Employee Personal Details */}
        <Card>
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-amber-600">👤 Employee Details</h3>
          </div>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Name *"
              value={form.name}
              onChange={set("name")}
              icon={<span>👤</span>}
              required
            />
            <Select
              label="Gender"
              value={form.gender}
              onChange={set("gender")}
              options={GENDERS.map((g) => ({ value: g, label: g }))}
            />
            <Input
              label="Religion"
              value={form.religion}
              onChange={set("religion")}
            />
            <Select
              label="Blood Group"
              value={form.bloodGroup}
              onChange={set("bloodGroup")}
              options={BLOOD_GROUPS.map((b) => ({ value: b, label: b }))}
            />
            <Input
              label="Date Of Birth"
              type="date"
              value={form.dateOfBirth}
              onChange={set("dateOfBirth")}
            />
            <div /> {/* spacer */}
            <Input
              label="Mobile No *"
              type="tel"
              value={form.mobileNo}
              onChange={set("mobileNo")}
              icon={<span>📞</span>}
              required
            />
            <Input
              label="Email *"
              type="email"
              value={form.email}
              onChange={set("email")}
              icon={<span>✉️</span>}
              required
            />
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Present Address *
              </label>
              <textarea
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 resize-none"
                rows={3}
                value={form.presentAddress}
                onChange={set("presentAddress")}
                placeholder="Present Address"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Permanent Address
              </label>
              <textarea
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 resize-none"
                rows={3}
                value={form.permanentAddress}
                onChange={set("permanentAddress")}
                placeholder="Permanent Address"
              />
            </div>

            {/* Profile Picture */}
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Profile Picture
              </label>
              <label
                className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-200 hover:border-indigo-300 rounded-xl p-10 cursor-pointer transition-colors"
              >
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="preview"
                    className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100"
                  />
                ) : (
                  <>
                    <span className="text-4xl">☁️</span>
                    <span className="text-sm text-slate-500">Drag and drop a file here or click</span>
                  </>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
              </label>
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={() => window.history.back()}>
            Cancel
          </Button>
          <Button type="submit" loading={saving}>
            Save Employee
          </Button>
        </div>
      </form>
    </div>
  );
}
