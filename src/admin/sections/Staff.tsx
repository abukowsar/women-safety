import React, { useEffect, useState } from "react";
import { UserPlus, KeyRound, Copy, Check } from "lucide-react";
import { User } from "@/context/AuthContext";
import { adminApi, can, errorMessage, roleLabel, Role, SectionProps } from "../adminApi";
import { Card, PageTitle, Loading, ErrorNote, Button, Modal, Label, TextInput, SelectInput, ConfirmDialog, fmtDate } from "../ui";

const ROLE_HELP: Record<Role, string> = {
  admin: "Everything, including staff accounts and deleting records.",
  ngo_support: "Reports, call-backs, volunteers and site content.",
  law_enforcement: "Reports only.",
};

const TempPassword: React.FC<{ email: string; password: string; onClose: () => void }> = ({ email, password, onClose }) => {
  const [copied, setCopied] = useState(false);
  return (
    <Modal title="Temporary password" onClose={onClose} width="max-w-md">
      <p className="text-sm text-slate-600">
        Share this with <strong>{email}</strong> through a safe channel (in person or by phone, not email). It is shown only once. Ask them to change it from <em>My account</em> after signing in.
      </p>
      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-brand-950 px-4 py-3 text-white">
        <span className="font-mono text-lg tracking-wide">{password}</span>
        <button
          onClick={() => { navigator.clipboard?.writeText(password); setCopied(true); }}
          className="rounded-lg bg-white/10 p-2 hover:bg-white/20"
          aria-label="Copy"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <div className="mt-6 flex justify-end"><Button onClick={onClose}>Done</Button></div>
    </Modal>
  );
};

const Staff: React.FC<SectionProps> = ({ role, user: me }) => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "ngo_support" as Role });
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState("");
  const [temp, setTemp] = useState<{ email: string; password: string } | null>(null);
  const [resetting, setResetting] = useState<User | null>(null);

  useEffect(() => {
    adminApi.users().then(setUsers).catch((e) => setError(errorMessage(e, "Could not load staff")));
  }, []);

  if (!can.manageStaff(role)) return <ErrorNote message="Only administrators can manage staff." />;

  const update = async (id: string, body: Partial<{ role: Role; active: boolean }>) => {
    setError("");
    try {
      const updated = await adminApi.updateUser(id, body);
      setUsers((list) => list?.map((u) => (u._id === id ? updated : u)) ?? null);
    } catch (e) {
      setError(errorMessage(e));
    }
  };

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setFormError("");
    try {
      const { user, tempPassword } = await adminApi.createUser({ ...form, name: form.name.trim(), email: form.email.trim() });
      setUsers((list) => [...(list ?? []), user]);
      setAdding(false);
      setForm({ name: "", email: "", role: "ngo_support" });
      setTemp({ email: user.email, password: tempPassword });
    } catch (err) {
      setFormError(errorMessage(err, "Could not create the account"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageTitle title="Staff & roles" subtitle="Who can sign in to this panel, and what they can do." action={<Button icon={UserPlus} onClick={() => setAdding(true)}>Add staff member</Button>} />
      <ErrorNote message={error} />

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {(Object.keys(ROLE_HELP) as Role[]).map((r) => (
          <Card key={r} className="p-4">
            <p className="text-sm font-semibold text-slate-900">{roleLabel[r]}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">{ROLE_HELP[r]}</p>
          </Card>
        ))}
      </div>

      {!users ? (
        <Loading />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Role</th>
                  <th className="px-4 py-3 font-semibold">Access</th>
                  <th className="px-4 py-3 font-semibold">Added</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => {
                  const self = u._id === me._id;
                  return (
                    <tr key={u._id} className={u.active === false ? "bg-slate-50/70 text-slate-400" : ""}>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-slate-900">{u.name} {self && <span className="text-xs font-normal text-slate-400">(you)</span>}</p>
                        <p className="text-xs text-slate-500">{u.email}</p>
                      </td>
                      <td className="px-4 py-3">
                        <SelectInput value={u.role} disabled={self} onChange={(e) => update(u._id, { role: e.target.value as Role })} className="py-1.5" aria-label="Role">
                          {(Object.keys(roleLabel) as Role[]).map((r) => <option key={r} value={r}>{roleLabel[r]}</option>)}
                        </SelectInput>
                      </td>
                      <td className="px-4 py-3">
                        <label className={`inline-flex items-center gap-2 ${self ? "cursor-not-allowed" : "cursor-pointer"}`}>
                          <input type="checkbox" checked={u.active !== false} disabled={self} onChange={(e) => update(u._id, { active: e.target.checked })} className="h-4 w-4 accent-brand-700" />
                          <span className={u.active === false ? "font-semibold text-red-600" : "text-emerald-700"}>{u.active === false ? "Disabled" : "Active"}</span>
                        </label>
                      </td>
                      <td className="px-4 py-3 text-slate-500">{fmtDate(u.createdAt, false)}</td>
                      <td className="px-4 py-3 text-right">
                        {!self && <Button tone="outline" icon={KeyRound} onClick={() => setResetting(u)} className="py-1.5">Reset password</Button>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {adding && (
        <Modal title="Add staff member" onClose={() => setAdding(false)}>
          <form onSubmit={create} className="space-y-4">
            <ErrorNote message={formError} />
            <Label text="Full name"><TextInput value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required minLength={2} maxLength={100} className="w-full" /></Label>
            <Label text="Work email"><TextInput type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="w-full" /></Label>
            <Label text="Role" hint={ROLE_HELP[form.role]}>
              <SelectInput value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Role })} className="w-full">
                {(Object.keys(roleLabel) as Role[]).map((r) => <option key={r} value={r}>{roleLabel[r]}</option>)}
              </SelectInput>
            </Label>
            <p className="text-xs text-slate-500">A temporary password will be generated and shown once.</p>
            <div className="flex justify-end gap-2">
              <Button type="button" tone="outline" onClick={() => setAdding(false)}>Cancel</Button>
              <Button type="submit" loading={busy}>Create account</Button>
            </div>
          </form>
        </Modal>
      )}

      {resetting && (
        <ConfirmDialog
          title={`Reset ${resetting.name}'s password?`}
          message="Their current password will stop working immediately. You will be shown a new temporary password to give them."
          confirmLabel="Reset password"
          onClose={() => setResetting(null)}
          onConfirm={async () => {
            const password = await adminApi.resetPassword(resetting._id);
            setTemp({ email: resetting.email, password });
          }}
        />
      )}
      {temp && <TempPassword email={temp.email} password={temp.password} onClose={() => setTemp(null)} />}
    </>
  );
};

export default Staff;
