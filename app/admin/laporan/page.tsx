"use client"

import { useEffect, useMemo, useState } from "react"
import { ArrowRight, Search } from "lucide-react"
import toast from "react-hot-toast"

import { dummyReports, type ReportRecord, type ReportStatus } from "@/lib/dummyData"
import { PageHeader } from "@/components/admin/page-header"
import { TableSkeleton } from "@/components/admin/loading-skeletons"
import { StatusBadge } from "@/components/admin/status-badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 700)
    return () => window.clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((r) =>
      q ? `${r.title} ${r.userName} ${r.id}`.toLowerCase().includes(q) : true,
    )
  }, [items, query])

  const advance = (id: string) => {
    setItems((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r
        const updated = { ...r, status: nextStatus[r.status] }
        toast.success(`Status updated: ${labelByStatus[updated.status]}`)
        return updated
      }),
    )
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

      <div className="grid gap-4 xl:grid-cols-2">
        {filtered.length === 0 ? (
          <Card className="rounded-2xl border-border/60 bg-card/60 backdrop-blur-xl xl:col-span-2">
            <CardContent className="p-10 text-center text-muted-foreground">
              Tidak ada laporan.
            </CardContent>
          </Card>
        ) : (
          filtered.map((r) => (
            <Card
              key={r.id}
              className="rounded-2xl border-[#F99912]/10 bg-card/60 backdrop-blur-xl hover:shadow-md transition-shadow"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="truncate text-base font-semibold text-foreground">
                        {r.title}
                      </div>
                      <StatusBadge tone={toneByStatus[r.status]}>
                        {labelByStatus[r.status]}
                      </StatusBadge>
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      User: <span className="text-foreground/90">{r.userName}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="rounded-full border border-border/60 bg-muted/30 px-2 py-0.5">
                        {r.category}
                      </span>
                      <span>{r.id}</span>
                      <span>•</span>
                      <span>{new Date(r.createdAt).toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                  <Button
                    disabled={r.status === "done"}
                    className="h-9 rounded-2xl bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612] hover:from-[#F99912]/90 hover:to-[#64762C]/90 disabled:opacity-50"
                    onClick={() => advance(r.id)}
                  >
                    Next
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

