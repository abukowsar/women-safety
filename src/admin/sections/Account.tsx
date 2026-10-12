import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { User } from "@/context/AuthContext";
import { adminApi, errorMessage, roleLabel } from "../adminApi";
import { Card, PageTitle, ErrorNote, Button, Label, TextInput, fmtDate } from "../ui";

const Account: React.FC<{ user: User }> = ({ user }) => {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setDone(false);
    if (next.length < 10) return setError("New password must be at least 10 characters.");
    if (next !== confirm) return setError("The new passwords do not match.");
    if (next === current) return setError("Choose a password different from the current one.");
    setBusy(true);
    try {
      await adminApi.changePassword(current, next);
      setDone(true);
      setCurrent("");
      setNext("");
      setConfirm("");
    } catch (err) {
      setError(errorMessage(err, "Could not change the password"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageTitle title="My account" />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="font-semibold text-slate-900">Profile</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div><dt className="text-xs text-slate-500">Name</dt><dd className="font-medium">{user.name}</dd></div>
            <div><dt className="text-xs text-slate-500">Email</dt><dd className="font-medium">{user.email}</dd></div>
            <div><dt className="text-xs text-slate-500">Role</dt><dd className="font-medium">{roleLabel[user.role]}</dd></div>
            <div><dt className="text-xs text-slate-500">Member since</dt><dd className="font-medium">{fmtDate(user.createdAt, false)}</dd></div>
          </dl>
          <p className="mt-6 text-xs text-slate-500">To change your name or role, ask an administrator.</p>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold text-slate-900">Change password</h2>
          <form onSubmit={submit} className="mt-4 space-y-4">
            <ErrorNote message={error} />
            {done && (
              <p className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">
                <CheckCircle2 className="h-4 w-4" /> Password changed.
              </p>
            )}
            <Label text="Current password">
              <TextInput type="password" value={current} onChange={(e) => setCurrent(e.target.value)} autoComplete="current-password" required className="w-full" />
            </Label>
            <Label text="New password" hint="At least 10 characters. A short phrase is easier to remember and harder to guess.">
              <TextInput type="password" value={next} onChange={(e) => setNext(e.target.value)} autoComplete="new-password" required minLength={10} className="w-full" />
            </Label>
            <Label text="Confirm new password">
              <TextInput type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password" required className="w-full" />
            </Label>
            <Button type="submit" loading={busy}>Update password</Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Account;
