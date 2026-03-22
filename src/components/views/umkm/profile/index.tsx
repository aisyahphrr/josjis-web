"use client";

import { useState } from "react";
import { 
  Building2, MapPin, Mail, Phone, Globe, Star, Package, 
  TrendingUp, Award, Camera, ShieldCheck, Map, Clock, FileText,
  Edit, Save, X, Plus
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function UmkmProfileView() {
  const [activeTab, setActiveTab] = useState("info");
  const [isEditing, setIsEditing] = useState(false);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  
  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profil berhasil diperbarui!");
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const stats = [
    { label: "Total Penjualan", value: "1,245", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Produk Aktif", value: "48", icon: Package, color: "text-[#64762C]", bg: "bg-[#64762C]/10" },
    { label: "Rating Toko", value: "4.8", icon: Star, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Ulasan Positif", value: "98%", icon: Award, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* Header Profile Section */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden relative shadow-sm">
        {/* Banner */}
        <div 
          className="h-48 md:h-64 w-full relative bg-gradient-to-r from-[#64762C] to-[#8A9E3F] transition-all duration-300"
          style={bannerUrl ? { backgroundImage: `url(${bannerUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        >
          {!bannerUrl && <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />}
          
          <input type="file" id="banner-upload" className="hidden" accept="image/*" onChange={handleBannerUpload} />
          <label htmlFor="banner-upload" className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg backdrop-blur-sm transition-all flex items-center gap-2 text-sm cursor-pointer border border-white/20">
            <Camera className="w-4 h-4" />
            <span className="hidden sm:inline">Ubah Banner</span>
          </label>
        </div>

        {/* Profile Info */}
        <div className="px-6 sm:px-10 pb-8 relative">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16 md:-mt-20 mb-6">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-card bg-muted flex items-center justify-center overflow-hidden shrink-0 relative transition-all duration-300">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#E5E9D8] text-[#64762C] flex items-center justify-center text-5xl font-bold">
                    JS
                  </div>
                )}
              </div>
              <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
              <label htmlFor="avatar-upload" className="absolute bottom-2 right-2 bg-primary text-primary-foreground p-2 rounded-full shadow-lg border-2 border-card hover:brightness-110 transition-all cursor-pointer flex items-center justify-center">
                <Camera className="w-4 h-4" />
              </label>
            </div>
            
            <div className="flex-1 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">Josjis Store Official</h1>
                  <ShieldCheck className="w-6 h-6 text-blue-500" />
                </div>
                <p className="text-muted-foreground flex items-center gap-2 text-sm sm:text-base">
                  <Building2 className="w-4 h-4" />
                  Aneka Kuliner Nusantara
                </p>
              </div>
              
              <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isEditing 
                      ? 'bg-muted text-foreground hover:bg-muted/80' 
                      : 'bg-[#64762C] text-white hover:bg-[#64762C]/90 shadow-lg shadow-[#64762C]/20'
                  }`}
                >
                  {isEditing ? (
                    <>
                      <X className="w-4 h-4" /> Batal Edit
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4" /> Edit Profil
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-muted/30 border border-border p-4 rounded-xl flex items-center gap-4 hover:bg-muted/50 transition-colors">
                <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm border-muted-foreground text-muted-foreground">{stat.label}</p>
                  <p className="text-lg font-bold text-foreground">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Sidebar - Quick Info */}
        <div className="space-y-6">
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-foreground">
              <Globe className="w-5 h-5 text-[#64762C]" />
              Kontak & Info
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Telepon</p>
                  <p className="font-medium text-foreground">+62 812-3456-7890</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">hello@josjisstore.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Lokasi Utama</p>
                  <p className="font-medium text-foreground">Jl. Sudirman No. 123, Jakarta Selatan</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Jam Operasional</p>
                  <p className="font-medium text-foreground">08:00 - 17:00 WIB (Sen-Jum)</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Bergabung sejak</p>
                <p className="font-medium text-foreground">12 Jan 2024</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Status Toko</p>
                <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-semibold rounded-full flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Aktif
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Tabs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex overflow-x-auto border-b border-border hide-scrollbar">
              <button 
                onClick={() => setActiveTab('info')}
                className={`flex-1 min-w-[150px] py-4 px-6 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 cursor-pointer
                  ${activeTab === 'info' ? 'border-[#64762C] text-[#64762C]' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                <Building2 className="w-4 h-4" /> Informasi Bisnis
              </button>
              <button 
                onClick={() => setActiveTab('location')}
                className={`flex-1 min-w-[150px] py-4 px-6 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 cursor-pointer
                  ${activeTab === 'location' ? 'border-[#64762C] text-[#64762C]' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                <Map className="w-4 h-4" /> Alamat & Logistik
              </button>
              <button 
                onClick={() => setActiveTab('legal')}
                className={`flex-1 min-w-[150px] py-4 px-6 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 cursor-pointer
                  ${activeTab === 'legal' ? 'border-[#64762C] text-[#64762C]' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                <FileText className="w-4 h-4" /> Dokumen Legal
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6 md:p-8">
              {activeTab === 'info' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Deskripsi Toko</h4>
                    {isEditing ? (
                      <textarea 
                        className="w-full h-32 p-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[#64762C] focus:border-transparent outline-none resize-none"
                        defaultValue="Kami adalah UMKM yang bergerak di bidang kuliner tradisional Indonesia dengan sentuhan modern. Berdiri sejak 2024, Josjis Store Official berkomitmen untuk membawa cita rasa nusantara ke kancah global dengan menggunakan bahan-bahan lokal berkualitas tinggi."
                      />
                    ) : (
                      <p className="text-foreground leading-relaxed">
                        Kami adalah UMKM yang bergerak di bidang kuliner tradisional Indonesia dengan sentuhan modern. Berdiri sejak 2024, Josjis Store Official berkomitmen untuk membawa cita rasa nusantara ke kancah global dengan menggunakan bahan-bahan lokal berkualitas tinggi.
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Kategori Usaha</label>
                      {isEditing ? (
                        <select className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[#64762C] focus:border-transparent outline-none">
                          <option>Kuliner / Makanan</option>
                          <option>Minuman</option>
                          <option>Pakaian</option>
                          <option>Kerajinan Tangan</option>
                        </select>
                      ) : (
                        <p className="font-medium text-foreground py-2">Kuliner / Makanan</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Skala Usaha</label>
                      {isEditing ? (
                        <select className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[#64762C] focus:border-transparent outline-none">
                          <option>Usaha Mikro</option>
                          <option>Usaha Kecil</option>
                          <option>Usaha Menengah</option>
                        </select>
                      ) : (
                        <p className="font-medium text-foreground py-2">Usaha Mikro</p>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end pt-6">
                      <button 
                        onClick={handleSave}
                        className="px-6 py-2.5 bg-[#64762C] text-white rounded-xl font-medium hover:bg-[#64762C]/90 transition-colors flex items-center gap-2 shadow-lg shadow-[#64762C]/20 cursor-pointer"
                      >
                        <Save className="w-4 h-4" /> Simpan Perubahan
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'location' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Daftar Alamat</h4>
                    <button className="text-sm text-[#64762C] font-medium hover:underline flex items-center gap-1 cursor-pointer">
                      <Plus className="w-4 h-4" /> Tambah Alamat
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border border-[#64762C] bg-[#64762C]/5 p-5 rounded-xl block relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-[#64762C] text-white text-xs px-3 py-1 rounded-bl-lg font-medium">Utama</div>
                      <h5 className="font-bold text-foreground mb-1">Toko Pusat (Jakarta)</h5>
                      <p className="text-sm text-muted-foreground mb-3">Budi Santoso | +62 812-3456-7890</p>
                      <p className="text-sm text-foreground">Jl. Sudirman No. 123, Gedung Menara Jaya Lantai 5, Kecamatan Kebayoran Baru, Jakarta Selatan, 12190</p>
                      
                      <div className="flex gap-3 mt-4">
                        <button className="text-xs font-medium px-3 py-1.5 bg-background border border-border rounded-lg hover:bg-muted transition-colors cursor-pointer">Ubah</button>
                      </div>
                    </div>

                    <div className="border border-border p-5 rounded-xl block hover:border-muted-foreground transition-colors">
                      <h5 className="font-bold text-foreground mb-1">Cabang Bandung</h5>
                      <p className="text-sm text-muted-foreground mb-3">Siti Aminah | +62 898-7654-3210</p>
                      <p className="text-sm text-foreground">Jl. Asia Afrika No. 45, Braga, Sumur Bandung, Kota Bandung, Jawa Barat 40111</p>
                      
                      <div className="flex gap-3 mt-4">
                        <button className="text-xs font-medium px-3 py-1.5 bg-background border border-border rounded-lg hover:bg-muted transition-colors cursor-pointer">Ubah</button>
                        <button className="text-xs font-medium px-3 py-1.5 text-[#64762C] border-transparent hover:bg-[#64762C]/10 rounded-lg transition-colors cursor-pointer">Jadikan Utama</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'legal' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-border p-5 rounded-xl flex items-start gap-4">
                      <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="font-bold text-foreground mb-1">NIB (Nomor Induk Berusaha)</h5>
                        <p className="text-sm text-muted-foreground mb-2">1234567890123</p>
                        <span className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-md font-medium border border-emerald-500/20">Terverifikasi</span>
                      </div>
                    </div>

                    <div className="border border-border p-5 rounded-xl flex items-start gap-4">
                      <div className="p-3 bg-purple-500/10 text-purple-500 rounded-lg">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="font-bold text-foreground mb-1">Sertifikat Halal</h5>
                        <p className="text-sm text-muted-foreground mb-2">ID123456789012345</p>
                        <span className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-md font-medium border border-emerald-500/20">Aktif s/d 2026</span>
                      </div>
                    </div>
                    
                    <div className="border border-border p-5 rounded-xl flex items-start gap-4">
                      <div className="p-3 bg-amber-500/10 text-amber-500 rounded-lg">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="font-bold text-foreground mb-1">PIRT</h5>
                        <p className="text-sm text-muted-foreground mb-2">P-IRT 2012345678901-24</p>
                        <span className="text-xs px-2 py-1 bg-amber-500/10 text-amber-500 rounded-md font-medium border border-amber-500/20">Menunggu Verifikasi</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-4 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:border-muted-foreground transition-all flex flex-col items-center justify-center gap-2 cursor-pointer">
                    <Plus className="w-6 h-6" />
                    <span className="font-medium">Tambah Dokumen Baru</span>
                    <span className="text-xs">PDF, JPG, PNG up to 5MB</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
