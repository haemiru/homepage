"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitApplication } from "@/lib/actions/apply";
import { initialApplyState } from "@/lib/actions/apply-state";
import {
  PAYMENT_TYPES,
  REFERRAL_SOURCES,
  TIME_SLOTS,
  WEEKDAYS,
} from "@/lib/validation";
import { site } from "@/lib/site";

/* ── 작은 조각들 ─────────────────────────────── */

function Legend({ no, title, desc }: { no: string; title: string; desc?: string }) {
  return (
    <legend className="mb-8 w-full border-b border-line pb-5">
      <span className="font-display text-[0.78rem] tracking-widest text-persimmon">
        {no}
      </span>
      <h2 className="mt-2 font-display text-[1.5rem] leading-tight">{title}</h2>
      {desc && <p className="mt-2 text-[0.88rem] text-ink-faint">{desc}</p>}
    </legend>
  );
}

function Err({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p role="alert" className="mt-2 text-[0.82rem] text-persimmon-deep">
      {msg}
    </p>
  );
}

const inputCls =
  "w-full border-b border-line bg-transparent py-3 text-[1rem] text-ink outline-none transition-colors placeholder:text-ink-faint/65 focus:border-persimmon";

const labelCls = "block text-[0.85rem] font-medium text-ink-soft";

/* ── 본체 ───────────────────────────────────── */

export default function ApplyForm() {
  const [state, formAction, pending] = useActionState(
    submitApplication,
    initialApplyState,
  );
  const e = state.errors ?? {};

  if (state.status === "success") {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center lg:py-32">
        <div
          aria-hidden
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-persimmon"
        >
          <span className="font-display text-2xl text-persimmon">✓</span>
        </div>
        <h2 className="mt-9 font-display text-[clamp(1.7rem,4vw,2.4rem)] leading-snug">
          신청서가 접수되었습니다
        </h2>
        <p className="mt-6 text-[1rem] leading-[1.95] text-ink-soft">
          영업일 기준 <strong className="font-medium text-ink">1–2일</strong>{" "}
          안에 남겨주신 번호로 연락드리겠습니다.
          <br />
          급하시면 아래 번호로 바로 전화 주셔도 좋습니다.
        </p>
        <a
          href={site.contact.phoneHref}
          className="mt-9 inline-block border border-line px-9 py-4 font-display text-[1.3rem] font-bold tracking-tight text-ink transition-colors hover:border-persimmon hover:text-persimmon"
        >
          {site.contact.phone}
        </a>
        <p className="mt-10">
          <Link
            href="/"
            className="text-[0.9rem] text-ink-faint underline underline-offset-4 transition-colors hover:text-persimmon"
          >
            홈으로 돌아가기
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
      {/* 봇 차단용 — 화면에 보이지 않습니다 */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 overflow-hidden opacity-0"
      />

      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="mb-12 border-l-2 border-persimmon bg-persimmon-wash px-6 py-4 text-[0.92rem] text-ink"
        >
          {state.message}
        </p>
      )}

      {/* 01 아이 */}
      <fieldset className="mb-16">
        <Legend
          no="01"
          title="아이에 대해"
          desc="치료 방향을 정하는 데 꼭 필요한 정보만 받습니다."
        />

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <label htmlFor="childName" className={labelCls}>
              아이 이름 <span className="text-persimmon">*</span>
            </label>
            <input
              id="childName"
              name="childName"
              required
              maxLength={30}
              autoComplete="off"
              placeholder="예) 김민준"
              className={inputCls}
            />
            <Err msg={e.childName} />
          </div>

          <div>
            <label htmlFor="childBirthDate" className={labelCls}>
              생년월일 <span className="text-persimmon">*</span>
            </label>
            <input
              id="childBirthDate"
              name="childBirthDate"
              type="date"
              required
              className={inputCls}
            />
            <Err msg={e.childBirthDate} />
          </div>
        </div>

        <div className="mt-8">
          <span className={labelCls}>성별</span>
          <div className="mt-3 flex flex-wrap gap-3">
            {[
              { v: "male", l: "남아" },
              { v: "female", l: "여아" },
              { v: "private", l: "밝히지 않음" },
            ].map((o, i) => (
              <label
                key={o.v}
                className="cursor-pointer border border-line px-5 py-2.5 text-[0.9rem] text-ink-soft transition-colors has-checked:border-persimmon has-checked:bg-persimmon-wash has-checked:text-ink"
              >
                <input
                  type="radio"
                  name="childGender"
                  value={o.v}
                  defaultChecked={i === 2}
                  className="sr-only"
                />
                {o.l}
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      {/* 02 보호자 */}
      <fieldset className="mb-16">
        <Legend no="02" title="보호자 연락처" desc="확인 후 이 번호로 연락드립니다." />

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <label htmlFor="guardianName" className={labelCls}>
              보호자 성함 <span className="text-persimmon">*</span>
            </label>
            <input
              id="guardianName"
              name="guardianName"
              required
              maxLength={30}
              autoComplete="name"
              className={inputCls}
            />
            <Err msg={e.guardianName} />
          </div>

          <div>
            <label htmlFor="guardianPhone" className={labelCls}>
              연락처 <span className="text-persimmon">*</span>
            </label>
            <input
              id="guardianPhone"
              name="guardianPhone"
              type="tel"
              required
              inputMode="tel"
              autoComplete="tel"
              placeholder="010-0000-0000"
              className={inputCls}
            />
            <Err msg={e.guardianPhone} />
          </div>
        </div>

        <div className="mt-8">
          <label htmlFor="guardianRelation" className={labelCls}>
            아이와의 관계
          </label>
          <input
            id="guardianRelation"
            name="guardianRelation"
            maxLength={20}
            placeholder="예) 어머니"
            className={inputCls}
          />
        </div>
      </fieldset>

      {/* 03 상담 내용 */}
      <fieldset className="mb-16">
        <Legend
          no="03"
          title="어떤 점이 걱정되시나요"
          desc="편하게 적어주세요. 문장이 정리되지 않아도 괜찮습니다."
        />

        <div>
          <label htmlFor="mainConcern" className={labelCls}>
            지금 가장 걱정되는 점 <span className="text-persimmon">*</span>
          </label>
          <textarea
            id="mainConcern"
            name="mainConcern"
            required
            rows={5}
            maxLength={1000}
            placeholder="예) 36개월인데 두 단어를 붙여 말하지 못하고, 어린이집에서도 말이 느린 것 같다는 이야기를 들었습니다."
            className={`${inputCls} resize-y leading-[1.8]`}
          />
          <Err msg={e.mainConcern} />
        </div>

        <div className="mt-8">
          <label htmlFor="priorTherapy" className={labelCls}>
            이전 치료·검사 이력
          </label>
          <textarea
            id="priorTherapy"
            name="priorTherapy"
            rows={3}
            maxLength={1000}
            placeholder="받은 검사나 다니던 센터가 있다면 적어주세요. 없으면 비워두셔도 됩니다."
            className={`${inputCls} resize-y leading-[1.8]`}
          />
        </div>

        <div className="mt-10">
          <span className={labelCls}>
            이용 방식 <span className="text-persimmon">*</span>
          </span>
          <div className="mt-4 grid gap-px border border-line bg-line sm:grid-cols-3">
            {PAYMENT_TYPES.map((p, i) => (
              <label
                key={p.value}
                className="cursor-pointer bg-paper p-5 transition-colors has-checked:bg-persimmon-wash"
              >
                <input
                  type="radio"
                  name="paymentType"
                  value={p.value}
                  defaultChecked={i === 2}
                  className="sr-only"
                />
                <span className="font-display text-[1.02rem] text-ink">
                  {p.label}
                </span>
                <span className="mt-1.5 block text-[0.8rem] leading-relaxed text-ink-faint">
                  {p.hint}
                </span>
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      {/* 04 희망 시간 */}
      <fieldset className="mb-16">
        <Legend
          no="04"
          title="희망하시는 시간"
          desc="자리가 차 있으면 대기 명단에 올려드리고 연락드립니다."
        />

        <div>
          <span className={labelCls}>가능한 요일 (여러 개 선택 가능)</span>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {WEEKDAYS.map((d) => (
              <label
                key={d.value}
                className="flex h-12 w-12 cursor-pointer items-center justify-center border border-line font-display text-[1rem] text-ink-soft transition-colors has-checked:border-persimmon has-checked:bg-persimmon has-checked:text-paper"
              >
                <input
                  type="checkbox"
                  name="preferredDays"
                  value={d.value}
                  className="sr-only"
                />
                {d.label}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-9">
          <span className={labelCls}>선호 시간대</span>
          <div className="mt-3 flex flex-wrap gap-3">
            {TIME_SLOTS.map((t, i) => (
              <label
                key={t.value}
                className="cursor-pointer border border-line px-5 py-2.5 text-[0.9rem] text-ink-soft transition-colors has-checked:border-persimmon has-checked:bg-persimmon-wash has-checked:text-ink"
              >
                <input
                  type="radio"
                  name="preferredTime"
                  value={t.value}
                  defaultChecked={i === 3}
                  className="sr-only"
                />
                {t.label}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-9">
          <label htmlFor="referralSource" className={labelCls}>
            저희를 어떻게 알게 되셨나요
          </label>
          <select
            id="referralSource"
            name="referralSource"
            defaultValue=""
            className={`${inputCls} cursor-pointer`}
          >
            <option value="">선택 안 함</option>
            {REFERRAL_SOURCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      {/* 05 동의 */}
      <fieldset className="mb-14">
        <Legend
          no="05"
          title="개인정보 수집·이용 동의"
          desc="법에 따라 항목별로 따로 동의를 받습니다."
        />

        <div className="space-y-4">
          <ConsentItem
            name="consentPrivacy"
            title="개인정보 수집·이용 동의 (필수)"
            error={e.consentPrivacy}
          >
            <ConsentTable
              rows={[
                ["수집 항목", "아이 이름·생년월일·성별, 보호자 성함·연락처·관계"],
                ["이용 목적", "상담 예약 확인 및 안내 연락"],
                ["보유 기간", "상담 종료 후 1년 (등록 시 재원 기간 + 3년)"],
              ]}
            />
          </ConsentItem>

          <ConsentItem
            name="consentSensitive"
            title="민감정보 수집·이용 동의 (필수)"
            error={e.consentSensitive}
          >
            <ConsentTable
              rows={[
                [
                  "수집 항목",
                  "아이의 발달 상태, 주 호소 문제, 이전 치료·검사 이력",
                ],
                ["이용 목적", "적합한 평가·치료 방향 판단"],
                ["보유 기간", "상담 종료 후 1년 (등록 시 재원 기간 + 3년)"],
              ]}
            />
            <p className="mt-3 text-[0.8rem] leading-relaxed text-ink-faint">
              아이의 발달 관련 정보는 개인정보보호법상 민감정보에 해당하여 일반
              개인정보와 별도로 동의를 받습니다.
            </p>
          </ConsentItem>

          <ConsentItem
            name="consentGuardian"
            title="법정대리인 동의 (필수)"
            error={e.consentGuardian}
          >
            <p className="text-[0.88rem] leading-[1.9] text-ink-soft">
              신청 대상 아동은 만 14세 미만으로, 본 신청서는{" "}
              <strong className="font-medium text-ink">
                법정대리인(보호자) 본인이 직접 작성
              </strong>
              하며 아동의 개인정보 수집·이용에 동의합니다.
            </p>
          </ConsentItem>
        </div>

        <p className="mt-6 text-[0.8rem] leading-relaxed text-ink-faint">
          동의를 거부하실 수 있으나, 필수 항목에 동의하지 않으면 상담 접수가
          어렵습니다. 자세한 내용은{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-2 transition-colors hover:text-persimmon"
          >
            개인정보처리방침
          </Link>
          에서 확인하실 수 있습니다.
        </p>
      </fieldset>

      <button
        type="submit"
        disabled={pending}
        className="group relative w-full overflow-hidden bg-ink py-5 text-[1rem] font-medium text-paper transition-opacity disabled:opacity-55"
      >
        <span className="relative z-10">
          {pending ? "접수하는 중…" : "상담 신청서 보내기"}
        </span>
        <span className="absolute inset-0 origin-left scale-x-0 bg-persimmon transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-disabled:scale-x-0" />
      </button>

      <p className="mt-5 text-center text-[0.82rem] text-ink-faint">
        전화가 편하시면 {site.contact.phone} 로 연락 주셔도 됩니다.
      </p>
    </form>
  );
}

/* ── 동의 항목 ───────────────────────────────── */

function ConsentItem({
  name,
  title,
  error,
  children,
}: {
  name: string;
  title: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`border ${error ? "border-persimmon" : "border-line"} transition-colors`}
    >
      <label className="flex cursor-pointer items-start gap-3.5 p-5">
        <input
          type="checkbox"
          name={name}
          className="mt-[0.2rem] h-[1.15rem] w-[1.15rem] shrink-0 cursor-pointer accent-[var(--color-persimmon)]"
        />
        <span className="text-[0.95rem] leading-relaxed text-ink">{title}</span>
      </label>

      <details className="border-t border-line/70">
        <summary className="cursor-pointer list-none px-5 py-3 text-[0.8rem] text-ink-faint transition-colors hover:text-persimmon">
          내용 자세히 보기
        </summary>
        <div className="px-5 pt-1 pb-5">{children}</div>
      </details>

      {error && (
        <p role="alert" className="px-5 pb-4 text-[0.82rem] text-persimmon-deep">
          {error}
        </p>
      )}
    </div>
  );
}

function ConsentTable({ rows }: { rows: string[][] }) {
  return (
    <dl className="divide-y divide-line border-y border-line">
      {rows.map(([k, v]) => (
        <div key={k} className="grid gap-1 py-3 sm:grid-cols-[7rem_1fr] sm:gap-4">
          <dt className="text-[0.8rem] font-medium text-ink-faint">{k}</dt>
          <dd className="text-[0.86rem] leading-relaxed text-ink-soft">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
