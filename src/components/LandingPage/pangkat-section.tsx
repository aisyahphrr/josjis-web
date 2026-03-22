"use client";

import { useEffect, useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  DAYA_POIN_CURRENCY,
  pangkatCustomer,
  pangkatUmkm,
  type PangkatTier,
} from "@/src/lib/gamification";

type TabKey = "customer" | "umkm";

export function PangkatSection() {
  const [tab, setTab] = useState<TabKey>("customer");
  const [activeLevelIdx, setActiveLevelIdx] = useState(0);

  const tiers = useMemo(() => {
    return tab === "customer" ? pangkatCustomer : pangkatUmkm;
  }, [tab]);

  useEffect(() => {
    setActiveLevelIdx(0);
  }, [tab]);

  const activeTier: PangkatTier = tiers[activeLevelIdx];
  const nextTier = tiers[activeLevelIdx + 1] ?? null;

  return (
    <section id="pangkat" className="relative py-20 overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#FDF5E7] to-background" />
      <div className="absolute -top-28 -left-24 w-[30rem] h-[30rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(154,205,50,0.20)_0%,transparent_62%)] pointer-events-none" />
      <div className="absolute -bottom-32 -right-24 w-[34rem] h-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(249,153,18,0.18)_0%,transparent_62%)] pointer-events-none" />
      <div className="absolute top-20 right-1/3 w-[28rem] h-[18rem] bg-[linear-gradient(to_right,rgba(147,112,219,0.10),rgba(249,153,18,0.08),rgba(154,205,50,0.08))] opacity-80 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F99912]/10 border border-[#F99912]/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#F99912]" />
            <span className="text-sm text-[#F99912] font-medium">
              Gamification Pangkat
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">
            Tingkatkan Pangkatmu, Kumpulkan{" "}
            <span className="text-[#F99912]">{DAYA_POIN_CURRENCY}</span>!
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Naik level dengan aktivitas harian: belanja, konsisten, dan bangun
            dampak. Setiap tahapan membuat kamu makin dekat ke pengalaman
            premium di Sadaya.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <Button
            variant="outline"
            onClick={() => setTab("customer")}
            className={`w-full sm:w-auto transition-all duration-300 ${
              tab === "customer"
                ? `border-[#F99912]/40 bg-[#F99912]/10 text-[#F99912]`
                : "border-border bg-transparent text-foreground hover:bg-[#F99912]/5"
            }`}
          >
            Pangkat Customer
          </Button>
          <Button
            variant="outline"
            onClick={() => setTab("umkm")}
            className={`w-full sm:w-auto transition-all duration-300 ${
              tab === "umkm"
                ? `border-[#9370DB]/40 bg-[#9370DB]/10 text-[#9370DB]`
                : "border-border bg-transparent text-foreground hover:bg-[#9370DB]/5"
            }`}
          >
            Pangkat UMKM
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-3 gap-4">
              {tiers.map((tier, idx) => {
                const isActive = idx === activeLevelIdx;
                return (
                  <button
                    key={tier.name}
                    type="button"
                    onClick={() => setActiveLevelIdx(idx)}
                    className={`text-left p-5 rounded-2xl border transition-all duration-300 ${
                      isActive
                        ? `bg-white ${tier.activeBorderClass}`
                        : `bg-[#F0F0F0] border-border hover:-translate-y-0.5 hover:shadow-sm hover:bg-white`
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.iconGradientClass} p-0.5 mb-4`}
                    >
                      <div className="w-full h-full rounded-xl bg-white/70 flex items-center justify-center">
                        <tier.icon
                          className={`w-6 h-6 ${tier.iconColorClass}`}
                        />
                      </div>
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Level {tier.level}
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                          {tier.name}
                        </p>
                      </div>
                      {isActive ? (
                        <span className={`mt-1 text-xs font-semibold text-[#F99912]`}>
                          Aktif
                        </span>
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 p-6 rounded-2xl bg-white border border-border">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Status Kamu
                  </p>
                  <h3 className="text-2xl font-bold text-foreground">
                    {activeTier.name}
                  </h3>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activeTier.iconGradientClass} p-0.5`}
                >
                  <div className="w-full h-full rounded-xl bg-white/80 flex items-center justify-center">
                    <activeTier.icon
                      className={`w-6 h-6 ${activeTier.iconColorClass}`}
                    />
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mt-4">
                {activeTier.description} Untuk naik ke{" "}
                <span className="font-semibold text-foreground">
                  {nextTier ? nextTier.name : "puncak"}
                </span>
                , konsisten kumpulkan {DAYA_POIN_CURRENCY}.
              </p>

              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">
                    Progress pangkat
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {activeTier.level}/3
                  </p>
                </div>
                <div className="h-2 bg-[#E9E9E9] rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${
                      activeTier.group === "customer"
                        ? "from-[#F99912] to-[#9ACD32]"
                        : "from-[#F99912] to-[#9370DB]"
                    } transition-all duration-300`}
                    style={{ width: `${(activeTier.level / 3) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className={`p-6 rounded-2xl border border-border bg-white`}>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Kenapa {DAYA_POIN_CURRENCY}?
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tab === "customer"
                  ? "Daya Poin membuat pengalaman belanjamu makin seru—naik pangkat, dapat benefit, dan jadi bagian komunitas."
                  : "Daya Poin mendorong UMKM untuk bertumbuh—konsistensi listing dan dampak membuat kamu naik ke tier yang lebih tinggi."}
              </p>

              <div className="mt-5 flex flex-col gap-3">
                {tab === "customer" ? (
                  <>
                    <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#F0F0F0] border border-border">
                      <span className="text-sm text-muted-foreground">
                        Fokus
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        Belanja + Konsisten
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#F0F0F0] border border-border">
                      <span className="text-sm text-muted-foreground">
                        Dampak
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        Benefit Pangkat
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#F0F0F0] border border-border">
                      <span className="text-sm text-muted-foreground">
                        Fokus
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        Kualitas Listing
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#F0F0F0] border border-border">
                      <span className="text-sm text-muted-foreground">
                        Dampak
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        Tier Naik Lebih Cepat
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-6">
                <Button
                  className={`w-full bg-[#F99912] text-[#2B3236] font-semibold hover:bg-[#F99912]/90 hover:scale-[1.02] transition-all duration-300 shadow-none`}
                  onClick={() => {
                    // Landing-only demo CTA
                  }}
                >
                  Mulai Naik Pangkat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

