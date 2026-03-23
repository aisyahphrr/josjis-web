"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  Coins,
  Droplets,
  Leaf,
  Scissors,
  Sparkles,
  Sprout,
  Zap,
} from "lucide-react";

interface PlantDef {
  id: string;
  name: string;
  emoji: string;
  days: number;
  points: number;
  color: string;
  accent: string;
  description: string;
}

interface ActivePlant {
  defId: string;
  progress: number;
  plantedAt: number;
  wateredToday: number;
  lastWaterDate: string;
}

interface GameState {
  activePlants: (ActivePlant | null)[];
  water: number;
  points: number;
  lastDailyClaim: string;
  lastWaterRegen: number;
  totalHarvests: number;
}

const PLANT_DEFS: PlantDef[] = [
  {
    id: "talas",
    name: "Talas Bogor",
    emoji: "🌿",
    days: 7,
    points: 50,
    color: "#22c55e",
    accent: "#15803d",
    description: "Tumbuh cepat, poin rendah",
  },
  {
    id: "pala",
    name: "Pala Premium",
    emoji: "🌰",
    days: 14,
    points: 120,
    color: "#f97316",
    accent: "#c2410c",
    description: "Tumbuh lambat, poin tinggi",
  },
  {
    id: "jambu",
    name: "Jambu Kristal",
    emoji: "🍐",
    days: 10,
    points: 80,
    color: "#eab308",
    accent: "#a16207",
    description: "Tumbuh sedang, seimbang",
  },
];

const SLOTS = 3;
const MAX_WATER = 10;
const WATER_REGEN_MS = 60_000;
const WATER_BOOST = 8;
const MAX_WATER_PER_DAY = 2;
const PROGRESS_TICK_MS = 3_000;
const DAILY_WATER_BONUS = 5;

const DEFAULT_STATE: GameState = {
  activePlants: [null, null, null],
  water: 5,
  points: 0,
  lastDailyClaim: "",
  lastWaterRegen: Date.now(),
  totalHarvests: 0,
};

const today = () => new Date().toDateString();

function loadState(): GameState {
  try {
    const raw = localStorage.getItem("harvest_bogor_v3");
    if (!raw) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATE;
  }
}

function saveState(state: GameState) {
  localStorage.setItem("harvest_bogor_v3", JSON.stringify(state));
}

const mkCtx = () =>
  new (window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext)();

function playWater() {
  try {
    const c = mkCtx();
    const o = c.createOscillator();
    const g = c.createGain();
    o.connect(g);
    g.connect(c.destination);
    o.frequency.setValueAtTime(880, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(440, c.currentTime + 0.3);
    g.gain.setValueAtTime(0.12, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.4);
    o.start();
    o.stop(c.currentTime + 0.4);
  } catch {}
}

function playHarvest() {
  try {
    const c = mkCtx();
    [523, 659, 784, 1047].forEach((f, i) => {
      const o = c.createOscillator();
      const g = c.createGain();
      o.connect(g);
      g.connect(c.destination);
      o.frequency.value = f;
      g.gain.setValueAtTime(0.15, c.currentTime + i * 0.12);
      g.gain.exponentialRampToValueAtTime(
        0.001,
        c.currentTime + i * 0.12 + 0.3
      );
      o.start(c.currentTime + i * 0.12);
      o.stop(c.currentTime + i * 0.12 + 0.3);
    });
  } catch {}
}

function playPlant() {
  try {
    const c = mkCtx();
    const o = c.createOscillator();
    const g = c.createGain();
    o.connect(g);
    g.connect(c.destination);
    o.frequency.setValueAtTime(330, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(660, c.currentTime + 0.2);
    g.gain.setValueAtTime(0.08, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.3);
    o.start();
    o.stop(c.currentTime + 0.3);
  } catch {}
}

function ConfettiBlast({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const points = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: -20,
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * 3 + 2,
      size: Math.random() * 8 + 4,
      rot: Math.random() * 360,
      vr: (Math.random() - 0.5) * 10,
      color: ["#22c55e", "#eab308", "#f97316", "#60a5fa"][Math.floor(Math.random() * 4)],
    }));

    let frame = 0;
    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      points.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });
      frame += 1;
      if (frame < 120) raf = requestAnimationFrame(tick);
      else onDone();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[999]" />;
}

function HarvestPopup({
  plant,
  points,
  onClose,
}: {
  plant: PlantDef;
  points: number;
  onClose: () => void;
}) {
  useEffect(() => {
    const timeout = setTimeout(onClose, 2500);
    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center px-4">
      <div className="pointer-events-auto rounded-[28px] border-2 border-[#4ade80] bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] px-10 py-8 text-center shadow-[0_24px_64px_rgba(0,0,0,0.2)]">
        <div className="mb-3 text-6xl">{plant.emoji}</div>
        <div className="text-2xl font-black text-[#14532d]">Panen Berhasil!</div>
        <div className="mb-5 mt-1 text-sm text-[#166534]">{plant.name}</div>
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4ade80] to-[#16a34a] px-5 py-3 text-lg font-bold text-white">
          <Coins className="h-5 w-5" />+{points} Daya Poin
        </div>
      </div>
    </div>
  );
}

function getPlantStage(progress: number) {
  if (progress >= 100) return "Siap panen";
  if (progress >= 80) return "Menguning";
  if (progress >= 50) return "Tumbuh subur";
  if (progress >= 20) return "Tumbuh awal";
  if (progress >= 5) return "Sprout";
  return "Benih";
}

function PlotCard({
  index,
  plant,
  def,
  state,
  selecting,
  setSelecting,
  onPlant,
  onWater,
  onHarvest,
}: {
  index: number;
  plant: ActivePlant | null;
  def: PlantDef | null;
  state: GameState;
  selecting: number | null;
  setSelecting: (value: number | null) => void;
  onPlant: (index: number, id: string) => void;
  onWater: (index: number) => void;
  onHarvest: (index: number) => void;
}) {
  const progress = plant ? Math.min(100, plant.progress) : 0;
  const wateredToday =
    plant?.lastWaterDate === today() ? (plant?.wateredToday ?? 0) : 0;
  const canWater =
    !!plant &&
    plant.progress < 100 &&
    state.water > 0 &&
    wateredToday < MAX_WATER_PER_DAY;
  const canHarvest = !!plant && progress >= 100;
  const stage = getPlantStage(progress);

  return (
    <div className="relative">
      <Card className="overflow-hidden border-white/70 bg-white/90 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
        <CardHeader className="border-b border-slate-100 pb-3">
          <CardTitle className="flex items-center justify-between gap-3 text-base">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-2xl text-xl"
                style={{
                  background: def
                    ? `linear-gradient(135deg,${def.color}22,${def.accent}1a)`
                    : "#f1f5f9",
                }}
              >
                {def ? def.emoji : "🌱"}
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">
                  {def ? def.name : `Lahan ${index + 1}`}
                </div>
                <div className="text-xs text-muted-foreground">{plant ? stage : "Kosong"}</div>
              </div>
            </div>
            {def && (
              <Badge className="border-0 bg-slate-100 text-slate-700 hover:bg-slate-100">
                {def.points} poin
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4">
          <div
            className="relative flex h-56 items-center justify-center overflow-hidden rounded-3xl border border-slate-100"
            style={{
              background:
                progress >= 80
                  ? "linear-gradient(180deg,#fefce8 0%,#f0fdf4 45%,#dcfce7 100%)"
                  : "linear-gradient(180deg,#f8fafc 0%,#eefbf3 45%,#dcfce7 100%)",
            }}
          >
            <div className="absolute inset-x-0 bottom-0 h-14 bg-[linear-gradient(180deg,#a16207_0%,#78350f_100%)] opacity-20" />
            {plant ? (
              <div className="relative text-center">
                <div
                  className={`text-7xl transition-transform duration-300 ${
                    canHarvest ? "animate-pulse" : ""
                  }`}
                >
                  {def?.emoji}
                </div>
                <div className="mt-3 text-xs font-semibold text-slate-500">
                  {stage}
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-400">
                <div className="text-5xl opacity-30">🌾</div>
                <div className="mt-2 text-sm italic">Pilih bibit untuk mulai</div>
              </div>
            )}
            {plant && (
              <div className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs font-bold text-slate-700">
                {progress}%
              </div>
            )}
          </div>

          {plant && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Progress panen</span>
                <span className="font-bold text-foreground">{progress}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                    background:
                      progress >= 100
                        ? "linear-gradient(90deg,#fbbf24,#f59e0b)"
                        : progress >= 80
                          ? "linear-gradient(90deg,#a3e635,#eab308)"
                          : "linear-gradient(90deg,#4ade80,#16a34a)",
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>
                  Siram: {wateredToday}/{MAX_WATER_PER_DAY}x hari ini
                </span>
                <span>{def?.days} hari</span>
              </div>
            </div>
          )}

          {!plant ? (
            <Button
              onClick={() => setSelecting(selecting === index ? null : index)}
              className={`w-full rounded-xl ${
                selecting === index
                  ? "bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white"
                  : "bg-[#f0fdf4] text-[#15803d] hover:bg-[#dcfce7]"
              }`}
            >
              {selecting === index ? "Batal pilih bibit" : "Pilih Bibit"}
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                disabled={!canWater}
                onClick={() => onWater(index)}
                className="flex-1 rounded-xl bg-gradient-to-r from-[#60a5fa] to-[#2563eb] text-white disabled:bg-slate-200 disabled:text-slate-400"
              >
                <Droplets className="mr-2 h-4 w-4" />
                Siram
              </Button>
              <Button
                disabled={!canHarvest}
                onClick={() => onHarvest(index)}
                className="flex-1 rounded-xl bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-white disabled:bg-slate-200 disabled:text-slate-400"
              >
                <Scissors className="mr-2 h-4 w-4" />
                Panen
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {selecting === index && !plant && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-40 rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_14px_48px_rgba(0,0,0,0.15)]">
          <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
            Pilih Bibit
          </div>
          <div className="space-y-2">
            {PLANT_DEFS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onPlant(index, item.id);
                  setSelecting(null);
                }}
                className="flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition hover:shadow-sm"
                style={{
                  borderColor: `${item.color}44`,
                  background: `linear-gradient(135deg,${item.color}11,${item.accent}08)`,
                }}
              >
                <span className="text-2xl">{item.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.description}</div>
                </div>
                <div className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-slate-700">
                  {item.points} poin
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function GameView() {
  const [state, setState] = useState<GameState>(loadState);
  const [selecting, setSelecting] = useState<number | null>(null);
  const [harvest, setHarvest] = useState<{ def: PlantDef; points: number } | null>(null);
  const [confetti, setConfetti] = useState(false);
  const [waterCD, setWaterCD] = useState(0);
  const [canClaim, setCanClaim] = useState(false);
  const [started, setStarted] = useState(() => {
    const current = loadState();
    return current.totalHarvests > 0 || current.activePlants.some(Boolean) || current.points > 0;
  });
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
    saveState(state);
  }, [state]);

  useEffect(() => {
    const check = () => setCanClaim(stateRef.current.lastDailyClaim !== today());
    check();
    const timer = setInterval(check, 10_000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setState((prev) => ({
        ...prev,
        activePlants: prev.activePlants.map((plant) =>
          plant && plant.progress < 100
            ? { ...plant, progress: Math.min(100, plant.progress + 1) }
            : plant
        ),
      }));
    }, PROGRESS_TICK_MS);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setState((prev) => {
        const elapsed = Date.now() - prev.lastWaterRegen;
        if (elapsed >= WATER_REGEN_MS && prev.water < MAX_WATER) {
          return {
            ...prev,
            water: Math.min(MAX_WATER, prev.water + 1),
            lastWaterRegen: Date.now(),
          };
        }
        return prev;
      });
      setWaterCD(
        Math.ceil(
          Math.max(0, WATER_REGEN_MS - (Date.now() - stateRef.current.lastWaterRegen)) / 1000
        )
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePlant = useCallback((index: number, id: string) => {
    playPlant();
    setState((prev) => {
      const activePlants = [...prev.activePlants];
      activePlants[index] = {
        defId: id,
        progress: 0,
        plantedAt: Date.now(),
        wateredToday: 0,
        lastWaterDate: "",
      };
      return { ...prev, activePlants };
    });
  }, []);

  const handleWater = useCallback((index: number) => {
    playWater();
    setState((prev) => {
      if (prev.water < 1) return prev;
      const activePlants = [...prev.activePlants];
      const plant = activePlants[index];
      if (!plant) return prev;
      const wateredToday = plant.lastWaterDate === today() ? plant.wateredToday : 0;
      if (wateredToday >= MAX_WATER_PER_DAY) return prev;
      activePlants[index] = {
        ...plant,
        progress: Math.min(100, plant.progress + WATER_BOOST),
        wateredToday: wateredToday + 1,
        lastWaterDate: today(),
      };
      return { ...prev, water: prev.water - 1, activePlants };
    });
  }, []);

  const handleHarvest = useCallback((index: number) => {
    setState((prev) => {
      const activePlants = [...prev.activePlants];
      const plant = activePlants[index];
      if (!plant || plant.progress < 100) return prev;
      const def = PLANT_DEFS.find((item) => item.id === plant.defId);
      if (!def) return prev;
      playHarvest();
      setConfetti(true);
      setHarvest({ def, points: def.points });
      activePlants[index] = null;
      return {
        ...prev,
        activePlants,
        points: prev.points + def.points,
        totalHarvests: prev.totalHarvests + 1,
      };
    });
  }, []);

  const handleClaim = () => {
    if (!canClaim) return;
    setState((prev) => ({
      ...prev,
      water: Math.min(MAX_WATER, prev.water + DAILY_WATER_BONUS),
      lastDailyClaim: today(),
    }));
    setCanClaim(false);
  };

  const fmt = (seconds: number) =>
    `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60)
      .toString()
      .padStart(2, "0")}`;

  const activeCnt = state.activePlants.filter(Boolean).length;
  const hasReady = state.activePlants.some((plant) => plant && plant.progress >= 100);

  return (
    <>
      <style>{`
        .game-shell {
          background: linear-gradient(160deg,#f0fdf4 0%,#ecfdf5 30%,#f8fafc 60%,#fffbeb 100%);
          position: relative;
        }
        .game-shell::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 80% 40% at 20% 20%,rgba(74,222,128,0.08) 0%,transparent 70%),
            radial-gradient(ellipse 60% 50% at 80% 80%,rgba(251,191,36,0.06) 0%,transparent 70%);
        }
      `}</style>
      {confetti && <ConfettiBlast onDone={() => setConfetti(false)} />}
      {harvest && (
        <HarvestPopup
          plant={harvest.def}
          points={harvest.points}
          onClose={() => setHarvest(null)}
        />
      )}

      {!started ? (
        <section className="game-shell overflow-hidden rounded-3xl border border-[#22c55e]/15 p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center">
            <div>
              <Badge className="mb-5 border border-[#22c55e]/20 bg-[#dcfce7] text-[#15803d] hover:bg-[#dcfce7]">
                Harvest Bogor
              </Badge>
              <h1 className="mb-4 text-3xl font-bold text-foreground md:text-5xl">
                Halaman game yang sekarang ikut layout dashboard user.
              </h1>
              <p className="mb-6 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                Sidebar tetap memakai shell yang sama seperti page lain. Konten
                game dipindahkan ke area utama, jadi tampilannya lebih rapi dan konsisten.
              </p>
              <div className="mb-8 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: <Leaf className="h-5 w-5 text-[#16a34a]" />, value: SLOTS, label: "Slot lahan" },
                  { icon: <Coins className="h-5 w-5 text-[#f59e0b]" />, value: "120", label: "Poin maksimal" },
                  { icon: <Droplets className="h-5 w-5 text-[#2563eb]" />, value: `${MAX_WATER_PER_DAY}x`, label: "Siram per hari" },
                ].map((item) => (
                  <Card key={item.label} className="border-white/60 bg-white/85 backdrop-blur">
                    <CardContent className="flex items-center gap-3 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/60">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xl font-bold text-foreground">{item.value}</div>
                        <div className="text-xs text-muted-foreground">{item.label}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button
                onClick={() => setStarted(true)}
                className="rounded-xl bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white"
              >
                <Sprout className="mr-2 h-4 w-4" />
                Mulai Bertani
              </Button>
            </div>

            <Card className="border-white/60 bg-white/90 shadow-[0_24px_64px_rgba(0,0,0,0.09)]">
              <CardHeader>
                <CardTitle>Preview Tanaman</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-3">
                {PLANT_DEFS.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl p-3 text-center"
                    style={{
                      background: `linear-gradient(135deg,${item.color}12,${item.accent}08)`,
                      border: `1.5px solid ${item.color}33`,
                    }}
                  >
                    <div className="mb-2 text-4xl">{item.emoji}</div>
                    <div className="text-xs font-bold text-foreground">{item.name}</div>
                    <div className="text-[11px] text-muted-foreground">{item.days} hari</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>
      ) : (
        <div className="space-y-6">
          <section className="game-shell overflow-hidden rounded-3xl border border-[#22c55e]/15 p-6 md:p-8">
            <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <Badge className="mb-3 border border-[#22c55e]/20 bg-[#dcfce7] text-[#15803d] hover:bg-[#dcfce7]">
                  Harvest Bogor
                </Badge>
                <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                  Kebun virtual untuk kumpulkan Daya Poin
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  Summary game sekarang menyatu dengan konten utama, bukan membuat shell sendiri.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  onClick={handleClaim}
                  disabled={!canClaim}
                  className="rounded-xl bg-gradient-to-r from-[#a78bfa] to-[#7c3aed] text-white disabled:bg-slate-200 disabled:text-slate-400"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Klaim Harian
                  {canClaim ? ` +${DAILY_WATER_BONUS} air` : ""}
                </Button>
                <Button variant="outline" onClick={() => setStarted(false)} className="rounded-xl">
                  Kembali ke Intro
                </Button>
              </div>
            </div>

            <div className="mb-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {[
                { icon: <Droplets className="h-5 w-5 text-[#2563eb]" />, label: "Air tersedia", value: `${state.water}/${MAX_WATER}`, detail: state.water < MAX_WATER ? `+1 dalam ${fmt(waterCD)}` : "Tangki penuh" },
                { icon: <Coins className="h-5 w-5 text-[#f59e0b]" />, label: "Daya Poin", value: state.points.toLocaleString(), detail: "1 poin = Rp1 diskon" },
                { icon: <Scissors className="h-5 w-5 text-[#a855f7]" />, label: "Total panen", value: `${state.totalHarvests}`, detail: "Akumulasi semua sesi" },
                { icon: <Zap className="h-5 w-5 text-[#16a34a]" />, label: "Lahan aktif", value: `${activeCnt}/${SLOTS}`, detail: hasReady ? "Ada yang siap dipanen" : "Masih tumbuh" },
              ].map((item) => (
                <Card key={item.label} className="border-white/60 bg-white/85 backdrop-blur">
                  <CardContent className="flex items-start gap-3 p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted/60">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-muted-foreground">{item.label}</div>
                      <div className="text-2xl font-bold text-foreground">{item.value}</div>
                      <div className="text-xs text-muted-foreground">{item.detail}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
              <div className="space-y-4">
                <Card className="border-white/60 bg-white/85">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Leaf className="h-5 w-5 text-[#16a34a]" />
                      Kebun Virtual
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { icon: <Sprout className="h-4 w-4 text-[#16a34a]" />, label: "Lahan ditanam", val: `${activeCnt}/${SLOTS}` },
                      { icon: <Coins className="h-4 w-4 text-[#f59e0b]" />, label: "Total poin", val: state.points.toLocaleString() },
                      { icon: <Scissors className="h-4 w-4 text-[#a855f7]" />, label: "Total panen", val: `${state.totalHarvests}` },
                      { icon: <Droplets className="h-4 w-4 text-[#2563eb]" />, label: "Air tersisa", val: `${state.water}/${MAX_WATER}` },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {item.icon}
                          <span>{item.label}</span>
                        </div>
                        <span className="text-sm font-bold text-foreground">{item.val}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-white/60 bg-white/85">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Tahap Pertumbuhan</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      "🌱 Benih · 0–4%",
                      "🌿 Sprout · 5–19%",
                      "🌿 Tumbuh Awal · 20–49%",
                      "🌿 Subur · 50–79%",
                      "🌾 Menguning · 80–99%",
                      "✨ Siap Panen · 100%",
                    ].map((item) => (
                      <div key={item} className="border-b border-slate-100 pb-3 text-sm text-muted-foreground last:border-b-0 last:pb-0">
                        {item}
                      </div>
                    ))}
                    <div className="rounded-xl border border-[#86efac] bg-gradient-to-r from-[#f0fdf4] to-[#dcfce7] p-3 text-xs leading-5 text-[#166534]">
                      Siram menambah {WATER_BOOST}% progress. Air bertambah 1 setiap 1 menit.
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-foreground md:text-2xl">Lahan pertanianmu</h2>
                    <p className="text-sm text-muted-foreground">{activeCnt}/{SLOTS} lahan aktif</p>
                  </div>
                  {hasReady && (
                    <Badge className="w-fit border border-[#fbbf24] bg-[#fef3c7] px-3 py-1 text-[#92400e] hover:bg-[#fef3c7]">
                      Ada yang siap dipanen
                    </Badge>
                  )}
                </div>

                <div className="grid gap-[18px] md:grid-cols-2 xl:grid-cols-3" onClick={() => selecting !== null && setSelecting(null)}>
                  {Array.from({ length: SLOTS }).map((_, i) => {
                    const plant = state.activePlants[i];
                    const def = plant ? PLANT_DEFS.find((item) => item.id === plant.defId) ?? null : null;
                    return (
                      <div key={i} onClick={(event) => event.stopPropagation()}>
                        <PlotCard
                          index={i}
                          plant={plant}
                          def={def}
                          state={state}
                          selecting={selecting}
                          setSelecting={setSelecting}
                          onPlant={handlePlant}
                          onWater={handleWater}
                          onHarvest={handleHarvest}
                        />
                      </div>
                    );
                  })}
                </div>

                <Card className="mt-5 border-white/60 bg-white/80">
                  <CardContent className="flex flex-col gap-2 p-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
                    <div>
                      <span className="font-semibold text-foreground">Game loop:</span>{" "}
                      Tanam - Siram ({MAX_WATER_PER_DAY}x/hari, +{WATER_BOOST}%) - Progress naik - Panen - Dapat poin - Ulangi
                    </div>
                    <div className="text-[#2563eb]">
                      Regen air: <span className="font-semibold">{state.water < MAX_WATER ? fmt(waterCD) : "Penuh"}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
