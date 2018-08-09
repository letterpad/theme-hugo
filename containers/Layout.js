import React, { Component } from "react";
import Header from "../components/Header";
import config from "config";
import styled from "styled-components";

require("../public/pcss/client.pcss");

const darkTheme = `
    --color-text-primary: #dfdfdf;
    --color-menu-link: #fff;
    --color-border: #3c3c3c;
    --color-accent: 70,183, 70;
    --color-headings: #fff;
    --bg-article-item: 30, 34, 50;
    --bg-content: 25, 28, 39;
    --bg-sidebar: 25, 28, 39;
`;

const lightTheme = `
    --color-text-primary: #333;
    --color-menu-link: #fff;
    --color-border: #333;
    --color-accent: 20, 181, 239;
    --color-headings: #000;
    --bg-article-item: 240, 240, 240;
    --bg-content: 255, 255, 255;
    --bg-sidebar: 25, 28, 39;
`;

const CSSVariables = styled.div`
    ${props => (props.dark ? darkTheme : lightTheme)};
`;

export default function Layout(Element, props) {
    const name = Element.name;
    const settings = props.settings;

    const StyledElement = styled.div`
        background: rgba(var(--bg-content), 1);
        color: var(--color-text-primary);
    `;
    return class extends Component {
        state = {
            image: config.baseName + settings.banner.value,
            title: settings.site_title.value,
            subTitle: settings.site_tagline.value
        };

        setHeroDetails = data => {
            if (["Home", "Posts"].indexOf(name) >= 0) {
                this.setState(data);
            }
        };

        render() {
            const _props = { ...this.props, ...props, settings };
            const themeColor = settings.themeConfig["theme-color"] || "dark";
            const theme = {
                [themeColor.toLowerCase()]: true
            };
            return (
                <CSSVariables {...theme}>
                    <Header settings={settings} router={{ ...this.props }} />
                    <StyledElement>
                        <Element
                            {..._props}
                            setHeroDetails={this.setHeroDetails}
                        />
                    </StyledElement>
                    <footer
                        className="site-footer"
                        dangerouslySetInnerHTML={{
                            __html: settings.site_footer.value
                        }}
                    />
                </CSSVariables>
            );
        }
    };
}
