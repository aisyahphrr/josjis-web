"use client"

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

export function ConfirmDialog({
  trigger,
  title,
  description,
  confirmText = "Konfirmasi",
  cancelText = "Batal",
  onConfirm,
  confirmVariant = "default",
}: {
  trigger: React.ReactNode
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  confirmVariant?: "default" | "destructive"
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description ? (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          ) : null}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-xl">{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            className={
              confirmVariant === "destructive"
                ? "rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : "rounded-xl bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612] hover:from-[#F99912]/90 hover:to-[#64762C]/90"
            }
            onClick={onConfirm}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

