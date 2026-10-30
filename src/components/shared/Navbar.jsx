"use client";

import Link from "next/link";
import { BookOpen, Moon } from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "All Books", href: "/books" },
  { label: "Add Book", href: "/add-book" },
  { label: "My Books", href: "/my-books" },
  { label: "My Borrows", href: "/my-borrows" },
];

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
    toast.success("Logged out successfully");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors text-gray-700 hover:text-orange-600 focus:bg-orange-100/70 focus:text-orange-600`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {session ? (
          <div className="flex items-center justiy-end gap-8">
            <Image
              src="/assets/icons/moon.svg"
              alt="Moon"
              width={30}
              height={30}
              className="cursor-pointer"
            />
            <Popover>
              <PopoverTrigger>
                <div className="w-10 h-10 rounded-full overflow-hidden border border-black">
                  <Image
                    src={user?.image || "/assets/images/default-avatar.png"}
                    alt="User profile"
                    width={40}
                    height={40}
                    className="cursor-pointer w-full h-full object-contain rounded-full"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-5">
                <div>
                  <p className="font-bold">{user?.name}</p>
                  <p className="text-[12px] text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
                <hr />
                <button className="w-full text-left text-sm font-semibold cursor-pointer">
                  My Profile
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left text-sm text-red-500 font-semibold cursor-pointer"
                >
                  Sign Out
                </button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Toggle theme"
              className="flex size-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Moon className="size-5" />
            </button>

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
      </nav>
    </header>
  );
};

export default Navbar;
