# 언어치료실 홈페이지

언어치료실 공개 홈페이지 + 상담·수업 신청 접수 시스템 (1단계).

- **공개 사이트** — 센터 소개, 치료 프로그램, 이용 안내(비용·바우처), 오시는 길, 상담 신청
- **관리자** — 신청 목록 조회, 상태 변경, 메모

기술: Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Supabase · Vercel

---

## 1. 지금 바로 실행해 보기

```bash
npm install
npm run dev
```

→ http://localhost:3000

Supabase 설정 전에도 **모든 공개 페이지는 정상 동작**합니다. 신청서 제출과
관리자 화면만 아래 2번을 마쳐야 작동합니다.

---

## 2. Supabase 설정 (10분)

### ① 프로젝트 만들기

1. https://supabase.com 가입 → **New project**
2. Region은 **Northeast Asia (Seoul)** 을 선택하세요. (개인정보 국내 보관 + 속도)
3. 데이터베이스 비밀번호는 따로 안전한 곳에 적어두세요.

### ② 테이블 만들기

좌측 **SQL Editor** → **New query** → `supabase/schema.sql` 내용을 전부
붙여넣고 **Run**.

### ③ 환경변수 넣기

`.env.example` 파일을 복사해 `.env.local` 을 만듭니다.

```bash
cp .env.example .env.local
```

Supabase 대시보드 **Project Settings → API** 에서 값을 복사해 채웁니다.

| 항목 | 넣을 값 |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `anon` `public` 키 |
| `SUPABASE_SERVICE_ROLE_KEY` | `service_role` 키 (**절대 외부 공유 금지**) |

> `service_role` 키는 모든 권한을 우회합니다. 깃에 올리거나 남에게 보내지
> 마세요. `.env.local` 은 `.gitignore` 에 이미 들어 있습니다.

### ④ 관리자 계정 만들기

1. Supabase 대시보드 **Authentication → Users → Add user**
   → 원장님 이메일과 비밀번호로 계정 생성 (Auto Confirm User 체크)
2. 생성된 사용자의 **User UID** 를 복사
3. **SQL Editor** 에서 실행:

```sql
insert into admins (user_id, name)
values ('여기에-복사한-UID-붙여넣기', '원장님 성함');
```

4. 서버 재시작 후 http://localhost:3000/admin 접속 → 로그인

> UID를 넣기 전에 로그인하면 화면에 본인 UID와 실행할 SQL이 그대로 표시되니,
> 거기서 복사하셔도 됩니다.

---

## 3. 센터 정보 채우기

**`src/lib/site.ts` 한 파일만 고치면 사이트 전체에 반영됩니다.**

`○` 와 `[]` 로 표시된 곳이 채워야 할 자리입니다.

| 항목 | 위치 |
|---|---|
| 센터 이름, 소개 문구 | `site.name`, `site.tagline`, `site.description` |
| 전화번호, 카카오톡 | `site.contact` |
| 주소, 지도 링크, 주차 | `site.address` |
| 운영 시간 | `site.hours` |
| 원장 프로필·자격증·인사말 | `site.director` |
| 개인정보 보호책임자 | `site.privacyOfficer` (법적 필수) |
| 사업자 정보 | `site.business` |
| 치료 프로그램 내용 | `programs` 배열 |
| 이용 절차 | `steps` 배열 |

비용표는 `src/app/(site)/guide/page.tsx` 상단 `fees` 배열에 있습니다.

### 꼭 확인하실 것

- **개인정보처리방침** (`src/app/(site)/privacy/page.tsx`) — 일반적인 양식으로
  작성해 두었습니다. 보유 기간, 위탁업체, 바우처 취급 여부를 센터 실제 운영에
  맞게 확인해 주세요.
- **바우처 안내** (`guide` 페이지) — 지원 금액과 소득 기준은 매년 바뀌므로
  구체적 금액은 일부러 적지 않았습니다.

---

## 4. Vercel 배포

```bash
npm i -g vercel
vercel
```

또는 GitHub에 올린 뒤 https://vercel.com 에서 **Import Project**.

배포 후 **Settings → Environment Variables** 에 `.env.local` 의 세 값을 그대로
등록하고 재배포하세요.

마지막으로 `src/lib/site.ts` 의 `site.url` 을 실제 도메인으로 바꾸면 검색엔진
설정이 완성됩니다.

---

## 5. 폴더 구조

```
src/
├─ app/
│  ├─ (site)/          공개 페이지 (헤더·푸터 포함)
│  │  ├─ page.tsx          홈
│  │  ├─ about/            센터 소개
│  │  ├─ programs/         치료 프로그램
│  │  ├─ guide/            이용 안내 · 비용 · 바우처
│  │  ├─ location/         오시는 길
│  │  ├─ apply/            상담 신청
│  │  └─ privacy/          개인정보처리방침
│  ├─ admin/           관리자 (별도 레이아웃)
│  └─ layout.tsx       폰트·전역 스타일
├─ components/         Header, Footer, ApplyForm, VoiceWave …
├─ lib/
│  ├─ site.ts          ★ 센터 정보 (여기만 고치면 됨)
│  ├─ validation.ts    신청서 검증 규칙
│  ├─ actions/         서버 액션 (신청 저장, 상태 변경)
│  └─ supabase/        DB 클라이언트 3종
└─ proxy.ts            /admin 접근 보호

supabase/
├─ schema.sql          1단계 — 지금 실행
└─ schema-phase2.sql   2단계 — 아직 실행하지 마세요
```

### 보안 설계

- 신청서 저장은 **서버에서만** 이루어집니다. 브라우저는 DB에 직접 접근할 수
  없습니다 (RLS로 익명 접근 전면 차단).
- 관리자 조회·수정은 `admins` 표에 등록된 계정만 가능합니다 (RLS `is_admin()`).
- 아동 발달 정보는 **민감정보**이므로 신청 폼에서 일반 개인정보와 별도로 동의를
  받고, 동의 기록을 DB에 남깁니다.

---

## 6. 다음 단계 (2단계 예정)

`supabase/schema-phase2.sql` 에 미리 설계해 둔 내용입니다.

1. **시간표 관리** — 주간 고정 슬롯, 시간 충돌 자동 차단
2. **회기 카운트** — 월 N회 중 진행/결석/잔여
3. **결석·보충 수업** — 결석 사유별 보충 제공 여부, 잔여 보충 추적
4. **바우처 관리** — 월 지원 회기 소진 현황, 자부담 구분
5. **대기 명단** — 순번 관리, 자리 발생 시 연락

3단계는 알림톡(수업 전날 리마인더)과 학부모 마이페이지입니다.

---

## 명령어

```bash
npm run dev        # 개발 서버
npm run build      # 프로덕션 빌드
npm run start      # 빌드 결과 실행
npm run typecheck  # 타입 검사
```
