"use client";

import Link from "next/link";

import { ArrowRight, BadgeCheck, Loader2, ShieldCheck } from "lucide-react";

import { AuthShell } from "../auth-shell";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

import { useSearchParams } from "next/navigation";
import { UserConfirmEmailRequest } from "@/lib/zod-schemas";
import { confirmUserEmail } from "@/lib/user-api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";

export default function ConfirmEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const mutation = useMutation({
    mutationFn: confirmUserEmail,

    onSuccess: () => {
      toast.add({
        title: "Weryfikacja adresu email",
        description: "Udało ci się zweryfikować email!",
        type: "success",
        timeout: 5000
      })
    },
    onError: () => {
      toast.add({
        title: "Weryfikacja adresu email",
        description: "Coś poszło nie tak z weryfikacją adresu email.",
        type: "error",
        timeout: 5000
      })
    }
  });

  const userConfirmEmailRequest: UserConfirmEmailRequest = {token: token ?? ""}

  function handleConfirmEmail(data: UserConfirmEmailRequest) {
    mutation.mutate(data);
  }

  return (
    <AuthShell
      heading="Potwierdź swój e-mail"
      copy="Jeszcze jeden krok i Twoje konto będzie gotowe do działania."
    >
      <div className="rounded-2xl border border-accent-orange/15 bg-white p-6 text-center shadow-[0_14px_45px_rgba(31,33,31,0.08)] sm:p-8">
        <div className="mx-auto grid size-[4rem] place-items-center rounded-2xl bg-accent text-accent-orange shadow-[inset_0_0_0_1px_rgba(232,107,44,0.08)]">
          <BadgeCheck className="size-8" strokeWidth={1.8} />
        </div>

        <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-success-soft px-3 py-1.5 text-[0.7rem] font-semibold tracking-[0.08em] text-success uppercase">
          <ShieldCheck className="size-3.5" /> Bezpieczna weryfikacja
        </div>

        <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-ink">
          Gotowy do potwierdzenia?
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-text-secondary">
          Kliknij przycisk poniżej, aby potwierdzić adres e-mail i aktywować
          swoje konto Smasket.
        </p>

        <Button
          onClick={() => handleConfirmEmail(userConfirmEmailRequest)}
          disabled={mutation.isPending}
          type="button"
          className="cursor-pointer mt-7 h-12 w-full rounded-xl bg-accent-orange text-base font-semibold text-white shadow-[0_8px_22px_rgba(232,107,44,0.2)] hover:bg-accent-orange-hover"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Potwierdzanie...
            </>
          ) : (
            <>
              Potwierdź adres e-mail <ArrowRight />
            </>
          )}
        </Button>

        <p className="mt-4 text-xs leading-5 text-text-tertiary">
          Ze względów bezpieczeństwa link aktywacyjny jest ważny przez
          ograniczony czas.
        </p>
      </div>

      <p className="mt-7 text-center text-sm text-text-secondary">
        Konto jest już aktywne?{" "}
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "link" }),
            "h-auto p-0 font-semibold text-accent-orange hover:text-accent-orange-hover"
          )}
        >
          Przejdź do logowania
        </Link>
      </p>
    </AuthShell>
  );
}
