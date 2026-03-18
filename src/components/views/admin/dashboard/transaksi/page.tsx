"use client"

import { useEffect, useMemo, useState } from "react"
import { Eye, Search } from "lucide-react"
import toast from "react-hot-toast"

import {
  dummyTransactions,
  type TransactionRecord,
  type TransactionStatus,
} from "@/lib/dummyData"
import { PageHeader } from "@/components/admin/page-header"
import { TableSkeleton } from "@/components/admin/loading-skeletons"
import { StatusBadge } from "@/components/admin/status-badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
                          className="h-9 rounded-2xl border-border/60"
                          onClick={() => toast(`Open detail ${trx.id} (dummy).`)}
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
    </div>
  )
}

