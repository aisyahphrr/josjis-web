"use client"

import { useEffect, useMemo, useState } from "react"
import { Eye, Search, Package, User, CalendarDays, Store, Truck, CreditCard, AlertCircle } from "lucide-react"
import toast from "react-hot-toast"

import {
  dummyTransactions,
  type TransactionRecord,
  type TransactionStatus,
} from "@/src/lib/dummyData"
import { PageHeader } from "@/src/components/views/admin/layouts/page-header"
import { TableSkeleton } from "@/src/components/views/admin/layouts/loading-skeletons"
import { StatusBadge } from "@/src/components/views/admin/layouts/status-badge"
import { Card, CardContent } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"

const toneByStatus: Record<TransactionStatus, Parameters<typeof StatusBadge>[0]["tone"]> =
{
  pending: "warning",
  success: "success",
  failed: "danger",
}

export default function AdminTransaksiPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<"all" | TransactionStatus>("all")
  const [rows] = useState<TransactionRecord[]>(dummyTransactions)

  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedTrx, setSelectedTrx] = useState<TransactionRecord | null>(null)

  const openDetail = (trx: TransactionRecord) => {
    setSelectedTrx(trx)
    setDetailOpen(true)
  }

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 750)
    return () => window.clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rows
      .filter((r) => (status === "all" ? true : r.status === status))
      .filter((r) =>
        q
          ? `${r.id} ${r.userName} ${r.userEmail}`.toLowerCase().includes(q)
          : true,
      )
  }, [rows, query, status])

  if (isLoading) return <TableSkeleton rows={7} />

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transaksi"
        subtitle="Monitoring transaksi dengan filter status. (Dummy, siap disambungkan ke API.)"
      />

      <Card className="rounded-2xl border-border/60 bg-card/60 backdrop-blur-xl">
        <CardContent className="p-4 md:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:w-[380px]">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari ID / user / email..."
                className="h-10 rounded-2xl border-border/60 bg-muted/40 pl-9"
              />
            </div>

            <div className="flex items-center gap-2">
              <Select value={status} onValueChange={(v) => setStatus(v as any)}>
                <SelectTrigger className="h-10 w-[220px] rounded-2xl border-border/60 bg-muted/30">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="all">Semua status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="success">Selesai</SelectItem>
                  <SelectItem value="failed">Gagal</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                className="h-10 rounded-2xl border-border/60"
                onClick={() => {
                  setQuery("")
                  setStatus("all")
                  toast("Filter direset.")
                }}
              >
                Reset
              </Button>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-border/60">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead>ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
                      Tidak ada transaksi.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((trx) => (
                    <TableRow key={trx.id} className="hover:bg-muted/20">
                      <TableCell className="font-semibold text-foreground">{trx.id}</TableCell>
                      <TableCell>
                        <div className="font-medium text-foreground">{trx.userName}</div>
                        <div className="text-xs text-muted-foreground">{trx.userEmail}</div>
                      </TableCell>
                      <TableCell className="font-semibold text-foreground">
                        Rp {trx.total.toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell>
                        <StatusBadge tone={toneByStatus[trx.status]}>{trx.status}</StatusBadge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-9 rounded-2xl border-border/60 hover:bg-muted/50"
                          onClick={() => openDetail(trx)}
                        >
                          <Eye className="mr-1 size-4" />
                          Detail
                        </Button>
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
        <DialogContent className="max-w-2xl rounded-3xl p-0 overflow-hidden flex flex-col max-h-[85vh]">
          <DialogHeader className="p-6 pb-4 bg-muted/20 border-b border-border/60">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl flex items-center gap-2 mb-1">
                  <Package className="size-5 text-[#F99912]" /> Detail Transaksi
                </DialogTitle>
                <DialogDescription>
                  ID: <span className="font-mono font-medium text-foreground">{selectedTrx?.id}</span>
                </DialogDescription>
              </div>
              {selectedTrx && (
                <StatusBadge tone={toneByStatus[selectedTrx.status]}>
                  {selectedTrx.status.toUpperCase()}
                </StatusBadge>
              )}
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-6">
            {selectedTrx && (
              <div className="space-y-6">

                {selectedTrx.status === "failed" && selectedTrx.failedReason && (
                  <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4">
                    <div className="flex items-center gap-2 font-semibold text-destructive mb-1.5 text-sm">
                      <AlertCircle className="size-4" /> Alasan Kegagalan:
                    </div>
                    <div className="text-sm text-foreground/80 leading-relaxed font-medium">{selectedTrx.failedReason}</div>
                  </div>
                )}

                {/* 1. Overview Info */}
                <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border/60 bg-muted/20 p-4">
                  <div>
                    <div className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-1.5"><User className="size-3.5" /> Pembeli</div>
                    <div className="font-semibold text-foreground text-sm">{selectedTrx.userName}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{selectedTrx.userEmail}</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-1.5"><CalendarDays className="size-3.5" /> Waktu Pesanan</div>
                    <div className="font-semibold text-foreground text-sm">{new Date(selectedTrx.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{new Date(selectedTrx.createdAt).toLocaleTimeString("id-ID")} WIB</div>
                  </div>
                </div>

                {/* 2. Fulfillment Info */}
                <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border/60 bg-muted/20 p-4">
                  <div>
                    <div className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-1.5"><Store className="size-3.5" /> Merchant / UMKM</div>
                    <div className="font-semibold text-foreground text-sm">{selectedTrx.umkmName || "-"}</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-1.5"><Truck className="size-3.5" /> Driver Pengantar</div>
                    <div className="font-semibold text-foreground text-sm">{selectedTrx.driverName || "-"}</div>
                  </div>
                </div>

                {/* 3. Items Bought */}
                <div>
                  <h3 className="font-semibold text-sm mb-3">Rincian Pembayaran</h3>
                  <div className="rounded-2xl border border-border/60 overflow-hidden">
                    <Table>
                      <TableHeader className="bg-muted/30">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="py-3">Deskripsi Tagihan</TableHead>
                          <TableHead className="py-3 text-center w-[80px]">Qty</TableHead>
                          <TableHead className="py-3 text-right">Harga</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedTrx.items?.map((item, idx) => (
                          <TableRow key={idx} className="hover:bg-transparent">
                            <TableCell className="py-3 text-sm">{item.name}</TableCell>
                            <TableCell className="py-3 text-sm text-center font-medium bg-muted/10">{item.qty}x</TableCell>
                            <TableCell className="py-3 text-sm text-right">Rp {(item.price * item.qty).toLocaleString("id-ID")}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="p-5 bg-muted/20 border-t border-border/60 flex justify-between items-center px-4 md:px-6">
                      <div className="font-medium text-foreground flex items-center gap-2.5 text-sm">
                        <div className="p-1.5 bg-background rounded-md border border-border/60"><CreditCard className="size-4" /></div>
                        {selectedTrx.paymentMethod || "N/A"}
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-medium text-muted-foreground mb-1">Total Tagihan</div>
                        <div className="text-xl font-bold text-foreground">Rp {selectedTrx.total.toLocaleString("id-ID")}</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

