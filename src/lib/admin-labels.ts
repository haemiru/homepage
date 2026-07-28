export const STATUS_OPTIONS = [
  { value: "new", label: "접수됨", tone: "accent" },
  { value: "contacted", label: "연락 완료", tone: "plain" },
  { value: "scheduled", label: "상담 확정", tone: "plain" },
  { value: "enrolled", label: "등록 완료", tone: "good" },
  { value: "waiting", label: "대기 명단", tone: "plain" },
  { value: "on_hold", label: "보류", tone: "muted" },
  { value: "closed", label: "종료", tone: "muted" },
] as const;

export const STATUS_LABEL: Record<string, string> = Object.fromEntries(
  STATUS_OPTIONS.map((s) => [s.value, s.label]),
);

export const PAYMENT_LABEL: Record<string, string> = {
  voucher: "바우처",
  self: "자부담",
  unsure: "미정",
};

export const TIME_LABEL: Record<string, string> = {
  morning: "오전",
  afternoon: "오후",
  after_school: "하원 후",
  any: "조율 가능",
};

export const DAY_LABEL: Record<string, string> = {
  mon: "월",
  tue: "화",
  wed: "수",
  thu: "목",
  fri: "금",
  sat: "토",
};

export const GENDER_LABEL: Record<string, string> = {
  male: "남아",
  female: "여아",
  private: "-",
};

/** 생년월일 → "만 3세 4개월" */
export function formatAge(birthDate: string): string {
  const b = new Date(birthDate);
  const now = new Date();
  let months =
    (now.getFullYear() - b.getFullYear()) * 12 + (now.getMonth() - b.getMonth());
  if (now.getDate() < b.getDate()) months -= 1;
  if (months < 0) return "-";
  const y = Math.floor(months / 12);
  const m = months % 12;
  return y === 0 ? `${m}개월` : `만 ${y}세 ${m}개월`;
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function formatPhone(digits: string): string {
  if (digits.length === 11) return digits.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  if (digits.length === 10) return digits.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  return digits;
}
