// import "./article.css";

import { PostMeta, PostTitle, StyledTags } from "../../styled/common";
import React, { Component } from "react";

import Disqus from "disqus-react";
import HeroImage from "../HeroImage";
import { Link } from "react-router-dom";
import { Post } from "../../../../../__generated__/gqlTypes";
import StyledAuthor from "../../styled/StyledAuthor";
import { TypeSettings } from "../../../../types";
import moment from "moment";
import styled from "styled-components";

interface IArticle {
  post: Post;
  settings: TypeSettings;
  adjacentPosts?: any;
}
export default class Article extends Component<IArticle> {
  renderTags = () => {
    const { post } = this.props;

    const tags = post.taxonomies
      .filter(taxonomy => taxonomy.type === "post_tag")
      .map(taxonomy => {
        return (
          <Link key={taxonomy.slug} to={taxonomy.slug}>
            #{taxonomy.name}
          </Link>
        );
      });

    return tags.length > 0 ? (
      <StyledTags className="tags">{tags}</StyledTags>
    ) : null;
  };

  renderCategories = () => {
    const { post } = this.props;

    const categories = post.taxonomies
      .filter(taxonomy => taxonomy.type === "post_category")
      .map(taxonomy => {
        return (
          <Link key={taxonomy.slug} to={taxonomy.slug}>
            {taxonomy.name}
          </Link>
        );
      });
    return categories.length > 0 ? (
      <StyledTags className="tags">{categories}</StyledTags>
    ) : null;
  };

  render() {
    const { post } = this.props;
    const disqusShortname = this.props.settings.disqus_id.value;
    const disqusConfig = {
      url: post.slug,
      identifier: post.id.toString(),
      title: post.title,
    };

    const content = post.html;
    const displayAuthor = JSON.parse(
      this.props.settings.displayAuthorInfo.value,
    ); // convert "true" to true

    return (
      <section className="post-detail">
        <HeroImage
          image={post.cover_image}
          display={post.cover_image.length > 0}
          description=""
          siteTitle=""
        />
        <ArticleHolder>
          <header className="post-header">
            <PostTitle large className="post-title">
              {post.title}
            </PostTitle>
            <PostMeta className="post-meta">
              {this.props.post.author.fname} ·{" "}
              {moment(post.createdAt).format("LL")} · 4 min read ·{" "}
              {this.renderCategories()}
            </PostMeta>
          </header>
          <StyledArticle className="post-content">
            <div
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </StyledArticle>

          {this.renderTags()}
          {displayAuthor && post.type == "post" && (
            <StyledAuthor className="author-info">
              <div className="author-avatar">
                {post.author.avatar && <img src={post.author.avatar} />}
              </div>
              <div className="author-details">
                <div className="author-name">
                  {post.author.fname} {post.author.lname}
                </div>
                <div className="author-bio">{post.author.bio}</div>
              </div>
            </StyledAuthor>
          )}
          {/* {this.props.adjacsentPosts} */}

          {disqusShortname && post.type == "post" && (
            <div id="disqus_thread_parent">
              <Disqus.DiscussionEmbed
                shortname={disqusShortname}
                config={disqusConfig}
              />
            </div>
          )}
        </ArticleHolder>
      </section>
    );
  }
}

const StyledArticle = styled.article``;

const ArticleHolder = styled.div`
  max-width: 768px;
  width: 100%;
  margin: auto;
`;
