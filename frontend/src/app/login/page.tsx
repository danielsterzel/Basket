import Link from "next/link";
import { ArrowRight, Eye, LockKeyhole, Mail } from "lucide-react";

import { AuthShell } from "../auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  return (
    <AuthShell heading="Miło Cię znowu widzieć" copy="Zaloguj się, aby wrócić do swoich koszyków i zapisanych porównań.">
      <form className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold" htmlFor="email">Adres e-mail</label>
          <div className="relative"><Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-text-tertiary" /><Input id="email" type="email" autoComplete="email" placeholder="ty@przyklad.pl" className="h-12 rounded-xl bg-white pl-10 shadow-sm" /></div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between"><label className="text-sm font-semibold" htmlFor="password">Hasło</label><button type="button" className="text-xs font-semibold text-accent-orange hover:text-accent-orange-hover">Nie pamiętasz hasła?</button></div>
          <div className="relative"><LockKeyhole className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-text-tertiary" /><Input id="password" type="password" autoComplete="current-password" placeholder="Wpisz hasło" className="h-12 rounded-xl bg-white px-10 shadow-sm" /><button type="button" aria-label="Pokaż hasło" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-ink"><Eye className="size-4" /></button></div>
        </div>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-text-secondary"><input type="checkbox" className="size-4 rounded border-input accent-[#e86b2c]" /> Zapamiętaj mnie</label>
        <Button type="submit" className="h-12 w-full rounded-xl bg-accent-orange text-base font-semibold text-white hover:bg-accent-orange-hover">Zaloguj się <ArrowRight /></Button>
      </form>
      <div className="my-7 flex items-center gap-4"><Separator className="flex-1" /><span className="text-xs text-text-tertiary">LUB</span><Separator className="flex-1" /></div>
      <Button variant="outline" className="h-12 w-full rounded-xl bg-white font-semibold">Kontynuuj z Google</Button>
      <p className="mt-8 text-center text-sm text-text-secondary">Nie masz jeszcze konta? <Link className="font-semibold text-accent-orange hover:text-accent-orange-hover" href="/register">Zarejestruj się</Link></p>
    </AuthShell>
  );
}
