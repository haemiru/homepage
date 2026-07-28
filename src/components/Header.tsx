"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/88 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-display text-[1.35rem] font-bold tracking-tightest text-ink transition-opacity hover:opacity-65"
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative py-1 text-[0.9rem] font-normal text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-persimmon transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
            </Link>
          ))}
          <Link
            href="/apply"
            className="bg-ink px-5 py-2.5 text-[0.875rem] font-medium text-paper transition-colors duration-300 hover:bg-persimmon"
          >
            상담 신청
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`block h-px w-6 bg-ink transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-ink transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* 모바일 메뉴 */}
      <div
        className={`overflow-hidden border-t border-line bg-paper transition-[max-height] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          open ? "max-h-96" : "max-h-0 border-t-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line/60 py-4 text-ink-soft"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/apply"
            onClick={() => setOpen(false)}
            className="mt-5 mb-4 bg-ink py-3.5 text-center font-medium text-paper"
          >
            상담 신청
          </Link>
        </nav>
      </div>
    </header>
  );
}
