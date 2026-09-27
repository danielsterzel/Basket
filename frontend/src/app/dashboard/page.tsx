"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bell,
  ChevronRight,
  Clock3,
  ListPlus,
  Plus,
  Search,
  ShoppingBasket,
  Sparkles,
  Store,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
      return;
    }
  }, [isLoading, router, isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const firstName = user.name;
  return (
    <main className="min-h-screen bg-[#f4f3ef] text-ink">
      <header className="border-b border-black/[.07] bg-[#fafaf8]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 font-semibold tracking-[-.03em]"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-accent-orange text-white shadow-[0_5px_18px_rgba(232,107,44,.25)]">
              <ShoppingBasket className="size-[1.15rem]" strokeWidth={2.3} />
            </span>
            <span className="text-lg">Smasket</span>
          </Link>

          <nav
            className="hidden items-center gap-1 rounded-xl bg-black/[.035] p-1 md:flex"
            aria-label="Nawigacja aplikacji"
          >
            <Link
              href="/dashboard"
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold shadow-sm"
            >
              Pulpit
            </Link>
            <button
              type="button"
              className="cursor-pointer rounded-lg px-4 py-2 text-sm text-text-secondary transition-colors hover:text-ink"
            >
              Koszyki
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-lg px-4 py-2 text-sm text-text-secondary transition-colors hover:text-ink"
            >
              Porównania
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              aria-label="Powiadomienia"
              variant="ghost"
              size="icon"
              className="cursor-pointer rounded-xl text-text-secondary hover:bg-black/[.05]"
            >
              <Bell className="size-4.5" />
            </Button>
            <button
              type="button"
              className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-black/[.07] bg-white py-1.5 pl-1.5 pr-3 shadow-sm transition-colors hover:bg-black/[.025]"
            >
              <span className="grid size-8 place-items-center rounded-lg bg-[#eeeae4] text-text-secondary">
                <UserRound className="size-4" />
              </span>
              <div className="hidden text-left sm:block">
                <p className="max-w-32 truncate text-xs font-semibold">
                  {user ? `${user.name} ${user.lastName}` : firstName}
                </p>
                <p className="max-w-32 truncate text-[.65rem] text-text-tertiary">
                  {user?.email ?? "Twoje konto"}
                </p>
              </div>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <section className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-accent-orange">
              <Sparkles className="size-3.5" /> Twój pulpit
            </p>
            <h1 className="text-3xl font-semibold tracking-[-.04em] sm:text-4xl">
              Cześć, {firstName}.
            </h1>
            <p className="mt-2 text-sm leading-6 text-text-secondary sm:text-base">
              Co dziś dodajemy do koszyka?
            </p>
          </div>
          <Button className="h-12 cursor-pointer rounded-xl bg-ink px-5 font-semibold text-white shadow-[0_8px_22px_rgba(0,0,0,.12)] hover:bg-black-deep">
            <Plus className="size-4" /> Nowy koszyk
          </Button>
        </section>

        <section className="mt-8">
          <Card className="relative min-h-72 overflow-hidden rounded-[1.6rem] border-0 bg-ink p-6 text-white shadow-[0_24px_60px_rgba(31,33,31,.13)] sm:p-8">
            <div className="hero-grid pointer-events-none absolute inset-0 opacity-50" />
            <div className="hero-glow pointer-events-none absolute -right-24 -top-32 size-80 rounded-full" />
            <div className="relative flex h-full flex-col">
              <Badge className="w-fit rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[.68rem] font-semibold uppercase tracking-[.12em] text-white shadow-none">
                Nowe porównanie
              </Badge>
              <div className="mt-auto pt-10">
                <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-[-.04em] sm:text-4xl">
                  Zbuduj koszyk, a my znajdziemy najtańszy układ.
                </h2>
                <div className="mt-6 flex max-w-xl rounded-xl bg-white p-1.5 shadow-xl shadow-black/10">
                  <div className="flex min-w-0 flex-1 items-center gap-3 px-3 text-text-tertiary">
                    <Search className="size-4 shrink-0" />
                    <Input
                      name="search"
                      aria-label="Czego szukasz?"
                      placeholder="Czego szukasz?"
                      className="h-10 border-0 bg-transparent px-0 text-ink shadow-none focus-visible:border-transparent focus-visible:ring-0"
                    />
                  </div>
                  <Button className="h-10 shrink-0 cursor-pointer rounded-lg bg-accent-orange px-4 font-semibold text-white hover:bg-accent-orange-hover">
                    Zacznij <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold tracking-[-.03em]">
            Szybkie akcje
          </h2>
          <div className="grid gap-2 sm:grid-cols-3">
            <QuickAction
              icon={ListPlus}
              title="Utwórz listę"
              description="Dodaj produkty ręcznie"
            />
            <QuickAction
              icon={Store}
              title="Przeglądaj sklepy"
              description="Zobacz dostępne źródła"
            />
            <QuickAction
              icon={Clock3}
              title="Historia"
              description="Poprzednie optymalizacje"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function QuickAction({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof ListPlus;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      className="group flex w-full cursor-pointer items-center gap-3 rounded-xl bg-white p-3.5 text-left ring-1 ring-black/[.06] transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#f1efea] text-text-secondary transition-colors group-hover:bg-[#fff0e6] group-hover:text-accent-orange">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">{title}</span>
        <span className="mt-0.5 block truncate text-xs text-text-tertiary">
          {description}
        </span>
      </span>
      <ChevronRight className="size-4 text-black/20 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}
