import { z } from "zod";

export const WEEKDAYS = [
  { value: "mon", label: "월" },
  { value: "tue", label: "화" },
  { value: "wed", label: "수" },
  { value: "thu", label: "목" },
  { value: "fri", label: "금" },
  { value: "sat", label: "토" },
] as const;

export const TIME_SLOTS = [
  { value: "morning", label: "오전 (10–13시)" },
  { value: "afternoon", label: "오후 (13–16시)" },
  { value: "after_school", label: "하원 후 (16–19시)" },
  { value: "any", label: "조율 가능" },
] as const;

export const PAYMENT_TYPES = [
  {
    value: "voucher",
    label: "발달재활서비스 바우처",
    hint: "이미 받고 있거나, 신청 예정입니다",
  },
  { value: "self", label: "자부담", hint: "바우처 없이 이용합니다" },
  { value: "unsure", label: "잘 모르겠어요", hint: "상담 때 함께 확인합니다" },
] as const;

export const REFERRAL_SOURCES = [
  "인터넷 검색",
  "지인 소개",
  "어린이집·유치원",
  "병원 의뢰",
  "주민센터",
  "기타",
] as const;

const digitsOnly = (s: string) => s.replace(/\D/g, "");

export const applicationSchema = z.object({
  childName: z
    .string()
    .trim()
    .min(1, "아이 이름을 입력해 주세요.")
    .max(30, "이름이 너무 깁니다."),

  childBirthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "생년월일을 선택해 주세요.")
    .refine((v) => {
      const d = new Date(v);
      if (Number.isNaN(d.getTime())) return false;
      const now = new Date();
      const oldest = new Date();
      oldest.setFullYear(now.getFullYear() - 25);
      return d <= now && d >= oldest;
    }, "생년월일을 다시 확인해 주세요."),

  childGender: z.enum(["male", "female", "private"]),

  guardianName: z
    .string()
    .trim()
    .min(1, "보호자 성함을 입력해 주세요.")
    .max(30, "이름이 너무 깁니다."),

  guardianPhone: z
    .string()
    .trim()
    .transform(digitsOnly)
    .refine(
      (v) => /^0\d{8,10}$/.test(v),
      "연락처를 정확히 입력해 주세요. (예: 010-1234-5678)",
    ),

  guardianRelation: z.string().trim().max(20).optional(),

  mainConcern: z
    .string()
    .trim()
    .min(5, "어떤 점이 걱정되시는지 조금만 더 적어주세요.")
    .max(1000, "1000자 이내로 적어주세요."),

  priorTherapy: z.string().trim().max(1000, "1000자 이내로 적어주세요.").optional(),

  paymentType: z.enum(["voucher", "self", "unsure"]),

  preferredDays: z.array(z.enum(["mon", "tue", "wed", "thu", "fri", "sat"])),

  preferredTime: z.enum(["morning", "afternoon", "after_school", "any"]),

  referralSource: z.string().trim().max(50).optional(),

  consentPrivacy: z
    .boolean()
    .refine((v) => v, "개인정보 수집·이용에 동의해 주세요."),
  consentSensitive: z
    .boolean()
    .refine((v) => v, "민감정보 수집·이용에 동의해 주세요."),
  consentGuardian: z
    .boolean()
    .refine((v) => v, "법정대리인 동의 항목을 확인해 주세요."),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

/** FormData → 검증 대상 객체 */
export function readApplicationForm(fd: FormData) {
  const str = (k: string) => (fd.get(k) ?? "").toString();
  const checked = (k: string) => fd.get(k) === "on" || fd.get(k) === "true";

  return {
    childName: str("childName"),
    childBirthDate: str("childBirthDate"),
    childGender: str("childGender") || "private",
    guardianName: str("guardianName"),
    guardianPhone: str("guardianPhone"),
    guardianRelation: str("guardianRelation") || undefined,
    mainConcern: str("mainConcern"),
    priorTherapy: str("priorTherapy") || undefined,
    paymentType: str("paymentType") || "unsure",
    preferredDays: fd.getAll("preferredDays").map(String),
    preferredTime: str("preferredTime") || "any",
    referralSource: str("referralSource") || undefined,
    consentPrivacy: checked("consentPrivacy"),
    consentSensitive: checked("consentSensitive"),
    consentGuardian: checked("consentGuardian"),
  };
}
