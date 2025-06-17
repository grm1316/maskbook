'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';


interface FrameProps {
  children: React.ReactNode;
}

export default function Frame({ children }: FrameProps) {
  return (
    <Container>
      <TopBar>
        <Logo>
          <Link href="/" passHref>
            <Image src="/maskbook 로고.png" alt="로고" width={100} height={104} priority style={{ cursor: 'pointer' }} />
          </Link>
        </Logo>
        <SignInWrapper>
          <Link href="/sign-up" passHref>
            <SignIn>Sign In</SignIn>
          </Link>
        </SignInWrapper>
      </TopBar>
      {children}
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #fff;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
`;

const TopBar = styled.header`
  width: 100vw;
  height: 104px;
  background: rgba(231, 239, 199, 0.4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 0 2vw;
  box-sizing: border-box;
`;

const Logo = styled.div`
  width: 89px;
  height: 104px;
  display: flex;
  align-items: center;
`;

const SignInWrapper = styled.div`
  width: 130px;
  height: 69px;
  background: #AEC8A4;
  border-radius: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignIn = styled.button`
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  color: #000;
  cursor: pointer;
  border-radius: 200px;
`;