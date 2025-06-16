'use client';

import { Post } from '@/lib/generated/prisma';
import Image from 'next/image';
import styled, { createGlobalStyle } from 'styled-components';
import useSWR from 'swr';
import { LdsSpinner } from '../../../_components/loading-spinner'; 
import { useParams } from 'next/navigation';

// 날짜 포맷 함수
const formatDate = (rawDate: string | Date) => {
  if (!rawDate) return '';
  const dObj = new Date(rawDate);
  const yy = dObj.getFullYear().toString().slice(2);
  const mm = String(dObj.getMonth() + 1).padStart(2, '0');
  const dd = String(dObj.getDate()).padStart(2, '0');
  return `${yy}.${mm}.${dd}`;
};

const GlobalStyle = createGlobalStyle`
  html, body, #__next {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow-x: hidden;
  }
`;

interface PostDetailResponse {
  ok: boolean;
  post: Post | null;
}

export default function PostDetail() {
  const params = useParams();
  const id = Number(params.id);

  // 개별 게시글 API 호출 (예: /api/post/3)
  const { data, error, isLoading } = useSWR<PostDetailResponse>(
    id ? `/api/post/${id}` : null
  );

  return (
    <>
      <GlobalStyle />
      <Container>
        <TopBar>
          <Logo>
            <Image src="/maskbook 로고.png" alt="로고" width={89} height={104} priority />
          </Logo>
          <SignInWrapper>
            <SignIn>Sign In</SignIn>
          </SignInWrapper>
        </TopBar>
        <Main>
          {isLoading && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
              <LdsSpinner />
            </div>
          )}
          {error && <div>에러가 발생했습니다.</div>}
          {!isLoading && !error && data?.post && (
            <DetailBox>
              <Title>{data.post.title}</Title>
              <Meta>
                <MetaItem>
                  <Image src="/게시 시간.png" alt="날짜" width={18} height={18} />
                  <MetaText>{formatDate((data.post as any).createdAt ?? (data.post as any).date)}</MetaText>
                </MetaItem>
                <MetaItem>
                  <Image src="/하트.png" alt="좋아요" width={18} height={18} />
                  <MetaText>{(data.post as any).likeCount ?? (data.post as any).likecount}</MetaText>
                </MetaItem>
              </Meta>        
            </DetailBox>
          )}
          {!isLoading && !error && !data?.post && (
            <div>게시글을 찾을 수 없습니다.</div>
          )}
        </Main>
      </Container>
    </>
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

const Main = styled.main`
  width: 100vw;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 2vw 0 2vw;
`;

const DetailBox = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  background: #fff;
  border-radius: 16px;
  padding: 40px 32px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 24px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const MetaText = styled.span`
  font-size: 1rem;
  color: #888;
`;
