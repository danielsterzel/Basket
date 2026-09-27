"use client";

import { useMutation } from "@tanstack/react-query";

import { toast } from "@/components/ui/toast";
import { resendEmail } from "@/lib/user-api";
import { UserResendEmailRequestSchema } from "@/lib/zod-schemas";

const TOAST_TIMEOUT = 5000;

export function useResendVerificationEmail() {
  const mutation = useMutation({
    mutationFn: resendEmail,

    onSuccess: () => {
      toast.add({
        title: "Wiadomość wysłana ponownie",
        description: "Sprawdź swoją skrzynkę e-mail.",
        type: "success",
        timeout: TOAST_TIMEOUT,
      });
    },

    onError: () => {
      toast.add({
        title: "Nie udało się wysłać wiadomości",
        description: "Spróbuj ponownie za chwilę.",
        type: "error",
        timeout: TOAST_TIMEOUT,
      });
    },
  });

  function resend(email: unknown) {
    const result = UserResendEmailRequestSchema.safeParse({ email });

    if (!result.success) {
      toast.add({
        title: "Brak adresu e-mail",
        description: "Wpisz poprawny adres e-mail i spróbuj ponownie.",
        type: "error",
        timeout: TOAST_TIMEOUT,
      });
      return;
    }

    mutation.mutate(result.data);
  }

  return {
    resend,
    isPending: mutation.isPending,
  };
}