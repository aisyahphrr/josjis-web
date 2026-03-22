"use client"

import { useEffect, useMemo, useState } from "react"
import { Eye, Pencil, Search, Store, Trash2, Mail, Phone, MapPin, Tag, Package, Activity, FileText, User, Star } from "lucide-react"
import toast from "react-hot-toast"

import { dummyUmkm, type UmkmRecord } from "@/src/lib/dummyData"
import { PageHeader } from "@/src/components/views/admin/layouts/page-header"
import { TableSkeleton } from "@/src/components/views/admin/layouts/loading-skeletons"
import { ConfirmDialog } from "@/src/components/views/admin/layouts/confirm-dialog"
import { Card, CardContent } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
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

export default function AdminUmkmPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("Semua")
  const [items, setItems] = useState<UmkmRecord[]>(
    dummyUmkm.filter((u) => u.approvalStatus === "approved"),
  )

  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedUmkm, setSelectedUmkm] = useState<UmkmRecord | null>(null)

  const [editOpen, setEditOpen] = useState(false)
  const [selectedEditUmkm, setSelectedEditUmkm] = useState<UmkmRecord | null>(null)
  const [isSavingEdit, setIsSavingEdit] = useState(false)
  const [editForm, setEditForm] = useState<Partial<UmkmRecord>>({})

  const openEdit = (u: UmkmRecord) => {
    setSelectedEditUmkm(u)
    setEditForm({ name: u.name, ownerName: u.ownerName, phone: u.phone, category: u.category, address: u.address })
    setEditOpen(true)
  }

  const handleSaveEdit = async () => {
    if (!selectedEditUmkm) return
    setIsSavingEdit(true)
    await new Promise((r) => setTimeout(r, 1000))

    setItems((prev) =>
      prev.map((item) =>
        item.id === selectedEditUmkm.id ? { ...item, ...editForm } as UmkmRecord : item
      )
    )

    setIsSavingEdit(false)
    setEditOpen(false)
    toast.success("Perubahan data UMKM berhasil disimpan.")
  }

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 700)
    return () => window.clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items
      .filter((i) => (category === "Semua" ? true : i.category.toLowerCase() === category.toLowerCase()))
      .filter((i) =>
        q ? `${i.name} ${i.ownerName} ${i.id}`.toLowerCase().includes(q) : true,
      )
  }, [items, query, category])

  const openDetail = (u: UmkmRecord) => {
    setSelectedUmkm(u)
    setDetailOpen(true)
  }

  if (isLoading) return <TableSkeleton rows={6} />

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manajemen Mitra UMKM"
        subtitle="Kelola direktori UMKM JOSJIS. Lihat performa penjualan toko, kontak owner, atau blokir layanan (dummy)."
      />

      <Card className="rounded-3xl border-border/60 bg-card/60 backdrop-blur-xl overflow-hidden shadow-sm">
        <CardContent className="p-0">
          <div className="p-5 md:p-6 border-b border-border/60 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
            <div className="relative w-full md:w-[320px]">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari UMKM atau Pemilik..."
                className="h-10 rounded-2xl border-border/60 bg-background/50 pl-9"
              />
            </div>

            <Tabs value={category} onValueChange={setCategory} className="w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
              <TabsList className="h-10 rounded-2xl bg-muted/40 p-1 w-max md:w-auto">
                {["Semua", "Makanan", "Pakaian", "Kerajinan", "Jasa"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-xl px-4 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-border/60">
                  <TableHead className="py-4 pl-6 text-foreground font-semibold">Profil UMKM</TableHead>
                  <TableHead className="py-4 text-foreground font-semibold">Kategori</TableHead>
                  <TableHead className="py-4 text-foreground font-semibold">Performa</TableHead>
                  <TableHead className="py-4 text-foreground font-semibold">Kontak Utama</TableHead>
                  <TableHead className="py-4 text-right pr-6 text-foreground font-semibold">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-16 text-center text-muted-foreground">
                      <Store className="size-10 mx-auto opacity-20 mb-3" />
                      Tidak ada mitra UMKM di kategori ini.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((umkm) => (
                    <TableRow key={umkm.id} className="hover:bg-muted/20 border-b border-border/40">
                      <TableCell className="py-4 pl-6">
                        <div className="font-semibold text-foreground text-sm">{umkm.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">Owner: {umkm.ownerName}</div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/50 px-2.5 py-0.5 text-xs font-medium text-foreground">
                          {umkm.category === "Makanan" ? "🍔" : umkm.category === "Pakaian" ? "👕" : umkm.category === "Kerajinan" ? "🏺" : "💼"} {umkm.category}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="text-xs text-muted-foreground">
                          Sales: <span className="font-semibold text-foreground">Rp {umkm.totalSales.toLocaleString("id-ID")}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          Produk: <span className="text-foreground font-medium">{umkm.productCount} item</span> • ⭐ {umkm.rating}
                        </div>
                      </TableCell>
                      <TableCell className="py-4 max-w-[200px]">
                        <div className="text-xs font-medium text-foreground truncate">{umkm.phone}</div>
                        <div className="text-xs text-muted-foreground mt-0.5 truncate">{umkm.address}</div>
                      </TableCell>
                      <TableCell className="py-4 text-right pr-6">
                        <div className="flex justify-end items-center gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 rounded-full border border-border/60 hover:bg-muted/50 text-muted-foreground"
                            onClick={() => openEdit(umkm)}
                          >
                            <Pencil className="size-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 rounded-xl border-border/60 bg-background/50 hover:bg-muted/50 px-3 text-xs"
                            onClick={() => openDetail(umkm)}
                          >
                            <Eye className="mr-1.5 size-3.5 text-muted-foreground" /> Detail
                          </Button>
                          <ConfirmDialog
                            title="Hapus UMKM?"
                            description={`Anda akan menghapus ${umkm.name} (Milik ${umkm.ownerName}) secara permanen?`}
                            confirmText="Hapus"
                            confirmVariant="destructive"
                            onConfirm={() => {
                              setItems((prev) => prev.filter((x) => x.id !== umkm.id))
                              toast.success(`UMKM dihapus: ${umkm.name}`)
                            }}
                            trigger={
                              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-destructive hover:bg-destructive/10">
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

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-4xl rounded-3xl p-0 overflow-hidden flex flex-col max-h-[90vh] border-border/60 shadow-xl">
          <DialogHeader className="p-6 md:p-8 pb-5 bg-muted/20 border-b border-border/60 relative">
            <div className="flex items-start gap-4 pr-6">
              <div className="h-16 w-16 rounded-2xl bg-[#F99912]/10 border border-[#F99912]/20 flex items-center justify-center flex-shrink-0">
                <Store className="size-8 text-[#F99912]" />
              </div>
              <div className="pt-1">
                <DialogTitle className="text-2xl font-bold tracking-tight mb-2">{selectedUmkm?.name}</DialogTitle>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-background border border-border/60 px-2.5 py-0.5 text-xs font-medium">
                    <Tag className="size-3.5" /> {selectedUmkm?.category}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground flex items-center gap-1 px-1">
                    <Star className="size-4 text-[#F99912] fill-[#F99912]" /> {selectedUmkm?.rating} Rating User
                  </div>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-background/50">
            {selectedUmkm && (
              <div className="space-y-8">

                {/* Section 1: Business Overview */}
                <section>
                  <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
                    <Activity className="size-4 text-muted-foreground" /> Spesifikasi Penjualan
                  </h3>
                  <div className="rounded-2xl border border-border/60 bg-muted/10 p-5 space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4 border-b border-border/60">
                      <div>
                        <div className="text-xs text-muted-foreground font-medium mb-1">Tipe Produk</div>
                        <div className="text-sm font-bold text-foreground">{selectedUmkm.productType}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground font-medium mb-1">Total Produk</div>
                        <div className="text-sm font-bold text-foreground">{selectedUmkm.productCount} Items</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-xs text-muted-foreground font-medium mb-1">Total Omset Platform</div>
                        <div className="text-sm font-bold text-green-600 dark:text-green-400">Rp {selectedUmkm.totalSales.toLocaleString("id-ID")}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-medium mb-1.5 flex items-center gap-1.5"><FileText className="size-3.5" /> Deskripsi Toko</div>
                      <p className="text-sm leading-relaxed text-foreground/80">{selectedUmkm.description}</p>
                    </div>
                  </div>
                </section>

                {/* Section 2: Owner Contact */}
                <section>
                  <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
                    <User className="size-4 text-muted-foreground" /> Profil Pemilik & Kontak
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-4 rounded-2xl border border-border/60 bg-muted/10 p-4">
                      <div className="h-10 w-10 mt-0.5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="size-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-muted-foreground font-medium mb-0.5">Nama Registrasi Pemilik</div>
                        <div className="text-sm font-bold text-foreground break-words">{selectedUmkm.ownerName}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-2xl border border-border/60 bg-muted/10 p-4">
                      <div className="h-10 w-10 mt-0.5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="size-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-muted-foreground font-medium mb-0.5">Kontak Handphone</div>
                        <div className="text-sm font-bold text-foreground break-words">{selectedUmkm.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-2xl border border-border/60 bg-muted/10 p-4">
                      <div className="h-10 w-10 mt-0.5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="size-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-muted-foreground font-medium mb-0.5">Email Terdaftar</div>
                        <div className="text-sm font-bold text-foreground break-words">{selectedUmkm.email}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-2xl border border-border/60 bg-muted/10 p-4">
                      <div className="h-10 w-10 mt-0.5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="size-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-muted-foreground font-medium mb-0.5">Alamat Pusat / Operasional</div>
                        <div className="text-sm font-bold text-foreground break-words leading-snug">{selectedUmkm.address}</div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 3: Legal Documents */}
                <section>
                  <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
                    <Package className="size-4 text-muted-foreground" /> Dokumen Legalitas Platform
                  </h3>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-2">KTP Penanggung Jawab</div>
                      {selectedUmkm.ktpUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={selectedUmkm.ktpUrl}
                          alt="KTP"
                          className="h-44 w-full rounded-2xl object-cover border border-border/60 bg-muted/30 shadow-sm"
                        />
                      ) : (
                        <div className="h-44 w-full rounded-2xl border border-dashed border-border flex items-center justify-center text-sm text-muted-foreground bg-muted/10">Tidak ada KTP</div>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-2">Surat Izin Usaha / NIB</div>
                      {selectedUmkm.businessLicenseUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={selectedUmkm.businessLicenseUrl}
                          alt="Izin Usaha"
                          className="h-44 w-full rounded-2xl object-cover border border-border/60 bg-muted/30 shadow-sm"
                        />
                      ) : (
                        <div className="h-44 w-full rounded-2xl border border-dashed border-border flex items-center justify-center text-sm text-muted-foreground bg-muted/10">Tidak ada Dokumen</div>
                      )}
                    </div>
                  </div>
                </section>

              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit UMKM Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-md rounded-3xl p-6 border-border/60 shadow-xl">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-xl">Edit Data UMKM</DialogTitle>
          </DialogHeader>
          {selectedEditUmkm && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">Nama UMKM / Merchant</label>
                <Input
                  value={editForm.name || ""}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="h-10 rounded-xl border-border/60 bg-muted/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">Nama Pemilik (Owner)</label>
                <Input
                  value={editForm.ownerName || ""}
                  onChange={(e) => setEditForm(prev => ({ ...prev, ownerName: e.target.value }))}
                  className="h-10 rounded-xl border-border/60 bg-muted/20"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground">Kontak (Phone)</label>
                  <Input
                    value={editForm.phone || ""}
                    onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="h-10 rounded-xl border-border/60 bg-muted/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground">Kategori</label>
                  <Input
                    value={editForm.category || ""}
                    onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                    className="h-10 rounded-xl border-border/60 bg-muted/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">Alamat Outlet Pusat</label>
                <textarea
                  value={editForm.address || ""}
                  onChange={(e) => setEditForm(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full min-h-[80px] rounded-xl border border-input bg-muted/20 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
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
