import styled from "styled-components";

export const Container = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 16rem;
  padding: 1rem;
  box-sizing: border-box;
  text-align: center;
  background: rgba(13, 15, 21, 1);

  button.menu-toggle {
    color: #fff;
    cursor: pointer;
  }
  a {
    color: var(--color-menu-link);
    text-decoration: none;
    &.is-active {
      opacity: 1;
      color: rgba(var(--color-accent));
      font-weight: 700;
    }
    opacity: 0.6;
    &:focus,
    &:hover {
      opacity: 1;
      color: rgba(var(--color-accent));
    }
  }
  .title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 1rem auto;
    color: var(--base-shade-1);
    margin-bottom: 0px;
  }
  .subtitle {
    margin-bottom: 3rem;
    margin-top: 10px;
    opacity: 0.9;
    color: var(--base-shade-3);
  }
  @media screen and (max-width: 800px) {
    width: 100%;
    position: relative;
    .title,
    .subtitle {
      display: block;
    }
    .title {
      margin-top: 3rem;
      display: block;
    }
  }

  .search-box {
    margin-bottom: 40px;
    input.form-control {
      color: #fff;
      border: none;
      border-bottom: 1px solid #333;
      background: transparent;
      color: var(--color-base);
      padding: 6px 0px;
      width: 80%;
      font-size: 13px;
    }
    @media screen and (max-width: 800px) {
      input.form-control {
        text-align: center;
      }
    }
  }
`;

export const Menu = styled.nav`
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

export const Logo = styled.div`
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

export const SocialContainer = styled.nav`
  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  font-size: 0;
  .social-list {
    padding: 0;
    list-style: none;
    line-height: 2;
    path {
      fill: red;
    }
  }
  .social-item {
    display: inline-block;
    font-size: 1rem;
  }
  li + li {
    padding-left: 1rem;
  }

  @media screen and (max-width: 800px) {
    position: relative;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 2rem auto;
    max-height: 125px;
    overflow-y: hidden;
    transition: all ease-out 0.5s;
    &.collapsed {
      margin: 0 auto;
      max-height: 0;
    }
  }

  /* @media screen and (min-width: 800px) and (max-height: 768px) {
        display: none;
    } */
`;

export const ThemeChange = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 30px;
  border-radius: 4px;
  div {
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-right: 8px;
    &.night {
      background: #333;
    }
    &.day {
      background: #fff;
    }
  }
`;

export const SiteDescription = styled.p`
  display: none;
  @media (max-width: 800px) {
    display: block;
    color: #eee;
    line-height: 1;
    display: inline-block;
    color: var(--base-shade-3);
    line-height: 1.2;
    max-width: 700px;
    font-weight: 400;
    padding: 20px 0px;
    margin-top: -20px;
    width: 100%;
  }
`;
