import { Container, PostTitleListItem, StyledReadMore } from "./Item.css";
import React, { Component } from "react";

import LazyImage from "../../../../helpers/LazyImage";
import { Link } from "react-router-dom";
import { Post } from "../../../../../__generated__/gqlTypes";
import { PostMeta } from "../shared/article/Article.css";
import moment from "moment";

const readingTime = require("reading-time");

interface IArticleListItem {
  post: Post;
  isStatic: boolean;
}

class ArticleListItem extends Component<IArticleListItem> {
  render() {
    const post = this.props.post;
    let href = post.slug;

    return (
      <Container className="post-entry">
        <div className="post-details">
          <header className="post-header">
            <PostTitleListItem className="post-title">
              <Link className="post-link" to={href}>
                {post.title}
              </Link>
            </PostTitleListItem>
            <PostMeta className="post-meta">
              {post.author.fname} {post.author.lname} ·{" "}
              {moment(post.createdAt).format("LL")}·{" "}
              {readingTime(post.html).text}
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
              <LazyImage src={post.cover_image} width="100%" />
            </Link>
          </div>
        )}
      </Container>
    );
  }
}

export default ArticleListItem;
