"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Progress } from "@/src/components/ui/progress";
import { Badge } from "@/src/components/ui/badge";
import { cn } from "@/src/lib/utils";
import { toast } from "@/src/hooks/use-toast";
import {
  Coins,
  Droplets,
  Leaf,
  Scissors,
  Sparkles,
  Sprout,
  Zap,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { useUserStore } from "@/src/store/user-store";

type PlotStatus =
  | "empty"
  | "planted"
  | "watered"
  | "growing"
  | "ready_to_harvest";

type SeedDef = {
  id: "talas" | "pala" | "jambu";
  name: string;
  color: string;
  growMs: number;
  coinsReward: number;
  productIdReward: number;
};

const SEEDS: SeedDef[] = [
  {
    id: "talas",
    name: "Talas Bogor",
    color: "from-[#64762C]/30 to-[#64762C]/10",
    growMs: 45_000,
    coinsReward: 50,
    productIdReward: 1,
  },
  {
    id: "pala",
    name: "Pala Bogor",
    color: "from-[#F99912]/25 to-[#F99912]/10",
    growMs: 70_000,
    coinsReward: 80,
    productIdReward: 3,
  },
  {
    id: "jambu",
    name: "Jambu Kristal",
    color: "from-[#3b82f6]/20 to-[#3b82f6]/10",
    growMs: 55_000,
    coinsReward: 65,
    productIdReward: 10,
  },
];

type Plot = {
  id: number;
  status: PlotStatus;
  seedId: SeedDef["id"] | null;
  watered: boolean;
  growthMs: number;
  lastTickISO: string | null;
  plantedAtISO: string | null;
};

type Tool = "seed" | "water" | "harvest";

const GAME_STORAGE_KEY = "josjis:harvest-bogor:v1";

function makeInitialPlots(size: number): Plot[] {
  return Array.from({ length: size }).map((_, idx) => ({
    id: idx + 1,
    status: "empty" as const,
    seedId: null,
    watered: false,
    growthMs: 0,
    lastTickISO: null,
    plantedAtISO: null,
  }));
}

export default function GamePage() {
  const {
    coins,
    energy,
    seeds,
    claimDailyBonus,
    spendEnergy,
    useSeed,
    addCoins,
    addToCart,
  } = useUserStore();

  const [plots, setPlots] = React.useState<Plot[]>(() => {
    if (typeof window === "undefined") return makeInitialPlots(9);
    try {
      const raw = window.localStorage.getItem(GAME_STORAGE_KEY);
      if (!raw) return makeInitialPlots(9);
      const parsed = JSON.parse(raw) as unknown;
      if (!Array.isArray(parsed)) return makeInitialPlots(9);
      return (parsed as Plot[]).map((p, idx) => ({
        id: typeof p.id === "number" ? p.id : idx + 1,
        status: (p.status as PlotStatus) ?? "empty",
        seedId: (p.seedId as Plot["seedId"]) ?? null,
        watered: Boolean(p.watered),
        growthMs: typeof p.growthMs === "number" ? p.growthMs : 0,
        lastTickISO: typeof p.lastTickISO === "string" ? p.lastTickISO : null,
        plantedAtISO:
          typeof p.plantedAtISO === "string" ? p.plantedAtISO : null,
      }));
    } catch {
      return makeInitialPlots(9);
    }
  });

  const [selectedTool, setSelectedTool] = React.useState<Tool>("seed");
  const [seedDialogOpen, setSeedDialogOpen] = React.useState(false);
  const [targetPlotId, setTargetPlotId] = React.useState<number | null>(null);
  const [harvestPulsePlotId, setHarvestPulsePlotId] = React.useState<
    number | null
  >(null);

  React.useEffect(() => {
    claimDailyBonus();
  }, [claimDailyBonus]);

  React.useEffect(() => {
    try {
      window.localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(plots));
    } catch {
      // ignore
    }
  }, [plots]);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      const now = new Date();
      setPlots((prev) =>
        prev.map((plot) => {
          if (!plot.seedId) return plot;
          if (plot.status === "ready_to_harvest") return plot;
          if (!plot.watered) return { ...plot, lastTickISO: now.toISOString() };

          const seed = SEEDS.find((s) => s.id === plot.seedId);
          if (!seed) return plot;

          const last = plot.lastTickISO ? new Date(plot.lastTickISO) : now;
          const delta = Math.max(0, now.getTime() - last.getTime());
          const nextGrowth = Math.min(seed.growMs, plot.growthMs + delta);
          const nextStatus: PlotStatus =
            nextGrowth >= seed.growMs ? "ready_to_harvest" : "growing";

          if (
            nextStatus === "ready_to_harvest" &&
            plot.status !== "ready_to_harvest"
          ) {
            setHarvestPulsePlotId(plot.id);
            toast({
              title: "Siap dipanen",
              description: `${seed.name} sudah siap dipanen.`,
            });
          }

          return {
            ...plot,
            growthMs: nextGrowth,
            status: nextStatus,
            lastTickISO: now.toISOString(),
          };
        }),
      );
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const openSeedDialogFor = (plotId: number) => {
    setTargetPlotId(plotId);
    setSeedDialogOpen(true);
  };

  const handlePlotClick = (plotId: number) => {
    const plot = plots.find((p) => p.id === plotId);
    if (!plot) return;

    if (selectedTool === "seed") {
      if (plot.status !== "empty") {
        toast({
          title: "Lahan terisi",
          description: "Pilih lahan kosong untuk menanam.",
        });
        return;
      }
      openSeedDialogFor(plotId);
      return;
    }

    if (selectedTool === "water") {
      if (plot.status === "empty") {
        toast({
          title: "Belum ada tanaman",
          description: "Tanam dulu sebelum menyiram.",
        });
        return;
      }
      if (plot.status === "ready_to_harvest") {
        toast({
          title: "Sudah siap panen",
          description: "Gunakan alat panen untuk memanen.",
        });
        return;
      }
      if (plot.watered) {
        toast({
          title: "Sudah disiram",
          description: "Tunggu sampai siap dipanen.",
        });
        return;
      }
      if (!spendEnergy(1)) return;

      setPlots((prev) =>
        prev.map((p) =>
          p.id === plotId
            ? {
                ...p,
                watered: true,
                status: p.status === "planted" ? "watered" : "growing",
                lastTickISO: new Date().toISOString(),
              }
            : p,
        ),
      );
      toast({ title: "Disiram", description: "Tanaman mulai tumbuh." });
      return;
    }

    if (plot.status !== "ready_to_harvest" || !plot.seedId) {
      toast({
        title: "Belum siap",
        description: "Tanaman ini belum siap dipanen.",
      });
      return;
    }

    const seed = SEEDS.find((s) => s.id === plot.seedId);
    if (!seed) return;
    if (!spendEnergy(1)) return;

    addCoins(seed.coinsReward);
    addToCart(seed.productIdReward, 1);

    toast({
      title: "Berhasil memanen",
      description: `+${seed.coinsReward} koin, hasil masuk ke keranjang.`,
    });

    setPlots((prev) =>
      prev.map((p) =>
        p.id === plotId
          ? {
              ...p,
              status: "empty",
              seedId: null,
              watered: false,
              growthMs: 0,
              lastTickISO: null,
              plantedAtISO: null,
            }
          : p,
      ),
    );
  };

  const plantOnTarget = (seedId: SeedDef["id"]) => {
    if (!targetPlotId) return;
    const seed = SEEDS.find((s) => s.id === seedId);
    if (!seed) return;
    if (!useSeed(seedId)) return;

    setPlots((prev) =>
      prev.map((p) =>
        p.id === targetPlotId
          ? {
              ...p,
              status: "planted",
              seedId,
              watered: false,
              growthMs: 0,
              plantedAtISO: new Date().toISOString(),
              lastTickISO: new Date().toISOString(),
            }
          : p,
      ),
    );
    setSeedDialogOpen(false);
    setTargetPlotId(null);
    toast({
      title: "Tanaman berhasil ditanam",
      description: `${seed.name} ditanam.`,
    });
  };

  const totalHarvestReady = plots.filter(
    (p) => p.status === "ready_to_harvest",
  ).length;

  return (
    <>
      <div className="space-y-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#64762C]/30 via-[#424F17]/20 to-[#F99912]/20 p-6 border border-[#64762C]/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#64762C]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
                <Sparkles className="w-8 h-8 text-[#F99912]" />
                Harvest Bogor
              </h1>
              <p className="text-muted-foreground">
                Tanam, siram, tunggu tumbuh, lalu panen untuk hadiah.
              </p>
            </div>
            <div className="flex gap-4">
              <Card className="bg-card/80 backdrop-blur border-[#F99912]/20">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F99912]/20 flex items-center justify-center">
                    <Coins className="w-5 h-5 text-[#F99912]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Koin Asli Bogor
                    </p>
                    <p className="text-xl font-bold text-[#F99912]">
                      {coins.toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card/80 backdrop-blur border-[#3b82f6]/20">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/15 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#3b82f6]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Energi</p>
                    <p className="text-xl font-bold text-[#3b82f6]">{energy}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Card className="bg-card/50 backdrop-blur border-[#64762C]/20 overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sprout className="w-5 h-5 text-[#64762C]" />
                Lahan Tanam
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge className="bg-[#64762C]/20 text-[#64762C]">
                  Siap panen: {totalHarvestReady}
                </Badge>
                <Badge className="bg-[#F99912]/15 text-[#F99912]">
                  Bibit:{" "}
                  {SEEDS.map((s) => `${s.id} ${seeds[s.id] ?? 0}`).join(" • ")}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4">
              {plots.map((plot) => {
                const seed = plot.seedId
                  ? (SEEDS.find((s) => s.id === plot.seedId) ?? null)
                  : null;
                const pct = seed
                  ? Math.round((plot.growthMs / seed.growMs) * 100)
                  : 0;
                const showReady = plot.status === "ready_to_harvest";

                return (
                  <button
                    key={plot.id}
                    onClick={() => handlePlotClick(plot.id)}
                    className={cn(
                      "group relative rounded-2xl border transition-all text-left p-3 overflow-hidden",
                      "bg-gradient-to-b from-[#181612]/10 to-[#181612]/0",
                      "border-[#64762C]/25 hover:border-[#64762C]/50",
                      "focus:outline-none focus:ring-2 focus:ring-[#F99912]/60",
                      showReady &&
                        "ring-2 ring-[#F99912] ring-offset-2 ring-offset-background",
                      harvestPulsePlotId === plot.id && "animate-pulse",
                    )}
                    aria-label={`Plot ${plot.id}`}
                  >
                    <div className="absolute inset-0">
                      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#8B4513] to-[#A0522D]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(100,118,44,0.20),transparent_60%)]" />
                    </div>

                    <div className="relative z-10 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">
                            Petak #{plot.id}
                          </p>
                          <p className="text-sm font-semibold text-foreground truncate">
                            {seed?.name ?? "Tanah kosong"}
                          </p>
                        </div>
                        {showReady ? (
                          <Badge className="bg-[#F99912] text-[#181612] whitespace-nowrap">
                            Siap
                          </Badge>
                        ) : plot.status === "empty" ? (
                          <Badge className="bg-muted/40 text-muted-foreground whitespace-nowrap">
                            Kosong
                          </Badge>
                        ) : plot.watered ? (
                          <Badge className="bg-[#3b82f6]/15 text-[#3b82f6] whitespace-nowrap">
                            Disiram
                          </Badge>
                        ) : (
                          <Badge className="bg-[#64762C]/15 text-[#64762C] whitespace-nowrap">
                            Butuh air
                          </Badge>
                        )}
                      </div>

                      <div
                        className={cn(
                          "h-16 rounded-xl border border-white/5 flex items-end justify-center overflow-hidden",
                          seed
                            ? `bg-gradient-to-br ${seed.color}`
                            : "bg-muted/30",
                        )}
                      >
                        {plot.status === "empty" ? (
                          <div className="mb-3 h-3 w-10 rounded-full bg-[#8B4513]/40" />
                        ) : (
                          <div
                            className={cn(
                              "mb-2 w-10 rounded-[14px] bg-gradient-to-b from-[#22c55e] to-[#64762C] shadow-[0_8px_22px_rgba(34,197,94,0.12)]",
                              showReady
                                ? "animate-[bounce_1.2s_ease-in-out_infinite]"
                                : "transition-all",
                            )}
                            style={{
                              height: `${Math.max(14, Math.min(58, 14 + pct * 0.44))}px`,
                            }}
                          />
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-muted-foreground">
                            {plot.status === "empty"
                              ? "Klik untuk aksi"
                              : showReady
                                ? "Siap panen"
                                : plot.watered
                                  ? "Tumbuh..."
                                  : "Butuh air"}
                          </span>
                          <span className="text-foreground/80">
                            {seed ? `${pct}%` : ""}
                          </span>
                        </div>
                        <Progress value={seed ? pct : 0} className="h-1.5" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-[#F99912]/10 sticky bottom-4">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Badge className="bg-muted/40 text-muted-foreground">
                  Tool aktif:
                  <span className="ml-1 font-medium text-foreground">
                    {selectedTool === "seed"
                      ? "Bibit"
                      : selectedTool === "water"
                        ? "Siram"
                        : "Panen"}
                  </span>
                </Badge>
                <Badge className="bg-[#F99912]/15 text-[#F99912]">
                  Biaya: 1 energi
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedTool === "seed" ? "default" : "outline"}
                  className={
                    selectedTool === "seed"
                      ? "bg-[#64762C] text-white hover:bg-[#64762C]/90"
                      : "border-[#64762C]/30 hover:bg-[#64762C]/10"
                  }
                  onClick={() => setSelectedTool("seed")}
                >
                  <Leaf className="w-4 h-4 mr-2" />
                  Bibit
                </Button>
                <Button
                  variant={selectedTool === "water" ? "default" : "outline"}
                  className={
                    selectedTool === "water"
                      ? "bg-[#3b82f6] text-white hover:bg-[#3b82f6]/90"
                      : "border-[#3b82f6]/30 hover:bg-[#3b82f6]/10"
                  }
                  onClick={() => setSelectedTool("water")}
                >
                  <Droplets className="w-4 h-4 mr-2" />
                  Siram
                </Button>
                <Button
                  variant={selectedTool === "harvest" ? "default" : "outline"}
                  className={
                    selectedTool === "harvest"
                      ? "bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612]"
                      : "border-[#F99912]/30 hover:bg-[#F99912]/10"
                  }
                  onClick={() => setSelectedTool("harvest")}
                >
                  <Scissors className="w-4 h-4 mr-2" />
                  Panen
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-[#F99912]/10">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#F99912]" />
              Tips Bermain
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <Leaf className="w-4 h-4 text-[#64762C] mt-0.5 flex-shrink-0" />
                <span>Pilih Bibit → klik lahan kosong → pilih tanaman.</span>
              </div>
              <div className="flex items-start gap-2">
                <Droplets className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>Pilih Siram → klik tanaman supaya mulai tumbuh.</span>
              </div>
              <div className="flex items-start gap-2">
                <Coins className="w-4 h-4 text-[#F99912] mt-0.5 flex-shrink-0" />
                <span>
                  Pilih Panen → hasil masuk ke keranjang + dapat koin.
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={seedDialogOpen} onOpenChange={setSeedDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Pilih Tanaman</DialogTitle>
            <DialogDescription>
              Pertumbuhan berjalan setelah disiram (timer). Stok bibit dari
              bonus harian.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SEEDS.map((s) => (
              <button
                key={s.id}
                onClick={() => plantOnTarget(s.id)}
                className="rounded-2xl border border-[#F99912]/10 hover:border-[#F99912]/30 bg-muted/20 hover:bg-muted/30 transition-all p-3 text-left"
              >
                <div
                  className={cn("h-12 rounded-xl bg-gradient-to-br", s.color)}
                />
                <p className="mt-2 text-sm font-semibold text-foreground">
                  {s.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Stok: {seeds[s.id] ?? 0}
                </p>
                <p className="text-xs text-muted-foreground">
                  Reward: +{s.coinsReward} koin
                </p>
              </button>
            ))}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              className="border-[#F99912]/30 hover:bg-[#F99912]/10"
              onClick={() => setSeedDialogOpen(false)}
            >
              Batal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
