import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { signOut, updateApplication } from "@/lib/actions/admin";
import {
  DAY_LABEL,
  GENDER_LABEL,
  PAYMENT_LABEL,
  STATUS_LABEL,
  STATUS_OPTIONS,
  TIME_LABEL,
  formatAge,
  formatDateTime,
  formatPhone,
} from "@/lib/admin-labels";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

type Application = {
  id: string;
  created_at: string;
  child_name: string;
  child_birth_date: string;
  child_gender: string | null;
  guardian_name: string;
  guardian_phone: string;
  guardian_relation: string | null;
  main_concern: string;
  prior_therapy: string | null;
  payment_type: string;
  preferred_days: string[];
  preferred_time: string | null;
  referral_source: string | null;
  status: string;
  admin_note: string | null;
};

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="font-display text-[1.8rem] leading-tight">{title}</h1>
      <div className="mt-6 space-y-4 text-[0.95rem] leading-[1.95] text-ink-soft">
        {children}
      </div>
      <Link
        href="/"
        className="mt-10 inline-block text-[0.85rem] text-ink-faint underline underline-offset-4 hover:text-persimmon"
      >
        홈페이지로 돌아가기
      </Link>
    </div>
  );
}

export default async function AdminDashboard() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return (
      <Notice title="Supabase 설정이 필요합니다">
        <p>
          프로젝트 폴더의 <code className="text-ink">.env.example</code> 파일을{" "}
          <code className="text-ink">.env.local</code> 로 복사한 뒤, Supabase
          대시보드의 <strong className="text-ink">Project Settings → API</strong>
          에서 값을 복사해 넣어주세요.
        </p>
        <p>
          그다음 <code className="text-ink">supabase/schema.sql</code> 을 SQL
          Editor 에서 실행하면 준비가 끝납니다.
        </p>
      </Notice>
    );
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Notice title="로그인이 필요합니다">
        <p>
          <Link href="/admin/login" className="underline hover:text-persimmon">
            로그인 화면으로 이동
          </Link>
        </p>
      </Notice>
    );
  }

  const { data: adminRow } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!adminRow) {
    return (
      <Notice title="관리자 권한이 없습니다">
        <p>
          로그인은 되었지만 이 계정({user.email})은 관리자로 등록되어 있지
          않습니다.
        </p>
        <p>
          Supabase SQL Editor 에서 아래를 실행해 주세요.
          <br />
          <code className="mt-3 block bg-paper-deep px-4 py-3 text-[0.82rem] text-ink">
            insert into admins (user_id, name) values (&apos;{user.id}&apos;,
            &apos;{site.director.name}&apos;);
          </code>
        </p>
        <form action={signOut}>
          <button
            type="submit"
            className="mt-4 text-[0.85rem] text-ink-faint underline underline-offset-4 hover:text-persimmon"
          >
            로그아웃
          </button>
        </form>
      </Notice>
    );
  }

  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <Notice title="목록을 불러오지 못했습니다">
        <p>{error.message}</p>
        <p>
          <code className="text-ink">supabase/schema.sql</code> 을 실행했는지
          확인해 주세요.
        </p>
      </Notice>
    );
  }

  const rows = (data ?? []) as Application[];
  const counts = {
    total: rows.length,
    new: rows.filter((r) => r.status === "new").length,
    waiting: rows.filter((r) => r.status === "waiting").length,
    enrolled: rows.filter((r) => r.status === "enrolled").length,
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:px-10">
      {/* 상단 */}
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-7">
        <div>
          <p className="eyebrow">관리자</p>
          <h1 className="mt-3 font-display text-[1.9rem] leading-tight">
            상담 신청 접수
          </h1>
        </div>
        <div className="flex items-center gap-6 text-[0.85rem]">
          <Link href="/" className="text-ink-soft transition-colors hover:text-persimmon">
            홈페이지
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="text-ink-faint transition-colors hover:text-persimmon"
            >
              로그아웃
            </button>
          </form>
        </div>
      </div>

      {/* 요약 */}
      <dl className="mt-8 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
        {[
          ["전체", counts.total],
          ["새 신청", counts.new],
          ["대기 명단", counts.waiting],
          ["등록 완료", counts.enrolled],
        ].map(([label, n]) => (
          <div key={String(label)} className="bg-paper px-5 py-5">
            <dt className="text-[0.78rem] tracking-wide text-ink-faint">
              {label}
            </dt>
            <dd
              className={`mt-1.5 font-display text-[1.9rem] font-bold tabular-nums ${
                label === "새 신청" && Number(n) > 0
                  ? "text-persimmon"
                  : "text-ink"
              }`}
            >
              {n}
            </dd>
          </div>
        ))}
      </dl>

      {/* 목록 */}
      {rows.length === 0 ? (
        <p className="mt-16 border border-line bg-paper-deep px-8 py-16 text-center text-[0.95rem] text-ink-faint">
          아직 접수된 신청이 없습니다.
        </p>
      ) : (
        <ul className="mt-10 space-y-4">
          {rows.map((r) => (
            <li key={r.id} className="border border-line bg-paper">
              <details className="group">
                <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-5 gap-y-2 px-6 py-5 transition-colors hover:bg-paper-deep">
                  <span
                    className={`shrink-0 px-2.5 py-1 text-[0.72rem] tracking-wide ${
                      r.status === "new"
                        ? "bg-persimmon text-paper"
                        : r.status === "enrolled"
                          ? "bg-pine text-paper"
                          : "border border-line text-ink-faint"
                    }`}
                  >
                    {STATUS_LABEL[r.status] ?? r.status}
                  </span>

                  <span className="font-display text-[1.15rem] text-ink">
                    {r.child_name}
                  </span>
                  <span className="text-[0.85rem] text-ink-soft">
                    {formatAge(r.child_birth_date)}
                    {r.child_gender && r.child_gender !== "private"
                      ? ` · ${GENDER_LABEL[r.child_gender]}`
                      : ""}
                  </span>
                  <span className="text-[0.85rem] text-ink-faint">
                    {PAYMENT_LABEL[r.payment_type] ?? r.payment_type}
                  </span>

                  <span className="ml-auto flex items-center gap-4">
                    <span className="font-display text-[0.95rem] text-ink">
                      {formatPhone(r.guardian_phone)}
                    </span>
                    <span className="text-[0.78rem] text-ink-faint tabular-nums">
                      {formatDateTime(r.created_at)}
                    </span>
                    <span className="text-ink-faint transition-transform group-open:rotate-180">
                      ⌄
                    </span>
                  </span>
                </summary>

                <div className="border-t border-line px-6 py-7">
                  <div className="grid gap-8 lg:grid-cols-2">
                    {/* 신청 내용 */}
                    <div>
                      <dl className="space-y-5 text-[0.9rem]">
                        <div>
                          <dt className="text-[0.76rem] tracking-wide text-ink-faint">
                            보호자
                          </dt>
                          <dd className="mt-1 text-ink">
                            {r.guardian_name}
                            {r.guardian_relation ? ` (${r.guardian_relation})` : ""}
                            {" · "}
                            <a
                              href={`tel:${r.guardian_phone}`}
                              className="underline underline-offset-2 transition-colors hover:text-persimmon"
                            >
                              {formatPhone(r.guardian_phone)}
                            </a>
                          </dd>
                        </div>
                        <div>
                          <dt className="text-[0.76rem] tracking-wide text-ink-faint">
                            생년월일
                          </dt>
                          <dd className="mt-1 text-ink tabular-nums">
                            {r.child_birth_date}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-[0.76rem] tracking-wide text-ink-faint">
                            희망 시간
                          </dt>
                          <dd className="mt-1 text-ink">
                            {r.preferred_days.length > 0
                              ? r.preferred_days
                                  .map((d) => DAY_LABEL[d] ?? d)
                                  .join(" · ")
                              : "요일 무관"}
                            {r.preferred_time
                              ? ` / ${TIME_LABEL[r.preferred_time] ?? r.preferred_time}`
                              : ""}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-[0.76rem] tracking-wide text-ink-faint">
                            주 호소 문제
                          </dt>
                          <dd className="mt-1 leading-[1.85] whitespace-pre-wrap text-ink-soft">
                            {r.main_concern}
                          </dd>
                        </div>
                        {r.prior_therapy && (
                          <div>
                            <dt className="text-[0.76rem] tracking-wide text-ink-faint">
                              이전 치료·검사 이력
                            </dt>
                            <dd className="mt-1 leading-[1.85] whitespace-pre-wrap text-ink-soft">
                              {r.prior_therapy}
                            </dd>
                          </div>
                        )}
                        {r.referral_source && (
                          <div>
                            <dt className="text-[0.76rem] tracking-wide text-ink-faint">
                              방문 경로
                            </dt>
                            <dd className="mt-1 text-ink-soft">
                              {r.referral_source}
                            </dd>
                          </div>
                        )}
                      </dl>
                    </div>

                    {/* 처리 */}
                    <form action={updateApplication} className="lg:border-l lg:border-line lg:pl-8">
                      <input type="hidden" name="id" value={r.id} />

                      <label
                        htmlFor={`status-${r.id}`}
                        className="block text-[0.76rem] tracking-wide text-ink-faint"
                      >
                        상태
                      </label>
                      <select
                        id={`status-${r.id}`}
                        name="status"
                        defaultValue={r.status}
                        className="mt-2 w-full cursor-pointer border border-line bg-paper px-4 py-3 text-[0.92rem] text-ink outline-none transition-colors focus:border-persimmon"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>

                      <label
                        htmlFor={`note-${r.id}`}
                        className="mt-6 block text-[0.76rem] tracking-wide text-ink-faint"
                      >
                        메모
                      </label>
                      <textarea
                        id={`note-${r.id}`}
                        name="admin_note"
                        rows={5}
                        defaultValue={r.admin_note ?? ""}
                        placeholder="연락 결과, 상담 일정, 특이사항 등"
                        className="mt-2 w-full resize-y border border-line bg-paper px-4 py-3 text-[0.92rem] leading-[1.8] text-ink outline-none transition-colors placeholder:text-ink-faint/65 focus:border-persimmon"
                      />

                      <button
                        type="submit"
                        className="mt-5 w-full bg-ink py-3.5 text-[0.9rem] font-medium text-paper transition-colors hover:bg-persimmon"
                      >
                        저장
                      </button>
                    </form>
                  </div>
                </div>
              </details>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
