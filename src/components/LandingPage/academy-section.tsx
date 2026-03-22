"use client";

import {
  GraduationCap,
  Play,
  BookOpen,
  Award,
  TrendingUp,
  Users,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

const courses = [
  {
    title: "Digital Marketing 101",
    instructor: "Sarah Marketing Expert",
    duration: "2 jam",
    students: 1250,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
    level: "Newbie",
    xp: 100,
  },
  {
    title: "Branding untuk UMKM",
    instructor: "Budi Creative Director",
    duration: "3 jam",
    students: 890,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop",
    level: "Amateur",
    xp: 150,
  },
  {
    title: "AI Tools untuk Bisnis",
    instructor: "Citra Tech Lead",
    duration: "4 jam",
    students: 650,
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop",
    level: "Pro Seller",
    xp: 200,
  },
];

const levels = [
  { name: "Newbie", xp: 0, color: "from-[#9370DB] to-[#ADBCD7]" },
  { name: "Amateur", xp: 500, color: "from-[#9ACD32] to-[#9370DB]" },
  { name: "Pro Seller", xp: 1500, color: "from-[#F99912] to-[#9ACD32]" },
];

export function AcademySection() {
  return (
    <section id="academy" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-muted/20 to-background" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(154,205,50,0.20)_0%,transparent_62%)] rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#9370DB]/10 border border-[#9370DB]/20 mb-6">
            <GraduationCap className="w-4 h-4 text-[#9370DB]" />
            <span className="text-sm text-[#9370DB] font-medium">
              Edukasi Digital
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">
            <span className="bg-linear-to-r from-[#9370DB] to-[#F99912] bg-clip-text text-transparent">
              SADAYA Academy
            </span>
            <br />
            <span className="text-foreground">Tingkatkan Skill UMKM Anda</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Program edukasi lengkap untuk memajukan bisnis UMKM Anda. Dapatkan
            XP, naik level, dan raih sertifikasi resmi!
          </p>
        </div>

        {/* Level Progress */}
        <div className="mb-12 p-6 backdrop-blur bg-white/80 border border-border rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Level Progress</h3>
            <span className="text-sm text-muted-foreground">350 / 500 XP</span>
          </div>
          <div className="relative h-3 bg-muted rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-linear-to-r from-[#F99912] to-[#9ACD32] rounded-full transition-all duration-500"
              style={{ width: "70%" }}
            />
            {/* Level Markers */}
            <div className="absolute top-0 left-0 w-full h-full flex">
              <div className="flex-1 border-r border-background/50" />
              <div className="flex-1 border-r border-background/50" />
              <div className="flex-1" />
            </div>
          </div>
          <div className="flex justify-between">
            {levels.map((level, index) => (
              <div key={index} className="text-center">
                <div
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-linear-to-r ${level.color} text-xs font-semibold ${index === 0 ? "text-[#2B3236]" : "text-foreground"}`}
                >
                  {level.name}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {level.xp} XP
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {courses.map((course, index) => (
            <div
              key={index}
              className="group backdrop-blur bg-white/80 border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(40,50,56,0.10)] hover:border-[#F99912]/25"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-[#F99912] flex items-center justify-center shadow-none hover:shadow-[0_12px_30px_rgba(249,153,18,0.12)] transition-all duration-300">
                    <Play className="w-6 h-6 text-[#2B3236] ml-1" />
                  </div>
                </div>

                {/* Level Badge */}
                <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-linear-to-r from-[#F99912] to-[#9ACD32] text-[#2B3236] text-xs font-semibold">
                  {course.level}
                </div>

                {/* XP Badge */}
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-background/80 backdrop-blur text-foreground text-xs font-semibold">
                  +{course.xp} XP
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-[#F99912] transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {course.instructor}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/academy">
            <Button
              size="lg"
              className="bg-linear-to-r from-[#9370DB] to-[#9ACD32] hover:from-[#9370DB]/90 hover:to-[#9ACD32]/90 text-foreground font-semibold shadow-none transition-all duration-300 group"
            >
              <GraduationCap className="mr-2 w-5 h-5" />
              Jelajahi Semua Kursus
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: BookOpen, label: "Kursus", value: "50+" },
            { icon: Users, label: "Peserta", value: "5,000+" },
            { icon: Award, label: "Sertifikasi", value: "500+" },
            { icon: TrendingUp, label: "Sukses Rate", value: "95%" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-muted/30 backdrop-blur border border-[#F99912]/10"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-linear-to-br from-[#F99912]/20 to-[#9ACD32]/20 flex items-center justify-center mb-3">
                <stat.icon className="w-6 h-6 text-[#F99912]" />
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
