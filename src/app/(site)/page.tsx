import Link from "next/link";
import { concerns, programs, site, steps } from "@/lib/site";
import VoiceWave from "@/components/VoiceWave";

export default function Home() {
  return (
    <>
      {/* ─────────────── 히어로 ─────────────── */}
      <section className="relative overflow-hidden">
        {/* 배경 결 */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_72%_18%,var(--color-paper-deep)_0%,transparent_58%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-[14%] -z-10 hidden h-full w-px bg-line lg:block"
        />

        <div className="mx-auto max-w-6xl px-6 pt-24 pb-28 lg:px-10 lg:pt-32 lg:pb-36">
          <div className="grid items-end gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <p
                className="eyebrow rise-in flex items-center gap-3"
                style={{ animationDelay: "0.05s" }}
              >
                <span className="inline-block h-px w-9 bg-persimmon" />
                언어재활 · 아동 · 1:1
              </p>

              <h1
                className="rise-in mt-8 font-display font-bold tracking-tightest text-[clamp(2.3rem,8.4vw,5.6rem)] leading-[1.14]"
                style={{ animationDelay: "0.15s" }}
              >
                아이의 첫 마디를
                <br />
                <span className="text-persimmon">기다리는</span> 시간
              </h1>

              <div
                className="rise-in mt-11"
                style={{ animationDelay: "0.42s" }}
              >
                <VoiceWave />
              </div>

              <p
                className="rise-in mt-11 max-w-xl text-[1.06rem] leading-[1.95] text-ink-soft"
                style={{ animationDelay: "0.3s" }}
              >
                말이 트이는 시기는 아이마다 다릅니다. 다만{" "}
                <span className="mark-ink">기다림이 막연해질 때</span>, 지금
                아이가 어디에 서 있는지 정확히 아는 것이 먼저입니다.
              </p>

              <div
                className="rise-in mt-11 flex flex-wrap items-center gap-x-8 gap-y-4"
                style={{ animationDelay: "0.4s" }}
              >
                <Link
                  href="/apply"
                  className="group relative overflow-hidden bg-ink px-9 py-4 text-[0.95rem] font-medium text-paper"
                >
                  <span className="relative z-10">상담 신청하기</span>
                  <span className="absolute inset-0 origin-left scale-x-0 bg-persimmon transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                </Link>
                <Link
                  href="/programs"
                  className="group inline-flex items-center gap-2 text-[0.95rem] text-ink-soft transition-colors hover:text-persimmon"
                >
                  치료 프로그램 보기
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* 세로 라벨 */}
            <div className="hidden lg:col-span-3 lg:flex lg:justify-end">
              <p className="label-vert">SPEECH · LANGUAGE THERAPY</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── 공감 ─────────────── */}
      <section className="border-y border-line bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">이런 마음으로 오십니다</p>
              <h2 className="mt-6 font-display text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.4]">
                혼자
                <br />
                고민하셨을
                <br />
                시간
              </h2>
            </div>

            <ul className="lg:col-span-8 lg:pt-2">
              {concerns.map((line, i) => (
                <li
                  key={line}
                  className="reveal group flex gap-6 border-b border-line py-6 first:border-t"
                >
                  <span className="mt-1 font-display text-[0.8rem] text-ink-faint tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-display text-[1.15rem] leading-[1.75] text-ink transition-colors duration-300 group-hover:text-persimmon lg:text-[1.28rem]">
                    “{line}”
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-12 max-w-2xl text-[1.02rem] leading-[1.95] text-ink-soft lg:ml-auto lg:w-8/12">
            어느 쪽이든, 판단은 검사 결과를 보고 하면 됩니다.{" "}
            <span className="mark-ink">
              치료가 필요하지 않다고 판단되면 그렇게 말씀드립니다.
            </span>
          </p>
        </div>
      </section>

      {/* ─────────────── 프로그램 ─────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">치료 프로그램</p>
            <h2 className="mt-6 font-display text-[clamp(1.9rem,4vw,2.9rem)]">
              네 갈래의 어려움
            </h2>
          </div>
          <Link
            href="/programs"
            className="group inline-flex items-center gap-2 pb-2 text-[0.9rem] text-ink-soft transition-colors hover:text-persimmon"
          >
            자세히 보기
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </div>

        <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2">
          {programs.map((p) => (
            <Link
              key={p.id}
              href={`/programs#${p.id}`}
              className="reveal group relative bg-paper p-9 transition-colors duration-400 hover:bg-paper-deep lg:p-11"
            >
              <span className="font-display text-[0.82rem] tracking-widest text-persimmon">
                {p.no}
              </span>
              <h3 className="mt-4 font-display text-[1.6rem] leading-tight">
                {p.title}
              </h3>
              <p className="mt-2 text-[0.88rem] text-ink-faint">{p.subtitle}</p>
              <p className="mt-5 text-[0.95rem] leading-[1.9] text-ink-soft">
                {p.body}
              </p>
              <span className="mt-7 inline-flex items-center gap-2 text-[0.85rem] text-ink transition-colors group-hover:text-persimmon">
                {p.age}
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─────────────── 절차 ─────────────── */}
      <section className="border-y border-line bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
          <p className="eyebrow">이용 절차</p>
          <h2 className="mt-6 max-w-2xl font-display text-[clamp(1.9rem,4vw,2.9rem)] leading-[1.35]">
            신청부터 첫 수업까지
          </h2>

          <ol className="mt-16 grid gap-y-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-8">
            {steps.map((s) => (
              <li key={s.no} className="reveal relative lg:pr-4">
                <span
                  aria-hidden
                  className="absolute -top-6 left-0 hidden h-px w-full bg-line lg:block"
                />
                <span
                  aria-hidden
                  className="absolute -top-[3.5px] left-0 hidden h-[7px] w-[7px] rounded-full bg-persimmon lg:block"
                />
                <p className="font-display text-[0.82rem] tracking-widest text-persimmon">
                  {s.no}
                </p>
                <h3 className="mt-3 font-display text-[1.28rem]">{s.title}</h3>
                <p className="mt-3 text-[0.9rem] leading-[1.85] text-ink-soft">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─────────────── 원장 ─────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">센터장 인사말</p>
            <h2 className="mt-6 font-display text-[clamp(1.7rem,3.4vw,2.3rem)] leading-[1.4]">
              {site.director.name}
            </h2>
            <p className="mt-2 text-[0.9rem] text-ink-faint">
              {site.director.title}
            </p>
            <ul className="mt-7 space-y-2 border-t border-line pt-6 text-[0.86rem] leading-relaxed text-ink-soft">
              {site.director.credentials.map((c) => (
                <li key={c} className="flex gap-2.5">
                  <span className="mt-[0.62em] h-px w-2.5 shrink-0 bg-persimmon" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-8 lg:pl-8">
            {site.director.message.map((para, i) => (
              <p
                key={i}
                className={`font-display leading-[1.95] text-ink ${
                  i === 0
                    ? "text-[clamp(1.3rem,2.6vw,1.75rem)] leading-[1.65]"
                    : "mt-7 text-[1.05rem] text-ink-soft"
                }`}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── 마무리 CTA ─────────────── */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.3] text-paper">
                궁금한 것부터
                <br />
                물어보셔도 됩니다.
              </h2>
              <p className="mt-6 max-w-lg text-[1rem] leading-[1.9] text-paper/62">
                신청서를 남겨주시면 1–2일 안에 연락드립니다. 전화가 편하시면
                바로 걸어주셔도 좋습니다.
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
              <Link
                href="/apply"
                className="group relative overflow-hidden bg-persimmon px-9 py-4 text-center text-[0.95rem] font-medium text-paper"
              >
                <span className="relative z-10">상담 신청서 작성</span>
                <span className="absolute inset-0 origin-left scale-x-0 bg-persimmon-deep transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              </Link>
              <a
                href={site.contact.phoneHref}
                className="border border-paper/22 px-9 py-4 text-center font-display text-[1.15rem] font-bold tracking-tight text-paper transition-colors hover:border-paper/55"
              >
                {site.contact.phone}
              </a>
              <p className="text-[0.8rem] text-paper/45 lg:text-right">
                {site.hours.weekday} · {site.hours.saturday}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
