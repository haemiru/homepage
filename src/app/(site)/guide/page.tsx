import type { Metadata } from "next";
import Link from "next/link";
import { site, steps } from "@/lib/site";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "이용 안내",
  description:
    "상담 신청부터 평가, 수업 등록까지의 절차와 비용 안내. 발달재활서비스 바우처 이용 가능.",
};

/* 비용표 — ○ 부분에 실제 금액을 넣으세요 */
const fees = [
  { item: "초기 상담", detail: "보호자 상담 30–40분", price: "무료" },
  { item: "언어 평가", detail: "표준화 검사 60–90분 · 결과 설명 포함", price: "○○,○○○원" },
  { item: "개별 치료 (1회)", detail: "1:1 40분", price: "○○,○○○원" },
  { item: "월 8회 (주 2회)", detail: "가장 많이 선택하시는 과정", price: "○○○,○○○원" },
];

export default function Guide() {
  return (
    <>
      <PageHeader
        eyebrow="이용 안내"
        title={
          <>
            처음 오시는 분들이
            <br />
            가장 많이 묻는 것들
          </>
        }
        lead="절차와 비용을 미리 알고 오시면 상담 시간을 아이 이야기에 더 쓸 수 있습니다."
      />

      {/* 절차 */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-28">
        <p className="eyebrow">이용 절차</p>
        <h2 className="mt-6 font-display text-[clamp(1.9rem,4vw,2.7rem)]">
          다섯 단계
        </h2>

        <ol className="mt-14 border-t border-line">
          {steps.map((s) => (
            <li
              key={s.no}
              className="reveal grid gap-3 border-b border-line py-8 sm:grid-cols-[4rem_13rem_1fr] sm:gap-8 sm:py-9"
            >
              <span className="font-display text-[0.82rem] tracking-widest text-persimmon sm:pt-2">
                {s.no}
              </span>
              <h3 className="font-display text-[1.35rem] leading-snug">
                {s.title}
              </h3>
              <p className="text-[0.98rem] leading-[1.9] text-ink-soft sm:pt-1">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* 비용 */}
      <section className="border-y border-line bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">비용 안내</p>
              <h2 className="mt-6 font-display text-[clamp(1.7rem,3.4vw,2.3rem)] leading-[1.4]">
                자부담
                <br />
                기준 금액
              </h2>
              <p className="mt-6 text-[0.92rem] leading-[1.9] text-ink-soft">
                아래는 바우처를 이용하지 않는 경우의 금액입니다. 바우처 대상이면
                오른쪽 안내를 확인해 주세요.
              </p>
            </div>

            <div className="lg:col-span-8">
              <dl className="border-t border-ink/18">
                {fees.map((f) => (
                  <div
                    key={f.item}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-6"
                  >
                    <div>
                      <dt className="font-display text-[1.12rem] text-ink">
                        {f.item}
                      </dt>
                      <p className="mt-1 text-[0.86rem] text-ink-faint">
                        {f.detail}
                      </p>
                    </div>
                    <dd className="font-display text-[1.2rem] font-bold tracking-tight text-ink tabular-nums">
                      {f.price}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-[0.84rem] leading-relaxed text-ink-faint">
                · 수업료는 매월 선납이며, 현금영수증·실비보험 청구용 영수증을
                발급해 드립니다.
                <br />· 결석과 보충 수업 규정은 등록 시 별도로 안내드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 바우처 */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">정부 지원</p>
            <h2 className="mt-6 font-display text-[clamp(1.7rem,3.4vw,2.3rem)] leading-[1.4]">
              발달재활서비스
              <br />
              바우처
            </h2>
          </div>

          <div className="lg:col-span-8">
            <p className="font-display text-[1.2rem] leading-[1.85] text-ink">
              만 18세 미만 장애아동의 언어·청능 재활에 정부가 이용료 일부를
              지원하는 제도입니다. 저희 센터는{" "}
              <span className="mark-ink">바우처 제공기관으로 이용 가능</span>
              합니다.
            </p>

            <div className="mt-11 grid gap-px border border-line bg-line sm:grid-cols-2">
              {[
                {
                  t: "대상",
                  d: "만 18세 미만 장애아동. 등록 장애인이 아니어도 의사 진단서와 검사 결과로 인정받을 수 있습니다.",
                },
                {
                  t: "소득 기준",
                  d: "기준 중위소득 이하 가구. 소득 구간에 따라 지원액과 본인부담금이 달라집니다.",
                },
                {
                  t: "신청 장소",
                  d: "주소지 관할 읍·면·동 행정복지센터(주민센터)에 보호자가 직접 신청합니다.",
                },
                {
                  t: "필요 서류",
                  d: "신청서, 진단서 또는 검사 결과서, 소득 증빙 서류. 자세한 목록은 주민센터에서 확인하실 수 있습니다.",
                },
              ].map((x) => (
                <div key={x.t} className="bg-paper p-8">
                  <h3 className="font-display text-[1.15rem]">{x.t}</h3>
                  <p className="mt-3 text-[0.94rem] leading-[1.9] text-ink-soft">
                    {x.d}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 border-l-2 border-persimmon bg-persimmon-wash px-7 py-6">
              <p className="text-[0.92rem] leading-[1.9] text-ink-soft">
                <strong className="font-medium text-ink">
                  지원 금액과 소득 기준은 매년 바뀝니다.
                </strong>{" "}
                정확한 올해 기준은 주민센터 또는 보건복지상담센터(129)에서
                확인해 주세요. 신청 절차가 처음이라 막막하시면 상담 때 함께
                짚어드리겠습니다.
              </p>
            </div>

            <p className="mt-8 text-[0.94rem] leading-[1.9] text-ink-soft">
              지역에 따라{" "}
              <span className="text-ink">지역사회서비스투자사업</span> 바우처를
              함께 이용할 수 있는 경우도 있습니다. 해당 여부는 거주 지역
              기준으로 달라지니 문의해 주세요.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-paper-deep">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-8 px-6 py-16 lg:px-10">
          <div>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] leading-snug">
              바우처 대상인지 헷갈리시나요?
            </h2>
            <p className="mt-3 text-[0.95rem] text-ink-soft">
              신청서에 남겨주시면 확인해서 함께 안내드리겠습니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/apply"
              className="bg-ink px-8 py-3.5 text-[0.92rem] font-medium text-paper transition-colors hover:bg-persimmon"
            >
              상담 신청
            </Link>
            <a
              href={site.contact.phoneHref}
              className="border border-line px-8 py-3.5 font-display text-[1.05rem] font-bold text-ink transition-colors hover:border-persimmon hover:text-persimmon"
            >
              {site.contact.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
