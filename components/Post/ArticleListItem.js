import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import LazyLoad from "./LazyLoad";
const readingTime = require("reading-time");

class ArticleListItem extends Component {
    render() {
        const post = this.props.post;
        let href = `/${post.type}/${post.slug}`;
        const content = post.mode == "markdown" ? post.mdPreview : post.body;
        return (
            <article className="post-entry">
                <header className="post-header">
                    <h3 className="post-title">
                        <Link className="post-link" to={href}>
                            {post.title}
                        </Link>
                    </h3>
                    <p className="post-meta">
                        {post.author.fname} {post.author.lname} ·{" "}
                        {moment(new Date(post.created_at)).format("LL")}·{" "}
                        {readingTime(content).text}
                    </p>
                </header>
                <p className="post-summary">{post.excerpt}</p>
                <footer className="post-footer">
                    <Link className="read-more" to={href}>
                        Read More →
                    </Link>
                </footer>
            </article>
        );
    }
}

export default LazyLoad(ArticleListItem);
