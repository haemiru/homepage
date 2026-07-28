import Link from "next/link";
import { nav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-line bg-paper-deep">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-bold tracking-tightest">
              {site.name}
            </p>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-soft">
              {site.address.line1}
              <br />
              {site.address.line2}
            </p>
            <a
              href={site.contact.phoneHref}
              className="mt-5 inline-block font-display text-2xl font-bold tracking-tight text-ink transition-colors hover:text-persimmon"
            >
              {site.contact.phone}
            </a>
          </div>

          <div>
            <p className="eyebrow">둘러보기</p>
            <ul className="mt-4 space-y-2.5 text-[0.9rem] text-ink-soft">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-persimmon">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/apply" className="transition-colors hover:text-persimmon">
                  상담 신청
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">운영 시간</p>
            <ul className="mt-4 space-y-2.5 text-[0.9rem] text-ink-soft">
              <li>{site.hours.weekday}</li>
              <li>{site.hours.saturday}</li>
              <li className="text-ink-faint">{site.hours.closed}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-7 text-[0.78rem] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            대표 {site.business.owner} · 사업자등록번호 {site.business.regNumber}
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-persimmon">
              개인정보처리방침
            </Link>
            <Link href="/admin" className="transition-colors hover:text-persimmon">
              관리자
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
