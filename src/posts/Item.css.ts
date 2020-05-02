import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.article`
  position: relative;
  line-height: 1.8;
  display: flex;
  max-width: 60rem;
  margin: auto;
  margin-bottom: 40px;
  border-top: none;
  background: rgba(var(--bg-list-article), 1);
  font-size: 0.9rem;
  @media screen and (max-width: 1250px) {
    flex-direction: column-reverse;
  }
  @media screen and (max-width: 800px) {
    margin: 0 -20px 40px -20px;
  }
  .post-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid rgba(var(--bg-list-article), 1);
    /* box-shadow: -1px -1px 22px 1px rgba(var(--bg-article-item)); */
    padding: 0 20px;
    footer {
      display: flex;
      align-items: flex-end;
    }
    @media screen and (max-width: 800px) {
      border: none;
    }

    a {
      color: rgba(var(--color-accent));
      &.post-link {
        color: var(--color-base);
        &:hover {
          color: rgba(var(--color-accent));
        }
        font-size: 1.6rem;
        line-height: 1.6;
      }
    }
  }
  .post-image-box {
    flex: 0 0 30rem;
    overflow: hidden;
    a {
      opacity: 0.9;
      &:hover {
        opacity: 1;
      }
      img {
        width: 100%;
        height: 300px;
        transition: 0.3s transform linear;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
    @media screen and (max-width: 1250px) {
      overflow: visible;
      flex: 0;
      a img {
        object-fit: cover;
        object-position: bottom;
        &:hover {
          transform: scale(1);
        }
      }
    }
  }
  a {
    &:focus,
    &:hover {
      color: rgba(var(--color-accent));
    }
  }
  + .post-entry {
    border-color: var(--color-border);
  }
  .post-title {
    margin-top: 24px;
  }
  .post-cover {
    position: absolute;
    top: 4.6rem;
    right: 0;
    width: 8rem;
    height: 8rem;
    object-fit: cover;
    font-family: "object-fit: cover;";
    border-radius: 3px;
    + .post-summary {
      padding-right: 9rem;
    }
    @media screen and (max-width: 800px) {
      position: static;
      width: 100vw;
      height: 56.25vw;
      border-radius: 0;
      margin: 0 -1rem;
      + .post-summary {
        padding-right: 0;
      }
    }
  }
  .post-summary {
    margin-top: 1rem;
    margin-bottom: 1rem;
    text-align: left;
    @media screen and (max-width: 767px) {
      font-size: 1.2rem;
      line-height: 1.5;
    }
  }
  .post-footer {
    margin-top: 1rem;
    margin-bottom: 1.5rem;

    a {
      font-weight: 500;
    }
  }
`;
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

export const StyledReadMore = styled(Link)`
  font-weight: bold;
`;
