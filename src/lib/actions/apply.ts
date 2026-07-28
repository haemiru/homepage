"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { applicationSchema, readApplicationForm } from "@/lib/validation";

import type { ApplyState } from "@/lib/actions/apply-state";

export async function submitApplication(
  _prev: ApplyState,
  formData: FormData,
): Promise<ApplyState> {
  // 봇 차단용 숨김 필드 — 사람이 채울 일이 없습니다
  if ((formData.get("website") ?? "").toString().length > 0) {
    return { status: "success", message: "접수되었습니다." };
  }

  const parsed = applicationSchema.safeParse(readApplicationForm(formData));

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString();
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return {
      status: "error",
      message: "입력하신 내용을 다시 확인해 주세요.",
      errors,
    };
  }

  const v = parsed.data;

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("applications").insert({
      child_name: v.childName,
      child_birth_date: v.childBirthDate,
      child_gender: v.childGender,
      guardian_name: v.guardianName,
      guardian_phone: v.guardianPhone,
      guardian_relation: v.guardianRelation ?? null,
      main_concern: v.mainConcern,
      prior_therapy: v.priorTherapy ?? null,
      payment_type: v.paymentType,
      preferred_days: v.preferredDays,
      preferred_time: v.preferredTime,
      referral_source: v.referralSource ?? null,
      consent_privacy: v.consentPrivacy,
      consent_sensitive: v.consentSensitive,
      consent_guardian: v.consentGuardian,
    });

    if (error) {
      console.error("[apply] insert failed:", error);
      return {
        status: "error",
        message:
          "저장 중 문제가 생겼습니다. 잠시 후 다시 시도하시거나 전화로 연락 주세요.",
      };
    }
  } catch (e) {
    console.error("[apply] unexpected:", e);
    return {
      status: "error",
      message:
        "지금은 접수가 어렵습니다. 전화로 연락 주시면 바로 도와드리겠습니다.",
    };
  }

  return { status: "success" };
}
