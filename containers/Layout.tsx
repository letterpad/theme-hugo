require("../public/css/style.css");
require("../public/css/typography.css");

import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import { ILayoutProps } from "../../../types";
import { NormalizeCss } from "../public/css/GlobalStyle.css";
import { PrismCss } from "../public/css/Prism.css";
import StyledMain from "../styled/StyledMain";
import styled from "styled-components";

const Layout: React.ComponentType<ILayoutProps> = props => {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const theme =
      typeof localStorage !== "undefined" ? localStorage.theme : "light";
    setTheme(theme);
  }, [theme]);

  const switchTheme = theme => {
    localStorage.theme = theme;
    setTheme(theme);
  };

  const { Content, settings, router, ...rest } = props;

  return (
    <div className={"theme-" + theme}>
      <PrismCss />
      <NormalizeCss />
      <Header settings={settings} router={router} switchTheme={switchTheme} />
      <StyledMain>
        <Content {...props} />
        {settings.site_footer.value && (
          <Footer
            className="site-footer"
            dangerouslySetInnerHTML={{
              __html: settings.site_footer.value,
            }}
          />
        )}
      </StyledMain>
    </div>
  );
};

export default Layout;

const Footer = styled.footer`
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
`;
