'use client';

import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';

export default function Page2() {
  return (
    <Container>
      <Header>
        <LogoArea>
          <Image src="/maskbook 로고.png" alt="logo" width={60} height={60} />
          <span>Maskbook</span>
        </LogoArea>
        <SignInBtn>sign in</SignInBtn>
      </Header>
      <Content>
        <BoardTitle>
          <Image src="/말풍선.png" alt="icon" width={50} height={50} />
          <TitleTexts>
            <SubTitle>익명 게시판</SubTitle>
            <MainTitle>집에 가고 싶다</MainTitle>
            <Writer>익명</Writer>
          </TitleTexts>
        </BoardTitle>
        <Meta>
          <MetaItem>
            <Image src="/게시 시간.png" alt="clock" width={20} height={20} />
            8분전
          </MetaItem>
          <MetaItem>
            <Image src="/조회수.png" alt="view" width={20} height={20} />
            3333
          </MetaItem>
          <MetaItem>
            <Image src="/댓글.png" alt="comment" width={20} height={20} />
            11
          </MetaItem>
          <MetaItem>
            <Image src="/좋아요.png" alt="like" width={20} height={20} />
            50
          </MetaItem>
          <Report>
            <Image src="/신고.png" alt="report" width={20} height={20} />
            신고하기
          </Report>
        </Meta>
        <Divider />
        <PostBody>
          내일 드디어 주말! ~  ٩( ᐛ )و  
          <br />
          늦잠 잘 수 있다.
        </PostBody>
        <LikeArea>
          <Image src="/좋아요.png" alt="like" width={30} height={30} />
          50
        </LikeArea>
        <Divider />
        <ListBtnArea>
          <Link href="/">
            <ListBtn>
              <Image src="/목록.png" alt="list" width={20} height={20} />
              글 목록
            </ListBtn>
          </Link>
        </ListBtnArea>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background: #f7faef;
`;

const Header = styled.header`
  width: 100vw;
  height: 80px;
  background: #f3f8e7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2vw;
`;

const LogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  font-size: 1.2rem;
`;

const SignInBtn = styled.button`
  background: #c7dbb5;
  border: none;
  border-radius: 20px;
  padding: 8px 24px;
  font-size: 1.1rem;
  color: #333;
  cursor: pointer;
`;

const Content = styled.div`
  max-width: 900px;
  margin: 40px auto 0 auto;
  background: #fff;
  border-radius: 16px;
  padding: 40px 32px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;

const BoardTitle = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const TitleTexts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SubTitle = styled.div`
  font-size: 1.1rem;
  color: #222;
`;

const MainTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 4px;
`;

const Writer = styled.div`
  font-size: 1rem;
  color: #888;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin: 18px 0 10px 0;
  font-size: 1.1rem;
  color: #222;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Report = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 1rem;
  color: #222;
  cursor: pointer;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #bbb;
  margin: 18px 0;
`;

const PostBody = styled.div`
  font-size: 1.2rem;
  color: #222;
  margin-bottom: 40px;
`;

const LikeArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.2rem;
  color: #222;
  margin-bottom: 40px;
`;

const ListBtnArea = styled.div`
  display: flex;
  justify-content: center;
  margin: 32px 0 0 0;
`;

const ListBtn = styled.button`
  background: #b8d3b0;
  border: none;
  border-radius: 24px;
  padding: 12px 36px;
  font-size: 1.2rem;
  color: #222;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

// styled-components 생략 (아래 참고)