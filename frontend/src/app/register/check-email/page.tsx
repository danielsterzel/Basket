"use client";

import Link from "next/link";
import { use } from "react";

import { ArrowRight, MailCheck, RefreshCw } from "lucide-react";
import { AuthShell } from "../../auth-shell";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

import { UserResendEmailRequestSchema } from "@/lib/zod-schemas";
import { useResendVerificationEmail } from "@/hooks/use-resend-verification-email";

type Props = {
  searchParams: Promise<{
    email?: string | string[];
  }>;
};

export default function CheckEmailPage({ searchParams }: Readonly<Props>) {
  const { email } = use(searchParams);
  const requestResult = UserResendEmailRequestSchema.safeParse({ email });
  const request = requestResult.success ? requestResult.data : null;

 const { resend, isPending } = useResendVerificationEmail();

  return (
    <AuthShell
      heading="Sprawdź swoją skrzynkę"
      copy="Wysłaliśmy Ci wiadomość z linkiem potrzebnym do aktywacji konta."
    >
      <div className="rounded-2xl border border-accent-orange/15 bg-white p-6 text-center shadow-[0_14px_45px_rgba(31,33,31,0.08)] sm:p-8">
        <div className="mx-auto grid size-[4rem] place-items-center rounded-2xl bg-accent text-accent-orange shadow-[inset_0_0_0_1px_rgba(232,107,44,0.08)]">
          <MailCheck className="size-8" strokeWidth={1.8} />
        </div>

        <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em]">
          Zweryfikuj adres e-mail
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-text-secondary">
          Otwórz wiadomość od Smasket i kliknij przycisk potwierdzający.
          Link aktywacyjny może dotrzeć w ciągu kilku minut.
        </p>
        {request && (
          <p className="mt-3 text-sm font-semibold text-ink">
            {request.email}
          </p>
        )}

        <div className="my-6 h-px bg-border" />

        <div className="rounded-xl border border-black/[0.04] bg-[#fafaf8] p-4">
          <p className="text-sm font-semibold text-ink">
            Nie dostałeś e-maila?
          </p>
          <p className="mt-1 text-xs leading-5 text-text-tertiary">
            Sprawdź folder Spam lub Oferty albo wyślij wiadomość ponownie.
          </p>
          <Button
            onClick={() =>resend(email)}
            type="button"
            variant="outline"
            disabled={isPending}
            className="mt-3 h-10 rounded-xl border-accent-orange/20 bg-white px-4 font-semibold text-accent-orange shadow-sm hover:bg-accent hover:text-accent-orange-hover"
          >
            <RefreshCw
              className={isPending ? "size-3.5 animate-spin" : "size-3.5"}
            />
            {isPending ? "Wysyłanie..." : "Wyślij ponownie"}
          </Button>
        </div>

        <Link
          href="/login"
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-6 h-12 w-full rounded-xl bg-accent-orange text-base font-semibold text-white shadow-[0_8px_22px_rgba(232,107,44,0.2)] hover:bg-accent-orange-hover"
          )}
        >
          Przejdź do logowania <ArrowRight />
        </Link>
      </div>

      <p className="mt-7 text-center text-sm text-text-secondary">
        Podałeś zły adres?{" "}
        <Link
          href="/register"
          className="font-semibold text-accent-orange hover:text-accent-orange-hover"
        >
          Wróć do rejestracji
        </Link>
      </p>
    </AuthShell>
  );
}
