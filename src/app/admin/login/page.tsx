"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { site } from "@/lib/site";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const configured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    setError(null);
    setPending(true);

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      setPending(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="font-display text-[1.2rem] font-bold tracking-tightest text-ink transition-opacity hover:opacity-65"
        >
          {site.name}
        </Link>
        <h1 className="mt-8 font-display text-[1.9rem] leading-tight">
          관리자 로그인
        </h1>
        <p className="mt-3 text-[0.88rem] text-ink-faint">
          신청 접수 내역을 확인하려면 로그인하세요.
        </p>

        {!configured ? (
          <div className="mt-9 border-l-2 border-persimmon bg-persimmon-wash px-6 py-5 text-[0.88rem] leading-[1.9] text-ink-soft">
            <p className="font-medium text-ink">Supabase 설정이 필요합니다.</p>
            <p className="mt-2">
              프로젝트 폴더의 <code className="text-ink">.env.example</code> 를{" "}
              <code className="text-ink">.env.local</code> 로 복사하고 Supabase
              키를 넣은 뒤 서버를 다시 시작해 주세요.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-9">
            <label htmlFor="email" className="block text-[0.85rem] font-medium text-ink-soft">
              이메일
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-line bg-transparent py-3 text-[1rem] text-ink outline-none transition-colors focus:border-persimmon"
            />

            <label
              htmlFor="password"
              className="mt-7 block text-[0.85rem] font-medium text-ink-soft"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-line bg-transparent py-3 text-[1rem] text-ink outline-none transition-colors focus:border-persimmon"
            />

            {error && (
              <p role="alert" className="mt-5 text-[0.85rem] text-persimmon-deep">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="mt-9 w-full bg-ink py-4 text-[0.95rem] font-medium text-paper transition-colors hover:bg-persimmon disabled:opacity-55"
            >
              {pending ? "확인 중…" : "로그인"}
            </button>
          </form>
        )}

        <Link
          href="/"
          className="mt-10 inline-block text-[0.85rem] text-ink-faint underline underline-offset-4 transition-colors hover:text-persimmon"
        >
          홈페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
}
