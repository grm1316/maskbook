'use client';

import { useParams } from 'next/navigation';
import useSWR from 'swr';
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';
import Frame from '../../../_components/frame';

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
    <Frame>
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
    </Frame>
  );
}

const Centered = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
`;

const Content = styled.div`
  max-width: 900px;
  width: 90%;
  margin: 40px auto 0 auto;
  background: #fff;
  border-radius: 16px;
  padding: 40px 32px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  box-sizing: border-box;
`;

const BoardTitle = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  flex-wrap: wrap;
`;

const TitleTexts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 200px;
`;

const SubTitle = styled.div`
  font-size: 1.1rem;
  color: #222;
`;

const MainTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 4px;
  word-break: break-word;
  overflow-wrap: break-word;
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
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
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
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
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

  @media (max-width: 768px) {
    padding: 10px 24px;
    font-size: 1rem;
  }
`;