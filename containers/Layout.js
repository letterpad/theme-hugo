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
        a {
            transition: 0.3s opacity linear;
            text-decoration: none;

            &:focus,
            &:hover {
                outline: none;
            }
        }
        .main {
            position: relative;
            margin-left: 16rem;
            padding: 1rem 2rem;
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
        }
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
