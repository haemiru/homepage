-- ════════════════════════════════════════════════════════════
--  2단계 스키마 — 시간표 · 회기 · 바우처
--
--  ⚠ 아직 실행하지 마세요. 2단계 작업을 시작할 때 씁니다.
--  1단계 설계가 이 구조로 확장되는 것을 확인해 두려고 미리 적어둡니다.
-- ════════════════════════════════════════════════════════════

-- 등록 아동 (applications 에서 '등록 완료' 된 건이 여기로 넘어옵니다)
create table public.children (
  id             uuid primary key default gen_random_uuid(),
  application_id uuid references public.applications (id),
  name           text not null,
  birth_date     date not null,
  gender         text,
  guardian_name  text not null,
  guardian_phone text not null,
  program        text,              -- language_delay | articulation | fluency | social
  status         text not null default 'active',  -- active | paused | discharged
  enrolled_at    date not null default current_date,
  memo           text,
  created_at     timestamptz not null default now()
);

-- 주간 고정 슬롯 (예: 매주 화 16:00, 40분)
create table public.slots (
  id          uuid primary key default gen_random_uuid(),
  child_id    uuid not null references public.children (id) on delete cascade,
  weekday     smallint not null check (weekday between 0 and 6),  -- 0=일
  start_time  time not null,
  duration_min smallint not null default 40,
  room        text,
  active_from date not null default current_date,
  active_to   date,
  created_at  timestamptz not null default now()
);

-- 같은 시간에 두 건이 겹치지 않도록 (치료사 1인 기준)
create unique index slots_no_overlap
  on public.slots (weekday, start_time)
  where active_to is null;

-- 회기 기록 (실제 진행된 개별 수업)
create table public.sessions (
  id           uuid primary key default gen_random_uuid(),
  child_id     uuid not null references public.children (id) on delete cascade,
  slot_id      uuid references public.slots (id) on delete set null,
  session_date date not null,
  start_time   time not null,
  status       text not null default 'scheduled',
  -- scheduled | done | absent_notified | absent_sudden | absent_noshow | makeup | cancelled
  is_makeup    boolean not null default false,
  makeup_for   uuid references public.sessions (id),  -- 어떤 결석의 보충인지
  note         text,
  created_at   timestamptz not null default now()
);

create index sessions_child_date_idx on public.sessions (child_id, session_date desc);

-- 바우처 계정 (월 단위 회기 소진 관리)
create table public.voucher_accounts (
  id             uuid primary key default gen_random_uuid(),
  child_id       uuid not null references public.children (id) on delete cascade,
  voucher_type   text not null default 'developmental',  -- developmental | community
  period_month   date not null,          -- 해당 월 1일
  granted_count  smallint not null,      -- 이번 달 지원 회기수
  used_count     smallint not null default 0,
  copay_amount   integer,                -- 본인부담금
  created_at     timestamptz not null default now(),
  unique (child_id, voucher_type, period_month)
);

-- 대기 명단
create table public.waitlist (
  id             uuid primary key default gen_random_uuid(),
  application_id uuid references public.applications (id),
  child_name     text not null,
  guardian_phone text not null,
  wanted_days    text[] not null default '{}',
  wanted_time    text,
  priority       smallint not null default 0,
  status         text not null default 'waiting',  -- waiting | offered | placed | dropped
  created_at     timestamptz not null default now()
);
