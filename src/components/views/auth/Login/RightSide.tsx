import { Sparkles } from "lucide-react";

const RightSide = () => {
  return (
    <div className="hidden lg:flex flex-1 items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-[#F99912]/20 via-[#64762C]/10 to-[#424F17]/20" />
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#F99912]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-[#64762C]/20 rounded-full blur-3xl" />

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(249,153,18,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249,153,18,0.3) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-md text-center">
        <div className="w-24 h-24 mx-auto rounded-3xl bg-linear-to-br from-[#F99912] to-[#64762C] p-0.5 mb-8 shadow-[0_0_50px_rgba(249,153,18,0.3)]">
          <div className="w-full h-full rounded-3xl bg-background flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-[#F99912]" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Jelajahi UMKM Bogor
        </h2>
        <p className="text-muted-foreground text-pretty">
          Platform marketplace dengan gamification dan AI untuk mendukung
          ekonomi kreatif Bogor.
        </p>
      </div>
    </div>
  );
};

export default RightSide;
