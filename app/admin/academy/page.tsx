"use client"

import { useEffect, useMemo, useState } from "react"
import { GraduationCap, Users } from "lucide-react"
import toast from "react-hot-toast"

import { dummyAcademy, type AcademyWebinar } from "@/lib/dummyData"
import { PageHeader } from "@/components/admin/page-header"
import { TableSkeleton } from "@/components/admin/loading-skeletons"
import { StatusBadge } from "@/components/admin/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

const levelBands = [
  { level: "Newbie", min: 0, max: 199, tone: "neutral" as const },
  { level: "Amateur", min: 200, max: 699, tone: "warning" as const },
  { level: "Pro", min: 700, max: 999999, tone: "success" as const },
]

export default function AdminAcademyPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [items, setItems] = useState<AcademyWebinar[]>(dummyAcademy)

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 700)
    return () => window.clearTimeout(t)
  }, [])

  const totalParticipants = useMemo(
    () => items.reduce((acc, w) => acc + w.participants, 0),
    [items],
  )

  if (isLoading) return <TableSkeleton rows={6} />

  return (
    <div className="space-y-6">
      <PageHeader
        title="Academy"
        subtitle="Kelola webinar, participants, XP system, dan approval sertifikasi. (Dummy)"
      />

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="rounded-2xl border-[#F99912]/10 bg-card/60 backdrop-blur-xl xl:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <GraduationCap className="size-4 text-[#F99912]" />
              Webinar List
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {items.map((w) => (
              <div
                key={w.id}
                className="rounded-2xl border border-border/60 bg-muted/20 p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <div className="text-base font-semibold text-foreground truncate">
                      {w.title}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Users className="size-4" />
                        {w.participants} participants
                      </span>
                      <span>•</span>
                      <span>{new Date(w.date).toLocaleDateString("id-ID")}</span>
                      <span>•</span>
                      <span className="font-medium text-foreground/90">
                        XP +{w.xpReward}
                      </span>
                    </div>
                    <div className="mt-2">
                      <StatusBadge tone={w.certificationApproved ? "success" : "warning"}>
                        {w.certificationApproved ? "Certification approved" : "Certification pending"}
                      </StatusBadge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background/40 px-4 py-3 md:w-[240px]">
                    <div>
                      <div className="text-sm font-semibold text-foreground">Certification</div>
                      <div className="text-xs text-muted-foreground">
                        Toggle approval (dummy)
                      </div>
                    </div>
                    <Switch
                      checked={w.certificationApproved}
                      onCheckedChange={(checked) => {
                        setItems((prev) =>
                          prev.map((x) =>
                            x.id === w.id ? { ...x, certificationApproved: checked } : x,
                          ),
                        )
                        toast(checked ? "Sertifikasi disetujui." : "Sertifikasi dibatalkan.", {
                          icon: checked ? "✅" : "⚠️",
                        })
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="rounded-2xl border-[#F99912]/10 bg-card/60 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Participants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                <div className="text-xs text-muted-foreground">Total participants</div>
                <div className="mt-1 text-2xl font-bold text-foreground">
                  {totalParticipants.toLocaleString("id-ID")}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Angka ini berasal dari dataset dummy.
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-[#F99912]/10 bg-card/60 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">XP System</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {levelBands.map((b) => (
                <div
                  key={b.level}
                  className="rounded-2xl border border-border/60 bg-muted/20 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold text-foreground">{b.level}</div>
                    <StatusBadge tone={b.tone}>
                      {b.min}+ XP{b.max < 999999 ? ` – ${b.max}` : ""}
                    </StatusBadge>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Level threshold untuk sistem XP (dummy).
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

