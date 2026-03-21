"use client";

import { useState } from "react";
import { 
  Building2, MapPin, Mail, Phone, Globe, Star, Package, 
  TrendingUp, Award, Camera, ShieldCheck, Map, Clock, FileText,
  Edit, Save, X, Plus, Bike, Navigation
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function DriverProfileView() {
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
    { label: "Total Perjalanan", value: "342", icon: Navigation, color: "text-[#F99912]", bg: "bg-[#F99912]/10" },
    { label: "Total Pendapatan", value: "Rp 4.2Jt", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Rating Driver", value: "4.9", icon: Star, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Ulasan Positif", value: "99%", icon: Award, color: "text-[#64762C]", bg: "bg-[#64762C]/10" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* Header Profile Section */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden relative shadow-sm">
        {/* Banner */}
        <div 
          className="h-48 md:h-64 w-full relative bg-linear-to-r from-[#181612] to-[#2E2A22] transition-all duration-300"
          style={bannerUrl ? { backgroundImage: `url(${bannerUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        >
          {!bannerUrl && <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-repeat" />}
          
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
                  <div className="w-full h-full bg-[#FFF5E6] text-[#F99912] flex items-center justify-center text-5xl font-bold">
                    AD
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
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">Ahmad Driver</h1>
                  <ShieldCheck className="w-6 h-6 text-[#F99912]" />
                </div>
                <p className="text-muted-foreground flex items-center gap-2 text-sm sm:text-base">
                  <Bike className="w-4 h-4" />
                  Mitra Sadaya Ekspedisi (Motor)
                </p>
              </div>
              
              <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isEditing 
                      ? 'bg-muted text-foreground hover:bg-muted/80' 
                      : 'bg-[#181612] text-white hover:bg-[#2E2A22] shadow-lg shadow-black/10'
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
              <Globe className="w-5 h-5 text-[#F99912]" />
              Kontak & Info
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Telepon</p>
                  <p className="font-medium text-foreground">+62 812-9999-8888</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">ahmad.driver@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Jam Operasional Aktif</p>
                  <p className="font-medium text-foreground">08:00 - 18:00 WIB</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Bergabung sejak</p>
                <p className="font-medium text-foreground">22 Feb 2024</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Status Mitra</p>
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
                  ${activeTab === 'info' ? 'border-[#F99912] text-[#F99912]' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                <Bike className="w-4 h-4" /> Kendaraan
              </button>
              <button 
                onClick={() => setActiveTab('location')}
                className={`flex-1 min-w-[150px] py-4 px-6 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 cursor-pointer
                  ${activeTab === 'location' ? 'border-[#F99912] text-[#F99912]' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                <Map className="w-4 h-4" /> Wilayah
              </button>
              <button 
                onClick={() => setActiveTab('legal')}
                className={`flex-1 min-w-[150px] py-4 px-6 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 cursor-pointer
                  ${activeTab === 'legal' ? 'border-[#F99912] text-[#F99912]' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                <FileText className="w-4 h-4" /> Lisensi
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6 md:p-8">
              {activeTab === 'info' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Jenis Kendaraan</label>
                      {isEditing ? (
                        <select className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[#F99912] focus:border-transparent outline-none">
                          <option>Motor Matic</option>
                          <option>Motor Bebek</option>
                          <option>Motor Sport</option>
                          <option>Mobil Box</option>
                        </select>
                      ) : (
                        <p className="font-medium text-foreground py-2 border-b border-border/50">Motor Matic</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Merek & Tipe Kendaraan</label>
                      {isEditing ? (
                        <input 
                          type="text"
                          className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[#F99912] focus:border-transparent outline-none"
                          defaultValue="Honda Vario 150"
                        />
                      ) : (
                        <p className="font-medium text-foreground py-2 border-b border-border/50">Honda Vario 150</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Plat Nomor</label>
                      {isEditing ? (
                        <input 
                          type="text"
                          className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[#F99912] focus:border-transparent outline-none"
                          defaultValue="F 1234 ABC"
                        />
                      ) : (
                        <p className="font-medium text-foreground py-2 border-b border-border/50">F 1234 ABC</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Tahun Kendaraan</label>
                      {isEditing ? (
                        <input 
                          type="number"
                          className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[#F99912] focus:border-transparent outline-none"
                          defaultValue="2021"
                        />
                      ) : (
                        <p className="font-medium text-foreground py-2 border-b border-border/50">2021</p>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end pt-6 border-t border-border">
                      <button 
                        onClick={handleSave}
                        className="px-6 py-2.5 bg-[#F99912] text-[#181612] rounded-xl font-bold hover:bg-[#F99912]/90 transition-colors flex items-center gap-2 shadow-lg shadow-[#F99912]/20 cursor-pointer"
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
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Wilayah Operasional Utama</h4>
                    <button className="text-sm text-[#F99912] font-medium hover:underline flex items-center gap-1 cursor-pointer">
                      <Plus className="w-4 h-4" /> Kelola Wilayah
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border border-[#F99912] bg-[#F99912]/5 p-5 rounded-xl block relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-[#F99912] text-[#181612] text-xs px-3 py-1 rounded-bl-lg font-bold">Basis Utama</div>
                      <h5 className="font-bold text-foreground mb-1">Bogor Tengah</h5>
                      <p className="text-sm text-foreground mb-3">Radius operasi maksimal 15km</p>
                      
                      <div className="flex gap-3 mt-4">
                        <button className="text-xs font-medium px-3 py-1.5 bg-background border border-border rounded-lg hover:bg-muted transition-colors cursor-pointer">Ubah Setelan Jarak</button>
                      </div>
                    </div>

                    <div className="border border-border p-5 rounded-xl block hover:border-muted-foreground transition-colors">
                      <h5 className="font-bold text-foreground mb-1">Bogor Utara</h5>
                      <p className="text-sm text-foreground mb-3">Radius operasi maksimal 10km</p>
                      
                      <div className="flex gap-3 mt-4">
                        <button className="text-xs font-medium px-3 py-1.5 bg-background border border-border rounded-lg hover:bg-muted transition-colors cursor-pointer">Ubah Setelan Jarak</button>
                        <button className="text-xs font-medium px-3 py-1.5 text-[#F99912] border-transparent hover:bg-[#F99912]/10 rounded-lg transition-colors cursor-pointer">Jadikan Basis Utama</button>
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
                        <h5 className="font-bold text-foreground mb-1">SIM C</h5>
                        <p className="text-sm text-muted-foreground mb-2">98765432101234</p>
                        <span className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-md font-medium border border-emerald-500/20">Berlaku s/d 2028</span>
                      </div>
                    </div>

                    <div className="border border-border p-5 rounded-xl flex items-start gap-4">
                      <div className="p-3 bg-purple-500/10 text-purple-500 rounded-lg">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="font-bold text-foreground mb-1">STNK Kendaraan</h5>
                        <p className="text-sm text-muted-foreground mb-2">F 1234 ABC</p>
                        <span className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-md font-medium border border-emerald-500/20">Aktif s/d 2026</span>
                      </div>
                    </div>
                    
                    <div className="border border-border p-5 rounded-xl flex items-start gap-4">
                      <div className="p-3 bg-amber-500/10 text-amber-500 rounded-lg">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="font-bold text-foreground mb-1">SKCK</h5>
                        <p className="text-sm text-muted-foreground mb-2">POLRES BOGOR</p>
                        <span className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-md font-medium border border-emerald-500/20">Terverifikasi</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-4 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:border-muted-foreground transition-all flex flex-col items-center justify-center gap-2 cursor-pointer">
                    <Plus className="w-6 h-6" />
                    <span className="font-medium">Perbarui Dokumen Lisensi</span>
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
