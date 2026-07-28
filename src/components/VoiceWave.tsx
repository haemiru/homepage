/**
 * 목소리 파형 — 말과 호흡을 시각화한 모티프.
 * CSS 애니메이션만 사용하며, prefers-reduced-motion 에서 자동으로 멈춥니다.
 */

// 파형이 자연스럽게 보이도록 손으로 고른 높이값
const BARS = [
  22, 38, 30, 56, 44, 78, 62, 96, 70, 100, 84, 66, 92, 54, 74, 40, 60, 34, 48,
  26, 36, 20, 28, 16,
];

export default function VoiceWave({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`flex h-16 items-end gap-[5px] ${className}`}
    >
      {BARS.map((h, i) => (
        <span
          key={i}
          className="w-[3px] origin-bottom rounded-full bg-persimmon"
          style={{
            height: `${h}%`,
            animation: "breathe 2.8s ease-in-out infinite",
            animationDelay: `${i * 0.085}s`,
          }}
        />
      ))}
    </div>
  );
}
