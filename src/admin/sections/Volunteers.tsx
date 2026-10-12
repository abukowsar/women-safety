import React, { useEffect, useMemo, useState } from "react";
import { Mail, Phone, MapPin, Trash2, Search } from "lucide-react";
import { adminApi, can, errorMessage, Volunteer, VolunteerStatus, SectionProps } from "../adminApi";
import { Card, PageTitle, StatusBadge, Loading, Empty, ErrorNote, Button, SelectInput, Segmented, TextInput, ConfirmDialog, fmtDate, ago } from "../ui";

const SKILLS = ["counselling", "legal", "medical", "tech", "translation", "outreach", "other"];

const Volunteers: React.FC<SectionProps> = ({ role, onChange }) => {
  const [items, setItems] = useState<Volunteer[] | null>(null);
  const [filter, setFilter] = useState<VolunteerStatus | "all">("new");
  const [skill, setSkill] = useState("");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<Volunteer | null>(null);

  useEffect(() => {
    adminApi.volunteers().then(setItems).catch((e) => setError(errorMessage(e, "Could not load applications")));
  }, []);

  const setStatus = async (id: string, status: VolunteerStatus) => {
    try {
      const updated = await adminApi.setVolunteerStatus(id, status);
      setItems((list) => list?.map((v) => (v._id === id ? updated : v)) ?? null);
      onChange();
    } catch (e) {
      setError(errorMessage(e));
    }
  };

  const count = (s: VolunteerStatus) => items?.filter((v) => v.status === s).length ?? 0;
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (items ?? []).filter(
      (v) =>
        (filter === "all" || v.status === filter) &&
        (!skill || v.skills.includes(skill)) &&
        (!q || `${v.name} ${v.email} ${v.district ?? ""}`.toLowerCase().includes(q)),
    );
  }, [items, filter, skill, query]);

  return (
    <>
      <PageTitle title="Volunteer applications" subtitle="Review applicants before they have any contact with survivors." />
      <ErrorNote message={error} />
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Segmented
          value={filter}
          onChange={setFilter}
          options={[
            { value: "new", label: "New", count: count("new") },
            { value: "approved", label: "Approved", count: count("approved") },
            { value: "declined", label: "Declined", count: count("declined") },
            { value: "all", label: "All", count: items?.length },
          ]}
        />
        <SelectInput value={skill} onChange={(e) => setSkill(e.target.value)} aria-label="Skill">
          <option value="">Any skill</option>
          {SKILLS.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
        </SelectInput>
        <div className="relative min-w-[200px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <TextInput value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, email, district" className="w-full pl-9" />
        </div>
      </div>

      {!items ? (
        <Loading />
      ) : shown.length === 0 ? (
        <Empty title="No applications here" />
      ) : (
        <div className="space-y-3">
          {shown.map((v) => (
            <Card key={v._id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-lg font-semibold text-slate-900">{v.name}</p>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
                    <a href={`mailto:${v.email}`} className="inline-flex items-center gap-1.5 text-brand-700 hover:underline"><Mail className="h-3.5 w-3.5" /> {v.email}</a>
                    {v.phone && <a href={`tel:${v.phone}`} className="inline-flex items-center gap-1.5 hover:underline"><Phone className="h-3.5 w-3.5" /> {v.phone}</a>}
                    {v.district && <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {v.district}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={v.status} />
                  <SelectInput value={v.status} onChange={(e) => setStatus(v._id, e.target.value as VolunteerStatus)} aria-label="Status" className="py-1.5">
                    <option value="new">New</option>
                    <option value="approved">Approve</option>
                    <option value="declined">Decline</option>
                  </SelectInput>
                  {can.delete(role) && (
                    <Button tone="ghost" className="px-2 text-red-600 hover:bg-red-50" onClick={() => setDeleting(v)} aria-label="Delete">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                {v.skills.map((s) => <span key={s} className="rounded-full bg-brand-50 px-2.5 py-1 font-medium capitalize text-brand-800">{s}</span>)}
                <span className="rounded-full bg-slate-100 px-2.5 py-1 capitalize text-slate-600">{v.availability}</span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 uppercase text-slate-600">{v.languages.join(" · ")}</span>
              </div>
              {v.motivation && <p className="mt-3 whitespace-pre-wrap rounded-xl bg-slate-50 p-3 text-sm text-slate-700">{v.motivation}</p>}
              <p className="mt-3 text-xs text-slate-500" title={fmtDate(v.createdAt)}>Applied {ago(v.createdAt)}</p>
            </Card>
          ))}
        </div>
      )}

      {deleting && (
        <ConfirmDialog
          title={`Delete ${deleting.name}'s application?`}
          message="Their contact details and answers will be permanently deleted."
          confirmLabel="Delete"
          onClose={() => setDeleting(null)}
          onConfirm={async () => {
            await adminApi.deleteVolunteer(deleting._id);
            setItems((list) => list?.filter((v) => v._id !== deleting._id) ?? null);
            onChange();
          }}
        />
      )}
    </>
  );
};

export default Volunteers;
