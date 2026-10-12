import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, ImagePlus, X } from "lucide-react";
import { adminApi, can, errorMessage, ContentItem, ContentKind, SectionProps } from "../adminApi";
import { Card, PageTitle, Loading, Empty, ErrorNote, Button, Modal, Label, TextInput, TextArea, SelectInput, Segmented, ConfirmDialog, fmtDate } from "../ui";

const KINDS: { value: ContentKind; label: string; hint: string; image: boolean; where: string }[] = [
  { value: "legal", label: "Legal info", hint: "Laws and rights shown on the Your Rights page.", image: false, where: "Your Rights page" },
  { value: "awareness", label: "Awareness", hint: "Short awareness articles.", image: false, where: "Awareness page" },
  { value: "help", label: "Help resources", hint: "Extra help resources and organisations.", image: false, where: "Help resources" },
  { value: "news", label: "News", hint: "News items and announcements, with an optional image.", image: true, where: "News page" },
  { value: "gallery", label: "Gallery", hint: "Photos from events and campaigns.", image: true, where: "Gallery" },
  { value: "campaigns", label: "Campaigns", hint: "Campaign announcements.", image: true, where: "Campaigns" },
];

const Editor: React.FC<{ kind: (typeof KINDS)[number]; item?: ContentItem; onSaved: (i: ContentItem) => void; onClose: () => void }> = ({ kind, item, onSaved, onClose }) => {
  const [title, setTitle] = useState(item?.title ?? "");
  const [category, setCategory] = useState(item?.category ?? "");
  const [lang, setLang] = useState(item?.lang ?? "bn");
  const [body, setBody] = useState(item?.content ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const preview = file ? URL.createObjectURL(file) : !removeImage && item?.image ? item.image : null;

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return setError("Title is required");
    if (file && file.size > 5 * 1024 * 1024) return setError("Image must be 5 MB or smaller");
    const form = new FormData();
    form.append("title", title.trim());
    form.append("category", category.trim());
    form.append("lang", lang);
    form.append("content", body);
    if (file) form.append("image", file);
    else if (removeImage) form.append("removeImage", "true");

    setBusy(true);
    setError("");
    try {
      onSaved(await adminApi.saveContent(kind.value, form, item?._id));
      onClose();
    } catch (err) {
      setError(errorMessage(err, "Could not save"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal title={`${item ? "Edit" : "New"} ${kind.label.toLowerCase()} item`} onClose={onClose} width="max-w-2xl">
      <form onSubmit={save} className="space-y-4">
        <ErrorNote message={error} />
        <Label text="Title">
          <TextInput value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} required className="w-full" />
        </Label>
        <div className="grid gap-4 sm:grid-cols-2">
          <Label text="Category" hint="Optional, e.g. Law, Event, Training">
            <TextInput value={category} onChange={(e) => setCategory(e.target.value)} maxLength={60} className="w-full" />
          </Label>
          <Label text="Language">
            <SelectInput value={lang} onChange={(e) => setLang(e.target.value)} className="w-full">
              <option value="bn">বাংলা (Bangla)</option>
              <option value="en">English</option>
            </SelectInput>
          </Label>
        </div>
        <Label text="Content">
          <TextArea value={body} onChange={(e) => setBody(e.target.value)} rows={8} maxLength={10000} className="w-full" />
        </Label>
        {kind.image && (
          <div>
            <span className="mb-1.5 block text-sm font-semibold text-slate-800">Image</span>
            {preview ? (
              <div className="relative inline-block">
                <img src={preview} alt="" className="h-40 rounded-xl border border-slate-200 object-cover" />
                <button
                  type="button"
                  onClick={() => { setFile(null); setRemoveImage(true); }}
                  className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500 hover:border-brand-300">
                <ImagePlus className="h-6 w-6" />
                <span className="mt-1">Choose an image (JPG, PNG or WebP, up to 5 MB)</span>
                <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e) => { setFile(e.target.files?.[0] ?? null); setRemoveImage(false); }} />
              </label>
            )}
          </div>
        )}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" tone="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={busy}>{item ? "Save changes" : "Publish"}</Button>
        </div>
      </form>
    </Modal>
  );
};

const Content: React.FC<SectionProps> = ({ role }) => {
  const [kindId, setKindId] = useState<ContentKind>("legal");
  const [items, setItems] = useState<ContentItem[] | null>(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<ContentItem | "new" | null>(null);
  const [deleting, setDeleting] = useState<ContentItem | null>(null);
  const kind = KINDS.find((k) => k.value === kindId)!;

  useEffect(() => {
    setItems(null);
    setError("");
    adminApi.content(kindId).then(setItems).catch((e) => setError(errorMessage(e, "Could not load content")));
  }, [kindId]);

  if (!can.editContent(role)) return <Empty title="You do not have access to site content." />;

  return (
    <>
      <PageTitle
        title="Site content"
        subtitle="Publish and edit what appears on the public site."
        action={<Button icon={Plus} onClick={() => setEditing("new")}>New {kind.label.toLowerCase()} item</Button>}
      />
      <div className="mb-2 overflow-x-auto">
        <Segmented value={kindId} onChange={setKindId} options={KINDS.map((k) => ({ value: k.value, label: k.label }))} />
      </div>
      <p className="mb-5 text-sm text-slate-500">{kind.hint} Appears on: <strong className="font-medium text-slate-700">{kind.where}</strong>.</p>
      <ErrorNote message={error} />

      {!items ? (
        <Loading />
      ) : items.length === 0 ? (
        <Empty title={`No ${kind.label.toLowerCase()} items yet`} hint="Use the button above to publish the first one." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <Card key={item._id} className="flex flex-col overflow-hidden">
              {item.image && <img src={item.image} alt="" className="h-36 w-full object-cover" />}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {item.category && <span className="rounded-full bg-brand-50 px-2 py-0.5 font-medium text-brand-800">{item.category}</span>}
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 uppercase text-slate-600">{item.lang}</span>
                </div>
                <h3 className="mt-2 font-semibold text-slate-900">{item.title}</h3>
                {item.content && <p className="mt-1 line-clamp-3 text-sm text-slate-600">{item.content}</p>}
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="text-xs text-slate-400">Updated {fmtDate(item.updatedAt, false)}</span>
                  <div className="flex gap-1">
                    <Button tone="ghost" className="px-2" onClick={() => setEditing(item)} aria-label="Edit"><Pencil className="h-4 w-4" /></Button>
                    <Button tone="ghost" className="px-2 text-red-600 hover:bg-red-50" onClick={() => setDeleting(item)} aria-label="Delete"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {editing && (
        <Editor
          kind={kind}
          item={editing === "new" ? undefined : editing}
          onClose={() => setEditing(null)}
          onSaved={(saved) =>
            setItems((list) => (list?.some((i) => i._id === saved._id) ? list.map((i) => (i._id === saved._id ? saved : i)) : [saved, ...(list ?? [])]))
          }
        />
      )}
      {deleting && (
        <ConfirmDialog
          title="Delete this item?"
          message={`"${deleting.title}" will be removed from the public site.`}
          confirmLabel="Delete"
          onClose={() => setDeleting(null)}
          onConfirm={async () => {
            await adminApi.deleteContent(kindId, deleting._id);
            setItems((list) => list?.filter((i) => i._id !== deleting._id) ?? null);
          }}
        />
      )}
    </>
  );
};

export default Content;
