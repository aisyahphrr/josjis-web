"use client";
import {
  GraduationCap,
  BookOpen,
  Video,
  Award,
  ArrowRight,
  X,
  Calendar,
  Clock,
  Users,
  Link as LinkIcon,
  Check,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";
import { useState } from "react";
import { Course, Workshop } from "@/src/interface/umkm";
import {
  academyCourses,
  academyWorkshops,
} from "@/src/lib/constants/umkm/academy";

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "BookOpen":
      return <BookOpen className="w-6 h-6" />;
    case "Video":
      return <Video className="w-6 h-6" />;
    default:
      return <BookOpen className="w-6 h-6" />;
  }
};

const getLevelBadge = (level: string) => {
  switch (level) {
    case "beginner":
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
          Pemula
        </span>
      );
    case "intermediate":
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#F99912]/20 text-[#F99912]">
          Menengah
        </span>
      );
    case "advanced":
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#64762C]/20 text-[#64762C]">
          Lanjutan
        </span>
      );
    default:
      return null;
  }
};

export default function AcademyUmkm() {
  const [courses, setCourses] = useState(academyCourses);
  const [workshops, setWorkshops] = useState(academyWorkshops);
  const [stats, setStats] = useState({
    taken: 3,
    completed: 1,
    certificates: 1,
  });
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(
    null,
  );
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showWorkshopModal, setShowWorkshopModal] = useState(false);
  const [userRegistered, setUserRegistered] = useState<{
    [key: number]: boolean;
  }>({});
  const [workshopToCancel, setWorkshopToCancel] = useState<number | null>(null);

  const handleContinueCourse = (courseId: number) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id === courseId) {
          const newProgress = Math.min((course.progress || 0) + 20, 100);
          return {
            ...course,
            progress: newProgress,
            isCompleted: newProgress === 100,
          };
        }
        return course;
      }),
    );
  };

  const handleCompleteCourse = (courseId: number) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            progress: 100,
            isCompleted: true,
          };
        }
        return course;
      }),
    );

    const course = courses.find((c) => c.id === courseId);
    if (course && !course.isCompleted) {
      setStats((prevStats) => ({
        ...prevStats,
        completed: prevStats.completed + 1,
        certificates: prevStats.certificates + 1,
      }));
    }
  };

  const handleStartCourse = (courseId: number) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            progress: 20,
          };
        }
        return course;
      }),
    );

    const course = courses.find((c) => c.id === courseId);
    if (course && course.progress === undefined) {
      setStats((prevStats) => ({
        ...prevStats,
        taken: prevStats.taken + 1,
      }));
    }
  };

  const handleRegisterWorkshop = (workshopId: number) => {
    if (userRegistered[workshopId]) {
      setWorkshopToCancel(workshopId);
    } else {
      setUserRegistered((prev) => ({
        ...prev,
        [workshopId]: true,
      }));

      setWorkshops((prevWorkshops) =>
        prevWorkshops.map((workshop) => {
          if (workshop.id === workshopId) {
            return {
              ...workshop,
              registered: workshop.registered + 1,
            };
          }
          return workshop;
        }),
      );
    }
  };

  const handleConfirmCancel = (workshopId: number) => {
    setUserRegistered((prev) => ({
      ...prev,
      [workshopId]: false,
    }));

    setWorkshops((prevWorkshops) =>
      prevWorkshops.map((workshop) => {
        if (workshop.id === workshopId) {
          return {
            ...workshop,
            registered: Math.max(0, workshop.registered - 1),
          };
        }
        return workshop;
      }),
    );

    setWorkshopToCancel(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#64762C]/20 via-[#F99912]/10 to-[#424F17]/20 border border-[#64762C]/20 p-6 lg:p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#64762C]/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#F99912] to-[#64762C] p-0.5">
            <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-[#F99912]" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              JOSJIS Academy
            </h1>
            <p className="text-muted-foreground mt-1">
              Program edukasi digital untuk mengembangkan bisnis UMKM Anda
            </p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-6">
          <p className="text-sm text-muted-foreground mb-2">Kursus Diambil</p>
          <p className="text-3xl font-bold text-foreground">{stats.taken}</p>
        </div>
        <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-6">
          <p className="text-sm text-muted-foreground mb-2">Selesai</p>
          <p className="text-3xl font-bold text-[#64762C]">{stats.completed}</p>
        </div>
        <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-6">
          <p className="text-sm text-muted-foreground mb-2">Sertifikat</p>
          <p className="text-3xl font-bold text-[#F99912]">
            {stats.certificates}
          </p>
        </div>
      </div>

      {/* Courses Grid */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Katalog Kursus
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => {
                setSelectedCourse(course);
                setShowVideoModal(true);
              }}
              className="group backdrop-blur-xl bg-card/60 border cursor-pointer border-[#F99912]/10 rounded-2xl p-6 hover:border-[#F99912]/30 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#F99912] to-[#64762C] p-0.5 mb-4 flex items-center justify-center text-foreground">
                {getIconComponent(course.icon)}
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {course.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {course.description}
              </p>

              {/* Instructor & Duration */}
              <div className="space-y-2 mb-4 text-sm">
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {course.instructor}
                  </span>
                </p>
                <p className="text-muted-foreground">⏱️ {course.duration}</p>
              </div>

              {/* Level Badge */}
              <div className="mb-4">{getLevelBadge(course.level)}</div>

              {/* Progress Bar */}
              {course.progress !== undefined && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-muted-foreground">
                      Progress
                    </span>
                    <span className="text-xs font-semibold text-[#F99912]">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-2">
                    <div
                      className="bg-linear-to-r from-[#F99912] to-[#64762C] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Button */}
              <button
                onClick={() => {
                  if (course.isCompleted) {
                    handleCompleteCourse(course.id);
                  } else if (course.progress) {
                    handleContinueCourse(course.id);
                  } else {
                    handleStartCourse(course.id);
                  }
                }}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  course.isCompleted
                    ? "bg-[#64762C] text-foreground hover:bg-[#64762C]/90"
                    : course.progress
                      ? "bg-[#F99912] text-[#181612] hover:bg-[#F99912]/90"
                      : "bg-linear-to-r from-[#F99912] to-[#64762C] text-[#181612] hover:opacity-90"
                }`}
              >
                {course.isCompleted ? (
                  <div className="cursor-pointer flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    <p>Selesai</p>
                  </div>
                ) : course.progress ? (
                  <div className="cursor-pointer flex items-center gap-1">
                    <p>Lanjutkan</p>
                    <ArrowRight className="w-4 h-4 " />
                  </div>
                ) : (
                  <div className="cursor-pointer flex items-center gap-1">
                    <p>Mulai Kursus</p>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {selectedCourse && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-foreground">
                  {selectedCourse.title}
                </DialogTitle>
              </DialogHeader>

              {/* Video Player */}
              <div className="w-full aspect-video bg-[#181612] rounded-xl overflow-hidden mb-6">
                <video
                  className="w-full h-full object-cover"
                  controls
                  src={`https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4`}
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Course Details */}
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Deskripsi Kursus
                  </h3>
                  <p className="text-muted-foreground">
                    {selectedCourse.description}
                  </p>
                </div>

                {/* Course Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">
                      Instruktur
                    </p>
                    <p className="font-semibold text-foreground">
                      {selectedCourse.instructor}
                    </p>
                  </div>
                  <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">Durasi</p>
                    <p className="font-semibold text-foreground">
                      {selectedCourse.duration}
                    </p>
                  </div>
                  <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">Level</p>
                    <p className="font-semibold text-foreground">
                      {selectedCourse.level === "beginner"
                        ? "Pemula"
                        : selectedCourse.level === "intermediate"
                          ? "Menengah"
                          : "Lanjutan"}
                    </p>
                  </div>
                </div>

                {/* Progress & Action */}
                {selectedCourse.progress !== undefined && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">
                        Progress
                      </span>
                      <span className="text-sm font-semibold text-[#F99912]">
                        {selectedCourse.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-3">
                      <div
                        className="bg-linear-to-r from-[#F99912] to-[#64762C] h-3 rounded-full transition-all duration-300"
                        style={{ width: `${selectedCourse.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={() => {
                    if (selectedCourse.isCompleted) {
                      handleCompleteCourse(selectedCourse.id);
                    } else if (selectedCourse.progress) {
                      handleContinueCourse(selectedCourse.id);
                    } else {
                      handleStartCourse(selectedCourse.id);
                    }
                  }}
                  className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 text-base ${
                    selectedCourse.isCompleted
                      ? "bg-[#64762C] text-foreground hover:bg-[#64762C]/90"
                      : selectedCourse.progress
                        ? "bg-[#F99912] text-[#181612] hover:bg-[#F99912]/90"
                        : "bg-linear-to-r from-[#F99912] to-[#64762C] text-[#181612] hover:opacity-90"
                  }`}
                >
                  {selectedCourse.isCompleted ? (
                    <>
                      <Award className="w-5 h-5" />
                      Selesai
                    </>
                  ) : selectedCourse.progress ? (
                    <>
                      Lanjutkan
                      <ArrowRight className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      Mulai Kursus
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Workshops Section */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Workshop & Webinar
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workshops.map((workshop) => (
            <div
              key={workshop.id}
              onClick={() => {
                setSelectedWorkshop(workshop);
                setShowWorkshopModal(true);
              }}
              className="group backdrop-blur-xl bg-card/60 border cursor-pointer border-[#F99912]/10 rounded-2xl p-6 hover:border-[#F99912]/30 transition-all duration-300"
            >
              {/* Status Badge */}
              <div className="mb-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    workshop.status === "upcoming"
                      ? "bg-yellow-500/20 text-yellow-700"
                      : workshop.status === "ongoing"
                        ? "bg-blue-500/20 text-blue-700"
                        : "bg-green-500/20 text-green-700"
                  }`}
                >
                  {workshop.status === "upcoming"
                    ? "Akan Datang"
                    : workshop.status === "ongoing"
                      ? "Sedang Berlangsung"
                      : "Selesai"}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                {workshop.title}
              </h3>

              {/* Instructor */}
              <p className="text-sm text-muted-foreground mb-4">
                {workshop.instructor}
              </p>

              {/* Workshop Info */}
              <div className="space-y-2 mb-4 text-sm">
                <p className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#F99912]" />
                  {new Date(workshop.date).toLocaleDateString("id-ID")}
                </p>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#F99912]" />
                  {workshop.time}
                </p>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#F99912]" />
                  {workshop.registered}/{workshop.capacity}
                </p>
              </div>

              {/* Topics */}
              <div className="mb-4 flex flex-wrap gap-2">
                {workshop.topics.slice(0, 2).map((topic, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 rounded-full bg-[#F99912]/10 text-[#F99912]"
                  >
                    {topic}
                  </span>
                ))}
                {workshop.topics.length > 2 && (
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    +{workshop.topics.length - 2}
                  </span>
                )}
              </div>

              {/* Register Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRegisterWorkshop(workshop.id);
                }}
                className={`w-full cursor-pointer px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  userRegistered[workshop.id]
                    ? "bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/30"
                    : "bg-[#F99912] text-[#181612] hover:bg-[#F99912]/90 cursor-pointer"
                }`}
              >
                {userRegistered[workshop.id] ? (
                  <>
                    <X className="w-4 h-4" />
                    Batal Pendaftaran
                  </>
                ) : (
                  <>
                    <Users className="w-4 h-4" />
                    Daftar
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Workshop Detail Modal */}
      <Dialog open={showWorkshopModal} onOpenChange={setShowWorkshopModal}>
        <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {selectedWorkshop && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-foreground">
                  {selectedWorkshop.title}
                </DialogTitle>
              </DialogHeader>

              {/* Workshop Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">
                    Instruktur
                  </p>
                  <p className="font-semibold text-foreground">
                    {selectedWorkshop.instructor}
                  </p>
                </div>
                <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedWorkshop.status === "upcoming"
                        ? "bg-yellow-500/20 text-yellow-700"
                        : selectedWorkshop.status === "ongoing"
                          ? "bg-blue-500/20 text-blue-700"
                          : "bg-green-500/20 text-green-700"
                    }`}
                  >
                    {selectedWorkshop.status === "upcoming"
                      ? "Akan Datang"
                      : selectedWorkshop.status === "ongoing"
                        ? "Sedang Berlangsung"
                        : "Selesai"}
                  </span>
                </div>
                <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">Tanggal</p>
                  <p className="font-semibold text-foreground text-sm">
                    {new Date(selectedWorkshop.date).toLocaleDateString(
                      "id-ID",
                    )}
                  </p>
                </div>
                <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">Waktu</p>
                  <p className="font-semibold text-foreground text-sm">
                    {selectedWorkshop.time}
                  </p>
                </div>
              </div>

              {/* Peserta */}
              <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-2">
                  Peserta Terdaftar
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-muted/30 rounded-full h-2">
                    <div
                      className="bg-linear-to-r from-[#F99912] to-[#64762C] h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(selectedWorkshop.registered / selectedWorkshop.capacity) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="font-semibold text-foreground text-sm whitespace-nowrap">
                    {selectedWorkshop.registered}/{selectedWorkshop.capacity}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Deskripsi
                </h3>
                <p className="text-muted-foreground">
                  {selectedWorkshop.description}
                </p>
              </div>

              {/* Topics */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Topik yang Dibahas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedWorkshop.topics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-2 rounded-lg bg-[#F99912]/10 text-[#F99912] font-medium text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Zoom Link */}
              {selectedWorkshop.status !== "upcoming" && (
                <a
                  href={selectedWorkshop.zoomLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-3 bg-linear-to-r from-[#F99912] to-[#64762C] text-[#181612] rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:opacity-90 mb-4 cursor-pointer"
                >
                  <LinkIcon className="w-5 h-5" />
                  Bergabung ke Workshop via Zoom
                </a>
              )}

              {/* Register Button */}
              <button
                onClick={() => {
                  handleRegisterWorkshop(selectedWorkshop.id);
                }}
                className={`w-full px-4 py-3 rounded-lg cursor-pointer font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  userRegistered[selectedWorkshop.id]
                    ? "bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/30"
                    : "bg-[#F99912] text-[#181612] hover:bg-[#F99912]/90 cursor-pointer"
                }`}
              >
                {userRegistered[selectedWorkshop.id] ? (
                  <>
                    <X className="w-5 h-5" />
                    Batal Pendaftaran
                  </>
                ) : (
                  <>
                    <Users className="w-5 h-5" />
                    Daftar ke Workshop
                  </>
                )}
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Cancel Registration Confirmation Dialog */}
      <AlertDialog
        open={workshopToCancel !== null}
        onOpenChange={(open) => {
          if (!open) setWorkshopToCancel(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Batal Pendaftaran Workshop?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin membatalkan pendaftaran workshop ini? Anda
              dapat mendaftar kembali kapan saja.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3">
            <AlertDialogCancel className="cursor-pointer">
              Tidak
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (workshopToCancel !== null) {
                  handleConfirmCancel(workshopToCancel);
                }
              }}
              className="bg-red-500 hover:bg-red-600 cursor-pointer"
            >
              Ya, Batalkan
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
