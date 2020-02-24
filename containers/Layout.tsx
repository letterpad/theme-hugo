require("../public/css/style.css");
require("../public/css/typography.css");

import React, { Component } from "react";

import Header from "../components/Header";
import { ILayoutProps } from "../../../types";
import { NormalizeCss } from "../public/css/GlobalStyle.css";
import { PrismCss } from "../public/css/Prism.css";
import StyledMain from "../styled/StyledMain";
import styled from "styled-components";

class Layout extends Component<ILayoutProps, {}> {
  state = {
    theme: "light",
  };

  switchTheme = theme => {
    localStorage.theme = theme;
    this.setState({ theme });
  };

  componentDidMount() {
    const theme =
      typeof localStorage !== "undefined" ? localStorage.theme : "light";
    this.setState({ theme });
  }

  render() {
    const { Content, ...props } = this.props;
    const { settings, router } = props;

    return (
      <div className={"theme-" + this.state.theme}>
        <PrismCss />
        <NormalizeCss />
        <Header
          settings={settings}
          router={router}
          switchTheme={this.switchTheme}
        />
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
  }
}

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
