"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AuthShell } from "../auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import { loginUser } from "@/lib/user-api";
import { type UserLogin, UserLoginSchema } from "@/lib/zod-schemas";

const TOAST_TIMEOUT = 5000;

export default function LoginPage() {
  const [loginRequest, setLoginRequest] = useState<Partial<UserLogin>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: loginUser,

    onSuccess: (response) => {
      localStorage.removeItem("access_token");
      sessionStorage.removeItem("access_token");

      const tokenStorage = rememberMe ? localStorage : sessionStorage;
      tokenStorage.setItem("access_token", response.accessToken);
      queryClient.setQueryData(["currentUser"], response.user);

      toast.add({
        title: "Zalogowano pomyślnie",
        description: `Miło Cię widzieć, ${response.user.name}!`,
        type: "success",
        timeout: TOAST_TIMEOUT,
      });

      router.replace("/");
    },

    onError: () => {
      toast.add({
        title: "Nie udało się zalogować",
        description:
          "Sprawdź adres e-mail i hasło oraz upewnij się, że konto zostało aktywowane.",
        type: "error",
        timeout: TOAST_TIMEOUT,
      });
    },
  });

  function handleLoginSubmit(data: Partial<UserLogin>) {
    const validationResult = UserLoginSchema.safeParse(data);

    if (!validationResult.success) {
      toast.add({
        title: "Błąd formularza",
        description: validationResult.error.issues[0].message,
        type: "error",
        timeout: TOAST_TIMEOUT,
      });
      return;
    }

    mutation.mutate(validationResult.data);
  }

  return (
    <AuthShell
      heading="Miło Cię znowu widzieć"
      copy="Zaloguj się, aby wrócić do swoich koszyków i zapisanych porównań."
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLoginSubmit(loginRequest);
        }}
        className="space-y-5"
      >
        <div className="space-y-2">
          <label className="text-sm font-semibold" htmlFor="email">
            Adres e-mail
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-text-tertiary" />
            <Input
              onChange={(e) => {
                setLoginRequest((previous) => ({
                  ...previous,
                  email: e.target.value,
                }));
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
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold" htmlFor="password">
              Hasło
            </label>
            <button
              type="button"
              className="cursor-pointer text-xs font-semibold text-accent-orange hover:text-accent-orange-hover"
            >
              Nie pamiętasz hasła?
            </button>
          </div>
          <div className="relative">
            <LockKeyhole className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-text-tertiary" />
            <Input
              onChange={(e) => {
                setLoginRequest((previous) => ({
                  ...previous,
                  password: e.target.value,
                }));
              }}
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Wpisz hasło"
              className="h-12 rounded-xl bg-white px-10 shadow-sm"
            />
            <button
              onClick={() => setShowPassword((visible) => !visible)}
              type="button"
              aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-text-tertiary hover:text-ink"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-text-secondary">
          <input
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
            type="checkbox"
            className="size-4 rounded border-input accent-[#e86b2c]"
          />{" "}
          Zapamiętaj mnie
        </label>
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="h-12 w-full cursor-pointer rounded-xl bg-accent-orange text-base font-semibold text-white hover:bg-accent-orange-hover"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Logowanie...
            </>
          ) : (
            <>
              Zaloguj się <ArrowRight />
            </>
          )}
        </Button>
      </form>
      <div className="my-7 flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-xs text-text-tertiary">LUB</span>
        <Separator className="flex-1" />
      </div>
      <Button
        variant="outline"
        className="cursor-pointer h-12 w-full rounded-xl bg-white font-semibold"
      >
        Kontynuuj z Google
      </Button>
      <p className="mt-8 text-center text-sm text-text-secondary">
        Nie masz jeszcze konta?{" "}
        <Link
          className="font-semibold text-accent-orange hover:text-accent-orange-hover"
          href="/register"
        >
          Zarejestruj się
        </Link>
      </p>
    </AuthShell>
  );
}
