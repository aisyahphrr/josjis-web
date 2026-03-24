import { ArrowRight, BriefcaseBusiness, ShieldCheck, UserRoundPlus } from "lucide-react";

const blocks = [
  {
    icon: UserRoundPlus,
    title: "Role-aware flow",
    text: "User, UMKM, dan driver punya jalur yang terasa lebih jelas sejak awal.",
  },
  {
    icon: ShieldCheck,
    title: "Validasi langsung",
    text: "Email, password, dan konfirmasi password memberi feedback tanpa menunggu submit.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Branding lebih kuat",
    text: "Logo Sadaya v2 jadi titik fokus utama di area auth.",
  },
];

const RightSide = () => {
  return (
    <div className="relative hidden min-h-[760px] overflow-hidden bg-[linear-gradient(160deg,#FFF7EB_0%,#FCE7BA_42%,#F6CE71_100%)] p-8 lg:flex lg:flex-col lg:justify-between">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,101,0,0.26),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(204,86,30,0.22),transparent_34%)]" />
      <div className="absolute -right-16 top-20 h-72 w-72 rounded-full bg-[#FF6500]/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-white/48 blur-3xl" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-4 py-2 text-sm font-semibold text-[#CC561E] shadow-sm backdrop-blur">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF6500]" />
          Sadaya Register Flow
        </div>

        <div className="mt-8 max-w-lg animate-auth-enter">
          <h2 className="text-4xl font-bold leading-tight text-[#2D2118] xl:text-5xl">
            Register yang terasa ringan, jelas, dan tetap engaging.
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-[#5F4A3B]">
            Visual dibuat lebih clean, tapi setiap langkah tetap terasa aktif
            lewat pilihan role, feedback realtime, dan CTA yang kuat.
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-10 space-y-5">
        <div className="animate-auth-float rounded-[28px] border border-white/80 bg-white/78 p-6 shadow-[0_22px_60px_rgba(174,98,37,0.18)] backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#CC561E]">
                Register Preview
              </p>
              <h3 className="mt-2 text-2xl font-bold text-[#2D2118]">
                Satu tampilan, banyak jalur peran
              </h3>
            </div>
            <div className="rounded-2xl bg-[#FF6500] p-3 text-white shadow-lg">
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {blocks.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#F3DDC5] bg-white/92 p-4 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-[linear-gradient(135deg,#FF6500,#CC561E)] p-2.5 text-white shadow-md">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#2D2118]">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-[#5F4A3B]">
                      {item.text}
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
            <p className="mt-3 text-3xl font-bold text-[#2D2118]">3 Role</p>
            <p className="mt-2 text-sm leading-6 text-[#5F4A3B]">
              Tiap role tetap satu gaya visual yang konsisten.
            </p>
          </div>
          <div className="rounded-[24px] border border-white/75 bg-[#2D2118] p-5 text-white shadow-[0_18px_42px_rgba(45,33,24,0.18)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F6CE71]">
              Feedback
            </p>
            <p className="mt-3 text-3xl font-bold">Realtime</p>
            <p className="mt-2 text-sm leading-6 text-white/80">
              Error, focus, dan status loading lebih mudah dipahami.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
