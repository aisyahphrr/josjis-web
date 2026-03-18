"use client"

import { useEffect, useMemo, useState } from "react"
import { Pencil, Search, Trash2 } from "lucide-react"
import toast from "react-hot-toast"

import { dummyUsers, type UserRecord, type UserStatus } from "@/lib/dummyData"
import { PageHeader } from "@/components/admin/page-header"
import { TableSkeleton } from "@/components/admin/loading-skeletons"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { StatusBadge } from "@/components/admin/status-badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
            <TabsTrigger value="user" className="rounded-xl">
              User
            </TabsTrigger>
            <TabsTrigger value="umkm" className="rounded-xl">
              UMKM
            </TabsTrigger>
            <TabsTrigger value="driver" className="rounded-xl">
              Driver
            </TabsTrigger>
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
                          Tidak ada data.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filtered.map((u) => (
                        <TableRow key={u.id} className="hover:bg-muted/20">
                          <TableCell>
                            <div className="font-semibold text-foreground">{u.name}</div>
                            <div className="text-xs text-muted-foreground">{u.id}</div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{u.email}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <StatusBadge tone={u.status === "active" ? "success" : "danger"}>
                                {u.status}
                              </StatusBadge>
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={u.status === "suspended"}
                                  onCheckedChange={() => toggleStatus(u.id)}
                                />
                                <span className="text-xs text-muted-foreground">
                                  Suspend
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="inline-flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-9 rounded-2xl border-border/60"
                                onClick={() => toast(`Edit ${u.name} (dummy).`)}
                              >
                                <Pencil className="mr-1 size-4" />
                                Edit
                              </Button>

                              <ConfirmDialog
                                title="Hapus user?"
                                description={`Tindakan ini akan menghapus ${u.name} dari daftar (dummy).`}
                                confirmText="Hapus"
                                confirmVariant="destructive"
                                onConfirm={() => deleteUser(u.id)}
                                trigger={
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    className="h-9 rounded-2xl"
                                  >
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
        </TabsContent>
      </Tabs>
    </div>
  )
}

