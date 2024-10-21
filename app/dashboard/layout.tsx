import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { auth } from "../lib/auth";
import { Menu } from "lucide-react";
import Logo from "@/public/logo.png";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../components/ThemeToggle";
import { DashboarLinks } from "../components/DashboardLinks";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  return (
    <>
      <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden md:block border-r bg-muted/40">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2">
                <Image src={Logo} alt="Logo" className="size-10" />
                <p className="text-xl font-bold">
                  Planz<span className="text-primary">It</span>
                </p>
              </Link>
            </div>

            <div className="flex-1 ">
              <nav className="grid items-start px-2 lg:px-4">
                <DashboarLinks />
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col ">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="md:hidden shrink-0"
                  size="icon"
                  variant="outline"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 mt-10">
                  <DashboarLinks />
                </nav>
              </SheetContent>
            </Sheet>

            <div className="ml-auto flex items-center gap-x-4">
              <ThemeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <img src={session?.user?.image as string} alt="Profile Image" width={20} height={20} className="w-full h-full rounded-full"/>
                  </Button>
                </DropdownMenuTrigger>
              </DropdownMenu>
            </div>
          </header>
        </div>
      </div>
    </>
  );
}
