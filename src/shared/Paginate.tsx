import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

const Paginate = ({ count, limit, page, changePage }: any) => {
  const pages = Array.from(Array(Math.floor(count / limit)));
  if (pages.length === 1) return null;
  const pageItems = pages.map((_, i) => {
    const num = i + 1;
    const active = num === page ? "active" : "";
    return (
      <li key={i}>
        <Link className={active} onClick={e => changePage(e, num)} to="#">
          {num}
        </Link>
      </li>
    );
  });
  return (
    <Container className="pagination-wrapper">
      <Wrapper className="pagination-wrapper">
        <ul className="pagination">{pageItems}</ul>
      </Wrapper>
    </Container>
  );
};
export default Paginate;

const Container = styled.div`
  text-align: center;
  margin-top: 80px;
  margin-bottom: 80px;
  ul.pagination {
    display: inline-block;
    padding: 0;
    margin: 0;
    li {
      display: inline;
      &:first-child a {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
      &:last-child a {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
      a {
        float: left;
        padding: 2px 12px;
        text-decoration: none;
        transition: background-color 0.3s;
        border: 1px solid rgba(var(--color-accent));
        color: var(--color-base);

        &.active {
          background: rgba(var(--color-accent), 0.8);
          border-color: rgba(var(--color-accent));
          color: var(--color-base);
          font-weight: 500;
        }
        &:hover:not(.active) {
          background: rgba(var(--color-accent), 0.8);
          border-color: rgba(var(--color-accent));
          color: var(--color-base);
        }
      }
      &:not(:first-child) a {
        border-left: none;
      }
    }
  }
`;

const Wrapper = styled.div`
  text-align: center;
  ul {
    display: inline-block;
    padding: 0;
    margin: 28px 0;

    li {
      display: inline;
      a {
        border-right: 1px solid var(--color-border);
        background: var(--bg-sections);
        padding: 8px 14px;
        font-weight: 400;
        &.active,
        &:hover {
          background: var(--color-accent);
          color: #fff;
        }
      }
      &:first-child a {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
      &:last-child a {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border-right: none;
      }
    }
  }
`;
