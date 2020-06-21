import styled from "styled-components";

export const Main = styled.div`
  background: var(--bg-content);
  color: var(--color-base);
  position: relative;
  margin-left: 16rem;
  padding: 2rem;
  padding-bottom: 0px;
  min-height: 100vh;
  box-sizing: border-box;
  border-left: 1px solid rgba(0, 0, 0, 0.09);
  border-right: 1px solid rgba(0, 0, 0, 0.09);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);

  .list-footer {
    padding: 1.5rem 0;
  }

  @media screen and (max-width: 1440px) {
    width: calc(100% - 16rem);
  }

  @media screen and (max-width: 800px) {
    margin-left: 0;
    padding: 0 1rem;
    width: 100%;
    min-height: initial;
    border-left: none;
    border-right: none;
    border-top: 1px solid rgba(0, 0, 0, 0.09);
    border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  }
  a {
    transition: 0.3s opacity linear;
    text-decoration: none;

    &:focus,
    &:hover {
      outline: none;
    }
  }
`;

export const Footer = styled.footer`
  background: var(--bg-footer);
  color: #4c587d;
  margin: 100px -33px -33px -33px;
  padding: 30px;
  margin-bottom: -20px;
  margin-top: 100px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
  a {
    color: var(--bg-success);
  }

  form {
    margin-bottom: 10px;
  }

  input[type="text"] {
    font-family: "Open Sans", "Helvetica Neue", Arial, Helvetica, Verdana,
      sans-serif;
    font-size: 15px;
    border: 1px solid var(--color-border);
    border-radius: 3px;
    color: var(--color-base);
    background-color: transparent;
    box-sizing: border-box;
    height: 32px;
    padding: 0px 0.4em;
    display: inline-block;
    margin: 0;
    width: 350px;
    vertical-align: top;
  }

  input[type="submit"] {
    font-size: 13px;
    border: none;
    border-radius: 3px;
    letter-spacing: 0.03em;
    color: #fff;
    background-color: #333;
    box-sizing: border-box;
    height: 32px;
    line-height: 32px;
    padding: 0 18px;
    display: inline-block;
    margin: 0;
    transition: all 0.23s ease-in-out 0s;
    margin-left: 2px;
    cursor: pointer;
    &:hover {
      background-color: #222;
    }
  }
`;
