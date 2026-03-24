"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Check,
  Search,
  X,
  Eye,
  FileText,
  Package,
  User,
  MapPin,
  Phone,
  Mail,
  Store,
  Tag,
  Pencil,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  dummyUmkm,
  type UmkmApprovalStatus,
  type UmkmRecord,
} from "@/src/lib/dummyData";
import { PageHeader } from "@/src/components/views/admin/layouts/page-header";
import { StatusBadge } from "@/src/components/views/admin/layouts/status-badge";
import { TableSkeleton } from "@/src/components/views/admin/layouts/loading-skeletons";
import { ConfirmDialog } from "@/src/components/views/admin/layouts/confirm-dialog";
import { RejectDialog } from "@/src/components/views/admin/layouts/reject-dialog";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";

const toneByStatus: Record<
  UmkmApprovalStatus,
  Parameters<typeof StatusBadge>[0]["tone"]
> = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
};

interface ValidasiUmkmPageProps {
  initialUmkm?: UmkmRecord[];
}

export default function ValidasiUmkmPage({
  initialUmkm = dummyUmkm,
}: ValidasiUmkmPageProps = {}) {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<UmkmRecord[]>(initialUmkm);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | UmkmApprovalStatus>("all");

  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedUmkm, setSelectedUmkm] = useState<UmkmRecord | null>(null);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedEditUmkm, setSelectedEditUmkm] = useState<UmkmRecord | null>(
    null,
  );
  const [editForm, setEditForm] = useState<Partial<UmkmRecord>>({});
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 800);
    return () => window.clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((i) => (status === "all" ? true : i.approvalStatus === status))
      .filter((i) =>
        q
          ? `${i.name} ${i.ownerName}`.toLowerCase().includes(q) ||
            i.id.toLowerCase().includes(q)
          : true,
      );
  }, [items, query, status]);

  const updateStatus = (
    id: string,
    next: UmkmApprovalStatus,
    reason?: string,
  ) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, approvalStatus: next } : it)),
    );
    if (selectedUmkm?.id === id) {
      setSelectedUmkm((prev) =>
        prev ? { ...prev, approvalStatus: next } : null,
      );
    }
  };

  const handleApproveUmkm = async (umkmId: string, umkmName: string) => {
    try {
      setIsApproving(true);
      const response = await fetch(`/api/admin/umkm/${umkmId}/approve`, {
        method: "POST",
      });

      if (!response.ok) {
        let errorMessage = "Failed to approve UMKM";
        try {
          const error = await response.json();
          errorMessage = error.message || errorMessage;
        } catch {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      updateStatus(umkmId, "approved");
      toast.success(`✓ Berhasil approve: ${umkmName}`);

      // Open wa.me link if available
      if (data.waLink) {
        setTimeout(() => {
          window.open(data.waLink, "_blank");
        }, 500);
      }

      setDetailOpen(false);
    } catch (error) {
      console.error("Approval error:", error);
      toast.error(
        `Failed to approve UMKM: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setIsApproving(false);
    }
  };

  const handleRejectUmkm = async (
    umkmId: string,
    umkmName: string,
    reason: string,
  ) => {
    try {
      setIsRejecting(true);
      const response = await fetch(`/api/admin/umkm/${umkmId}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: reason.trim() }),
      });

      if (!response.ok) {
        let errorMessage = "Failed to reject UMKM";
        try {
          const error = await response.json();
          errorMessage = error.message || errorMessage;
        } catch {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      updateStatus(umkmId, "rejected");
      toast.error(`✗ Rejected: ${umkmName}`);
      toast(`Reason: ${reason}`, { duration: 5000 });

      // Open wa.me link if available
      if (data.waLink) {
        setTimeout(() => {
          window.open(data.waLink, "_blank");
        }, 500);
      }

      setDetailOpen(false);
    } catch (error) {
      console.error("Reject error:", error);
      toast.error(
        `Failed to reject UMKM: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setIsRejecting(false);
    }
  };

  const openDetail = (u: UmkmRecord) => {
    setSelectedUmkm(u);
    setDetailOpen(true);
  };

  const openEdit = (u: UmkmRecord) => {
    setSelectedEditUmkm(u);
    setEditForm({ name: u.name, ownerName: u.ownerName, category: u.category });
    setEditOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedEditUmkm) return;
    setIsSavingEdit(true);
    await new Promise((r) => setTimeout(r, 1000));
    setItems((prev) =>
      prev.map((it) =>
        it.id === selectedEditUmkm.id
          ? ({ ...it, ...editForm } as UmkmRecord)
          : it,
      ),
    );
    setIsSavingEdit(false);
    setEditOpen(false);
    toast.success("Perubahan data registran UMKM disimpan.");
  };

  if (isLoading) return <TableSkeleton rows={7} />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Validasi UMKM"
        subtitle="Approve/Reject pengajuan UMKM. Lihat detail dokumen di Pop-up."
      />

      <Card className="rounded-3xl border-border/60 bg-card/60 backdrop-blur-xl shadow-sm">
        <CardContent className="p-4 md:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari nama UMKM / owner / ID..."
                className="h-10 rounded-2xl border-border/60 bg-muted/40 pl-9"
              />
            </div>

            <div className="flex items-center gap-2">
              <Select value={status} onValueChange={(v) => setStatus(v as any)}>
                <SelectTrigger className="h-10 w-52 rounded-2xl border-border/60 bg-muted/30">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="all">Semua status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                className="h-10 rounded-2xl border-border/60"
                onClick={() => {
                  setQuery("");
                  setStatus("all");
                  toast("Filter direset.");
                }}
              >
                Reset
              </Button>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto rounded-3xl border border-border/60">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="py-4 pl-6 text-foreground font-semibold">
                    Registran UMKM
                  </TableHead>
                  <TableHead className="py-4 text-foreground font-semibold">
                    Produk & Kategori
                  </TableHead>
                  <TableHead className="py-4 text-foreground font-semibold">
                    Status Pengajuan
                  </TableHead>
                  <TableHead className="py-4 text-right pr-6 text-foreground font-semibold">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="py-16 text-center text-muted-foreground"
                    >
                      <Store className="size-10 mx-auto opacity-20 mb-3" />
                      Tidak ada pengajuan (sesuai filter).
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((umkm) => (
                    <TableRow
                      key={umkm.id}
                      className="hover:bg-muted/20 border-b border-border/40"
                    >
                      <TableCell className="py-4 pl-6">
                        <div className="font-semibold text-foreground">
                          {umkm.name}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {umkm.id}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="font-medium text-sm text-foreground flex items-center gap-1.5">
                          <Tag className="size-3.5" /> {umkm.category}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {umkm.productCount} produk terdaftar
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <StatusBadge tone={toneByStatus[umkm.approvalStatus]}>
                          {umkm.approvalStatus}
                        </StatusBadge>
                      </TableCell>
                      <TableCell className="py-4 text-right pr-6">
                        <div className="inline-flex items-center justify-end gap-2 w-full">
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
                            <Eye className="mr-1.5 size-3.5 text-muted-foreground" />{" "}
                            Detail & Validasi
                          </Button>
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

      {/* Detail & Validasi Modal */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-4xl rounded-3xl p-0 overflow-hidden flex flex-col max-h-[90vh] border-border/60 shadow-xl">
          <DialogHeader className="p-6 md:p-8 pb-5 bg-muted/20 border-b border-border/60 relative">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-[#F99912]/10 border border-[#F99912]/20 flex items-center justify-center shrink-0">
                <Store className="size-8 text-[#F99912]" />
              </div>
              <div className="pt-1">
                <DialogTitle className="text-2xl font-bold tracking-tight mb-2">
                  Peninjauan UMKM
                </DialogTitle>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    ID: {selectedUmkm?.id}
                  </span>
                  <StatusBadge
                    tone={
                      selectedUmkm
                        ? toneByStatus[selectedUmkm.approvalStatus]
                        : "warning"
                    }
                  >
                    {selectedUmkm?.approvalStatus}
                  </StatusBadge>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-background/50">
            {selectedUmkm && (
              <div className="space-y-8">
                {/* Toko details */}
                <section>
                  <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
                    <Store className="size-4 text-muted-foreground" /> Informasi
                    Usaha / Toko
                  </h3>
                  <div className="rounded-2xl border border-border/60 bg-muted/10 p-5 space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-4 border-b border-border/60">
                      <div>
                        <div className="text-xs text-muted-foreground font-medium mb-1">
                          Nama Toko
                        </div>
                        <div className="text-sm font-bold text-foreground">
                          {selectedUmkm.name}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground font-medium mb-1">
                          Kategori Toko
                        </div>
                        <div className="text-sm font-bold text-foreground inline-flex items-center gap-1">
                          <Tag className="size-3 text-muted-foreground" />{" "}
                          {selectedUmkm.category}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground font-medium mb-1">
                          Total SKU Produk
                        </div>
                        <div className="text-sm font-bold text-foreground">
                          <Package className="size-3.5 inline mr-1 text-muted-foreground" />
                          {selectedUmkm.productCount} Items
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-medium mb-1.5 flex items-center gap-1.5">
                        <FileText className="size-3.5" /> Deskripsi Toko &
                        Penjualan
                      </div>
                      <p className="text-sm leading-relaxed text-foreground/80">
                        {selectedUmkm.description}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Owner Contacts */}
                <section>
                  <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
                    <User className="size-4 text-muted-foreground" /> Data
                    Penanggung Jawab
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-4 rounded-2xl border border-border/60 bg-muted/10 p-4">
                      <div className="h-10 w-10 mt-0.5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <User className="size-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-muted-foreground font-medium mb-0.5">
                          Nama Sesuai KTP / Registrasi
                        </div>
                        <div className="text-sm font-bold text-foreground">
                          {selectedUmkm.ownerName}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-2xl border border-border/60 bg-muted/10 p-4">
                      <div className="h-10 w-10 mt-0.5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Phone className="size-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-muted-foreground font-medium mb-0.5">
                          Kontak Aktif (WhatsApp)
                        </div>
                        <div className="text-sm font-bold text-foreground">
                          {selectedUmkm.phone}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-2xl border border-border/60 bg-muted/10 p-4">
                      <div className="h-10 w-10 mt-0.5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Mail className="size-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-muted-foreground font-medium mb-0.5">
                          Email Bisnis Terdaftar
                        </div>
                        <div className="text-sm font-bold text-foreground">
                          {selectedUmkm.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-2xl border border-border/60 bg-muted/10 p-4">
                      <div className="h-10 w-10 mt-0.5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="size-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-muted-foreground font-medium mb-0.5">
                          Alamat Tempat Usaha
                        </div>
                        <div className="text-sm font-bold text-foreground leading-snug">
                          {selectedUmkm.address}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Documents */}
                <section>
                  <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
                    <Package className="size-4 text-muted-foreground" />{" "}
                    Validasi Dokumen (Mockup)
                  </h3>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          Kartu Tanda Penduduk
                        </span>
                        {selectedUmkm.ktpUrl && (
                          <span className="text-xs text-green-500 font-medium">
                            Terlampir
                          </span>
                        )}
                      </div>
                      {selectedUmkm.ktpUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={selectedUmkm.ktpUrl}
                          alt="KTP"
                          className="h-56 w-full rounded-2xl object-cover border border-border/60 bg-muted/30 shadow-sm"
                        />
                      ) : (
                        <div className="h-56 w-full rounded-2xl border border-dashed border-border flex items-center justify-center text-sm text-muted-foreground bg-muted/10">
                          Tidak Ada KTP
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          SKU / Izin Usaha / NIB
                        </span>
                        {selectedUmkm.businessLicenseUrl && (
                          <span className="text-xs text-green-500 font-medium">
                            Terlampir
                          </span>
                        )}
                      </div>
                      {selectedUmkm.businessLicenseUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={selectedUmkm.businessLicenseUrl}
                          alt="Dokumen Usaha"
                          className="h-56 w-full rounded-2xl object-cover border border-border/60 bg-muted/30 shadow-sm"
                        />
                      ) : (
                        <div className="h-56 w-full rounded-2xl border border-dashed border-border flex items-center justify-center text-sm text-muted-foreground bg-muted/10">
                          Tidak Ada Izin Usaha
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>

          {/* Action Footer */}
          {selectedUmkm?.approvalStatus === "pending" ? (
            <div className="p-4 md:p-6 bg-muted/30 border-t border-border/60 flex flex-wrap items-center justify-end gap-3 rounded-b-3xl">
              <Button
                variant="outline"
                className="h-10 rounded-xl px-5 border-border/60 bg-background"
                onClick={() => setDetailOpen(false)}
                disabled={isApproving || isRejecting}
              >
                Tutup Review
              </Button>
              <RejectDialog
                onReject={(reason) => {
                  handleRejectUmkm(selectedUmkm.id, selectedUmkm.name, reason);
                }}
                trigger={
                  <Button
                    variant="destructive"
                    className="h-10 rounded-xl px-6"
                    disabled={isApproving || isRejecting}
                  >
                    <X className="mr-2 size-4" />{" "}
                    {isRejecting ? "Loading..." : "Tolak Ajuan"}
                  </Button>
                }
              />
              <ConfirmDialog
                title="Approve Mitra UMKM?"
                description={`Anda akan menyetujui ${selectedUmkm.name} beroperasi di Platform JOSJIS.`}
                confirmText={isApproving ? "Loading..." : "Approve Sekarang"}
                onConfirm={() => {
                  handleApproveUmkm(selectedUmkm.id, selectedUmkm.name);
                }}
                trigger={
                  <Button
                    className="h-10 rounded-xl px-6 bg-[#64762C] hover:bg-[#64762C]/90 text-white"
                    disabled={isApproving || isRejecting}
                  >
                    <Check className="mr-2 size-4" /> Approve Mitra UMKM
                  </Button>
                }
              />
            </div>
          ) : (
            <div className="p-4 md:p-5 bg-muted/10 border-t border-border/60 text-center rounded-b-3xl">
              <p className="text-sm font-medium text-muted-foreground">
                Mitra UMKM ini sudah di-
                <strong className="text-foreground">
                  {selectedUmkm?.approvalStatus}
                </strong>
                . Tidak bisa diubah lagi.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-md rounded-3xl p-6 border-border/60 shadow-xl">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-xl">Edit Data Registrasi</DialogTitle>
          </DialogHeader>
          {selectedEditUmkm && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">
                  Nama UMKM Sesuai Izin
                </label>
                <Input
                  value={editForm.name || ""}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="h-10 rounded-xl border-border/60 bg-muted/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">
                  Penanggung Jawab KTP
                </label>
                <Input
                  value={editForm.ownerName || ""}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      ownerName: e.target.value,
                    }))
                  }
                  className="h-10 rounded-xl border-border/60 bg-muted/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">
                  Kategori Operasional
                </label>
                <Input
                  value={editForm.category || ""}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="h-10 rounded-xl border-border/60 bg-muted/20"
                />
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-border/60 mt-2">
                <Button
                  variant="outline"
                  className="rounded-xl h-10 px-6 border-border/60"
                  onClick={() => setEditOpen(false)}
                >
                  Batal
                </Button>
                <Button
                  className="rounded-xl h-10 px-6 bg-[#F99912] text-white hover:bg-[#F99912]/90 w-36"
                  onClick={handleSaveEdit}
                  disabled={isSavingEdit}
                >
                  {isSavingEdit ? "Menyimpan..." : "Simpan Mutasi"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
