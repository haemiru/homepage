import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "오시는 길",
  description: `${site.address.line1} ${site.address.line2}. ${site.hours.weekday}`,
};

export default function Location() {
  return (
    <>
      <PageHeader
        eyebrow="오시는 길"
        title="찾아오시는 방법"
        lead="예약제로 운영되므로 방문 전 연락 부탁드립니다."
      />

      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* 정보 */}
          <div className="lg:col-span-5">
            <dl className="divide-y divide-line border-y border-line">
              <div className="py-7">
                <dt className="eyebrow">주소</dt>
                <dd className="mt-3 font-display text-[1.25rem] leading-relaxed text-ink">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </dd>
                {site.address.mapUrl && (
                  <a
                    href={site.address.mapUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group mt-4 inline-flex items-center gap-2 text-[0.9rem] text-ink-soft transition-colors hover:text-persimmon"
                  >
                    지도에서 보기
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                      →
                    </span>
                  </a>
                )}
              </div>

              <div className="py-7">
                <dt className="eyebrow">대중교통</dt>
                <dd className="mt-3 space-y-2 text-[0.98rem] leading-relaxed text-ink-soft">
                  {site.address.transit.map((t) => (
                    <p key={t} className="flex gap-3">
                      <span className="mt-[0.72em] h-px w-3 shrink-0 bg-persimmon" />
                      {t}
                    </p>
                  ))}
                </dd>
              </div>

              <div className="py-7">
                <dt className="eyebrow">주차</dt>
                <dd className="mt-3 text-[0.98rem] leading-relaxed text-ink-soft">
                  {site.address.parking}
                </dd>
              </div>

              <div className="py-7">
                <dt className="eyebrow">운영 시간</dt>
                <dd className="mt-3 space-y-1.5 text-[0.98rem] text-ink-soft">
                  <p>{site.hours.weekday}</p>
                  <p>{site.hours.saturday}</p>
                  <p className="text-ink-faint">{site.hours.closed}</p>
                  <p className="pt-2 text-[0.88rem] text-ink-faint">
                    {site.hours.note}
                  </p>
                </dd>
              </div>

              <div className="py-7">
                <dt className="eyebrow">문의</dt>
                <dd className="mt-3">
                  <a
                    href={site.contact.phoneHref}
                    className="font-display text-[1.7rem] font-bold tracking-tight text-ink transition-colors hover:text-persimmon"
                  >
                    {site.contact.phone}
                  </a>
                  <p className="mt-2 text-[0.92rem] text-ink-soft">
                    카카오톡 {site.contact.kakao}
                  </p>
                </dd>
              </div>
            </dl>

            <Link
              href="/apply"
              className="mt-10 inline-block bg-ink px-8 py-3.5 text-[0.92rem] font-medium text-paper transition-colors hover:bg-persimmon"
            >
              상담 신청하기
            </Link>
          </div>

          {/* 지도 자리 */}
          <div className="lg:col-span-7">
            <div className="flex aspect-[4/3] flex-col items-center justify-center border border-line bg-paper-deep p-10 text-center lg:aspect-[4/3.4]">
              <div
                aria-hidden
                className="h-10 w-10 rounded-full border-2 border-persimmon"
              />
              <p className="mt-6 font-display text-[1.15rem] text-ink">
                지도가 들어갈 자리입니다
              </p>
              <p className="mt-3 max-w-sm text-[0.88rem] leading-relaxed text-ink-faint">
                네이버 지도 또는 카카오맵의 지도 API 키를 발급받으면 이 자리에
                실제 지도를 넣을 수 있습니다. 키 없이 간단히 하려면 지도
                &lsquo;공유 → 지도 퍼가기&rsquo; 의 iframe 코드를 여기에 붙여도
                됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
