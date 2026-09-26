import Link from "next/link";
import { ArrowRight, Eye, LockKeyhole, Mail, UserRound } from "lucide-react";

import { AuthShell } from "../auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  return (
    <AuthShell heading="Zbuduj swój pierwszy koszyk" copy="Utwórz konto i sprawdź, ile możesz zaoszczędzić na całej liście zakupów.">
      <form className="space-y-4">
        <div className="space-y-2"><label className="text-sm font-semibold" htmlFor="name">Imię</label><div className="relative"><UserRound className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-text-tertiary" /><Input id="name" autoComplete="given-name" placeholder="Jak mamy się do Ciebie zwracać?" className="h-12 rounded-xl bg-white pl-10 shadow-sm" /></div></div>
        <div className="space-y-2"><label className="text-sm font-semibold" htmlFor="email">Adres e-mail</label><div className="relative"><Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-text-tertiary" /><Input id="email" type="email" autoComplete="email" placeholder="ty@przyklad.pl" className="h-12 rounded-xl bg-white pl-10 shadow-sm" /></div></div>
        <div className="space-y-2"><label className="text-sm font-semibold" htmlFor="password">Hasło</label><div className="relative"><LockKeyhole className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-text-tertiary" /><Input id="password" type="password" autoComplete="new-password" placeholder="Minimum 8 znaków" className="h-12 rounded-xl bg-white px-10 shadow-sm" /><button type="button" aria-label="Pokaż hasło" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-ink"><Eye className="size-4" /></button></div></div>
        <label className="flex cursor-pointer items-start gap-3 pt-1 text-sm leading-6 text-text-secondary"><input type="checkbox" className="mt-1 size-4 shrink-0 rounded border-input accent-[#e86b2c]" /><span>Akceptuję <a href="#" className="font-medium text-ink underline underline-offset-2">regulamin</a> i <a href="#" className="font-medium text-ink underline underline-offset-2">politykę prywatności</a>.</span></label>
        <Button type="submit" className="h-12 w-full rounded-xl bg-accent-orange text-base font-semibold text-white hover:bg-accent-orange-hover">Utwórz konto <ArrowRight /></Button>
      </form>
      <p className="mt-8 text-center text-sm text-text-secondary">Masz już konto? <Link className="font-semibold text-accent-orange hover:text-accent-orange-hover" href="/login">Zaloguj się</Link></p>
    </AuthShell>
  );
}
