import type { Metadata } from "next";
import ApplyForm from "@/components/ApplyForm";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "상담 신청",
  description:
    "언어 상담 및 수업 신청. 신청서를 남겨주시면 영업일 기준 1–2일 안에 연락드립니다.",
  robots: { index: true, follow: true },
};

export default function Apply() {
  return (
    <>
      <PageHeader
        eyebrow="상담 신청"
        title={
          <>
            먼저 이야기를
            <br />
            들려주세요
          </>
        }
        lead="적어주신 내용은 상담 전에 미리 읽어봅니다. 그래야 만나서 같은 이야기를 두 번 하지 않으셔도 됩니다."
      />
      <ApplyForm />
    </>
  );
}
