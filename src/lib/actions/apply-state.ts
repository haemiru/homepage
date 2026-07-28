/** 신청 폼의 서버 액션 상태 — "use server" 파일은 함수만 export 할 수 있어 분리합니다. */
export type ApplyState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
};

export const initialApplyState: ApplyState = { status: "idle" };
