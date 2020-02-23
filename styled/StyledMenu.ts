import styled from "styled-components";

export default styled.nav`
  text-transform: capitalize;
  .menu-list {
    list-style: none;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "PingFang SC",
      "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei",
      "Helvetica Neue", sans-serif;
    @media screen and (min-width: 800px) {
      text-align: left;
      padding-left: 24px;
      font-size: 0.8rem;
    }
  }
  .menu-item {
    padding: 0.7rem 0;
    a {
      display: inline-block;
      height: 1.5rem;
      line-height: 1.5;
      text-decoration: none;
    }
  }

  @media screen and (max-width: 800px) {
    overflow-y: hidden;
    max-height: 1000px;
    transition: max-height ease-out 0.5s;
    &.collapsed {
      max-height: 0;
    }
  }
`;
