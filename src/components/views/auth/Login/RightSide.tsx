import { ArrowUpRight, BadgeCheck, Layers3, Zap } from "lucide-react";

const highlights = [
  {
    icon: Layers3,
    label: "Pengalaman",
    value: "Lebih clean dan fokus",
  },
  {
    icon: BadgeCheck,
    label: "Feedback",
    value: "Validasi terasa realtime",
  },
  {
    icon: Zap,
    label: "Aksi cepat",
    value: "CTA lebih jelas dan responsif",
  },
];

const RightSide = () => {
  return (
    <div className="relative hidden min-h-[760px] overflow-hidden bg-[linear-gradient(160deg,#FFF7EB_0%,#FCE7BA_42%,#F6CE71_100%)] p-8 lg:flex lg:flex-col lg:justify-between">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,101,0,0.26),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(204,86,30,0.22),transparent_34%)]" />
      <div className="absolute -left-20 top-12 h-72 w-72 rounded-full bg-[#FF6500]/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-white/45 blur-3xl" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-4 py-2 text-sm font-semibold text-[#CC561E] shadow-sm backdrop-blur">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF6500]" />
          Sadaya Login Experience
        </div>

        <div className="mt-8 max-w-lg animate-auth-enter">
          <h2 className="text-4xl font-bold leading-tight text-[#2D2118] xl:text-5xl">
            Login yang lebih hidup, tetap sederhana, dan enak dipakai.
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-[#5F4A3B]">
            Semua elemen dirapikan supaya fokus utama tetap di form, tapi
            interaksinya terasa modern dan lebih percaya diri.
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-10 space-y-5">
        <div className="animate-auth-float rounded-[28px] border border-white/80 bg-white/78 p-6 shadow-[0_22px_60px_rgba(174,98,37,0.18)] backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#CC561E]">
                Auth Panel
              </p>
              <h3 className="mt-2 text-2xl font-bold text-[#2D2118]">
                Akses semua alur Sadaya
              </h3>
            </div>
            <div className="rounded-2xl bg-[#FF6500] p-3 text-white shadow-lg">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[#F3DDC5] bg-white/92 p-4 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-[linear-gradient(135deg,#FF6500,#CC561E)] p-2.5 text-white shadow-md">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B56A3F]">
                      {item.label}
                    </p>
                    <p className="mt-1 font-semibold text-[#2D2118]">
                      {item.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-[24px] border border-white/75 bg-white/72 p-5 shadow-[0_18px_42px_rgba(174,98,37,0.14)] backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#CC561E]">
              Fokus
            </p>
            <p className="mt-3 text-3xl font-bold text-[#2D2118]">1 Card</p>
            <p className="mt-2 text-sm leading-6 text-[#5F4A3B]">
              Semua aksi utama tetap dekat dan jelas.
            </p>
          </div>
          <div className="rounded-[24px] border border-white/75 bg-[#2D2118] p-5 text-white shadow-[0_18px_42px_rgba(45,33,24,0.18)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F6CE71]">
              Microinteraction
            </p>
            <p className="mt-3 text-3xl font-bold">0.3s</p>
            <p className="mt-2 text-sm leading-6 text-white/80">
              Transisi ringan supaya form terasa responsif.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
