import { Post } from "../../../../../../__generated__/gqlTypes";
import React from "react";
import styled from "styled-components";

interface IProps {
  post: Post;
}
const Author: React.FC<IProps> = ({ post }) => {
  return (
    <Container className="author-info">
      <div className="author-avatar">
        {post.author.avatar && <img src={post.author.avatar} />}
      </div>
      <div className="author-details">
        <div className="author-name">{post.author.name}</div>
        <div className="author-bio">{post.author.bio}</div>
      </div>
    </Container>
  );
};
export default Author;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  margin: 40px 0px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  .author-avatar {
    padding: 16px 0;
    img {
      width: 65px;
      object-fit: cover;
      height: 64px;
      border-radius: 50%;
    }
  }
  .author-details {
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    .author-name {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .author-bio {
      font-size: 1.2rem;
      line-height: 1.3;
      opacity: 0.7;
      &:hover {
        opacity: 1;
      }
    }
  }
`;
