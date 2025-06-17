'use client';

import Frame from '../../../_components/frame';
import styled from 'styled-components';

export default function TermsPage() {
  return (
    <Frame>
      <TermsContainer>
        <Title>이용 약관</Title>
        <Section>
          <SectionTitle>제1조(목적)</SectionTitle>
          <SectionContent>
            본 약관은 Maskbook(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
          </SectionContent>
        </Section>
        <Section>
          <SectionTitle>제2조(정의)</SectionTitle>
          <SectionContent>
            1. "이용자"란 본 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.<br />
            2. "회원"이란 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며, 회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
          </SectionContent>
        </Section>
        <Section>
          <SectionTitle>제3조(약관의 효력 및 변경)</SectionTitle>
          <SectionContent>
            1. 본 약관은 서비스를 이용하고자 하는 모든 이용자에 대하여 그 효력을 발생합니다.<br />
            2. 회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있습니다.<br />
            3. 변경된 약관은 서비스 내 공지 또는 이메일 등으로 이용자에게 공지함으로써 효력이 발생합니다.
          </SectionContent>
        </Section>
        <Section>
          <SectionTitle>제4조(개인정보 보호)</SectionTitle>
          <SectionContent>
            회사는 이용자의 개인정보를 보호하기 위하여 노력하며, 관련 법령이 정하는 바에 따라 개인정보를 보호합니다.
          </SectionContent>
        </Section>
        <Section>
          <SectionTitle>제5조(서비스의 제공 및 변경)</SectionTitle>
          <SectionContent>
            1. 회사는 다음과 같은 서비스를 제공합니다.<br />
            - 게시판 서비스<br />
            - 기타 회사가 정하는 서비스<br />
            2. 회사는 서비스의 내용, 이용방법, 이용시간 등을 변경할 수 있으며, 변경사항은 서비스 내 공지합니다.
          </SectionContent>
        </Section>
        <Section>
          <SectionTitle>제6조(회원의 의무)</SectionTitle>
          <SectionContent>
            1. 회원은 본 약관 및 관계 법령을 준수하여야 하며, 회사의 업무를 방해하는 행위를 하여서는 안 됩니다.<br />
            2. 회원은 자신의 계정 정보를 타인에게 제공하거나 공유해서는 안 됩니다.
          </SectionContent>
        </Section>
        <Section>
          <SectionTitle>제7조(면책조항)</SectionTitle>
          <SectionContent>
            회사는 천재지변, 불가항력적 사유로 인한 서비스 제공의 장애에 대하여 책임을 지지 않습니다.
          </SectionContent>
        </Section>
        <Section>
          <SectionTitle>제8조(기타)</SectionTitle>
          <SectionContent>
            본 약관에 명시되지 않은 사항은 관계법령 및 회사의 정책에 따릅니다.
          </SectionContent>
        </Section>
        <Section>
          <SectionTitle>부칙</SectionTitle>
          <SectionContent>
            본 약관은 2025년 6월 17일부터 시행합니다.
          </SectionContent>
        </Section>
      </TermsContainer>
    </Frame>
  );
}

const TermsContainer = styled.div`
  max-width: 700px;
  margin: 60px auto 40px auto;
  background: #fcffdc;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  padding: 40px 32px;
  font-family: 'Inter', sans-serif;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 32px;
  text-align: center;
  color: #222;
`;

const Section = styled.section`
  margin-bottom: 28px;
`;

const SectionTitle = styled.h2`
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
`;

const SectionContent = styled.div`
  font-size: 1rem;
  color: #444;
  line-height: 1.7;
  white-space: pre-line;
`;