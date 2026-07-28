import type { Metadata } from "next";
import Link from "next/link";
import { programs, site } from "@/lib/site";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "치료 프로그램",
  description:
    "언어발달지연, 조음·음운장애, 유창성장애(말더듬), 사회적 의사소통. 연령과 어려움에 맞춘 1:1 언어재활 프로그램.",
};

export default function Programs() {
  return (
    <>
      <PageHeader
        eyebrow="치료 프로그램"
        title={
          <>
            어디에서 막히는지에 따라
            <br />
            방법이 달라집니다
          </>
        }
        lead="같은 '말이 늦다'는 말 안에도 서로 다른 어려움이 있습니다. 평가를 통해 어느 쪽인지 확인한 뒤 프로그램을 정합니다."
      />

      {programs.map((p, i) => (
        <section
          key={p.id}
          id={p.id}
          className={`scroll-mt-24 border-b border-line ${
            i % 2 === 1 ? "bg-paper-deep" : ""
          }`}
        >
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <span className="font-display text-[0.82rem] tracking-widest text-persimmon">
                  {p.no}
                </span>
                <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,2.7rem)] leading-tight">
                  {p.title}
                </h2>
                <p className="mt-3 text-[1rem] text-ink-faint">{p.subtitle}</p>
                <p className="mt-7 inline-block border border-line px-4 py-2 text-[0.85rem] text-ink-soft">
                  권장 연령 · {p.age}
                </p>
              </div>

              <div className="lg:col-span-7">
                <p className="font-display text-[1.15rem] leading-[1.9] text-ink lg:text-[1.25rem]">
                  {p.body}
                </p>

                <p className="eyebrow mt-11">이런 경우입니다</p>
                <ul className="mt-5 space-y-0 border-t border-line">
                  {p.signs.map((s) => (
                    <li
                      key={s}
                      className="flex gap-4 border-b border-line py-4 text-[0.98rem] text-ink-soft"
                    >
                      <span className="mt-[0.75em] h-[5px] w-[5px] shrink-0 rounded-full bg-persimmon" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* 안내 */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">수업 방식</p>
            <h2 className="mt-6 font-display text-[clamp(1.7rem,3.4vw,2.2rem)] leading-[1.4]">
              주 1–2회
              <br />
              고정 시간 1:1
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-[1rem] leading-[1.95] text-ink-soft">
              모든 수업은 <span className="mark-ink">1회 40분 개별 치료</span>로
              진행되며, 요일과 시간을 고정해 배정합니다. 아이에게는 예측 가능한
              반복이 중요하기 때문입니다.
            </p>
            <p className="mt-5 text-[1rem] leading-[1.95] text-ink-soft">
              수업 후에는 그날 무엇을 했고 집에서 무엇을 이어가면 좋을지
              보호자께 안내드립니다. 원하는 시간대가 이미 차 있는 경우 대기
              명단에 올려드리고 자리가 나는 대로 연락드립니다.
            </p>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              <Link
                href="/guide"
                className="group inline-flex items-center gap-2 text-[0.95rem] text-ink transition-colors hover:text-persimmon"
              >
                비용·바우처 안내
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>
              <a
                href={site.contact.phoneHref}
                className="text-[0.95rem] text-ink-soft transition-colors hover:text-persimmon"
              >
                전화 문의 {site.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
