import Link from "next/link";
import { ArrowLeft, Check, ShoppingBasket, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function AuthShell({ children, heading, copy }: { children: React.ReactNode; heading: string; copy: string }) {
  return (
    <main className="grid min-h-screen bg-[#f7f6f3] lg:grid-cols-[.9fr_1.1fr]">
      <section className="relative hidden overflow-hidden bg-ink p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
        <div className="hero-grid absolute inset-0 opacity-50" />
        <div className="hero-glow absolute -bottom-44 -left-44 size-[36rem] rounded-full" />
        <Link href="/" className="relative flex items-center gap-2.5 font-semibold tracking-[-.03em] text-white">
          <span className="grid size-10 place-items-center rounded-xl bg-accent-orange"><ShoppingBasket className="size-5" /></span>
          <span className="text-xl">Smasket</span>
        </Link>
        <div className="relative max-w-lg">
          <Badge className="mb-6 rounded-full border border-white/10 bg-white/[.07] px-3 py-1.5 text-[.7rem] font-semibold tracking-[.14em] text-orange-200 uppercase shadow-none"><Sparkles className="size-3.5" /> Jeden koszyk. Lepsza cena.</Badge>
          <h1 className="text-5xl font-semibold leading-[1.08] tracking-[-.05em]">Nie przepłacaj za wygodę.</h1>
          <p className="mt-6 text-lg leading-8 text-white/58">Dodaj produkty, a my znajdziemy taki podział zakupów, który naprawdę obniża końcowy rachunek.</p>
          <div className="mt-8 space-y-3 text-sm text-white/72">
            <p className="flex items-center gap-3"><Check className="size-4 text-orange-300" /> Porównanie ofert tego samego wariantu</p>
            <p className="flex items-center gap-3"><Check className="size-4 text-orange-300" /> Cena produktów razem z dostawą</p>
            <p className="flex items-center gap-3"><Check className="size-4 text-orange-300" /> Gotowy podział zakupów na sklepy</p>
          </div>
        </div>
        <div className="relative flex items-center gap-3 text-xs text-white/35"><span className="h-px w-10 bg-white/20" /> Kupuj na liczbach, nie na przeczuciu.</div>
      </section>

      <section className="flex min-h-screen flex-col px-5 py-6 sm:px-8 lg:px-12 lg:py-10">
        <div className="flex items-center justify-between lg:justify-end">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-ink"><ArrowLeft className="size-4" /> Wróć na stronę główną</Link>
        </div>
        <div className="mx-auto flex w-full max-w-[460px] flex-1 flex-col justify-center py-12">
          <div className="mb-9"><h2 className="text-3xl font-semibold tracking-[-.04em] sm:text-4xl">{heading}</h2><p className="mt-3 leading-7 text-text-secondary">{copy}</p></div>
          {children}
        </div>
      </section>
    </main>
  );
}
