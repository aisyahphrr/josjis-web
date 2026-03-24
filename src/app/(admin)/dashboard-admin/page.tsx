import { prisma } from "@/src/server/db/client";
import AdminDashboardPage from "@/src/components/views/admin/dashboard/dashboard-view";

export default async function AdminDashboardRoutePage() {
  const [totalUsers, totalDrivers, totalUmkm, allUsers, allDrivers, allUmkm] = await Promise.all([
    prisma.user.count({ where: { role: "USER" } }),
    prisma.user.count({ where: { role: "DRIVER", isActive: true } }),
    prisma.user.count({ 
      where: { 
        role: "UMKM",
        umkmProfile: { verifiedAt: { not: null } }
      } 
    }),
    prisma.user.findMany({ select: { createdAt: true }, where: { role: "USER" } }),
    prisma.user.findMany({ select: { createdAt: true }, where: { role: "DRIVER", isActive: true } }),
    prisma.user.findMany({ select: { createdAt: true }, where: { role: "UMKM", umkmProfile: { verifiedAt: { not: null } } } }),
  ]);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentYear = new Date().getFullYear();

  const countUpToMonth = (items: { createdAt: Date }[], monthIndex: number) => {
    return items.filter(item => {
      const itemYear = item.createdAt.getFullYear();
      const itemMonth = item.createdAt.getMonth();
      if (itemYear < currentYear) return true;
      if (itemYear === currentYear && itemMonth <= monthIndex) return true;
      return false;
    }).length;
  };

  const monthlyGrowthData = months.map((label, index) => ({
    label,
    users: countUpToMonth(allUsers, index),
    umkm: countUpToMonth(allUmkm, index),
    drivers: countUpToMonth(allDrivers, index),
  }));

  return <AdminDashboardPage 
    totalUsers={totalUsers} 
    totalDrivers={totalDrivers} 
    totalUmkm={totalUmkm} 
    monthlyGrowthData={monthlyGrowthData} 
  />;
}
