"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { BiExit } from "react-icons/bi";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "All Books", href: "/all-books" },
  { label: "Add Book", href: "/add-book" },
  { label: "My Books", href: "/my-books" },
  { label: "My Borrows", href: "/my-borrows" },
];

const Navbar = () => {
  const router = useRouter();
  const [darkMode, setDarkmode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully");
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-md shadow-orange-500/25">
            <BookOpen className="size-5 text-white" strokeWidth={2.5} />
          </span>

          <span className="leading-tight">
            <span className="block bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
              BookNook
            </span>
            <span className="block text-[10px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
              Digital Library
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {!isPending &&
            (user
              ? navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="rounded-full px-4 py-2 text-[14px] font-semibold text-gray-700 transition-colors hover:text-orange-600 focus:bg-orange-100/70 focus:text-orange-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))
              : navLinks.slice(0, 2).map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="rounded-full px-4 py-2 text-[14px] font-semibold text-gray-700 transition-colors hover:text-orange-600 focus:bg-orange-100/70 focus:text-orange-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                )))}
        </ul>

        <div className="flex items-center justify-end gap-5">
          <div className="rounded-full border border-gray-300 shadow-md">
            <Image
              onClick={() => setDarkmode(!darkMode)}
              src={
                darkMode ? "/assets/icons/moon.svg" : "/assets/icons/sun.svg"
              }
              alt="Theme"
              width={30}
              height={30}
              className="cursor-pointer p-1"
            />
          </div>

          <div className="hidden lg:block">
            {isPending ? (
              <div className="h-10 w-24 animate-pulse rounded-xl bg-gray-100" />
            ) : user ? (
              <Popover>
                <PopoverTrigger>
                  <div className="h-10 w-10 overflow-hidden rounded-full border border-black">
                    <Image
                      src={user.image || "/assets/images/default-avatar.png"}
                      alt="User profile"
                      width={40}
                      height={40}
                      className="h-full w-full cursor-pointer rounded-full object-contain"
                    />
                  </div>
                </PopoverTrigger>

                <PopoverContent className="w-48 p-5" align="start">
                  <div>
                    <p className="font-bold">{user.name}</p>
                    <p className="text-[12px] text-muted-foreground">
                      {user.email}
                    </p>
                  </div>

                  <hr />

                  <Link
                    href="/profile"
                    className="flex cursor-pointer items-center justify-start gap-2"
                  >
                    <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-black">
                      <Image
                        src={user.image || "/assets/images/default-avatar.png"}
                        alt="User profile"
                        fill
                        sizes="40px"
                        className="rounded-full object-contain"
                      />
                    </div>

                    <span className="w-full text-left text-sm font-semibold">
                      My Profile
                    </span>
                  </Link>

                  <div className="flex cursor-pointer items-center justify-start gap-2 text-red-500">
                    <BiExit className="text-xl" />
                    <button
                      onClick={handleSignOut}
                      className="w-full cursor-pointer text-left text-sm font-semibold"
                    >
                      Sign Out
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/sign-in"
                  className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                >
                  Login
                </Link>

                <Link
                  href="/sign-up"
                  className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition-opacity hover:opacity-90"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          <div className="lg:hidden">
 
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex size-10 cursor-pointer items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>

      
            {menuOpen && (
              <div className="absolute top-16 right-0 left-0 z-50 border-t border-gray-100 bg-white shadow-lg">
                <div className="mx-auto max-w-7xl space-y-5 px-4 py-6 sm:px-6">
                  
                  {!isPending && user && (
                    <Link
                      href="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl bg-orange-50 p-3"
                    >
                      <div className="relative size-11 shrink-0 overflow-hidden rounded-full border border-gray-200">
                        <Image
                          src={
                            user.image || "/assets/images/default-avatar.png"
                          }
                          alt="User profile"
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-gray-900">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </Link>
                  )}

 
                  <ul className="space-y-1">
                    {!isPending &&
                      (user ? navLinks : navLinks.slice(0, 2)).map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="block rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                  </ul>

                  {!isPending &&
                    (user ? (
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex w-full cursor-pointer items-center gap-2 rounded-xl border-t border-gray-100 px-4 pt-5 text-sm font-semibold text-red-500 hover:text-red-600"
                      >
                        <BiExit className="text-xl" />
                        Sign Out
                      </button>
                    ) : (
                      <div className="flex gap-3 border-t border-gray-100 pt-5">
                        <Link
                          href="/sign-in"
                          onClick={() => setMenuOpen(false)}
                          className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-center text-sm font-semibold text-gray-800 hover:bg-orange-50"
                        >
                          Login
                        </Link>

                        <Link
                          href="/sign-up"
                          onClick={() => setMenuOpen(false)}
                          className="flex-1 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
                        >
                          Register
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
