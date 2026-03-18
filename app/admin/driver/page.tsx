"use client"

import { useEffect, useMemo, useState } from "react"
import { Pencil, Search, Trash2 } from "lucide-react"
import toast from "react-hot-toast"

import { dummyUsers, type UserRecord } from "@/lib/dummyData"
import { PageHeader } from "@/components/admin/page-header"
import { TableSkeleton } from "@/components/admin/loading-skeletons"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { StatusBadge } from "@/components/admin/status-badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function AdminDriverPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [rows, setRows] = useState<UserRecord[]>(
    dummyUsers.filter((u) => u.role === "driver"),
  )

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 650)
    return () => window.clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rows.filter((r) =>
      q ? `${r.name} ${r.email} ${r.id}`.toLowerCase().includes(q) : true,
    )
  }, [rows, query])

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
                          <StatusBadge tone={d.status === "active" ? "success" : "danger"}>
                            {d.status}
                          </StatusBadge>
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
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-9 rounded-2xl border-border/60"
                            onClick={() => toast(`Edit ${d.name} (dummy).`)}
                          >
                            <Pencil className="mr-1 size-4" />
                            Edit
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
    </div>
  )
}

