# CLAUDE.md — 언어치료실 홈페이지

언어치료실 공개 홈페이지 + 상담·수업 신청 접수. **원장 1인 운영**이고 수입 구조는
**바우처 + 자부담**이다.

셋업 절차(Supabase 프로젝트 만들기, 테이블 생성, 관리자 계정)는 `README.md`에
단계별로 있다 — 여기 복사하지 않는다.

## 명령

```bash
npm run dev        # localhost:3000
npm run build
npm run start
npm run typecheck  # tsc --noEmit
```

린터·테스트 러너는 없다.

## 스택

**Next.js 16** (App Router) + React 19 · Tailwind v4 · Supabase(`@supabase/ssr`) ·
Zod · Pretendard · Vercel.

## 구조

```
src/app/(site)/     공개 — about · programs · guide · location · apply · privacy
src/app/admin/      관리자 — 신청 목록·상태 변경·메모 (admin/login)
src/lib/actions/    서버 액션 (apply.ts 등)
src/lib/supabase/   SSR 클라이언트
supabase/schema.sql 1단계 스키마
```

**Supabase 없이도 공개 페이지는 전부 정상 동작한다.** 신청서 제출과 관리자 화면만
DB가 필요하다 — 화면 작업만 할 때는 셋업을 건너뛰어도 된다.

## 🔴 범위 결정 — 지금은 1단계다

**1단계 = 공개 사이트 + 신청 접수까지.** 시간표·회기·결석보충·바우처 정산은
**아직 만들지 않는다.**

`supabase/schema-phase2.sql` 에 2단계 스키마(`children`·`slots`·`sessions`·
`voucher_accounts`·`waitlist`)가 이미 적혀 있지만 **설계만 해 둔 것이고 실행하면 안 된다.**
파일 상단에도 "⚠ 아직 실행하지 마세요"라고 적혀 있다. 1단계 설계가 그 구조로
확장되는지 확인해 두려는 목적이다.

1단계 실제 테이블은 `applications` · `admins` 둘뿐이다.

## 🔴 동의는 3개로 분리돼 있다 — 합치지 말 것

`src/lib/actions/apply.ts` 가 저장하는 값:

| 컬럼 | 무엇 |
|---|---|
| `consent_privacy` | 개인정보 수집·이용 |
| `consent_sensitive` | **민감정보**(아동 발달·진단 정보) |
| `consent_guardian` | 보호자 동의 |

셋을 체크박스 하나로 합치는 것은 **법적으로 안 된다.** 민감정보와 일반 개인정보는
별도 동의를 받아야 하고, 미성년자라 보호자 동의도 따로 필요하다.

## 리전

Supabase 프로젝트 리전은 **Northeast Asia (Seoul)**. 개인정보 국내 보관 + 속도 때문이다.
새 프로젝트를 만들 일이 생겨도 이 선택을 바꾸지 말 것.

## UI

**한국어.** 톤은 한지·편집물 느낌 — 치료실 특성상 과한 마케팅 색을 피하고 차분하게 간다.
