"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Image as ImageIcon,
  Pencil,
  Play,
  Plus,
  Search,
  Trash2,
} from "lucide-react"
import toast from "react-hot-toast"

import {
  dummyAcademy,
  dummyAcademyVideos,
  type AcademyWebinar,
  type AcademyVideo,
  type ArticleRecord,
  type ArticleStatus,
} from "@/src/lib/dummyData"
import { loadArticles, saveArticles } from "@/src/lib/shared/articles-store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { PageHeader } from "@/src/components/views/admin/layouts/page-header"
import { TableSkeleton } from "@/src/components/views/admin/layouts/loading-skeletons"
import { StatusBadge } from "@/src/components/views/admin/layouts/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { ConfirmDialog } from "@/src/components/views/admin/layouts/confirm-dialog"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"

type AcademyTabKey = "edukasi" | "academy"

const toneByStatus: Record<ArticleStatus, Parameters<typeof StatusBadge>[0]["tone"]> =
{
  draft: "warning",
  published: "success",
}

function isoNow() {
  return new Date().toISOString()
}

export default function AdminAcademyPage({ initialTab = "academy" }: { initialTab?: AcademyTabKey }) {
  const [activeTab, setActiveTab] = useState<AcademyTabKey>(initialTab)

  // ============================
  // Tab 1: EDUKASI (ARTIKEL)
  // ============================
  const [isLoadingArticles, setIsLoadingArticles] = useState(true)
  const [articleItems, setArticleItems] = useState<ArticleRecord[]>([])
  const [articlesHydrated, setArticlesHydrated] = useState(false)
  const [articleQuery, setArticleQuery] = useState("")

  const [editingId, setEditingId] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [status, setStatus] = useState<ArticleStatus>("draft")
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined)

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoadingArticles(false), 700)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    setArticleItems(loadArticles())
    setArticlesHydrated(true)
  }, [])

  useEffect(() => {
    if (!articlesHydrated) return
    saveArticles(articleItems)
  }, [articleItems, articlesHydrated])

  const filteredArticles = useMemo(() => {
    const q = articleQuery.trim().toLowerCase()
    return articleItems.filter((a) =>
      q ? `${a.title} ${a.content} ${a.id}`.toLowerCase().includes(q) : true,
    )
  }, [articleItems, articleQuery])

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

  const saveArticle = () => {
    const trimmedTitle = title.trim()
    const trimmedContent = content.trim()
    if (!trimmedTitle || !trimmedContent) {
      toast.error("Judul dan konten wajib diisi.")
      return
    }

    if (editingId) {
      setArticleItems((prev) =>
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
        id: `ART-${String(articleItems.length + 1).padStart(3, "0")}`,
        title: trimmedTitle,
        content: trimmedContent,
        status,
        imageUrl: imagePreview,
        updatedAt: isoNow(),
      }
      setArticleItems((prev) => [next, ...prev])
      toast.success("Artikel berhasil dibuat (dummy).")
    }

    resetForm()
  }

  // ============================
  // Tab 2: ACADEMY
  // ============================
  const [workshops, setWorkshops] = useState<AcademyWebinar[]>(dummyAcademy)
  const [videos, setVideos] = useState<AcademyVideo[]>(dummyAcademyVideos)

  const [isAddVideoOpen, setIsAddVideoOpen] = useState(false)
  const [newVideo, setNewVideo] = useState({ title: "", durationMinutes: 0, thumbnailUrl: "", videoSourceType: "link" as "link" | "upload", videoUrl: "" })

  const [isAddWorkshopOpen, setIsAddWorkshopOpen] = useState(false)
  const [newWorkshop, setNewWorkshop] = useState({ title: "", speaker: "", date: "", time: "", quota: 0, description: "" })

  const [registeringWorkshop, setRegisteringWorkshop] = useState<AcademyWebinar | null>(null)
  const [regResult, setRegResult] = useState<{ ticket: string; zoomLink: string } | null>(null)

  const saveVideo = () => {
    const trimmedTitle = newVideo.title.trim()
    if (!trimmedTitle) {
      toast.error("Judul video wajib diisi.")
      return
    }
    const next: AcademyVideo = {
      id: `VID-NEW-${Date.now()}`,
      title: trimmedTitle,
      durationMinutes: newVideo.durationMinutes || 0,
      thumbnailUrl: newVideo.thumbnailUrl || "/images/dummy/video-1.jpg",
    }
    setVideos((prev) => [next, ...prev])
    toast.success("Video berhasil ditambahkan.")
    setIsAddVideoOpen(false)
    setNewVideo({ title: "", durationMinutes: 0, thumbnailUrl: "", videoSourceType: "link", videoUrl: "" })
  }

  const saveWorkshop = () => {
    const trimmedTitle = newWorkshop.title.trim()
    if (!trimmedTitle) {
      toast.error("Judul workshop wajib diisi.")
      return
    }
    const next: AcademyWebinar = {
      id: `WBN-NEW-${Date.now()}`,
      title: trimmedTitle,
      speaker: newWorkshop.speaker || "Unknown",
      date: newWorkshop.date || isoNow(),
      time: newWorkshop.time || "00:00",
      quota: newWorkshop.quota || 0,
      remainingSeats: newWorkshop.quota || 0,
      description: newWorkshop.description || "",
    }
    setWorkshops((prev) => [next, ...prev])
    toast.success("Workshop berhasil ditambahkan.")
    setIsAddWorkshopOpen(false)
    setNewWorkshop({ title: "", speaker: "", date: "", time: "", quota: 0, description: "" })
  }

  const handleRegisterClick = (w: AcademyWebinar) => {
    setRegisteringWorkshop(w)
    setRegResult(null)
  }

  const confirmRegisterWorkshop = () => {
    if (!registeringWorkshop) return
    const id = registeringWorkshop.id
    setWorkshops((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
            ...w,
            remainingSeats: Math.max(0, w.remainingSeats - 1),
          }
          : w,
      ),
    )
    toast.success("Pendaftaran workshop berhasil!")
    setRegResult({
      ticket: `TKT-${Math.floor(Math.random() * 10000)}`,
      zoomLink: `https://zoom.us/j/${Math.floor(Math.random() * 1000000000)}?pwd=dummy`,
    })
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Academy"
        subtitle="Kelola edukasi (artikel) dan academy (dummy)."
      />

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as AcademyTabKey)}>
        <TabsList className="w-full max-w-[640px] bg-muted/30">
          <TabsTrigger value="edukasi" className="rounded-2xl">
            EDUKASI (ARTIKEL)
          </TabsTrigger>
          <TabsTrigger value="academy" className="rounded-2xl">
            Academy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edukasi">
          {isLoadingArticles ? (
            <TableSkeleton rows={7} />
          ) : (
            <div className="space-y-6">
              <div className="relative w-full md:w-[320px]">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={articleQuery}
                  onChange={(e) => setArticleQuery(e.target.value)}
                  placeholder="Cari artikel..."
                  className="h-10 rounded-2xl border-border/60 bg-muted/40 pl-9"
                />
              </div>

              <div className="grid gap-4 xl:grid-cols-3">
                <Card className="rounded-2xl border-border/60 bg-card/60 backdrop-blur-xl xl:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Daftar Artikel</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {filteredArticles.length === 0 ? (
                      <div className="rounded-2xl border border-border/60 bg-muted/20 p-10 text-center text-muted-foreground">
                        Tidak ada artikel.
                      </div>
                    ) : (
                      filteredArticles.map((a) => (
                        <div
                          key={a.id}
                          className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-muted/20 p-4 hover:bg-muted/30 transition-colors md:flex-row md:items-center md:justify-between"
                        >
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <div className="truncate font-semibold text-foreground">
                                {a.title}
                              </div>
                              <StatusBadge tone={toneByStatus[a.status]}>
                                {a.status}
                              </StatusBadge>
                            </div>
                            <div className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                              {a.content}
                            </div>
                            <div className="mt-2 text-xs text-muted-foreground">
                              Updated:{" "}
                              {new Date(a.updatedAt).toLocaleString("id-ID")}
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
                                setArticleItems((prev) =>
                                  prev.filter((x) => x.id !== a.id),
                                )
                                toast.success("Artikel dihapus.")
                                if (editingId === a.id) resetForm()
                              }}
                              trigger={
                                <Button
                                  variant="destructive"
                                  className="h-9 rounded-2xl"
                                >
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
                      <Select
                        value={status}
                        onValueChange={(v) => setStatus(v as ArticleStatus)}
                      >
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
                      onClick={saveArticle}
                    >
                      {editingId ? "Simpan Perubahan" : "Buat Artikel"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="academy">
          <div className="space-y-6">
            <div className="grid gap-4 xl:grid-cols-2">
              <Card className="rounded-2xl border-[#F99912]/10 bg-card/60 backdrop-blur-xl xl:col-span-1">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-base">Video Learning</CardTitle>
                  <Button
                    variant="ghost"
                    className="rounded-2xl text-[#F99912] hover:text-[#F99912]/80"
                    onClick={() => setIsAddVideoOpen(true)}
                  >
                    <Plus className="mr-1 size-4" />
                    Baru
                  </Button>
                </CardHeader>
                <CardContent>
                  {videos.length === 0 ? (
                    <div className="rounded-2xl border border-border/60 bg-muted/20 p-10 text-center text-muted-foreground">
                      Tidak ada video.
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {videos.map((v) => (
                        <div
                          key={v.id}
                          className="rounded-2xl border border-border/60 bg-muted/20 p-4 hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <div className="truncate font-semibold text-foreground">
                                {v.title}
                              </div>
                              <div className="mt-1 text-xs text-muted-foreground">
                                Durasi: {v.durationMinutes} menit
                              </div>
                            </div>

                            <Button
                              variant="outline"
                              className="rounded-2xl border-border/60 h-9 shrink-0"
                              onClick={() => toast("Memutar video (dummy).")}
                            >
                              <Play className="mr-1 size-4" />
                              Play
                            </Button>
                          </div>

                          <div className="mt-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={v.thumbnailUrl}
                              alt={v.title}
                              className="h-28 w-full rounded-2xl object-cover border border-border/60 bg-muted/20"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-[#F99912]/10 bg-card/60 backdrop-blur-xl xl:col-span-1">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-base">Workshop / Webinar</CardTitle>
                  <Button
                    variant="ghost"
                    className="rounded-2xl text-[#F99912] hover:text-[#F99912]/80"
                    onClick={() => setIsAddWorkshopOpen(true)}
                  >
                    <Plus className="mr-1 size-4" />
                    Baru
                  </Button>
                </CardHeader>
                <CardContent>
                  {workshops.length === 0 ? (
                    <div className="rounded-2xl border border-border/60 bg-muted/20 p-10 text-center text-muted-foreground">
                      Tidak ada workshop.
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {workshops.map((w) => (
                        <div
                          key={w.id}
                          className="rounded-2xl border border-border/60 bg-muted/20 p-4 hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0 flex-1">
                              <div className="truncate font-semibold text-foreground">
                                {w.title}
                              </div>
                              <div className="mt-1 text-sm text-muted-foreground">
                                Speaker: {w.speaker}
                              </div>
                            </div>

                            <Button
                              variant="outline"
                              className="rounded-2xl border-border/60 h-9 shrink-0"
                              onClick={() => handleRegisterClick(w)}
                              disabled={w.remainingSeats <= 0}
                            >
                              Daftar Workshop
                            </Button>
                          </div>

                          <div className="mt-3 text-sm text-muted-foreground line-clamp-3">
                            {w.description}
                          </div>

                          <div className="mt-4 grid grid-cols-2 rounded-2xl border border-border/60 bg-background/40 p-4">
                            <div className="flex flex-col border-b border-r border-border/60 pb-4 pr-4">
                              <span className="text-xs text-muted-foreground">Date</span>
                              <span className="text-sm font-semibold text-foreground truncate">
                                {new Date(w.date).toLocaleDateString("id-ID")}
                              </span>
                            </div>

                            <div className="flex flex-col border-b border-border/60 pb-4 pl-4">
                              <span className="text-xs text-muted-foreground">Time</span>
                              <span className="text-sm font-semibold text-foreground truncate">
                                {w.time}
                              </span>
                            </div>

                            <div className="col-span-2 flex items-center justify-between gap-4 pt-4">
                              <div className="flex flex-col min-w-0">
                                <span className="text-xs text-muted-foreground">Quota</span>
                                <span className="text-sm font-semibold text-foreground truncate">
                                  {w.quota} peserta
                                </span>
                              </div>
                              <StatusBadge
                                tone={w.remainingSeats > 0 ? "success" : "warning"}
                                className="shrink-0"
                              >
                                Sisa: {w.remainingSeats}
                              </StatusBadge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog Registrasi */}
      <Dialog open={!!registeringWorkshop} onOpenChange={(open) => { if (!open) setRegisteringWorkshop(null) }}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>{regResult ? "Pendaftaran Berhasil" : "Daftar Workshop"}</DialogTitle>
            <DialogDescription>
              {regResult ? "Simpan tiket dan link Zoom ini." : `Konfirmasi pendaftaran untuk workshop: ${registeringWorkshop?.title}`}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {regResult ? (
              <>
                <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 space-y-2">
                  <div className="text-sm font-semibold">TICKET ID:</div>
                  <div className="font-mono text-lg text-[#F99912]">{regResult.ticket}</div>
                </div>
                <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 space-y-2">
                  <div className="text-sm font-semibold">ZOOM LINK:</div>
                  <a href={regResult.zoomLink} target="_blank" rel="noreferrer" className="text-sm text-blue-500 hover:underline break-all">
                    {regResult.zoomLink}
                  </a>
                </div>
              </>
            ) : (
              <div className="text-sm">
                Kuota tersisa: <strong>{registeringWorkshop?.remainingSeats}</strong> peserta
              </div>
            )}
          </div>
          <DialogFooter>
            {regResult ? (
              <Button onClick={() => setRegisteringWorkshop(null)} className="rounded-2xl w-full">Tutup</Button>
            ) : (
              <Button onClick={confirmRegisterWorkshop} className="rounded-2xl w-full bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612]">
                Konfirmasi Pendaftaran
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Tambah Video */}
      <Dialog open={isAddVideoOpen} onOpenChange={setIsAddVideoOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Tambah Video Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="space-y-2">
              <Label>Judul Video</Label>
              <Input
                value={newVideo.title}
                onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                placeholder="Contoh: Strategi Pemasaran"
                className="rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <Label>Sumber Video</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={newVideo.videoSourceType === "link" ? "default" : "outline"}
                  className={`flex-1 rounded-2xl ${newVideo.videoSourceType === "link" ? 'bg-[#F99912] text-black hover:bg-[#F99912]/90' : 'border-border/60'}`}
                  onClick={() => setNewVideo({ ...newVideo, videoSourceType: "link" })}
                >
                  Link
                </Button>
                <Button
                  type="button"
                  variant={newVideo.videoSourceType === "upload" ? "default" : "outline"}
                  className={`flex-1 rounded-2xl ${newVideo.videoSourceType === "upload" ? 'bg-[#F99912] text-black hover:bg-[#F99912]/90' : 'border-border/60'}`}
                  onClick={() => setNewVideo({ ...newVideo, videoSourceType: "upload" })}
                >
                  Upload File
                </Button>
              </div>
            </div>

            {newVideo.videoSourceType === "link" ? (
              <div className="space-y-2">
                <Label>Link Video URL</Label>
                <Input
                  value={newVideo.videoUrl}
                  onChange={(e) => setNewVideo({ ...newVideo, videoUrl: e.target.value })}
                  placeholder="https://youtube.com/..."
                  className="rounded-2xl"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Upload Video File</Label>
                <Input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setNewVideo({ ...newVideo, videoUrl: URL.createObjectURL(file) })
                      toast.success("Video siap diupload (dummy)")
                    }
                  }}
                  className="rounded-2xl border-border/60 bg-muted/30"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Durasi (Menit)</Label>
              <Input
                type="number"
                value={newVideo.durationMinutes}
                onChange={(e) => setNewVideo({ ...newVideo, durationMinutes: parseInt(e.target.value) || 0 })}
                placeholder="10"
                className="rounded-2xl"
              />
            </div>
            <div className="space-y-2">
              <Label>Thumbnail URL (Dummy)</Label>
              <Input
                value={newVideo.thumbnailUrl}
                onChange={(e) => setNewVideo({ ...newVideo, thumbnailUrl: e.target.value })}
                placeholder="/images/dummy/video-1.jpg"
                className="rounded-2xl"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={saveVideo} className="rounded-2xl w-full bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612]">Simpan Video</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Tambah Workshop */}
      <Dialog open={isAddWorkshopOpen} onOpenChange={setIsAddWorkshopOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Tambah Workshop Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="space-y-2">
              <Label>Judul Workshop</Label>
              <Input value={newWorkshop.title} onChange={(e) => setNewWorkshop({ ...newWorkshop, title: e.target.value })} className="rounded-2xl" />
            </div>
            <div className="space-y-2">
              <Label>Pembicara</Label>
              <Input value={newWorkshop.speaker} onChange={(e) => setNewWorkshop({ ...newWorkshop, speaker: e.target.value })} className="rounded-2xl" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tanggal</Label>
                <Input type="date" value={newWorkshop.date} onChange={(e) => setNewWorkshop({ ...newWorkshop, date: e.target.value })} className="rounded-2xl" />
              </div>
              <div className="space-y-2">
                <Label>Waktu</Label>
                <Input type="time" value={newWorkshop.time} onChange={(e) => setNewWorkshop({ ...newWorkshop, time: e.target.value })} className="rounded-2xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Kuota Peserta</Label>
              <Input type="number" value={newWorkshop.quota} onChange={(e) => setNewWorkshop({ ...newWorkshop, quota: parseInt(e.target.value) || 0 })} className="rounded-2xl" />
            </div>
            <div className="space-y-2">
              <Label>Deskripsi</Label>
              <Textarea value={newWorkshop.description} onChange={(e) => setNewWorkshop({ ...newWorkshop, description: e.target.value })} className="rounded-2xl" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={saveWorkshop} className="rounded-2xl w-full bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612]">Simpan Workshop</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

