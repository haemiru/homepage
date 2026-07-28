"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/** 신청 건의 상태·메모 수정 (RLS 로 관리자만 통과) */
export async function updateApplication(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const note = String(formData.get("admin_note") ?? "").trim();

  if (!id || !status) return;

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("applications")
    .update({ status, admin_note: note || null })
    .eq("id", id);

  if (error) {
    console.error("[admin] update failed:", error);
    throw new Error("수정에 실패했습니다. 권한을 확인해 주세요.");
  }

  revalidatePath("/admin");
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
