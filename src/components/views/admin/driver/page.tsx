"use client"

import { useEffect, useMemo, useState } from "react"
import { Eye, Pencil, Search, Trash2 } from "lucide-react"
import toast from "react-hot-toast"

import { dummyUsers, type UserRecord } from "@/src/lib/dummyData"
import { PageHeader } from "@/src/components/views/admin/layouts/page-header"
import { TableSkeleton } from "@/src/components/views/admin/layouts/loading-skeletons"
import { ConfirmDialog } from "@/src/components/views/admin/layouts/confirm-dialog"
import { StatusBadge } from "@/src/components/views/admin/layouts/status-badge"
import { Card, CardContent } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Switch } from "@/src/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table"

export default function AdminDriverPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [rows, setRows] = useState<UserRecord[]>(
    dummyUsers.filter((u) => u.role === "driver"),
  )

  const [filterStatus, setFilterStatus] = useState("all")
  const [editOpen, setEditOpen] = useState(false)
  const [editingDriver, setEditingDriver] = useState<UserRecord | null>(null)

  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState<UserRecord | null>(null)

  const [rejectOpen, setRejectOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState("")

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 650)
    return () => window.clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rows.filter((r) => {
      const matchSearch = q ? `${r.name} ${r.email} ${r.id}`.toLowerCase().includes(q) : true
      let matchFilter = true
      if (filterStatus === "active") matchFilter = r.approvalStatus === "approved"
      else if (filterStatus === "pending") matchFilter = r.approvalStatus === "pending"
      else if (filterStatus === "rejected") matchFilter = r.approvalStatus === "rejected"
      return matchSearch && matchFilter
    })
  }, [rows, query, filterStatus])

  const openDetail = (d: UserRecord) => {
    setSelectedDriver(d)
    setDetailOpen(true)
  }

  if (isLoading) return <TableSkeleton rows={6} />

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manajemen Driver"
        subtitle="Kelola akun driver: suspend, edit, atau hapus (dummy)."
        actions={
          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari driver..."
              className="h-10 rounded-2xl border-border/60 bg-muted/40 pl-9"
            />
          </div>
        }
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Tabs defaultValue="all" value={filterStatus} onValueChange={setFilterStatus} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-4 sm:w-auto sm:inline-flex rounded-2xl">
            <TabsTrigger value="all" className="rounded-xl">Semua</TabsTrigger>
            <TabsTrigger value="active" className="rounded-xl">Aktif</TabsTrigger>
            <TabsTrigger value="pending" className="rounded-xl">Menunggu</TabsTrigger>
            <TabsTrigger value="rejected" className="rounded-xl">Ditolak</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card className="rounded-2xl border-border/60 bg-card/60 backdrop-blur-xl">
        <CardContent className="p-0">
          <div className="overflow-hidden rounded-2xl">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="py-12 text-center text-muted-foreground">
                      Tidak ada driver.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((d) => (
                    <TableRow key={d.id} className="hover:bg-muted/20">
                      <TableCell>
                        <div className="font-semibold text-foreground">{d.name}</div>
                        <div className="text-xs text-muted-foreground">{d.id}</div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{d.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <StatusBadge
                            tone={d.approvalStatus === "approved" ? "success" : d.approvalStatus === "pending" ? "warning" : "danger"}
                          >
                            {d.approvalStatus === "approved" ? "Aktif" : d.approvalStatus === "pending" ? "Menunggu ACC" : "Ditolak"}
                          </StatusBadge>
                          {d.approvalStatus === "approved" && (
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={d.status === "suspended"}
                                onCheckedChange={() => {
                                  setRows((prev) =>
                                    prev.map((x) =>
                                      x.id === d.id
                                        ? {
                                          ...x,
                                          status: x.status === "active" ? "suspended" : "active",
                                        }
                                        : x,
                                    ),
                                  )
                                  toast(d.status === "active" ? "Driver disuspend." : "Driver diaktifkan.")
                                }}
                              />
                              <span className="text-xs text-muted-foreground">Suspend</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex flex-wrap items-center justify-end gap-2 w-full">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-9 rounded-2xl border-border/60"
                            onClick={() => {
                              setEditingDriver(d)
                              setEditOpen(true)
                            }}
                          >
                            <Pencil className="mr-1 size-4" />
                            Edit
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            className="h-9 rounded-2xl border-border/60"
                            onClick={() => openDetail(d)}
                          >
                            <Eye className="mr-1 size-4" />
                            Detail
                          </Button>
                          <ConfirmDialog
                            title="Hapus driver?"
                            description={`Anda akan menghapus ${d.name} dari daftar (dummy).`}
                            confirmText="Hapus"
                            confirmVariant="destructive"
                            onConfirm={() => {
                              setRows((prev) => prev.filter((x) => x.id !== d.id))
                              toast.success("Driver dihapus.")
                            }}
                            trigger={
                              <Button size="sm" variant="destructive" className="h-9 rounded-2xl">
                                <Trash2 className="mr-1 size-4" />
                                Delete
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

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-3xl rounded-2xl p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle>Detail Driver</DialogTitle>
            <DialogDescription>
              {selectedDriver ? (
                <span className="text-muted-foreground">{selectedDriver.name}</span>
              ) : (
                "—"
              )}
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-[70vh] px-6 pb-6 pr-4">
            <div className="space-y-6">
              {selectedDriver?.approvalStatus === "rejected" && selectedDriver?.rejectionReason && (
                <section className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4">
                  <h3 className="text-sm font-semibold text-destructive flex items-center gap-2">
                    <span className="size-2 rounded-full bg-destructive"></span>
                    Pendaftaran Ditolak
                  </h3>
                  <div className="mt-2 text-sm text-foreground">
                    <span className="font-medium block mb-1">Alasan Penolakan:</span>
                    <p className="text-muted-foreground bg-background/50 p-3 rounded-xl border border-border/60">
                      {selectedDriver.rejectionReason}
                    </p>
                  </div>
                </section>
              )}

              <section className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                <h3 className="text-sm font-semibold text-foreground">Registrasi</h3>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <div>
                    <div className="text-xs text-muted-foreground">Name</div>
                    <div className="font-medium text-foreground">
                      {selectedDriver?.name ?? "-"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Email</div>
                    <div className="text-sm text-foreground">
                      {selectedDriver?.email ?? "-"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Phone</div>
                    <div className="text-sm text-foreground">
                      {selectedDriver?.phone ?? "-"}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-xs text-muted-foreground">Address</div>
                    <div className="text-sm text-foreground">
                      {selectedDriver?.address ?? "-"}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-xs text-muted-foreground">Registration date</div>
                    <div className="text-sm text-foreground">
                      {selectedDriver
                        ? new Date(selectedDriver.createdAt).toLocaleDateString("id-ID")
                        : "-"}
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                <h3 className="text-sm font-semibold text-foreground">Informasi Driver</h3>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <div>
                    <div className="text-xs text-muted-foreground">Vehicle type</div>
                    <div className="text-sm text-foreground">
                      {selectedDriver?.vehicleType ?? "-"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">License number</div>
                    <div className="text-sm text-foreground">
                      {selectedDriver?.licenseNumber ?? "-"}
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                <h3 className="text-sm font-semibold text-foreground">Dokumen Pendukung</h3>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-border/60 bg-background/40 p-3">
                    <div className="text-xs text-muted-foreground">KTP</div>
                    <div className="mt-2">
                      {selectedDriver?.ktpUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={selectedDriver.ktpUrl}
                          alt="KTP"
                          className="h-28 w-full rounded-xl object-cover border border-border/60 bg-muted/20"
                        />
                      ) : (
                        <div className="text-sm text-muted-foreground">Tidak ada</div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-background/40 p-3">
                    <div className="text-xs text-muted-foreground">Driver license (SIM)</div>
                    <div className="mt-2">
                      {selectedDriver?.driverLicenseUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={selectedDriver.driverLicenseUrl}
                          alt="SIM"
                          className="h-28 w-full rounded-xl object-cover border border-border/60 bg-muted/20"
                        />
                      ) : (
                        <div className="text-sm text-muted-foreground">Tidak ada</div>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-2 rounded-2xl border border-border/60 bg-background/40 p-3">
                    <div className="text-xs text-muted-foreground">File lainnya</div>
                    <div className="mt-2 grid gap-3 sm:grid-cols-2">
                      {(selectedDriver?.otherDocumentUrls ?? []).length > 0 ? (
                        (selectedDriver?.otherDocumentUrls ?? []).map((url) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={url}
                            src={url}
                            alt="Dokumen"
                            className="h-24 w-full rounded-xl object-cover border border-border/60 bg-muted/20"
                          />
                        ))
                      ) : (
                        <div className="text-sm text-muted-foreground sm:col-span-2">
                          Tidak ada file lainnya
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </ScrollArea>

          {selectedDriver?.approvalStatus === "pending" && (
            <div className="flex justify-end gap-3 p-6 pt-4 border-t border-border/60 bg-muted/10">
              <Button
                variant="destructive"
                className="rounded-2xl hover:bg-destructive/90"
                onClick={() => {
                  setRejectReason("")
                  setRejectOpen(true)
                }}
              >
                Tolak Pendaftaran
              </Button>
              <Button
                className="rounded-2xl bg-success text-success-foreground hover:bg-success/90"
                onClick={() => {
                  setRows((prev) =>
                    prev.map((x) => (x.id === selectedDriver.id ? { ...x, approvalStatus: "approved", status: "active" } : x))
                  )
                  setDetailOpen(false)
                  toast.success("Driver disetujui.")
                }}
              >
                Terima Pendaftaran
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-4 bg-muted/20 border-b border-border/60">
            <DialogTitle>Tolak Pendaftaran Driver</DialogTitle>
            <DialogDescription>
              Silakan masukkan alasan penolakan untuk {selectedDriver?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="p-6">
            <div className="space-y-3">
              <label className="text-sm font-medium">Alasan Penolakan <span className="text-destructive">*</span></label>
              <textarea
                className="flex w-full rounded-2xl border border-input bg-background/50 px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground min-h-[120px] resize-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Contoh: Dokumen SIM buram dan STNK tidak sesuai identitas."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 p-6 pt-4 border-t border-border/60 bg-muted/10">
            <Button variant="outline" className="rounded-2xl" onClick={() => setRejectOpen(false)}>
              Batal
            </Button>
            <Button
              variant="destructive"
              className="rounded-2xl"
              disabled={!rejectReason.trim()}
              onClick={() => {
                if (selectedDriver) {
                  setRows((prev) =>
                    prev.map((x) =>
                      x.id === selectedDriver.id
                        ? { ...x, approvalStatus: "rejected", status: "suspended", rejectionReason: rejectReason.trim() }
                        : x
                    )
                  )
                  setRejectOpen(false)
                  setDetailOpen(false)
                  toast.success(`Alasan penolakan berhasil disimpan (dummy).`)
                }
              }}
            >
              Konfirmasi Tolak
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Edit Driver</DialogTitle>
            <DialogDescription>
              Ubah informasi driver. Perubahan hanya tersimpan lokal (dummy).
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nama</label>
              <Input
                className="rounded-2xl"
                value={editingDriver?.name ?? ""}
                onChange={(e) => editingDriver && setEditingDriver({ ...editingDriver, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                className="rounded-2xl"
                value={editingDriver?.email ?? ""}
                onChange={(e) => editingDriver && setEditingDriver({ ...editingDriver, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Telepon</label>
              <Input
                className="rounded-2xl"
                value={editingDriver?.phone ?? ""}
                onChange={(e) => editingDriver && setEditingDriver({ ...editingDriver, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Jenis Kendaraan</label>
              <Input
                className="rounded-2xl"
                value={editingDriver?.vehicleType ?? ""}
                onChange={(e) => editingDriver && setEditingDriver({ ...editingDriver, vehicleType: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-border/60">
            <Button variant="outline" className="rounded-2xl" onClick={() => setEditOpen(false)}>
              Batal
            </Button>
            <Button
              className="rounded-2xl bg-[#F99912] text-black hover:bg-[#F99912]/90"
              onClick={() => {
                if (editingDriver) {
                  setRows((prev) => prev.map((x) => (x.id === editingDriver.id ? editingDriver : x)))
                  setEditOpen(false)
                  toast.success("Data driver berhasil diperbarui (dummy).")
                }
              }}
            >
              Simpan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

