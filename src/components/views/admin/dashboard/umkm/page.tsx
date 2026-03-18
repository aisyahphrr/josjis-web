"use client"

import { useEffect, useMemo, useState } from "react"
import { Pencil, Search, Star, Trash2 } from "lucide-react"
import toast from "react-hot-toast"

import { dummyUmkm, type UmkmRecord } from "@/lib/dummyData"
import { PageHeader } from "@/components/admin/page-header"
import { TableSkeleton } from "@/components/admin/loading-skeletons"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminUmkmPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [items, setItems] = useState<UmkmRecord[]>(
    dummyUmkm.filter((u) => u.approvalStatus === "approved"),
  )

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 700)
    return () => window.clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((i) =>
      q ? `${i.name} ${i.ownerName} ${i.id}`.toLowerCase().includes(q) : true,
    )
  }, [items, query])

  if (isLoading) return <TableSkeleton rows={6} />

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manajemen UMKM"
        subtitle="Daftar UMKM yang sudah approved. Kelola data, edit, atau hapus (dummy)."
        actions={
          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari UMKM..."
              className="h-10 rounded-2xl border-border/60 bg-muted/40 pl-9"
            />
          </div>
        }
      />

      {filtered.length === 0 ? (
        <Card className="rounded-2xl border-border/60 bg-card/60 backdrop-blur-xl">
          <CardContent className="p-10 text-center">
            <div className="text-lg font-semibold text-foreground">Tidak ada UMKM</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Coba ubah keyword pencarian atau approve UMKM di menu Validasi.
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((umkm) => (
            <Card
              key={umkm.id}
              className="rounded-2xl border-[#F99912]/10 bg-card/60 backdrop-blur-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-base font-semibold text-foreground">
                      {umkm.name}
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      Owner: {umkm.ownerName}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{umkm.id}</div>
                  </div>
                  <div className="rounded-2xl bg-[#F99912]/10 border border-[#F99912]/15 px-3 py-2">
                    <div className="flex items-center gap-1 text-sm font-semibold text-[#F99912]">
                      <Star className="size-4" />
                      {umkm.rating.toFixed(1)}
                    </div>
                    <div className="text-[11px] text-muted-foreground">rating</div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-border/60 bg-muted/25 p-3">
                    <div className="text-xs text-muted-foreground">Products</div>
                    <div className="text-sm font-semibold text-foreground">
                      {umkm.productCount}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-muted/25 p-3 col-span-2">
                    <div className="text-xs text-muted-foreground">Total Sales</div>
                    <div className="text-sm font-semibold text-foreground">
                      Rp {umkm.totalSales.toLocaleString("id-ID")}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2">
                  <Button
                    variant="outline"
                    className="h-9 rounded-2xl border-border/60"
                    onClick={() => toast(`Edit ${umkm.name} (dummy).`)}
                  >
                    <Pencil className="mr-1 size-4" />
                    Edit
                  </Button>

                  <ConfirmDialog
                    title="Hapus UMKM?"
                    description={`Anda akan menghapus ${umkm.name} dari daftar (dummy).`}
                    confirmText="Hapus"
                    confirmVariant="destructive"
                    onConfirm={() => {
                      setItems((prev) => prev.filter((x) => x.id !== umkm.id))
                      toast.success(`UMKM dihapus: ${umkm.name}`)
                    }}
                    trigger={
                      <Button variant="destructive" className="h-9 rounded-2xl">
                        <Trash2 className="mr-1 size-4" />
                        Delete
                      </Button>
                    }
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

