import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "센터 소개",
  description: `${site.name} 센터장 ${site.director.name}. ${site.director.title}.`,
};

const principles = [
  {
    no: "01",
    title: "진단명보다 아이를 먼저 봅니다",
    body: "같은 진단을 받아도 아이마다 막히는 지점이 다릅니다. 검사 결과는 출발점일 뿐, 매 회기 아이의 반응을 보며 방향을 조정합니다.",
  },
  {
    no: "02",
    title: "부모님과 함께 갑니다",
    body: "주 2회 40분으로 바뀌는 것에는 한계가 있습니다. 오늘 무엇을 했고 집에서 무엇을 이어가면 좋을지 매 회기 공유합니다.",
  },
  {
    no: "03",
    title: "필요한 만큼만 합니다",
    body: "치료가 필요하지 않다고 판단되면 그렇게 말씀드립니다. 목표에 도달하면 종결을 먼저 제안합니다.",
  },
];

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="센터 소개"
        title={
          <>
            아이가 하고 싶은 말이
            <br />
            먼저입니다
          </>
        }
        lead={`${site.name}은 아동 언어재활에 집중하는 1:1 치료실입니다. 평가부터 치료, 종결까지 센터장이 직접 맡습니다.`}
      />

      {/* 센터장 */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">센터장</p>
            <h2 className="mt-5 font-display text-[2rem] leading-tight">
              {site.director.name}
            </h2>
            <p className="mt-2 text-[0.9rem] text-ink-faint">
              {site.director.title}
            </p>

            <ul className="mt-8 space-y-3 border-t border-line pt-7 text-[0.9rem] leading-relaxed text-ink-soft">
              {site.director.credentials.map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="mt-[0.68em] h-px w-3 shrink-0 bg-persimmon" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-8 lg:pl-10">
            {site.director.message.map((para, i) => (
              <p
                key={i}
                className={`font-display leading-[1.95] ${
                  i === 0
                    ? "text-[clamp(1.35rem,2.8vw,1.9rem)] leading-[1.6] text-ink"
                    : "mt-7 text-[1.05rem] text-ink-soft"
                }`}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 원칙 */}
      <section className="border-y border-line bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-28">
          <p className="eyebrow">치료 원칙</p>
          <h2 className="mt-6 font-display text-[clamp(1.9rem,4vw,2.7rem)]">
            세 가지를 지킵니다
          </h2>

          <div className="mt-14 grid gap-x-10 gap-y-12 lg:grid-cols-3">
            {principles.map((p) => (
              <div key={p.no} className="reveal border-t border-line pt-7">
                <span className="font-display text-[0.82rem] tracking-widest text-persimmon">
                  {p.no}
                </span>
                <h3 className="mt-4 font-display text-[1.35rem] leading-snug">
                  {p.title}
                </h3>
                <p className="mt-4 text-[0.95rem] leading-[1.9] text-ink-soft">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 치료실 환경 */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">치료실 환경</p>
            <h2 className="mt-6 font-display text-[clamp(1.7rem,3.4vw,2.3rem)] leading-[1.4]">
              집중할 수 있는
              <br />
              조용한 공간
            </h2>
          </div>
          <div className="lg:col-span-7">
            <dl className="divide-y divide-line border-y border-line">
              {[
                ["1:1 개별 치료실", "아이가 산만해지지 않도록 자극을 최소화한 독립 공간에서 진행합니다."],
                ["보호자 대기 공간", "치료 중 보호자가 편히 기다릴 수 있는 자리를 마련했습니다."],
                ["표준화 검사 도구", "PRES, SELSI, REVT, U-TAP 등 연령과 목적에 맞는 공식 검사를 사용합니다."],
              ].map(([t, d]) => (
                <div key={t} className="grid gap-2 py-6 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <dt className="font-display text-[1.02rem] text-ink">{t}</dt>
                  <dd className="text-[0.94rem] leading-[1.9] text-ink-soft">{d}</dd>
                </div>
              ))}
            </dl>

            <Link
              href="/apply"
              className="group mt-10 inline-flex items-center gap-2.5 text-[0.95rem] text-ink transition-colors hover:text-persimmon"
            >
              상담 신청하기
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
