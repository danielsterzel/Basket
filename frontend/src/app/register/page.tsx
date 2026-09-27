"use client";

import Link from "next/link";
import { useState } from "react";

import { ArrowRight, Eye, LockKeyhole, Mail, UserRound } from "lucide-react";
import { AuthShell } from "../auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";

import { UserRegister, UserRegisterSchema } from "@/lib/zod-schemas";

import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/lib/user-api";
import { useRouter } from "next/navigation";

import { useResendVerificationEmail } from "@/hooks/use-resend-verification-email";

const TOAST_ERROR_TITLE = "Błąd formularza";
const TOAST_TIMEOUT = 5000;

export default function RegisterPage() {
  const [userRegister, setUserRegister] = useState<Partial<UserRegister>>({});
  const [termsAndConditionsAccepted, setTermsAndConditionsAccepted] =
    useState(false);
  const router = useRouter();
  const { resend, isPending } = useResendVerificationEmail();
  const mutation = useMutation({
    mutationFn: registerUser,

    onSuccess: (response, registrationRequest) => {
      if (!response.success) {
        toast.add({
          title: "Błąd rejestracji",
          description: response.msg,
          type: "error",
          timeout: TOAST_TIMEOUT,
        });
        return;
      }

      router.push(
        `/register/check-email?email=${encodeURIComponent(registrationRequest.email)}`,
      );
    },
    onError: (error) => {
      toast.add({
        title: "Błąd rejestracji",
        description:
          error instanceof Error
            ? error.message
            : "Nie udało się utworzyć konta",
        type: "error",
        timeout: TOAST_TIMEOUT,
      });
    },
  });

  function validateFormEntries(
    data: Partial<UserRegister>,
  ): UserRegister | null {
    if (!data || data === undefined) return null;

    if (!termsAndConditionsAccepted) {
      toast.add({
        title: TOAST_ERROR_TITLE,
        description:
          "Aby założyć konto musisz zaakceptować warunki korzystania",
        type: "error",
        timeout: TOAST_TIMEOUT,
      });
      return null;
    }

    const validationResult = UserRegisterSchema.safeParse(data);
    if (!validationResult.success) {
      console.log(validationResult.error.issues);
      const firstError = validationResult.error.issues[0];

      toast.add({
        title: TOAST_ERROR_TITLE,
        description: firstError.message,
        type: "error",
        timeout: TOAST_TIMEOUT,
      });
      return null;
    }
    return validationResult.data;
  }

  function handleSubmit(data?: Partial<UserRegister>) {
    if (!data) return;

    const registrationRequest = validateFormEntries(data);
    if (!registrationRequest) {
      return;
    }

    mutation.mutate(registrationRequest);
  }

  

  return (
    <AuthShell
      heading="Zbuduj swój pierwszy koszyk"
      copy="Utwórz konto i sprawdź, ile możesz zaoszczędzić na całej liście zakupów."
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(userRegister);
        }}
        className="space-y-4"
      >
        <div className="space-y-2">
          <label className="text-sm font-semibold" htmlFor="name">
            Imię
          </label>
          <div className="relative">
            <UserRound className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-text-tertiary" />
            <Input
              onChange={(e) => {
                setUserRegister((prev) => ({ ...prev, name: e.target.value }));
              }}
              id="name"
              autoComplete="given-name"
              placeholder="Jak mamy się do Ciebie zwracać?"
              className="h-12 rounded-xl bg-white pl-10 shadow-sm"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold" htmlFor="lastName">
            Nazwisko
          </label>
          <div className="relative">
            <UserRound className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-text-tertiary" />
            <Input
              onChange={(e) => {
                setUserRegister((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }));
              }}
              id="lastName"
              autoComplete="family-name"
              placeholder="Twoje nazwisko"
              className="h-12 rounded-xl bg-white pl-10 shadow-sm"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold" htmlFor="email">
            Adres e-mail
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-text-tertiary" />
            <Input
              onChange={(e) => {
                setUserRegister((prev) => ({ ...prev, email: e.target.value }));
              }}
              id="email"
              type="email"
              autoComplete="email"
              placeholder="ty@przyklad.pl"
              className="h-12 rounded-xl bg-white pl-10 shadow-sm"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold" htmlFor="password">
            Hasło
          </label>
          <div className="relative">
            <LockKeyhole className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-text-tertiary" />
            <Input
              onChange={(e) => {
                setUserRegister((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="Minimum 8 znaków"
              className="h-12 rounded-xl bg-white px-10 shadow-sm"
            />
            <button
              type="button"
              aria-label="Pokaż hasło"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-ink"
            >
              <Eye className="size-4" />
            </button>
          </div>
        </div>
        <label className="flex cursor-pointer items-start gap-3 pt-1 text-sm leading-6 text-text-secondary">
          <input
            checked={termsAndConditionsAccepted}
            onChange={(e) => {
              setTermsAndConditionsAccepted(e.target.checked);
            }}
            type="checkbox"
            className="mt-1 size-4 shrink-0 rounded border-input accent-[#e86b2c]"
          />
          <span>
            Akceptuję{" "}
            <a
              href="#"
              className="font-medium text-ink underline underline-offset-2"
            >
              regulamin
            </a>{" "}
            i{" "}
            <a
              href="#"
              className="font-medium text-ink underline underline-offset-2"
            >
              politykę prywatności
            </a>
            .
          </span>
        </label>
        <Button
          type="submit"
          className="h-12 w-full rounded-xl bg-accent-orange text-base font-semibold text-white hover:bg-accent-orange-hover"
        >
          Utwórz konto <ArrowRight />
        </Button>
      </form>
      <p className="mt-5 text-center text-xs text-text-tertiary">
        Nie dostałeś wiadomości?{" "}
        <button
        onClick={() => resend(userRegister.email)}
        disabled={isPending}
          type="button"
          className="cursor-pointer font-semibold text-ink transition-colors hover:text-accent-orange"
        >
          {isPending ? "Wysyłanie..." : "Wyślij ponownie"}
        </button>
      </p>
      <p className="mt-4 text-center text-sm text-text-secondary">
        Masz już konto?{" "}
        <Link
          className="font-semibold text-accent-orange hover:text-accent-orange-hover"
          href="/login"
        >
          Zaloguj się
        </Link>
      </p>
    </AuthShell>
  );
}
