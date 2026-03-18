"use client"

import { useState } from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"

export function RejectDialog({
  trigger,
  title = "Tolak pengajuan",
  description = "Masukkan alasan penolakan untuk audit dan komunikasi ke pihak terkait.",
  placeholder = "Contoh: Dokumen legalitas belum lengkap...",
  onReject,
  confirmText = "Tolak",
}: {
  trigger: React.ReactNode
  title?: string
  description?: string
  placeholder?: string
  confirmText?: string
  onReject: (reason: string) => void
}) {
  const [reason, setReason] = useState("")

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-2">
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={placeholder}
            className="min-h-24 rounded-xl"
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-xl" onClick={() => setReason("")}>
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => {
              const trimmed = reason.trim()
              onReject(trimmed || "Tidak ada alasan yang ditulis.")
              setReason("")
            }}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

