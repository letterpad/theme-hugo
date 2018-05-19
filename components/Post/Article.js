import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import AdjacentPosts from "./AdjacentPosts";
import config from "config";
import Disqus from "disqus-react";

export default class Article extends Component {
    componentDidMount() {
        setTimeout(() => {
            document.querySelectorAll(".hljs").forEach(hljs.highlightBlock);
        }, 10);
    }

    render() {
        const tags = [];
        const categories = [];
        const post = this.props.post;

        const disqusShortname = this.props.settings.disqus_id.value;
        const disqusConfig = {
            url: post.url,
            identifier: post.id,
            title: post.title
        };

        post.taxonomies.forEach((taxonomy, i) => {
            if (taxonomy.type === "post_category") {
                categories.push(
                    <Link key={i} to={"/category/" + taxonomy.slug}>
                        {taxonomy.name}
                    </Link>
                );
            } else {
                tags.push(
                    <Link key={i} to={"/tag/" + taxonomy.slug}>
                        #{taxonomy.name}
                    </Link>
                );
            }
        });
        const content = post.mode == "markdown" ? post.mdPreview : post.body;
        const displayAuthor = JSON.parse(
            this.props.settings.displayAuthorInfo.value
        ); // convert "true" to true
        return (
            <section className="main post-detail">
                {post.cover_image.length > 0 && (
                    <div className="hero-banner">
                        <img width="100%" src={post.cover_image} />
                    </div>
                )}
                <header className="post-header">
                    <h1 className="post-title">{post.title}</h1>
                    <p className="post-meta">
                        {this.props.post.author.fname} ·{" "}
                        {moment(new Date(post.created_at)).format("LL")} · 4 min
                        read
                    </p>
                </header>
                <article className="post-content ql-editor fs-medium">
                    <p
                        dangerouslySetInnerHTML={{
                            __html: content
                        }}
                    />
                </article>
                {displayAuthor && (
                    <div className="author-info">
                        <div className="author-avatar">
                            <img src={config.baseName + post.author.avatar} />
                        </div>
                        <div className="author-details">
                            <div className="author-name">
                                {post.author.fname} {post.author.lname}
                            </div>
                            <div className="author-bio">{post.author.bio}</div>
                        </div>
                    </div>
                )}
                {this.props.adjacentPosts}
                {disqusShortname &&
                    post.type == "post" && (
                        <div id="disqus_thread_parent">
                            <Disqus.DiscussionEmbed
                                shortname={disqusShortname}
                                config={disqusConfig}
                            />
                        </div>
                    )}
            </section>
        );
    }
}
