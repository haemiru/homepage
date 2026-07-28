import type { Metadata } from "next";
import { site } from "@/lib/site";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  robots: { index: false, follow: true },
};

const sections: { h: string; body: React.ReactNode }[] = [
  {
    h: "제1조 (개인정보의 처리 목적)",
    body: (
      <>
        <p>
          {site.name}(이하 &lsquo;센터&rsquo;)는 다음의 목적을 위하여 개인정보를
          처리합니다. 처리한 개인정보는 다음의 목적 이외의 용도로는 이용되지
          않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한
          조치를 이행합니다.
        </p>
        <ul>
          <li>상담 및 수업 신청 접수, 본인 확인, 예약 안내</li>
          <li>언어 평가 및 치료 서비스 제공, 회기 일정 관리</li>
          <li>보호자 대상 치료 경과 안내 및 상담</li>
          <li>수업료 수납 및 영수증 발급, 발달재활서비스 바우처 청구</li>
          <li>민원 처리 및 분쟁 대응</li>
        </ul>
      </>
    ),
  },
  {
    h: "제2조 (처리하는 개인정보의 항목)",
    body: (
      <>
        <p>센터는 다음의 개인정보 항목을 처리하고 있습니다.</p>
        <p className="font-medium text-ink">① 상담 신청 시 (필수)</p>
        <ul>
          <li>아동: 성명, 생년월일, 성별</li>
          <li>보호자: 성명, 연락처, 아동과의 관계</li>
        </ul>
        <p className="font-medium text-ink">② 민감정보 (별도 동의)</p>
        <ul>
          <li>아동의 발달 상태 및 주 호소 문제</li>
          <li>이전 치료·검사 이력, 진단 정보</li>
          <li>언어 평가 결과 및 치료 경과 기록</li>
        </ul>
        <p className="font-medium text-ink">③ 서비스 이용 과정에서 생성되는 정보</p>
        <ul>
          <li>수업 일정, 출결 및 회기 기록, 수납 내역</li>
          <li>바우처 이용자의 경우 바우처 번호 및 지원 내역</li>
        </ul>
      </>
    ),
  },
  {
    h: "제3조 (개인정보의 처리 및 보유 기간)",
    body: (
      <>
        <p>
          센터는 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터
          개인정보를 수집 시에 동의받은 보유·이용 기간 내에서 개인정보를
          처리·보유합니다.
        </p>
        <ul>
          <li>상담 신청 후 미등록: 상담 종료일로부터 1년</li>
          <li>등록 아동: 서비스 종결일로부터 3년</li>
          <li>수납·정산 기록: 관련 법령에 따라 5년</li>
        </ul>
      </>
    ),
  },
  {
    h: "제4조 (개인정보의 제3자 제공)",
    body: (
      <>
        <p>
          센터는 정보주체의 개인정보를 제1조에 명시한 범위 내에서만 처리하며,
          정보주체의 동의, 법률의 특별한 규정 등에 해당하는 경우에만 제3자에게
          제공합니다.
        </p>
        <ul>
          <li>
            발달재활서비스 바우처 이용자에 한하여, 바우처 청구·정산을 위해
            사회보장정보원 및 관할 지방자치단체에 필요한 최소한의 정보를
            제공합니다.
          </li>
        </ul>
      </>
    ),
  },
  {
    h: "제5조 (개인정보 처리의 위탁)",
    body: (
      <>
        <p>
          센터는 원활한 서비스 제공을 위해 다음과 같이 개인정보 처리 업무를
          위탁하고 있습니다.
        </p>
        <ul>
          <li>
            수탁자: Supabase Inc. / 위탁 업무: 신청 정보의 저장 및 관리 (데이터
            보관 위치는 센터가 선택한 리전을 따릅니다)
          </li>
          <li>수탁자: Vercel Inc. / 위탁 업무: 홈페이지 운영 및 호스팅</li>
        </ul>
        <p>
          센터는 위탁계약 체결 시 개인정보가 안전하게 관리될 수 있도록 필요한
          사항을 규정하고 있으며, 위탁업무 내용이 변경될 경우 본 방침을 통해
          공개합니다.
        </p>
      </>
    ),
  },
  {
    h: "제6조 (정보주체와 법정대리인의 권리·의무 및 행사 방법)",
    body: (
      <>
        <p>
          정보주체는 언제든지 다음의 권리를 행사할 수 있습니다. 만 14세 미만
          아동의 경우 법정대리인이 아동의 권리를 대리하여 행사할 수 있습니다.
        </p>
        <ul>
          <li>개인정보 열람 요구</li>
          <li>오류 등이 있을 경우 정정 요구</li>
          <li>삭제 요구</li>
          <li>처리정지 요구</li>
        </ul>
        <p>
          권리 행사는 센터에 서면, 전화, 전자우편을 통하여 하실 수 있으며 센터는
          이에 대해 지체 없이 조치하겠습니다.
        </p>
      </>
    ),
  },
  {
    h: "제7조 (개인정보의 파기)",
    body: (
      <>
        <p>
          센터는 보유 기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게
          되었을 때에는 지체 없이 해당 개인정보를 파기합니다.
        </p>
        <ul>
          <li>전자적 파일: 복구가 불가능한 방법으로 영구 삭제</li>
          <li>종이 문서: 분쇄하거나 소각</li>
        </ul>
      </>
    ),
  },
  {
    h: "제8조 (개인정보의 안전성 확보 조치)",
    body: (
      <ul>
        <li>개인정보 취급 직원의 최소화 및 교육</li>
        <li>개인정보처리시스템 접근 권한의 제한 및 관리</li>
        <li>개인정보의 암호화 저장 및 전송 구간 암호화(HTTPS)</li>
        <li>접속 기록의 보관 및 위·변조 방지</li>
        <li>치료 기록 등 문서의 잠금장치가 있는 장소 보관</li>
      </ul>
    ),
  },
  {
    h: "제9조 (개인정보 자동 수집 장치의 설치·운영 및 거부)",
    body: (
      <p>
        센터의 홈페이지는 이용자를 식별하기 위한 쿠키를 사용하지 않습니다. 다만
        관리자 로그인 시에는 로그인 상태 유지를 위한 필수 쿠키가 사용됩니다.
      </p>
    ),
  },
  {
    h: "제10조 (개인정보 보호책임자)",
    body: (
      <>
        <p>
          센터는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와
          관련한 정보주체의 불만처리 및 피해구제를 위하여 아래와 같이 개인정보
          보호책임자를 지정하고 있습니다.
        </p>
        <ul>
          <li>성명: {site.privacyOfficer.name}</li>
          <li>연락처: {site.privacyOfficer.phone}</li>
          <li>이메일: {site.privacyOfficer.email}</li>
        </ul>
      </>
    ),
  },
  {
    h: "제11조 (권익침해 구제 방법)",
    body: (
      <>
        <p>
          정보주체는 개인정보 침해로 인한 구제를 받기 위하여 아래 기관에 분쟁
          해결이나 상담 등을 신청할 수 있습니다.
        </p>
        <ul>
          <li>개인정보분쟁조정위원회: 1833-6972 (www.kopico.go.kr)</li>
          <li>개인정보침해신고센터: 118 (privacy.kisa.or.kr)</li>
          <li>대검찰청 사이버수사과: 1301 (www.spo.go.kr)</li>
          <li>경찰청 사이버수사국: 182 (ecrm.police.go.kr)</li>
        </ul>
      </>
    ),
  },
  {
    h: "제12조 (개인정보처리방침의 변경)",
    body: (
      <p>
        본 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경
        내용의 추가·삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터
        홈페이지를 통하여 고지할 것입니다.
      </p>
    ),
  },
];

export default function Privacy() {
  return (
    <>
      <PageHeader
        eyebrow="법적 고지"
        title="개인정보처리방침"
        lead={`${site.name}은 정보주체의 개인정보를 중요시하며, 개인정보보호법을 준수하고 있습니다.`}
      />

      <article className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        {sections.map((s) => (
          <section key={s.h} className="mb-14">
            <h2 className="border-b border-line pb-4 font-display text-[1.3rem] leading-snug">
              {s.h}
            </h2>
            <div className="mt-6 space-y-4 text-[0.95rem] leading-[1.95] text-ink-soft [&_li]:relative [&_li]:pl-5 [&_ul]:space-y-2 [&_li]:before:absolute [&_li]:before:top-[0.85em] [&_li]:before:left-0 [&_li]:before:h-px [&_li]:before:w-2.5 [&_li]:before:bg-persimmon">
              {s.body}
            </div>
          </section>
        ))}

        <p className="border-t border-line pt-8 text-[0.85rem] text-ink-faint">
          공고일자: 시행 전 · 시행일자: 홈페이지 공개일
          <br />
          실제 운영 전에 센터 상황(위탁업체, 보유기간, 바우처 취급 여부)에 맞게
          내용을 확인해 주세요.
        </p>
      </article>
    </>
  );
}
