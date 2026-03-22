"use client"

import { useEffect, useMemo, useState } from "react"
import { MessageSquare, Search } from "lucide-react"
import toast from "react-hot-toast"

import { dummyReports, type ReportRecord, type ReportStatus } from "@/src/lib/dummyData"
import { PageHeader } from "@/src/components/views/admin/layouts/page-header"
import { TableSkeleton } from "@/src/components/views/admin/layouts/loading-skeletons"
import { StatusBadge } from "@/src/components/views/admin/layouts/status-badge"
import { Card, CardContent } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
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
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs"

const nextStatus: Record<ReportStatus, ReportStatus> = {
  pending: "processing",
  processing: "done",
  done: "done",
}

const toneByStatus: Record<ReportStatus, Parameters<typeof StatusBadge>[0]["tone"]> =
{
  pending: "warning",
  processing: "info",
  done: "success",
}

const labelByStatus: Record<ReportStatus, string> = {
  pending: "Pending",
  processing: "Diproses",
  done: "Selesai",
}

export default function AdminLaporanPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [items, setItems] = useState<ReportRecord[]>(dummyReports)

  const [filterStatus, setFilterStatus] = useState("all")

  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState<ReportRecord | null>(null)
  const [replyText, setReplyText] = useState("")
  const [statusVal, setStatusVal] = useState<ReportStatus>("pending")

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 700)
    return () => window.clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((r) => {
      const matchSearch = q ? `${r.title} ${r.userName} ${r.id}`.toLowerCase().includes(q) : true
      const matchFilter = filterStatus === "all" || r.status === filterStatus
      return matchSearch && matchFilter
    })
  }, [items, query, filterStatus])

  const openDetail = (r: ReportRecord) => {
    setSelectedReport(r)
    setReplyText(r.adminReply || "")
    setStatusVal(r.status)
    setDetailOpen(true)
  }

  const saveReply = () => {
    if (!selectedReport) return
    setItems((prev) =>
      prev.map((r) =>
        r.id === selectedReport.id
          ? { ...r, status: statusVal, adminReply: replyText.trim() }
          : r
      )
    )
    setDetailOpen(false)
    toast.success("Tanggapan dan status laporan diperbarui.")
  }

  if (isLoading) return <TableSkeleton rows={6} />

  return (
    <div className="space-y-6">
      <PageHeader
        title="Laporan & Komplain"
        subtitle="Kelola laporan user dan update statusnya secara bertahap. (Dummy)"
        actions={
          <div className="relative w-full md:w-[340px]">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari laporan..."
              className="h-10 rounded-2xl border-border/60 bg-muted/40 pl-9"
            />
          </div>
        }
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Tabs defaultValue="all" value={filterStatus} onValueChange={setFilterStatus} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-4 sm:w-auto sm:inline-flex rounded-2xl">
            <TabsTrigger value="all" className="rounded-xl">Semua</TabsTrigger>
            <TabsTrigger value="pending" className="rounded-xl">Pending</TabsTrigger>
            <TabsTrigger value="processing" className="rounded-xl">Diproses</TabsTrigger>
            <TabsTrigger value="done" className="rounded-xl">Selesai</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card className="rounded-2xl border-border/60 bg-card/60 backdrop-blur-xl">
        <CardContent className="p-0">
          <div className="overflow-hidden rounded-2xl">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="w-[120px]">ID Tiket</TableHead>
                  <TableHead>Topik Laporan</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                      Tidak ada laporan.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((r) => (
                    <TableRow key={r.id} className="hover:bg-muted/20">
                      <TableCell className="font-medium text-foreground">{r.id}</TableCell>
                      <TableCell>
                        <div className="font-semibold text-foreground">{r.title}</div>
                        <div className="text-xs text-muted-foreground capitalize mt-0.5">{r.category}</div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{r.userName}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(r.createdAt).toLocaleDateString("id-ID")}
                      </TableCell>
                      <TableCell>
                        <StatusBadge tone={toneByStatus[r.status]}>
                          {labelByStatus[r.status]}
                        </StatusBadge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-9 rounded-2xl border-border/60 hover:bg-muted/50"
                          onClick={() => openDetail(r)}
                        >
                          <MessageSquare className="mr-2 size-4 text-[#F99912]" />
                          Detail & Balas
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
        <DialogContent className="max-w-2xl rounded-2xl p-0 overflow-hidden flex flex-col max-h-[90vh]">
          <DialogHeader className="p-6 pb-4 bg-muted/20 border-b border-border/60">
            <DialogTitle>Detail Laporan</DialogTitle>
            <DialogDescription>
              Tinjau keluhan dan berikan tanggapan kepada user.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="flex-1 p-6">
            {selectedReport && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-foreground text-base">{selectedReport.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Dari: <span className="font-medium text-foreground/80">{selectedReport.userName}</span> • {new Date(selectedReport.createdAt).toLocaleString("id-ID")}
                      </div>
                    </div>
                    <span className="rounded-full border border-border/60 bg-muted/30 px-2 py-0.5 text-xs text-muted-foreground capitalize">
                      {selectedReport.category}
                    </span>
                  </div>
                  <div className="mt-4 text-sm text-foreground/90 whitespace-pre-wrap">
                    {selectedReport.description || "Tidak ada detail deskripsi yang diberikan oleh user."}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold">Tanggapan Admin / Solusi</label>
                  <textarea
                    className="flex w-full rounded-2xl border border-input bg-transparent px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground min-h-[140px] resize-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="Ketik balasan untuk membantu menyelesaikan masalah user..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold">Update Status Laporan</label>
                  <select
                    className="flex h-10 w-full rounded-2xl border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                    value={statusVal}
                    onChange={(e) => setStatusVal(e.target.value as ReportStatus)}
                  >
                    <option value="pending" className="bg-background text-foreground">Pending</option>
                    <option value="processing" className="bg-background text-foreground">Diproses</option>
                    <option value="done" className="bg-background text-foreground">Selesai</option>
                  </select>
                </div>
              </div>
            )}
          </ScrollArea>

          <div className="flex justify-end gap-3 p-6 pt-4 border-t border-border/60 bg-muted/10">
            <Button variant="outline" className="rounded-2xl" onClick={() => setDetailOpen(false)}>
              Batal
            </Button>
            <Button
              className="rounded-2xl bg-[#F99912] text-black hover:bg-[#F99912]/90"
              onClick={saveReply}
            >
              Simpan & Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

