import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import config from "config";
import LazyImage from "../../../../helpers/LazyImage";
import { PostTitle, PostMeta, StyledReadMore } from "../../styled/common";
import StyledArticleItem from "../../styled/StyledArticleItem";
const readingTime = require("reading-time");

class ArticleListItem extends Component {
    render() {
        const post = this.props.post;
        let href = `/${post.type}/${post.slug}`;

        return (
            <StyledArticleItem className="post-entry">
                <div className="post-details">
                    <header className="post-header">
                        <PostTitle className="post-title">
                            <Link className="post-link" to={href}>
                                {post.title}
                            </Link>
                        </PostTitle>
                        <PostMeta className="post-meta">
                            {post.author.fname} {post.author.lname} ·{" "}
                            {moment(new Date(post.created_at)).format("LL")}·{" "}
                            {readingTime(post.body).text}
                        </PostMeta>
                    </header>
                    <p className="post-summary">{post.excerpt}</p>
                    <footer className="post-footer">
                        <StyledReadMore className="read-more" to={href}>
                            Read More →
                        </StyledReadMore>
                    </footer>
                </div>
                {post.cover_image != "" && (
                    <div className="post-image-box">
                        <Link className="post-link" to={href}>
                            <LazyImage
                                src={config.baseName + post.cover_image}
                                width="100%"
                            />
                        </Link>
                    </div>
                )}
            </StyledArticleItem>
        );
    }
}

export default ArticleListItem;
