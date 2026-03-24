"use client";

import { Users, Store, Bike } from "lucide-react";

export function EcosystemSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-white z-20 -mt-10 rounded-[3rem] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.05)] border border-border/50 mx-4 sm:mx-6 lg:mx-8 mb-10">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="text-center mb-16">
               <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#283238] mb-4 text-balance">
                  Simbiosis Mutualisme <span className="text-[#9ACD32]">Lokal</span>
               </h2>
               <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                 Sadaya menyatukan tiga pilar utama penggerak ekonomi Bogor.
                 Semua tumbuh, semua berdaya.
               </p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8">
              {/* UMKM Card */}
              <div className="relative group overflow-hidden p-8 rounded-[2rem] bg-gradient-to-br from-[#FFF5E6] to-[#FFFcf8] border border-[#F99912]/20 hover:shadow-2xl hover:shadow-[#F99912]/10 transition-all duration-500 hover:-translate-y-2">
                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F99912] to-[#FFB75E] flex items-center justify-center mb-6 shadow-lg shadow-[#F99912]/30 group-hover:scale-110 transition-transform duration-300">
                    <Store className="w-8 h-8 text-white relative z-10" />
                 </div>
                 <h3 className="text-2xl font-bold text-[#283238] mb-3">Pelaku UMKM</h3>
                 <p className="text-muted-foreground leading-relaxed relative z-10">
                   UMKM lokal mendapat ruang digital eksklusif, edukasi bisnis rutin, dan visibilitas lebih luas untuk merajai pasar Bogor tanpa tergerus platform raksasa.
                 </p>
                 <div className="absolute -bottom-8 -right-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 pointer-events-none">
                    <Store className="w-48 h-48 text-[#F99912]" />
                 </div>
              </div>

              {/* Driver Card */}
              <div className="relative group overflow-hidden p-8 rounded-[2rem] bg-gradient-to-br from-[#F4FBEE] to-[#Fdfof8] border border-[#9ACD32]/20 hover:shadow-2xl hover:shadow-[#9ACD32]/10 transition-all duration-500 hover:-translate-y-2 mt-0 md:mt-12">
                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#9ACD32] to-[#AED581] flex items-center justify-center mb-6 shadow-lg shadow-[#9ACD32]/30 group-hover:scale-110 transition-transform duration-300">
                    <Bike className="w-8 h-8 text-white relative z-10" />
                 </div>
                 <h3 className="text-2xl font-bold text-[#283238] mb-3">Pengemudi</h3>
                 <p className="text-muted-foreground leading-relaxed relative z-10">
                   Sistem komisi dan penghasilan yang transparan dan adil. Memberdayakan ojek pangkalan lokal agar tetap relevan sebagai urat nadi logistik kota.
                 </p>
                 <div className="absolute -bottom-8 -right-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 pointer-events-none">
                    <Bike className="w-48 h-48 text-[#9ACD32]" />
                 </div>
              </div>

              {/* Customer Card */}
              <div className="relative group overflow-hidden p-8 rounded-[2rem] bg-gradient-to-br from-[#F3E8FF] to-[#FAF8FC] border border-[#9370DB]/20 hover:shadow-2xl hover:shadow-[#9370DB]/10 transition-all duration-500 hover:-translate-y-2 mt-0 md:mt-24">
                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#9370DB] to-[#B39DDB] flex items-center justify-center mb-6 shadow-lg shadow-[#9370DB]/30 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-white relative z-10" />
                 </div>
                 <h3 className="text-2xl font-bold text-[#283238] mb-3">Warga Bogor</h3>
                 <p className="text-muted-foreground leading-relaxed relative z-10">
                   Masyarakat dapat berbelanja produk asli Bogor dengan sangat mudah. Sambil mengumpulkan Daya Poin, mereka berkontribusi langsung memajukan ekonomi tetangga.
                 </p>
                 <div className="absolute -bottom-8 -right-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 pointer-events-none">
                    <Users className="w-48 h-48 text-[#9370DB]" />
                 </div>
              </div>
           </div>
       </div>

       {/* Decorative gradient overlay */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50rem] h-[10rem] bg-gradient-to-b from-[#F99912]/5 to-transparent blur-3xl pointer-events-none" />
    </section>
  );
}
