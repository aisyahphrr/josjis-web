"use client";

import { useState } from "react";
import { Bell, Check, Trash2, CheckCheck } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Notification } from "@/src/interface/umkm";
import { dummyNotifications } from "@/src/lib/constants/umkm/notifications";

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(dummyNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif,
      ),
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true })),
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "diproses":
        return "bg-yellow-500/20 text-yellow-600";
      case "dikirim":
        return "bg-blue-500/20 text-blue-600";
      case "selesai":
        return "bg-green-500/20 text-green-600";
      default:
        return "bg-gray-500/20 text-gray-600";
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case "diproses":
        return "Diproses";
      case "dikirim":
        return "Dikirim";
      case "selesai":
        return "Selesai";
      default:
        return "Unknown";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "order":
        return "🛍️";
      case "status_update":
        return "📦";
      case "delivery":
        return "🚚";
      default:
        return "📬";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifikasi</h1>
          <p className="text-muted-foreground mt-2">
            {unreadCount > 0
              ? `${unreadCount} notifikasi baru`
              : "Semua notifikasi sudah dibaca"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            onClick={handleMarkAllAsRead}
            className="bg-linear-to-r cursor-pointer from-[#F99912] to-[#64762C] text-[#181612] font-semibold hover:shadow-lg hover:shadow-[#F99912]/30 transition-all duration-300"
          >
            <CheckCheck className="mr-2 w-4 h-4" />
            Tandai Semua Sudah Dibaca
          </Button>
        )}
      </div>

      {/* Filter Section */}
      <div className="flex gap-2">
        <Button
          onClick={() => setFilter("all")}
          variant={filter === "all" ? "default" : "outline"}
          className={`cursor-pointer ${
            filter === "all"
              ? "bg-linear-to-r from-[#F99912] to-[#64762C] text-[#181612] font-semibold"
              : "border-[#F99912]/30 hover:bg-[#F99912]/10 text-foreground"
          }`}
        >
          Semua ({notifications.length})
        </Button>
        <Button
          onClick={() => setFilter("unread")}
          variant={filter === "unread" ? "default" : "outline"}
          className={`cursor-pointer ${
            filter === "unread"
              ? "bg-linear-to-r from-[#F99912] to-[#64762C] text-[#181612] font-semibold"
              : "border-[#F99912]/30 hover:bg-[#F99912]/10 text-foreground"
          }`}
        >
          Belum Dibaca ({unreadCount})
        </Button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleMarkAsRead(notification.id)}
              className={`backdrop-blur-xl rounded-2xl p-5 border transition-all duration-200 cursor-pointer ${
                notification.isRead
                  ? "bg-card/40 border-[#F99912]/10 hover:border-[#F99912]/20"
                  : "bg-[#F99912]/10 border-[#F99912]/30 hover:border-[#F99912]/50 shadow-lg shadow-[#F99912]/20"
              }`}
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div className="shrink-0 text-2xl pt-1">
                  {getTypeIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3
                        className={`font-semibold text-lg ${
                          notification.isRead
                            ? "text-foreground"
                            : "text-[#F99912]"
                        }`}
                      >
                        {notification.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                        {notification.message}
                      </p>

                      {/* Details */}
                      <div className="flex items-center gap-3 mt-3 flex-wrap">
                        <span className="text-xs bg-muted/50 px-3 py-1 rounded-full text-muted-foreground">
                          {notification.orderNumber}
                        </span>
                        {notification.status && (
                          <span
                            className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(
                              notification.status,
                            )}`}
                          >
                            {getStatusLabel(notification.status)}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground ml-auto">
                          {new Date(notification.createdAt).toLocaleString(
                            "id-ID",
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-col">
                      {!notification.isRead && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsRead(notification.id);
                          }}
                          className="border-[#F99912]/30 hover:bg-[#F99912]/10 cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNotification(notification.id);
                        }}
                        className="border-red-500/30 hover:bg-red-500/10 text-red-400 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">
              {filter === "unread"
                ? "Tidak ada notifikasi yang belum dibaca"
                : "Tidak ada notifikasi"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
