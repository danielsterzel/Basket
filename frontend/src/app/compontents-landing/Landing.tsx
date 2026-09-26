"use client";

import Link from "next/link";
import {
  ArrowRight, Check, ChevronDown, CircleCheck, PackageCheck, Plus,
  Search, ShoppingBasket, Sparkles, Store, TrendingDown,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const basket = [
  { name: "Kawa ziarnista Lavazza", detail: "Qualità Oro · 1 kg", price: "54,90 zł" },
  { name: "Filtry do wody Dafi", detail: "Classic · 6 szt.", price: "39,99 zł" },
  { name: "Płyn do prania Persil", detail: "Color Gel · 3,3 l", price: "42,49 zł" },
];

const stores = [
  { name: "Allegro", items: "2 produkty", products: "82,98 zł", delivery: "0,00 zł" },
  { name: "Media Expert", items: "1 produkt", products: "42,49 zł", delivery: "9,99 zł" },
];

export function Landing() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="relative z-20 border-b border-black/[.07] bg-[#f3f1ed] text-ink">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Brand />
          <nav aria-label="Główna nawigacja" className="hidden items-center gap-8 text-sm text-text-secondary md:flex">
            <a className="transition-colors hover:text-ink" href="#jak-to-dziala">Jak to działa</a>
            <a className="transition-colors hover:text-ink" href="#oszczednosci">Oszczędności</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "hidden h-11 px-4 text-ink hover:bg-black/[.05] hover:text-ink sm:inline-flex")} href="/login">Zaloguj się</Link>
            <Link className={cn(buttonVariants({ size: "lg" }), "h-11 rounded-xl bg-ink px-5 font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,.12)] hover:bg-black-deep")} href="/register">
              Załóż konto <ArrowRight />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative bg-[#f3f1ed] pb-24 pt-16 text-ink lg:pb-32 lg:pt-24">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="hero-glow absolute -left-48 top-12 size-[34rem] rounded-full" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-10">
          <div className="max-w-2xl">
            <Badge className="mb-7 rounded-full border border-accent-orange/15 bg-[#fff3ec] px-3 py-1.5 text-[.72rem] font-semibold tracking-[.14em] text-accent-orange uppercase shadow-none">
              <Sparkles className="size-3.5" /> AI porównuje. Optymalizator wybiera.
            </Badge>
            <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-[-.05em] sm:text-6xl lg:text-[4.6rem]">
              Cały koszyk.<span className="block text-black/28">Najniższy rachunek.</span>
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-text-secondary">Dodaj produkty, których szukasz. Smasket sprawdzi sklepy i policzy, gdzie kupisz cały zestaw najtaniej — razem z dostawą.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link className={cn(buttonVariants({ size: "lg" }), "h-13 rounded-xl bg-ink px-6 text-base font-semibold text-white shadow-[0_10px_28px_rgba(0,0,0,.14)] hover:bg-black-deep")} href="/register">Zacznij oszczędzać <ArrowRight className="size-4" /></Link>
              <a className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-13 rounded-xl border-black/10 bg-white px-6 text-base text-ink shadow-sm hover:bg-[#f3f3f0] hover:text-ink")} href="#jak-to-dziala">Zobacz, jak działa</a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-text-tertiary">
              <span className="flex items-center gap-2"><Check className="size-4 text-accent-orange" /> Bez ręcznego porównywania</span>
              <span className="flex items-center gap-2"><Check className="size-4 text-accent-orange" /> Cena razem z dostawą</span>
            </div>
          </div>
          <OptimizerPreview />
        </div>
      </section>

      <section id="jak-to-dziala" className="border-t border-black/[.06] bg-[#fafaf8] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
            <div className="lg:sticky lg:top-10 lg:self-start">
              <p className="eyebrow">Prosty proces</p>
              <h2 className="mt-4 max-w-md text-4xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">Od listy produktów do gotowego planu zakupów.</h2>
              <p className="mt-5 max-w-md text-base leading-7 text-text-secondary">Ty określasz, czego potrzebujesz. My porównujemy pełny koszt i rozdzielamy zakupy pomiędzy sklepy tylko wtedy, gdy naprawdę się opłaca.</p>
            </div>
            <div className="grid gap-4">
              <StepCard number="01" icon={Search} title="Wyszukaj produkty" text="Wpisz nazwę, markę i wariant. Dopasujemy tylko porównywalne oferty." />
              <StepCard number="02" icon={ShoppingBasket} title="Zbuduj jeden koszyk" text="Dodaj wszystko do jednej listy — niezależnie od tego, w ilu sklepach produkty są dostępne." />
              <StepCard number="03" icon={TrendingDown} title="Wybierz najtańszy plan" text="Optymalizator uwzględnia ceny produktów oraz dostawy i pokazuje dokładnie, co kupić gdzie." />
            </div>
          </div>
        </div>
      </section>

      <section id="oszczednosci" className="bg-[#ebeae5] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><p className="eyebrow">Dlaczego warto</p><h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Liczy się suma, nie najtańsza metka.</h2></div>
            <p className="max-w-md leading-7 text-text-secondary">Najtańszy produkt nie zawsze oznacza najtańszy koszyk. Koszty dostawy potrafią zmienić wynik.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <FeatureCard icon={Store} label="Wiele źródeł" title="Oferty obok siebie" text="Porównaj ceny tego samego wariantu w różnych sklepach bez przełączania kart." />
            <FeatureCard icon={PackageCheck} label="Pełny koszt" title="Dostawa jest wliczona" text="Od razu widzisz kwotę do zapłaty, a nie cenę, która rośnie dopiero przy kasie." />
            <FeatureCard icon={CircleCheck} label="Jasny wynik" title="Wiesz, co kupić gdzie" text="Dostajesz czytelny podział produktów oraz podsumowanie całej oszczędności." />
          </div>
        </div>
      </section>

      <section className="px-5 pb-5 sm:px-8 sm:pb-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-white sm:px-12 lg:px-20 lg:py-20">
          <div className="cta-lines absolute inset-0 opacity-25" />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div><p className="text-sm font-semibold uppercase tracking-[.16em] text-white/70">Twój następny koszyk</p><h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">Mniej szukania. Więcej zostaje w portfelu.</h2></div>
            <Link className={cn(buttonVariants({ size: "lg" }), "h-13 shrink-0 rounded-xl bg-white px-6 text-base font-semibold text-ink hover:bg-white/90")} href="/register">Załóż darmowe konto <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <footer className="bg-[#f3f1ed] px-5 py-9 sm:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-text-tertiary sm:flex-row sm:items-center sm:justify-between"><Brand dark /><p>© 2026 Smasket. Kupuj mądrzej.</p></div></footer>
    </main>
  );
}

function Brand({ dark = false }: { dark?: boolean }) {
  return <Link href="/" className={cn("flex items-center gap-2.5 font-semibold tracking-[-.03em]", dark ? "text-ink" : "text-ink")}><span className="grid size-9 place-items-center rounded-xl bg-accent-orange text-white shadow-[0_5px_18px_rgba(232,107,44,.25)]"><ShoppingBasket className="size-[1.15rem]" strokeWidth={2.3} /></span><span className="text-lg">Smasket</span></Link>;
}

function OptimizerPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[650px] rounded-[2.25rem] bg-ink p-3 shadow-[0_32px_80px_rgba(31,33,31,.2)] lg:mx-0 sm:p-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.25rem]"><div className="hero-grid absolute inset-0 opacity-50" /><div className="hero-glow absolute -right-32 -top-32 size-72 rounded-full" /></div>
      <Card className="relative gap-0 overflow-hidden rounded-[1.55rem] border-0 bg-[#fbfbfa] py-0 text-ink shadow-[0_18px_45px_rgba(0,0,0,.18)] ring-1 ring-white/10">
        <div className="flex items-center justify-between border-b border-black/[.07] px-5 py-4 sm:px-6"><div className="flex items-center gap-2.5"><span className="size-2 rounded-full bg-accent-orange" /><span className="text-sm font-semibold">Nowy koszyk</span></div><Badge className="rounded-full bg-success-soft px-3 text-success shadow-none">3 produkty</Badge></div>
        <CardContent className="space-y-5 p-5 sm:p-6">
          <div className="relative"><Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-text-tertiary" /><Input className="h-12 rounded-xl border-black/10 bg-white pl-10 pr-28 text-sm shadow-sm focus-visible:border-accent-orange focus-visible:ring-accent-orange/15" placeholder="Wyszukaj kolejny produkt…" /><Button className="absolute right-1.5 top-1.5 h-9 rounded-lg bg-ink px-3.5 text-white hover:bg-black-deep"><Plus /> Dodaj</Button></div>
          <div className="space-y-2">
            {basket.map((item, index) => <div key={item.name} className="flex items-center gap-3 rounded-xl border border-black/[.06] bg-white p-3 shadow-[0_2px_8px_rgba(0,0,0,.025)]"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#f2f0eb] text-xs font-semibold text-text-secondary">{index + 1}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{item.name}</p><p className="mt-0.5 truncate text-xs text-text-tertiary">{item.detail}</p></div><span className="text-sm font-semibold">od {item.price}</span></div>)}
          </div>
          <button className="flex w-full items-center justify-between rounded-xl bg-ink px-4 py-3.5 text-left text-white transition-colors hover:bg-black-deep" type="button"><span><span className="block text-[.68rem] font-semibold uppercase tracking-[.14em] text-white/45">Preferencje</span><span className="mt-0.5 block text-sm font-medium">Najtaniej · maks. 2 sklepy</span></span><ChevronDown className="size-4 text-white/45" /></button>
          <div className="rounded-2xl border border-accent-orange/20 bg-[#fff7f1] p-4 sm:p-5">
            <div className="mb-4 flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.12em] text-accent-orange">Najlepszy układ</p><p className="mt-1 text-sm font-semibold">Kup w 2 sklepach</p></div><div className="text-right"><p className="text-2xl font-semibold tracking-[-.04em]">135,46 zł</p><p className="text-xs font-medium text-success">Oszczędzasz 38,72 zł</p></div></div>
            <Separator className="bg-accent-orange/15" />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">{stores.map((store) => <div key={store.name} className="rounded-xl bg-white p-3 ring-1 ring-black/[.06]"><div className="flex items-center justify-between"><span className="text-sm font-semibold">{store.name}</span><span className="text-xs text-text-tertiary">{store.items}</span></div><div className="mt-3 flex justify-between text-xs text-text-tertiary"><span>Produkty</span><span>{store.products}</span></div><div className="mt-1 flex justify-between text-xs text-text-tertiary"><span>Dostawa</span><span>{store.delivery}</span></div></div>)}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StepCard({ number, icon: Icon, title, text }: { number: string; icon: typeof Search; title: string; text: string }) {
  return <Card className="group grid gap-6 rounded-2xl border-0 bg-white p-6 shadow-none ring-1 ring-black/[.07] transition-transform duration-300 hover:-translate-y-1 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-7"><span className="grid size-12 place-items-center rounded-xl bg-ink text-white"><Icon className="size-5" /></span><div><h3 className="text-lg font-semibold tracking-[-.025em]">{title}</h3><p className="mt-1.5 max-w-xl leading-6 text-text-secondary">{text}</p></div><span className="text-3xl font-semibold tracking-[-.05em] text-black/10">{number}</span></Card>;
}

function FeatureCard({ icon: Icon, label, title, text }: { icon: typeof Store; label: string; title: string; text: string }) {
  return <Card className="min-h-72 gap-0 rounded-2xl border-0 bg-[#f7f6f3] p-6 shadow-none ring-0 sm:p-7"><span className="grid size-11 place-items-center rounded-xl bg-white text-accent-orange ring-1 ring-black/[.06]"><Icon className="size-5" /></span><p className="mt-auto pt-12 text-xs font-semibold uppercase tracking-[.14em] text-accent-orange">{label}</p><h3 className="mt-3 text-xl font-semibold tracking-[-.03em]">{title}</h3><p className="mt-3 leading-6 text-text-secondary">{text}</p></Card>;
}
