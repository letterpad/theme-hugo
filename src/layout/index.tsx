require("../../public/css/style.css");
require("../../public/css/typography.css");

import { Footer, Main } from "./Layout.css";
import React, { useEffect, useState } from "react";

import { EnumThemes } from "../../hugoTypes";
import { ILayoutProps } from "../../../../types";
import { NormalizeCss } from "../../public/css/GlobalStyle.css";
import { PrismCss } from "../../public/css/Prism.css";
import Sidebar from "./Sidebar";

const Layout: React.ComponentType<ILayoutProps> = props => {
  const [theme, setTheme] = useState<EnumThemes>(EnumThemes.light);

  useEffect(() => {
    const theme = getTheme();
    setTheme(theme);
  }, [theme]);

  const switchTheme = (theme: EnumThemes) => {
    localStorage.theme = theme;
    setTheme(theme);
  };

  const { Content, settings, router, navigationData, ...rest } = props;

  const { site_footer, subscribe_embed } = settings;
  return (
    <div className={"theme-" + theme}>
      <PrismCss />
      <NormalizeCss />
      <Sidebar
        navigationData={navigationData}
        settings={settings}
        router={router}
        switchTheme={switchTheme}
      />
      <Main>
        <Content {...props} />
        <Footer className="site-footer">
          <SetDangerousHTML html={subscribe_embed.value} id="subscribe" />
          <SetDangerousHTML html={site_footer.value} />
        </Footer>
      </Main>
    </div>
  );
};

export default Layout;

// ------------------| helpers |-----------------------

function getTheme(): EnumThemes {
  return typeof localStorage !== "undefined"
    ? localStorage.theme || "light"
    : "light";
}

function SetDangerousHTML({ html, id = "" }: { html: string; id?: string }) {
  if (!html) return null;

  return (
    <div
      id={id}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
}
