import Link from "next/link";
import { BookOpen } from "lucide-react";
import Image from "next/image";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/all-books" },
  { label: "Add Book", href: "/add-book" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex w-fit items-center gap-2.5">
              <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
                <BookOpen className="size-5 text-white" strokeWidth={2.5} />
              </span>
              <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                BookNook
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-[12px] leading-relaxed text-gray-500 dark:text-gray-400">
              BookNook is a community online library platform where readers
              borrow, discover, and share incredible literary works
              effortlessly.
            </p>
          </div>

          <div>
            <h4 className="text-base font-bold tracking-wide text-gray-900 dark:text-gray-100 uppercase">
              Quick Links
            </h4>
            <ul className="mt-5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[12px] text-gray-500 dark:text-gray-400 transition-colors hover:text-orange-600 dark:hover:text-orange-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-base font-bold tracking-wide text-gray-900 dark:text-gray-100 uppercase">
              Connect With Us
            </h4>
            <Link
              href="https://x.com/mrkhandipu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on X"
              className="mt-5 flex size-10 w-fit items-center justify-center rounded-lg bg-gray-100 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <Image
                src="/assets/icons/x-logo.svg"
                alt="X"
                width={20}
                height={20}
                className="size-5"
              />
            </Link>
            <p className="mt-5 text-[12px] text-gray-500 dark:text-gray-400">
              Support:{" "}
              <a
                href="mailto:mrkhan.ds.swe@gmail.com"
                className="text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400"
              >
                mrkhan.ds.swe@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center sm:px-6 lg:px-8">
          <p className="text-[12px] text-gray-400 dark:text-gray-500">
            © {year} BookNook Digital Library System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
