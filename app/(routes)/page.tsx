'use client';

import { Post } from '@/lib/generated/prisma';
import Image from 'next/image';
import styled, { createGlobalStyle } from 'styled-components';
import useSWR from 'swr';
import { LdsSpinner } from '../_components/loading-spinner';
import Frame from '../_components/frame';
import Link from 'next/link';

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

interface Postresponse {
  ok: boolean;
  postList: Post[];
}

export default function Home() {
  const { data, error, isLoading } = useSWR<Postresponse>('/api/post');

  return (
    <>
      <GlobalStyle />
      <Frame>
        <Main>
          <LeftArea>
            <SearchGuide>
              <SearchIcon>
                <Image src="/검색아이콘.png" alt="검색" width={57} height={57} />
              </SearchIcon>
              <SearchInput placeholder="관심있는 내용을 검색해보세요." />
            </SearchGuide>
            <BestSection>
              <BestHeader>
                <BestIcon>
                  <Image src="/베스트 아이콘.png" alt="베스트" width={59} height={59} />
                </BestIcon>
                <BestText>Best</BestText>
              </BestHeader>
              <BestDivider />
              <BestList>
                {isLoading && (
                  <SpinnerWrapper>
                    <LdsSpinner />
                  </SpinnerWrapper>
                )}
                {error && <div>에러가 발생했습니다.</div>}
                {data?.postList?.map((post, idx) => (
                  <div key={post.id}>
                    <Link
                      href={`/${post.id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <BestItem>
                        <BestContentBox>
                          <BestContent>{post.title}</BestContent>
                          <BestMeta>
                            <MetaItem>
                              <MetaIcon>
                                <Image src="/게시 시간.png" alt="날짜" width={18} height={18} />
                              </MetaIcon>
                              <MetaText>
                                {formatDate((post as any).createdAt ?? (post as any).date)}
                              </MetaText>
                            </MetaItem>
                          </BestMeta>
                        </BestContentBox>
                        <BestCount>
                          <Image src="/하트.png" alt="좋아요" width={20} height={20} style={{ marginRight: 4 }} />
                          {(post as any).likeCount ?? (post as any).likecount}
                        </BestCount>
                      </BestItem>
                    </Link>
                    {data.postList && idx !== data.postList.length - 1 && <BestDivider />}
                  </div>
                ))}
              </BestList>
            </BestSection>
          </LeftArea>
          <RightArea>
            <AdBox>
              <Image src="/ad.png" alt="광고" fill style={{ objectFit: 'cover', borderRadius: '16px' }} />
            </AdBox>
          </RightArea>
        </Main>
      </Frame>
    </>
  );
}

const Main = styled.main`
  width: 100vw;
  flex: 1;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4vw;
  box-sizing: border-box;
  padding: 40px 2vw 0 2vw;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    gap: 1vw;
  }
`;

const LeftArea = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 4vw;
`;

const SearchGuide = styled.div`
  width: 100%;
  min-width: 300px;
  max-width: 855px;
  height: 95px;
  background: #fff;
  border: 1px solid #000;
  box-shadow: 0px 4px 4px rgba(0,0,0,0.25);
  border-radius: 200px;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 40px;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 30px;
  top: 19px;
  width: 57px;
  height: 57px;
  border-radius: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.input`
  margin-left: 100px;
  width: 70%;
  min-width: 150px;
  height: 60px;
  border: none;
  outline: none;
  font-size: 32px;
  background: transparent;
  color: #000;
`;

const BestSection = styled.section`
  width: 100%;
  max-width: 906px;
  background: transparent;
  margin-top: 20px;
`;

const BestHeader = styled.div`
  display: flex;
  align-items: center;
  height: 93px;
`;

const BestIcon = styled.div`
  width: 59px;
  height: 59px;
  margin-right: 12px;
`;

const BestText = styled.div`
  font-size: 32px;
  font-weight: 400;
  color: #000;
  line-height: 39px;
`;

const BestDivider = styled.div`
  width: 100%;
  height: 0px;
  border: 1px solid #000;
  margin: 8px 0;
  transform: rotate(0.27deg);
`;

const BestList = styled.div`
  margin-top: 10px;
`;

const BestItem = styled.div`
  display: flex;
  align-items: center;
  height: 61px;
  margin-bottom: 10px;
  justify-content: space-between;
`;

const BestContentBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const BestContent = styled.div`
  font-size: 26px;
  color: #000;
  font-weight: 400;
  line-height: 31px;
`;

const BestMeta = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
`;

const MetaIcon = styled.span`
  display: flex;
  align-items: center;
  margin-right: 4px;
`;

const MetaText = styled.span`
  font-size: 16px;
  color: #888;
`;

const BestCount = styled.div`
  min-width: 60px;
  font-size: 22px;
  color: #e74c3c;
  font-weight: 500;
  line-height: 31px;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
`;

const RightArea = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  min-width: 347px;
`;

const AdBox = styled.div`
  width: 347px;
  height: 674px;
  background: #eee;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;