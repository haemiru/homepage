import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * service role 키를 사용하는 서버 전용 클라이언트.
 * RLS 를 우회하므로 절대 클라이언트 컴포넌트에서 import 하지 마세요.
 * (`server-only` 가 실수로 import 하면 빌드를 실패시킵니다)
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase 환경변수가 없습니다. .env.local 에 NEXT_PUBLIC_SUPABASE_URL 과 SUPABASE_SERVICE_ROLE_KEY 를 넣어주세요.",
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
