"use client"

import { useEffect, useMemo, useState } from "react"
import { Check, Search, X } from "lucide-react"
import toast from "react-hot-toast"

import { dummyUmkm, type UmkmApprovalStatus, type UmkmRecord } from "@/lib/dummyData"
import { PageHeader } from "@/components/admin/page-header"
import { StatusBadge } from "@/components/admin/status-badge"
import { TableSkeleton } from "@/components/admin/loading-skeletons"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { RejectDialog } from "@/components/admin/reject-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const toneByStatus: Record<UmkmApprovalStatus, Parameters<typeof StatusBadge>[0]["tone"]> =
  {
    pending: "warning",
    approved: "success",
    rejected: "danger",
  }

export default function ValidasiUmkmPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [items, setItems] = useState<UmkmRecord[]>(dummyUmkm)
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<"all" | UmkmApprovalStatus>("all")

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 800)
    return () => window.clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items
      .filter((i) => (status === "all" ? true : i.approvalStatus === status))
      .filter((i) =>
        q
          ? `${i.name} ${i.ownerName}`.toLowerCase().includes(q) ||
            i.id.toLowerCase().includes(q)
          : true,
      )
  }, [items, query, status])

  const updateStatus = (id: string, next: UmkmApprovalStatus) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, approvalStatus: next } : it)),
    )
  }

  if (isLoading) return <TableSkeleton rows={7} />

  return (
    <div className="space-y-6">
      <PageHeader
        title="Validasi UMKM"
        subtitle="Approve/Reject pengajuan UMKM. Semua perubahan hanya tersimpan lokal (dummy)."
      />

      <Card className="rounded-2xl border-border/60 bg-card/60 backdrop-blur-xl">
        <CardContent className="p-4 md:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:w-[380px]">
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
                <SelectTrigger className="h-10 w-[210px] rounded-2xl border-border/60 bg-muted/30">
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
                  <TableHead>Nama UMKM</TableHead>
                  <TableHead>Produk</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                      Tidak ada data yang cocok.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((umkm) => (
                    <TableRow key={umkm.id} className="hover:bg-muted/20">
                      <TableCell>
                        <div className="font-semibold text-foreground">{umkm.name}</div>
                        <div className="text-xs text-muted-foreground">{umkm.ownerName}</div>
                        <div className="text-xs text-muted-foreground">{umkm.id}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{umkm.productCount}</div>
                        <div className="text-xs text-muted-foreground">produk terdaftar</div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge tone={toneByStatus[umkm.approvalStatus]}>
                          {umkm.approvalStatus}
                        </StatusBadge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex items-center gap-2">
                          <ConfirmDialog
                            title="Approve UMKM?"
                            description={`Anda akan menyetujui ${umkm.name}.`}
                            confirmText="Approve"
                            onConfirm={() => {
                              updateStatus(umkm.id, "approved")
                              toast.success(`Approved: ${umkm.name}`)
                            }}
                            trigger={
                              <Button
                                size="sm"
                                className="h-9 rounded-2xl bg-[#64762C] hover:bg-[#64762C]/90 text-foreground"
                                disabled={umkm.approvalStatus === "approved"}
                              >
                                <Check className="mr-1 size-4" />
                                Approve
                              </Button>
                            }
                          />

                          <RejectDialog
                            onReject={(reason) => {
                              updateStatus(umkm.id, "rejected")
                              toast.error(`Rejected: ${umkm.name}`)
                              toast(`Reason: ${reason}`, { duration: 5000 })
                            }}
                            trigger={
                              <Button
                                size="sm"
                                variant="destructive"
                                className="h-9 rounded-2xl"
                                disabled={umkm.approvalStatus === "rejected"}
                              >
                                <X className="mr-1 size-4" />
                                Reject
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
    </div>
  )
}

