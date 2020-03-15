import { Container, PostTitleListItem, StyledReadMore } from "./Item.css";
import React, { Component } from "react";

import { IHelpers } from "../../../../helperProps";
import { Link } from "react-router-dom";
import { Post } from "../../../../../__generated__/gqlTypes";
import { PostMeta } from "../shared/article/Article.css";
import { getReadableDate } from "../../../../../shared/date";

interface IArticleListItem {
  post: Post;
  isStatic: boolean;
  getImageAttrs: IHelpers["getImageAttrs"];
}

class ArticleListItem extends Component<IArticleListItem> {
  render() {
    const { post, getImageAttrs } = this.props;
    let href = post.slug;
    const attrs = getImageAttrs(post.cover_image.src, [
      480,
      720,
      960,
      1200,
      1440,
      1600,
      2000,
    ]);

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
              {getReadableDate(post.createdAt)}· {post.reading_time}
            </PostMeta>
          </header>
          <p className="post-summary">{post.excerpt}</p>
          <footer className="post-footer">
            <StyledReadMore className="read-more" to={href}>
              Read More
            </StyledReadMore>
          </footer>
        </div>
        {post.cover_image.src != "" && (
          <div className="post-image-box">
            <Link className="post-link" to={href}>
              <img {...attrs} />
            </Link>
          </div>
        )}
      </Container>
    );
  }
}

export default ArticleListItem;
