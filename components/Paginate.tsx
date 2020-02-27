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
    <Wrapper className="pagination-wrapper">
      <ul className="pagination">{pageItems}</ul>
    </Wrapper>
  );
};
export default Paginate;

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
