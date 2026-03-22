"use client"

import { useEffect, useMemo, useState } from "react"
import { Eye, Pencil, Search, Trash2, Mail, Phone, MapPin, Calendar, User, Activity } from "lucide-react"
import toast from "react-hot-toast"

import { dummyUsers, type UserRecord, type UserStatus } from "@/src/lib/dummyData"
import { PageHeader } from "@/src/components/views/admin/layouts/page-header"
import { TableSkeleton } from "@/src/components/views/admin/layouts/loading-skeletons"
import { ConfirmDialog } from "@/src/components/views/admin/layouts/confirm-dialog"
import { StatusBadge } from "@/src/components/views/admin/layouts/status-badge"
import { Card, CardContent } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Switch } from "@/src/components/ui/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"

type TabKey = "user" | "umkm" | "driver"

const tabLabel: Record<TabKey, string> = {
  user: "User",
  umkm: "UMKM",
  driver: "Driver",
}

export default function AdminUsersPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabKey>("user")
  const [query, setQuery] = useState("")
  const [rows, setRows] = useState<UserRecord[]>(dummyUsers)

  // Dialog States
  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null)

  const [editOpen, setEditOpen] = useState(false)
  const [editForm, setEditForm] = useState<Partial<UserRecord>>({})
  const [isSavingEdit, setIsSavingEdit] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 750)
    return () => window.clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rows
      .filter((r) => r.role === activeTab)
      .filter((r) =>
        q
          ? `${r.name} ${r.email} ${r.id}`.toLowerCase().includes(q)
          : true,
      )
  }, [rows, activeTab, query])

  const toggleStatus = (id: string) => {
    setRows((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u
        const next: UserStatus = u.status === "active" ? "suspended" : "active"
        toast(next === "active" ? "User diaktifkan." : "User disuspend.", {
          icon: next === "active" ? "✅" : "⛔",
        })
        return { ...u, status: next }
      }),
    )
  }

  const deleteUser = (id: string) => {
    setRows((prev) => prev.filter((u) => u.id !== id))
    toast.success("User berhasil dihapus (dummy).")
  }

  const openDetail = (u: UserRecord) => {
    setSelectedUser(u)
    setDetailOpen(true)
  }

  const openEdit = (u: UserRecord) => {
    setSelectedUser(u)
    setEditForm({ name: u.name, email: u.email, phone: u.phone, address: u.address })
    setEditOpen(true)
  }

  const handleSaveEdit = async () => {
    if (!selectedUser) return
    setIsSavingEdit(true)
    await new Promise((r) => setTimeout(r, 1000))
    setRows((prev) =>
      prev.map((u) => (u.id === selectedUser.id ? { ...u, ...editForm } as UserRecord : u))
    )
    setIsSavingEdit(false)
    setEditOpen(false)
    toast.success("Perubahan data user berhasil disimpan.")
  }

  const formatDate = (isoString?: string) => {
    if (!isoString) return "-"
    return new Date(isoString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric"
    })
  }

  if (isLoading) return <TableSkeleton rows={7} />

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manajemen User"
        subtitle="Kelola akun User, UMKM, dan Driver. Semua aksi hanya simulasi (frontend-only)."
      />

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabKey)}>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <TabsList className="rounded-2xl">
            <TabsTrigger value="user" className="rounded-xl">User</TabsTrigger>
            <TabsTrigger value="umkm" className="rounded-xl">UMKM</TabsTrigger>
            <TabsTrigger value="driver" className="rounded-xl">Driver</TabsTrigger>
          </TabsList>

          <div className="relative w-full md:w-[360px]">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Cari ${tabLabel[activeTab]}...`}
              className="h-10 rounded-2xl border-border/60 bg-muted/40 pl-9"
            />
          </div>
        </div>

        <TabsContent value={activeTab} className="mt-4">
          <Card className="rounded-3xl border-border/60 bg-card/60 backdrop-blur-xl shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto rounded-3xl">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-border/60">
                      <TableHead className="py-4 pl-6 font-semibold text-foreground">Nama & Email</TableHead>
                      <TableHead className="py-4 font-semibold text-foreground">Status & Tipe Akun</TableHead>
                      <TableHead className="py-4 text-right pr-6 font-semibold text-foreground">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="py-16 text-center text-muted-foreground">
                          <User className="size-10 mx-auto opacity-20 mb-3" />
                          Tidak ada data di kategori ini.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filtered.map((u) => (
                        <TableRow key={u.id} className="hover:bg-muted/20 border-b border-border/40">
                          <TableCell className="py-4 pl-6">
                            <div className="font-semibold text-foreground">{u.name}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{u.email}</div>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center gap-3">
                              <StatusBadge tone={u.status === "active" ? "success" : "danger"}>
                                {u.status}
                              </StatusBadge>
                              <div className="flex items-center gap-2 border-l border-border/60 pl-3">
                                <Switch
                                  checked={u.status === "suspended"}
                                  onCheckedChange={() => toggleStatus(u.id)}
                                />
                                <span className="text-xs text-muted-foreground font-medium">Suspend</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-4 text-right pr-6">
                            <div className="inline-flex items-center justify-end gap-2 w-full">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-full border border-border/60 hover:bg-muted/50 text-muted-foreground"
                                onClick={() => openEdit(u)}
                              >
                                <Pencil className="size-3.5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 rounded-xl border-border/60 bg-background/50 hover:bg-muted/50 px-3 text-xs"
                                onClick={() => openDetail(u)}
                              >
                                <Eye className="mr-1.5 size-3.5 text-muted-foreground" /> Detail
                              </Button>
                              <ConfirmDialog
                                title="Hapus user?"
                                description={`Tindakan ini akan menghapus ${u.name} dari daftar (dummy).`}
                                confirmText="Hapus"
                                confirmVariant="destructive"
                                onConfirm={() => deleteUser(u.id)}
                                trigger={
                                  <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-destructive/80 hover:text-destructive hover:bg-destructive/10">
                                    <Trash2 className="size-3.5" />
                                  </Button>
                                }
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Detail Modal */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-2xl rounded-3xl p-0 overflow-hidden flex flex-col max-h-[90vh] border-border/60 shadow-xl">
          <DialogHeader className="p-6 md:p-8 pb-5 bg-muted/20 border-b border-border/60 relative">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-[#F99912]/10 border border-[#F99912]/20 flex items-center justify-center flex-shrink-0">
                <User className="size-8 text-[#F99912]" />
              </div>
              <div className="pt-1">
                <DialogTitle className="text-2xl font-bold tracking-tight mb-2">{selectedUser?.name}</DialogTitle>
                <div className="flex items-center gap-3">
                  <StatusBadge tone={selectedUser?.status === "active" ? "success" : "danger"}>
                    {selectedUser?.status}
                  </StatusBadge>
                  <span className="text-sm font-medium text-foreground uppercase tracking-wider">{selectedUser?.role}</span>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="p-6 md:p-8 bg-background/50">
            {selectedUser && (
              <div className="space-y-6">
                <section>
                  <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
                    <Activity className="size-4 text-muted-foreground" /> Informasi Profil
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-4 rounded-2xl border border-border/60 bg-muted/10 p-4">
                      <div className="h-10 w-10 mt-0.5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="size-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-muted-foreground font-medium mb-0.5">Email Terdaftar</div>
                        <div className="text-sm font-bold text-foreground break-words">{selectedUser.email}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-2xl border border-border/60 bg-muted/10 p-4">
                      <div className="h-10 w-10 mt-0.5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="size-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-muted-foreground font-medium mb-0.5">Kontak Handphone</div>
                        <div className="text-sm font-bold text-foreground break-words">{selectedUser.phone || "Tidak Ada Data"}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-2xl border border-border/60 bg-muted/10 p-4 md:col-span-2">
                      <div className="h-10 w-10 mt-0.5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="size-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-muted-foreground font-medium mb-0.5">Alamat Tempat Tinggal / Operasi</div>
                        <div className="text-sm font-bold text-foreground break-words leading-snug">{selectedUser.address || "Tidak Ada Data"}</div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="size-4 text-muted-foreground" /> Log Aktivitas Internal
                  </h3>
                  <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border/60 bg-muted/10 p-5">
                    <div>
                      <div className="text-xs text-muted-foreground font-medium mb-1">Tanggal Bergabung</div>
                      <div className="text-sm font-bold text-foreground">{formatDate(selectedUser.createdAt)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-medium mb-1">Login App Terakhir</div>
                      <div className="text-sm font-bold text-foreground">{formatDate(selectedUser.lastLoginAt)}</div>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-md rounded-3xl p-6 border-border/60 shadow-xl">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-xl">Edit Data Akun</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">Nama Lengkap</label>
                <Input
                  value={editForm.name || ""}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="h-10 rounded-xl border-border/60 bg-muted/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">Alamat Email</label>
                <Input
                  value={editForm.email || ""}
                  onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                  className="h-10 rounded-xl border-border/60 bg-muted/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">Kontak (Phone)</label>
                <Input
                  value={editForm.phone || ""}
                  onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="h-10 rounded-xl border-border/60 bg-muted/20"
                  placeholder="+628..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">Alamat</label>
                <textarea
                  value={editForm.address || ""}
                  onChange={(e) => setEditForm(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full min-h-[80px] rounded-xl border border-input bg-muted/20 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                  placeholder="Isi alamat..."
                />
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-border/60 mt-2">
                <Button variant="outline" className="rounded-xl h-10 px-6 border-border/60" onClick={() => setEditOpen(false)}>Batal</Button>
                <Button
                  className="rounded-xl h-10 px-6 bg-[#F99912] text-white hover:bg-[#F99912]/90 w-[140px]"
                  onClick={handleSaveEdit}
                  disabled={isSavingEdit}
                >
                  {isSavingEdit ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
