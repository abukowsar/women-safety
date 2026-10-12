import React, { useEffect, useState } from "react";
import { Phone, Trash2, VolumeX, Volume2, Clock, Languages } from "lucide-react";
import { adminApi, can, errorMessage, Callback, CallbackStatus, SectionProps } from "../adminApi";
import { Card, PageTitle, StatusBadge, Loading, Empty, ErrorNote, Button, SelectInput, Segmented, ConfirmDialog, fmtDate, ago } from "../ui";
import { topics } from "@/data/topics";

const topicLabel = (id: string) => topics.find((t) => t.id === id)?.title.en ?? "Other";
const timeLabel: Record<string, string> = { morning: "Morning", afternoon: "Afternoon", evening: "Evening", anytime: "Any time" };

const Callbacks: React.FC<SectionProps> = ({ role, onChange }) => {
  const [items, setItems] = useState<Callback[] | null>(null);
  const [filter, setFilter] = useState<CallbackStatus | "all">("new");
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<Callback | null>(null);

  useEffect(() => {
    adminApi.callbacks().then(setItems).catch((e) => setError(errorMessage(e, "Could not load call-back requests")));
  }, []);

  const setStatus = async (id: string, status: CallbackStatus) => {
    try {
      const updated = await adminApi.setCallbackStatus(id, status);
      setItems((list) => list?.map((c) => (c._id === id ? updated : c)) ?? null);
      onChange();
    } catch (e) {
      setError(errorMessage(e));
    }
  };

  const count = (s: CallbackStatus) => items?.filter((c) => c.status === s).length ?? 0;
  const shown = items?.filter((c) => filter === "all" || c.status === filter) ?? [];

  return (
    <>
      <PageTitle title="Call-back requests" subtitle="People waiting for a confidential call. Respect the safe time and voicemail preference." />
      <ErrorNote message={error} />
      <div className="mb-4">
        <Segmented
          value={filter}
          onChange={setFilter}
          options={[
            { value: "new", label: "New", count: count("new") },
            { value: "contacted", label: "Contacted", count: count("contacted") },
            { value: "closed", label: "Closed", count: count("closed") },
            { value: "all", label: "All", count: items?.length },
          ]}
        />
      </div>

      {!items ? (
        <Loading />
      ) : shown.length === 0 ? (
        <Empty title="Nothing here" hint={filter === "new" ? "No one is waiting for a call right now." : undefined} />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {shown.map((c) => (
            <Card key={c._id} className="flex flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{c.alias || "No name given"}</p>
                  <a href={`tel:${c.phone}`} className="mt-1 inline-flex items-center gap-1.5 font-mono text-lg font-semibold text-brand-700 hover:underline">
                    <Phone className="h-4 w-4" /> {c.phone}
                  </a>
                </div>
                <StatusBadge status={c.status} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-slate-700"><Clock className="h-3.5 w-3.5" /> {timeLabel[c.safeTime] ?? c.safeTime}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-slate-700"><Languages className="h-3.5 w-3.5" /> {c.language === "bn" ? "Bangla" : "English"}</span>
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-brand-800">{topicLabel(c.topic)}</span>
                {c.voicemailOk ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-800"><Volume2 className="h-3.5 w-3.5" /> Voicemail OK</span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 font-semibold text-red-700"><VolumeX className="h-3.5 w-3.5" /> No voicemail</span>
                )}
              </div>
              {c.message && <p className="mt-4 whitespace-pre-wrap rounded-xl bg-slate-50 p-3 text-sm text-slate-700">{c.message}</p>}
              <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                <span className="text-xs text-slate-500" title={fmtDate(c.createdAt)}>Requested {ago(c.createdAt)}</span>
                <div className="flex items-center gap-2">
                  <SelectInput value={c.status} onChange={(e) => setStatus(c._id, e.target.value as CallbackStatus)} aria-label="Status" className="py-1.5">
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </SelectInput>
                  {can.delete(role) && (
                    <Button tone="ghost" className="px-2 text-red-600 hover:bg-red-50" onClick={() => setDeleting(c)} aria-label="Delete">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {deleting && (
        <ConfirmDialog
          title="Delete this request?"
          message="The phone number and message will be permanently deleted."
          confirmLabel="Delete"
          onClose={() => setDeleting(null)}
          onConfirm={async () => {
            await adminApi.deleteCallback(deleting._id);
            setItems((list) => list?.filter((c) => c._id !== deleting._id) ?? null);
            onChange();
          }}
        />
      )}
    </>
  );
};

export default Callbacks;
