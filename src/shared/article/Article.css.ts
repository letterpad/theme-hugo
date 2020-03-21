import styled from "styled-components";

export const Container = styled.div`
  max-width: 768px;
  width: 100%;
  margin: auto;
`;

export const PostTitle = styled.h2<any>`
  font-size: 2rem;
  line-height: 1.2;
  font-weight: 700;
  margin-top: 1.5rem;
  margin-bottom: 0.3rem;

  @media (max-width: 767px) {
    margin-top: 3rem;
    font-size: 1.8rem;
  }
`;

export const PostMeta = styled.h2`
  font-size: 0.8rem;
  letter-spacing: 1px;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  font-weight: 500;

  .featured-tag {
    color: rgba(var(--color-accent));
  }
`;

export const StyledTags = styled.div`
  display: inline;
  a {
    color: rgba(var(--color-accent));
    margin-right: 8px;

    &:after {
      content: ",";
    }
    &:last-child:after {
      content: "";
    }
  }
`;
