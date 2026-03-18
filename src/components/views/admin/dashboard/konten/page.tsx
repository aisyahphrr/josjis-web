"use client"

import { useEffect, useMemo, useState } from "react"
import { Image as ImageIcon, Pencil, Plus, Search, Trash2 } from "lucide-react"
import toast from "react-hot-toast"

import { dummyArticles, type ArticleRecord, type ArticleStatus } from "@/lib/dummyData"
import { PageHeader } from "@/components/admin/page-header"
import { TableSkeleton } from "@/components/admin/loading-skeletons"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { StatusBadge } from "@/components/admin/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const toneByStatus: Record<ArticleStatus, Parameters<typeof StatusBadge>[0]["tone"]> =
  {
    draft: "warning",
    published: "success",
  }

function isoNow() {
  return new Date().toISOString()
}

export default function AdminKontenPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [items, setItems] = useState<ArticleRecord[]>(dummyArticles)
  const [query, setQuery] = useState("")

  const [editingId, setEditingId] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [status, setStatus] = useState<ArticleStatus>("draft")
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined)

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 750)
    return () => window.clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((a) =>
      q ? `${a.title} ${a.content} ${a.id}`.toLowerCase().includes(q) : true,
    )
  }, [items, query])

  const resetForm = () => {
    setEditingId(null)
    setTitle("")
    setContent("")
    setStatus("draft")
    setImagePreview(undefined)
  }

  const startEdit = (a: ArticleRecord) => {
    setEditingId(a.id)
    setTitle(a.title)
    setContent(a.content)
    setStatus(a.status)
    setImagePreview(a.imageUrl)
    toast(`Edit mode: ${a.title}`)
  }

  const save = () => {
    const trimmedTitle = title.trim()
    const trimmedContent = content.trim()
    if (!trimmedTitle || !trimmedContent) {
      toast.error("Judul dan konten wajib diisi.")
      return
    }

    if (editingId) {
      setItems((prev) =>
        prev.map((a) =>
          a.id === editingId
            ? {
                ...a,
                title: trimmedTitle,
                content: trimmedContent,
                status,
                imageUrl: imagePreview,
                updatedAt: isoNow(),
              }
            : a,
        ),
      )
      toast.success("Artikel berhasil diupdate (dummy).")
    } else {
      const next: ArticleRecord = {
        id: `ART-${String(items.length + 1).padStart(3, "0")}`,
        title: trimmedTitle,
        content: trimmedContent,
        status,
        imageUrl: imagePreview,
        updatedAt: isoNow(),
      }
      setItems((prev) => [next, ...prev])
      toast.success("Artikel berhasil dibuat (dummy).")
    }

    resetForm()
  }

  if (isLoading) return <TableSkeleton rows={7} />

  return (
    <div className="space-y-6">
      <PageHeader
        title="Konten (Artikel)"
        subtitle="Kelola artikel: buat, edit, publish, dan hapus. Semua data dummy."
        actions={
          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari artikel..."
              className="h-10 rounded-2xl border-border/60 bg-muted/40 pl-9"
            />
          </div>
        }
      />

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="rounded-2xl border-border/60 bg-card/60 backdrop-blur-xl xl:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Daftar Artikel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-border/60 bg-muted/20 p-10 text-center text-muted-foreground">
                Tidak ada artikel.
              </div>
            ) : (
              filtered.map((a) => (
                <div
                  key={a.id}
                  className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-muted/20 p-4 hover:bg-muted/30 transition-colors md:flex-row md:items-center md:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="truncate font-semibold text-foreground">
                        {a.title}
                      </div>
                      <StatusBadge tone={toneByStatus[a.status]}>{a.status}</StatusBadge>
                    </div>
                    <div className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {a.content}
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Updated: {new Date(a.updatedAt).toLocaleString("id-ID")}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <Button
                      variant="outline"
                      className="h-9 rounded-2xl border-border/60"
                      onClick={() => startEdit(a)}
                    >
                      <Pencil className="mr-1 size-4" />
                      Edit
                    </Button>

                    <ConfirmDialog
                      title="Hapus artikel?"
                      description={`Anda akan menghapus "${a.title}" (dummy).`}
                      confirmText="Hapus"
                      confirmVariant="destructive"
                      onConfirm={() => {
                        setItems((prev) => prev.filter((x) => x.id !== a.id))
                        toast.success("Artikel dihapus.")
                        if (editingId === a.id) resetForm()
                      }}
                      trigger={
                        <Button variant="destructive" className="h-9 rounded-2xl">
                          <Trash2 className="mr-1 size-4" />
                          Delete
                        </Button>
                      }
                    />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/60 bg-card/60 backdrop-blur-xl">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base">
              {editingId ? "Edit Artikel" : "Create Artikel"}
            </CardTitle>
            <Button
              variant="ghost"
              className="rounded-2xl text-[#F99912] hover:text-[#F99912]/80"
              onClick={() => {
                resetForm()
                toast("Form direset.")
              }}
            >
              <Plus className="mr-1 size-4" />
              Baru
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Judul artikel..."
                className="h-10 rounded-2xl border-border/60 bg-muted/30"
              />
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as ArticleStatus)}>
                <SelectTrigger className="h-10 rounded-2xl border-border/60 bg-muted/30">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tulis konten..."
                className="min-h-32 rounded-2xl border-border/60 bg-muted/30"
              />
            </div>

            <div className="space-y-2">
              <Label>Image (dummy)</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  className="h-10 rounded-2xl border-border/60 bg-muted/30"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    const url = URL.createObjectURL(file)
                    setImagePreview(url)
                    toast.success("Preview image siap (dummy).")
                  }}
                />
              </div>
              <div className="rounded-2xl border border-border/60 bg-muted/20 p-3">
                {imagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-32 w-full rounded-2xl object-cover"
                  />
                ) : (
                  <div className="flex h-32 items-center justify-center gap-2 text-sm text-muted-foreground">
                    <ImageIcon className="size-4" />
                    Belum ada preview
                  </div>
                )}
              </div>
            </div>

            <Button
              className="w-full rounded-2xl bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612] hover:from-[#F99912]/90 hover:to-[#64762C]/90"
              onClick={save}
            >
              {editingId ? "Simpan Perubahan" : "Buat Artikel"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

