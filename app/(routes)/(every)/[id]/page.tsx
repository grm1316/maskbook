'use client';

import { useParams } from 'next/navigation';
import useSWR from 'swr';
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  content?: string;
  createdAt?: string;
  likecount?: number;
  views?: number;
  comments?: number;
}

interface PostDetailResponse {
  ok: boolean;
  post: Post | null;
}

const formatDate = (rawDate: string | Date) => {
  if (!rawDate) return '';
  const dObj = new Date(rawDate);
  const yy = dObj.getFullYear().toString().slice(2);
  const mm = String(dObj.getMonth() + 1).padStart(2, '0');
  const dd = String(dObj.getDate()).padStart(2, '0');
  return `${yy}.${mm}.${dd}`;
};

export default function PostDetail() {
  const params = useParams();
  const id = params?.id;
  const { data, error, isLoading } = useSWR<PostDetailResponse>(
    id ? `/api/post/${id}` : null
  );

  if (isLoading) {
    return <Centered>로딩 중...</Centered>;
  }
  if (error) {
    return <Centered>에러가 발생했습니다.</Centered>;
  }
  if (!data?.post) {
    return <Centered>게시글을 찾을 수 없습니다.</Centered>;
  }

  const post = data.post;

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
          <Image src="/댓글.png" alt="icon" width={50} height={50} />
          <TitleTexts>
            <SubTitle>익명 게시판</SubTitle>
            <MainTitle>{post.title}</MainTitle>
            <Writer>익명</Writer>
          </TitleTexts>
        </BoardTitle>
        <Meta>
          <MetaItem>
            <Image src="/게시 시간.png" alt="clock" width={20} height={20} />
            {formatDate(post.createdAt ?? '')}
          </MetaItem>
          <MetaItem>
              <Image src="/베스트 아이콘.png" alt="like" width={20} height={20} />
              {post.likecount ?? 0}
              <Image src="/조회수.png" alt="view" width={20} height={20} />
              {post.views ?? 0}
              <Image src="/댓글.png" alt="comment" width={20} height={20} />
              {post.comments ?? 0}
          </MetaItem>
          <Report>
            <Image src="/신고하기.png" alt="report" width={20} height={20} />
            신고하기
          </Report>
        </Meta>
        <Divider />
        <PostBody>
          {post.content || '내용이 없습니다.'}
        </PostBody>
        <LikeArea>
          <Image src="/베스트 아이콘.png" alt="like" width={30} height={30} />
          {post.likecount ?? 0}
        </LikeArea>
        <Divider />
        <ListBtnArea>
          <Link href="/">
            <ListBtn>
              <Image src="/글 목록.png" alt="list" width={20} height={20} />
              글 목록
            </ListBtn>
          </Link>
        </ListBtnArea>
      </Content>
    </Container>
  );
}

const Centered = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
`;

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