import React, { Component } from "react";
import Header from "../../components/Header";
import config from "config";

require("../../public/pcss/client.pcss");

export default function Layout(Element, props) {
    const name = Element.name;
    const settings = props.settings;

    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                image: config.baseName + settings.banner.value,
                title: settings.site_title.value,
                subTitle: settings.site_tagline.value
            };
            this.setHeroDetails = this.setHeroDetails.bind(this);
        }
        setHeroDetails(data) {
            if (["Home", "Posts"].indexOf(name) >= 0) {
                this.setState(data);
            }
        }
        render() {
            const _props = { ...this.props, ...props, settings };
            const styles = {
                hero: {
                    backgroundImage: `url(${this.state.image})`
                }
            };
            const Hero = ({ display }) => {
                if (!display || name == "SearchWrapper") return null;
                return (
                    <header style={styles.hero} className="hero">
                        <div className="site-header-content">
                            <h1 className="site-title">{this.state.title}</h1>
                            <h2 className="site-description">
                                {this.state.subTitle}
                            </h2>
                        </div>
                    </header>
                );
            };
            return (
                <div>
                    <div className="suspension">
                        <a title="Go to top" className="to-top is-hide">
                            <span className="icon icon-up" />
                        </a>
                    </div>
                    <Header settings={settings} router={{ ...this.props }} />

                    <Hero display={false} />

                    <Element {..._props} setHeroDetails={this.setHeroDetails} />
                    <footer
                        className="site-footer"
                        dangerouslySetInnerHTML={{
                            __html: settings.site_footer.value
                        }}
                    />
                </div>
            );
        }
    };
}
