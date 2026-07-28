-- ════════════════════════════════════════════════════════════
--  1단계 스키마 — 상담/수업 신청 접수
--
--  실행 방법
--   Supabase 대시보드 → SQL Editor → 새 쿼리 → 아래 전체 붙여넣기 → Run
-- ════════════════════════════════════════════════════════════

-- ── 상태값 ────────────────────────────────────────────────
create type application_status as enum (
  'new',        -- 접수됨
  'contacted',  -- 연락 완료
  'scheduled',  -- 상담 일정 확정
  'enrolled',   -- 등록 완료
  'waiting',    -- 대기 명단
  'on_hold',    -- 보류
  'closed'      -- 종료(등록 안 함)
);

create type payment_type as enum (
  'voucher',    -- 발달재활서비스 바우처
  'self',       -- 자부담
  'unsure'      -- 잘 모르겠음 (상담 때 확인)
);

-- ── 신청서 ────────────────────────────────────────────────
create table public.applications (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  -- 아동 (민감정보 포함)
  child_name        text not null,
  child_birth_date  date not null,
  child_gender      text check (child_gender in ('male', 'female', 'private')),

  -- 보호자
  guardian_name     text not null,
  guardian_phone    text not null,
  guardian_relation text,

  -- 신청 내용
  main_concern    text not null,   -- 주 호소 문제
  prior_therapy   text,            -- 이전 치료·검사 이력
  payment_type    payment_type not null default 'unsure',
  preferred_days  text[] not null default '{}',   -- ['mon','tue',...]
  preferred_time  text,                            -- morning | afternoon | after_school | any
  referral_source text,                            -- 방문 경로

  -- 동의 기록 (개인정보보호법 대응 — 삭제 금지)
  consent_privacy   boolean not null,  -- 개인정보 수집·이용
  consent_sensitive boolean not null,  -- 민감정보(발달 관련) 별도 동의
  consent_guardian  boolean not null,  -- 만 14세 미만 법정대리인 동의
  consented_at      timestamptz not null default now(),

  -- 운영
  status     application_status not null default 'new',
  admin_note text,

  constraint consent_required check (
    consent_privacy and consent_sensitive and consent_guardian
  )
);

create index applications_status_idx  on public.applications (status);
create index applications_created_idx on public.applications (created_at desc);

-- updated_at 자동 갱신
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger applications_touch
  before update on public.applications
  for each row execute function public.touch_updated_at();

-- ── 관리자 ────────────────────────────────────────────────
-- Supabase Authentication → Users 에서 계정을 만든 뒤,
-- 그 user id 를 이 표에 넣어야 관리자 화면이 열립니다.
create table public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  name       text,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- ── RLS ───────────────────────────────────────────────────
-- 신청서 저장은 서버(service role)에서만 하므로 anon 정책은 두지 않습니다.
-- 브라우저에서는 이 표에 어떤 방법으로도 접근할 수 없습니다.
alter table public.applications enable row level security;
alter table public.admins       enable row level security;

create policy "관리자만 조회" on public.applications
  for select to authenticated using (public.is_admin());

create policy "관리자만 수정" on public.applications
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "본인 관리자 정보 조회" on public.admins
  for select to authenticated using (user_id = auth.uid());
