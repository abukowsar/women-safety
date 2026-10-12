import React, { useCallback, useEffect, useState } from "react";
import {
  LayoutDashboard,
  FileWarning,
  PhoneCall,
  Users,
  Newspaper,
  ShieldCheck,
  UserCog,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Loader2,
  Search,
  Bell,
  ChevronRight,
  ChevronDown,
  Lock,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Shapla from "@/components/brand/Shapla";
import { adminApi, can, roleLabel, Stats, errorMessage, Section, AdminNavigate } from "./adminApi";
import { ErrorNote, TextInput, Label, Button } from "./ui";
import Overview from "./sections/Overview";
import Reports from "./sections/Reports";
import Callbacks from "./sections/Callbacks";
import Volunteers from "./sections/Volunteers";
import Content from "./sections/Content";
import Staff from "./sections/Staff";
import Account from "./sections/Account";

const SECTIONS: Section[] = ["overview", "reports", "callbacks", "volunteers", "content", "staff", "account"];

const sectionFromPath = (): Section => {
  const part = window.location.pathname.replace(/^\/admin\/?/, "").split("/")[0] as Section;
  return SECTIONS.includes(part) ? part : "overview";
};

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await login(email.trim(), password);
    } catch (err: any) {
      setError(typeof err === "string" ? err : errorMessage(err, "Login failed"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-brand-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_80%_10%,rgba(244,114,182,0.25),transparent),radial-gradient(40%_40%_at_10%_90%,rgba(165,86,158,0.35),transparent)]" />
        <Shapla outline strokeWidth={0.5} className="pointer-events-none absolute -bottom-24 -right-24 h-[34rem] w-[34rem] text-white/10" />
        <div className="relative flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-rose-500"><Shapla className="h-7 w-7 text-white" /></span>
          <span className="font-display text-xl font-semibold">Nirapad Case Manager</span>
        </div>
        <div className="relative max-w-md">
          <p className="font-display text-4xl font-semibold leading-tight">Every report is a person asking for help.</p>
          <p className="mt-4 text-brand-200">Handle each case with care, confidentiality and urgency. Names, contact details, descriptions and evidence are stored encrypted.</p>
        </div>
        <p className="relative flex items-center gap-2 text-sm text-brand-300"><Lock className="h-4 w-4" /> Authorised staff only.</p>
      </div>

      <div className="grid place-items-center bg-cream p-6">
        <form onSubmit={submit} className="animate-fade-up w-full max-w-sm">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-700 to-rose-500 lg:hidden">
            <Shapla className="h-7 w-7 text-white" />
          </span>
          <h1 className="mt-5 font-display text-3xl font-semibold text-brand-950 lg:mt-0">Welcome back</h1>
          <p className="mt-1 text-sm text-slate-500">Sign in with your staff account.</p>
          <div className="mt-8 space-y-4">
            <ErrorNote message={error} />
            <Label text="Email">
              <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required className="w-full py-2.5" />
            </Label>
            <Label text="Password">
              <TextInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required className="w-full py-2.5" />
            </Label>
            <Button type="submit" loading={busy} className="w-full py-3">Sign in</Button>
          </div>
          <a href="/" className="mt-8 block text-center text-sm text-slate-500 hover:text-brand-700">← Back to the public site</a>
        </form>
      </div>
    </div>
  );
};

type NavItem = { id: Section; label: string; icon: React.ElementType; badge?: number; urgent?: boolean; show: boolean };

const AdminApp: React.FC = () => {
  const { user, token, loading, logout } = useAuth();
  const [section, setSection] = useState<Section>(sectionFromPath);
  const [search, setSearch] = useState(window.location.search);
  const [menuOpen, setMenuOpen] = useState(false);
  const [panel, setPanel] = useState<"alerts" | "user" | null>(null);
  const [jump, setJump] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    document.title = "Nirapad Admin";
    const onPop = () => {
      setSection(sectionFromPath());
      setSearch(window.location.search);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const refreshStats = useCallback(() => {
    adminApi.stats().then(setStats).catch(() => {});
  }, []);

  useEffect(() => {
    if (!user) return;
    refreshStats();
    const id = setInterval(refreshStats, 60_000);
    return () => clearInterval(id);
  }, [user, section, refreshStats]);

  const go: AdminNavigate = (next, query = "") => {
    window.history.pushState(null, "", (next === "overview" ? "/admin" : `/admin/${next}`) + query);
    setSection(next);
    setSearch(query);
    setMenuOpen(false);
    setPanel(null);
    document.getElementById("admin-main")?.scrollTo({ top: 0 });
  };

  if (loading && token) {
    return (
      <div className="grid min-h-screen place-items-center bg-cream text-slate-500">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }
  if (!user) return <Login />;

  const role = user.role;
  const openReports = (stats?.byStatus.pending ?? 0) + (stats?.byStatus.investigating ?? 0);
  const groups: { title: string; items: NavItem[] }[] = [
    { title: "Dashboard", items: [{ id: "overview", label: "Overview", icon: LayoutDashboard, show: true }] },
    {
      title: "Casework",
      items: [
        { id: "reports", label: "Reports", icon: FileWarning, badge: stats?.urgentOpen || openReports || undefined, urgent: !!stats?.urgentOpen, show: true },
        { id: "callbacks", label: "Call-backs", icon: PhoneCall, badge: stats?.callbacksNew || undefined, show: can.handleRequests(role) },
      ],
    },
    {
      title: "Community",
      items: [
        { id: "volunteers", label: "Volunteers", icon: Users, badge: stats?.volunteersNew || undefined, show: can.handleRequests(role) },
        { id: "content", label: "Site content", icon: Newspaper, show: can.editContent(role) },
      ],
    },
    {
      title: "Administration",
      items: [
        { id: "staff", label: "Staff & roles", icon: ShieldCheck, show: can.manageStaff(role) },
        { id: "account", label: "My account", icon: UserCog, show: true },
      ],
    },
  ];
  const visible = groups.flatMap((g) => g.items).filter((n) => n.show);
  const current = visible.some((n) => n.id === section) ? section : "overview";
  const currentLabel = visible.find((n) => n.id === current)?.label;
  const initials = user.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  const alerts = [
    { show: !!stats?.urgentOpen, text: `${stats?.urgentOpen} open report(s) from people still at risk`, urgent: true, to: () => go("reports", "?risk=1") },
    { show: !!stats?.unassignedOpen && can.assign(role), text: `${stats?.unassignedOpen} open report(s) not yet assigned`, urgent: false, to: () => go("reports", "?unassigned=1") },
    { show: !!stats?.callbacksNew && can.handleRequests(role), text: `${stats?.callbacksNew} call-back request(s) waiting`, urgent: false, to: () => go("callbacks") },
    { show: !!stats?.volunteersNew && can.handleRequests(role), text: `${stats?.volunteersNew} new volunteer application(s)`, urgent: false, to: () => go("volunteers") },
  ].filter((a) => a.show);

  const sidebar = (
    <div className="flex h-full flex-col bg-brand-950 text-white">
      <div className="flex items-center justify-between px-5 pb-4 pt-5">
        <button onClick={() => go("overview")} className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-rose-500 shadow-lg shadow-black/20">
            <Shapla className="h-6 w-6 text-white" />
          </span>
          <span className="text-left">
            <span className="block font-display text-lg font-semibold leading-tight">Nirapad</span>
            <span className="block text-[11px] uppercase tracking-[0.2em] text-brand-300">Case manager</span>
          </span>
        </button>
        <button onClick={() => setMenuOpen(false)} className="rounded-lg p-1.5 text-brand-200 hover:bg-white/10 lg:hidden" aria-label="Close menu">
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-2">
        {groups.map((g) => {
          const items = g.items.filter((n) => n.show);
          if (!items.length) return null;
          return (
            <div key={g.title}>
              <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-400">{g.title}</p>
              <div className="space-y-0.5">
                {items.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => go(n.id)}
                    className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      current === n.id ? "bg-white/10 text-white" : "text-brand-200 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {current === n.id && <span className="absolute inset-y-2 left-0 w-1 rounded-full bg-rose-400" />}
                    <n.icon className="h-[18px] w-[18px]" />
                    <span className="flex-1 text-left">{n.label}</span>
                    {n.badge ? (
                      <span className={`min-w-[1.5rem] rounded-full px-1.5 py-0.5 text-center text-[11px] font-bold ${n.urgent ? "bg-red-500 text-white" : "bg-white/15 text-white"}`}>
                        {n.badge}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      <div className="m-3 rounded-2xl bg-white/5 p-4">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-brand-200"><Lock className="h-3.5 w-3.5" /> Confidential system</p>
        <p className="mt-1 text-[11px] leading-relaxed text-brand-300">Never copy survivor details into chats, email or personal devices.</p>
      </div>
    </div>
  );

  const props = { role, user, onNavigate: go, onChange: refreshStats };

  return (
    <div className="flex h-screen bg-cream text-slate-900">
      <aside className="hidden w-64 shrink-0 lg:block">{sidebar}</aside>
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-brand-950/50" />
          <aside className="relative h-full w-72" onClick={(e) => e.stopPropagation()}>{sidebar}</aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="relative z-30 flex h-16 shrink-0 items-center gap-3 border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-10">
          <button onClick={() => setMenuOpen(true)} className="rounded-lg p-1.5 hover:bg-slate-100 lg:hidden" aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </button>
          <nav className="hidden items-center gap-1.5 text-sm sm:flex" aria-label="Breadcrumb">
            <span className="text-slate-400">Admin</span>
            <ChevronRight className="h-4 w-4 text-slate-300" />
            <span className="font-semibold text-slate-800">{currentLabel}</span>
          </nav>

          <form
            className="relative ml-auto w-full max-w-xs"
            onSubmit={(e) => {
              e.preventDefault();
              const q = jump.trim();
              if (q) go("reports", `?q=${encodeURIComponent(q)}`);
              setJump("");
            }}
          >
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={jump}
              onChange={(e) => setJump(e.target.value)}
              placeholder="Find a report… e.g. NP-7KQ4-M2XD"
              aria-label="Find a report"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm focus:border-brand-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-100"
            />
          </form>

          <div className="relative">
            <button onClick={() => setPanel(panel === "alerts" ? null : "alerts")} className="relative rounded-xl p-2 text-slate-600 hover:bg-slate-100" aria-label="Notifications">
              <Bell className="h-5 w-5" />
              {alerts.length > 0 && <span className={`absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full ring-2 ring-white ${alerts[0].urgent ? "bg-red-500" : "bg-amber-500"}`} />}
            </button>
            {panel === "alerts" && (
              <div className="animate-fade-up absolute right-0 top-full mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Needs attention</p>
                {alerts.length === 0 ? (
                  <p className="px-3 pb-3 text-sm text-slate-500">All caught up.</p>
                ) : (
                  alerts.map((a, i) => (
                    <button key={i} onClick={a.to} className="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left text-sm hover:bg-slate-50">
                      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${a.urgent ? "bg-red-500" : "bg-amber-500"}`} />
                      <span className={a.urgent ? "font-semibold text-red-800" : "text-slate-700"}>{a.text}</span>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={() => setPanel(panel === "user" ? null : "user")} className="flex items-center gap-2 rounded-xl p-1 pr-2 hover:bg-slate-100" aria-label="Account menu">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-rose-500 text-sm font-bold text-white">{initials}</span>
              <span className="hidden text-left leading-tight md:block">
                <span className="block text-sm font-semibold text-slate-800">{user.name}</span>
                <span className="block text-xs text-slate-500">{roleLabel[role]}</span>
              </span>
              <ChevronDown className="hidden h-4 w-4 text-slate-400 md:block" />
            </button>
            {panel === "user" && (
              <div className="animate-fade-up absolute right-0 top-full mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                <div className="px-3 py-2">
                  <p className="truncate text-sm font-semibold">{user.name}</p>
                  <p className="truncate text-xs text-slate-500">{user.email}</p>
                </div>
                <div className="my-1 border-t border-slate-100" />
                <button onClick={() => go("account")} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                  <UserCog className="h-4 w-4" /> My account
                </button>
                <a href="/" target="_blank" rel="noreferrer" className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                  <ExternalLink className="h-4 w-4" /> View public site
                </a>
                <button onClick={logout} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-red-700 hover:bg-red-50">
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        <main id="admin-main" className="flex-1 overflow-y-auto" onMouseDown={() => panel && setPanel(null)}>
          <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
            {current === "overview" && <Overview onNavigate={go} role={role} />}
            {current === "reports" && <Reports key={search} {...props} />}
            {current === "callbacks" && <Callbacks {...props} />}
            {current === "volunteers" && <Volunteers {...props} />}
            {current === "content" && <Content {...props} />}
            {current === "staff" && <Staff {...props} />}
            {current === "account" && <Account user={user} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminApp;
