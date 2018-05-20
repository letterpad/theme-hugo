import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import config from "config";

const SocialIcons = ({ settings }) => {
    var a = Object.keys(settings)
        // get all the settings with start with "social_"
        .filter(
            setting =>
                setting.indexOf("social_") === 0 &&
                settings[setting].value.length > 0
        )
        .map(setting => {
            const icon = "icon icon-" + setting.split("_")[1];
            return (
                <li key={setting} className="social-item">
                    <a
                        target="_blank"
                        href={settings[setting].value}
                        title={setting}
                    >
                        <span className={icon} />
                    </a>
                </li>
            );
        });
    return a;
};

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }
    toggleMenu() {
        this.setState({
            menuOpen: !this.state.menuOpen
        });
    }
    render() {
        const settings = this.props.settings;
        const menu = JSON.parse(settings.menu.value);
        const menucollapsedClass = this.state.menuOpen ? "" : "collapsed";
        const logo = settings.site_logo.value || null;

        return (
            <header className="site-header">
                {logo && (
                    <img
                        className="avatar"
                        src={config.baseName + settings.site_logo.value}
                        alt="Avatar"
                    />
                )}

                <h1 className="title">{settings.site_title.value}</h1>
                <p className="subtitle">{settings.site_tagline.value}</p>
                <button
                    className="menu-toggle"
                    type="button"
                    onClick={this.toggleMenu}
                >
                    <span
                        className={
                            "icon " +
                            (this.state.menuOpen ? "icon-close" : "icon-menu")
                        }
                    />
                </button>
                <nav className={"site-menu " + menucollapsedClass}>
                    <h2 className="offscreen">Main Menu</h2>
                    <ul className="menu-list">
                        {menu
                            .filter(item => item.type !== "label")
                            .map((item, i) => {
                                let to =
                                    (item.type == "page"
                                        ? "/page/"
                                        : "/posts/") + item.slug;
                                if (item.name == "Home") {
                                    to = "/";
                                }
                                return (
                                    <li className="menu-item" key={i}>
                                        <NavLink
                                            to={to}
                                            className="normal"
                                            activeClassName="is-active"
                                            exact
                                        >
                                            {item.name}
                                        </NavLink>
                                    </li>
                                );
                            })}
                    </ul>
                </nav>
                <nav className={"social-menu " + menucollapsedClass}>
                    <h2 className="offscreen">Social Networks</h2>
                    <ul className="social-list">
                        <SocialIcons settings={settings} />
                    </ul>
                </nav>
            </header>
        );
    }
}
export default Header;
