import { Link } from "react-router-dom";
import styled from "styled-components";

export const PostTitleListItem = styled.h2<any>`
  font-size: 1.8rem;
  line-height: 1;
  font-weight: 700;
  margin-top: 1.5rem;
  margin-bottom: 0.3rem;

  @media (max-width: 767px) {
    margin-top: 3rem;
    font-size: 1.8rem;
  }
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
`;

export const SiteLogo = styled.div`
  img {
    margin-top: 2rem;
    max-width: 10rem;
    margin-bottom: 2rem;
    max-height: 80px;
  }

  @media screen and (max-width: 800px) {
    img {
      position: relative;
      top: 8px;
      margin-top: 0;
      max-height: 60px;
      margin-bottom: 60px;
    }
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

export const StyledReadMore = styled(Link)`
  letter-spacing: 1px;
  font-weight: bold;
`;
