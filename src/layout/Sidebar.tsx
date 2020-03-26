import {
  Container,
  Logo,
  Menu,
  SiteDescription,
  SocialContainer,
  ThemeChange,
} from "./Sidebar.css";
import { NavLink, RouteComponentProps } from "react-router-dom";
import React, { Component } from "react";

import { EnumThemes } from "../../hugoTypes";
import { Link } from "react-router-dom";
import SocialIcons from "./SocialIcons";
import { TypeSettings } from "../../../../types";

interface IHeaderProps {
  settings: TypeSettings;
  router: RouteComponentProps;
  switchTheme: (name: EnumThemes) => void;
}

class Header extends Component<IHeaderProps, any> {
  state = {
    menuOpen: false,
  };

  toggleMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
  };

  render() {
    const { settings, switchTheme } = this.props;
    const menu = JSON.parse(settings.menu.value);
    const menucollapsedClass = this.state.menuOpen ? "" : "collapsed";
    const logo = settings.site_logo.value || null;

    return (
      <Container className="site-header">
        {logo && (
          <Link to="/">
            <Logo>
              <img
                src={settings.site_logo.value}
                alt="Logo"
                className="site_logo"
              />
            </Logo>
          </Link>
        )}

        {!logo && (
          <div>
            <Link to="/">
              <h1 className="title">{settings.site_title.value}</h1>
            </Link>
            <p className="subtitle">{settings.site_tagline.value}</p>
          </div>
        )}
        <button className="menu-toggle" type="button" onClick={this.toggleMenu}>
          {this.state.menuOpen && "X"}
          {!this.state.menuOpen && "☰"}
        </button>

        <SiteDescription>{settings.site_description.value}</SiteDescription>
        <Menu className={"site-menu " + menucollapsedClass}>
          <ul className="menu-list">
            {menu.map((item, i) => {
              return (
                <li className="menu-item" key={i}>
                  {item.type !== "custom" ? (
                    <NavLink
                      to={i === 0 ? "/" : item.slug}
                      className="normal"
                      activeClassName="is-active"
                      exact
                    >
                      {item.title}
                    </NavLink>
                  ) : (
                    <a href={item.slug} target="_blank">
                      {item.title}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </Menu>

        <SocialContainer className={"social-menu " + menucollapsedClass}>
          <ThemeChange>
            <div
              className="night"
              onClick={() => switchTheme(EnumThemes.dark)}
            />
            <div
              className="day"
              onClick={() => switchTheme(EnumThemes.light)}
            />
          </ThemeChange>
          <footer
            className="site-footer"
            dangerouslySetInnerHTML={{
              __html: settings.site_footer.value,
            }}
          />
          <h2 className="offscreen">Social Networks</h2>
          <SocialIcons settings={settings} />
        </SocialContainer>
      </Container>
    );
  }
}
export default Header;
