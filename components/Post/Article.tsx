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

const StyledArticle = styled.article`
  @import url("https://fonts.googleapis.com/css?family=IBM+Plex+Mono:400,500&display=swap");

  --editorPadding: 1rem;
  --spacingTop: 2rem;
  --spacingTopSmall: 0.86rem;
  --spacingBottom: 1rem;
  position: relative;
  line-height: 1.45;
  flex: 1;
  font-size: 1.5rem;
  margin-top: 40px;
  margin-bottom: 40px;
  letter-spacing: -0.5;
  word-spacing: -0.5;

  @media (min-width: 1080px) {
    margin-top: 56px;
    margin-bottom: 56px;
  }
  figure {
    margin: 2rem auto;
    display: block;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 40px;
    @media (min-width: 1080px) {
      margin-top: 56px;
    }
  }
  figure img {
    object-fit: cover;
    max-width: 100%;
    @media screen and (max-width: 800px) {
      box-shadow: none;
    }
  }
  figure figcaption {
    font-style: italic;
    font-size: 0.85rem;
  }
  .lp-editor blockquote {
    border-left: 5px solid rgba(var(--color-accent), 1);
  }
  .lp-editor blockquote blockquote {
    margin: 8px !important;
  }
  .lp-editor div[data-slate-editor="true"] {
    padding-bottom: 400px;
  }
  .lp-editor p {
    margin: 1.2rem 0px;
  }
  .lp-editor h1,
  .lp-editor h2,
  .lp-editor h3,
  .lp-editor h4,
  .lp-editor h5,
  .lp-editor h6 {
    font-weight: 600;
    text-rendering: optimizeLegibility;
    line-height: 1;
    margin-top: 1.2em;
    @media (min-width: 1080px) {
      margin-top: 1.95em;
    }
  }
  .lp-editor h1 {
    font-size: 2.5rem;
    border-bottom: solid 1px var(--color-border);
  }
  .lp-editor h2 {
    font-size: 2rem;
  }
  .lp-editor h3 {
    font-size: 1.6rem;
  }
  .lp-editor h4 {
    font-size: 1.2rem;
  }
  .lp-editor h5 {
    font-size: 1rem;
  }
  .lp-editor h6 {
    font-size: 1rem;
  }
  .lp-editor a {
    text-decoration: underline;
    color: var(--bg-hover-success);
  }
  .lp-editor hr {
    padding-top: 2.2em;
    border: none;
  }
  .lp-editor {
    hr::after {
      content: "...";
      font-size: 16px;
      zoom: 3;
      margin-top: -20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .lp-editor section {
    padding: 0;
    padding-top: var(--spacingTop);
    padding-bottom: var(--spacingBottom);
    text-align: justify;
    line-height: 25px;
  }
  .lp-editor h1 + section {
    margin-top: var(--spacingTop);
  }
  .lp-editor h2 + section,
  .lp-editor h3 + section,
  .lp-editor h4 + section {
    margin-top: var(--spacingTopSmall);
  }
  .lp-editor h1 + p {
    margin-top: var(--spacingTop);
  }
  .lp-editor h2 + p,
  .lp-editor h3 + p,
  .lp-editor h4 + p {
    margin-top: var(--spacingTopSmall);
  }
  .lp-editor h1 + h2,
  .lp-editor h2 + h3,
  .lp-editor h3 + h4 {
    margin-top: var(--spacingTop);
  }
  .lp-editor ol,
  .lp-editor ul {
    padding-left: 2em;
  }
  .lp-editor ol ol,
  .lp-editor ol ul,
  .lp-editor ul ol,
  .lp-editor ul ul {
    margin-bottom: 0;
    margin-top: 0;
  }
  .lp-editor li {
    word-wrap: break-all;
  }
  .lp-editor li > .lp-editor p {
    margin-top: 8px;
  }
  .lp-editor li + .lp-editor li {
    margin-top: 0.25em;
  }
  .lp-editor blockquote,
  .lp-editor dl,
  .lp-editor ol,
  .lp-editor pre,
  .lp-editor table,
  .lp-editor ul {
    margin-top: 40px;
    @media (min-width: 1080px) {
      margin-top: 56px;
    }
  }
  .lp-editor p {
    margin-top: 40px;
    @media (min-width: 1080px) {
      margin-top: 56px;
    }
  }
  .lp-editor blockquote {
    border-left: 0.25em solid var(--color-border);
    padding: 0 1em;
  }
  .lp-editor blockquote > :first-child {
    margin-top: 0;
  }
  .lp-editor blockquote > :last-child {
    margin-bottom: 0;
  }
  .lp-editor p code {
    padding: 0px 6px;
    white-space: pre-wrap;
    font-size: 1rem;
    background: var(--color-success);
    font-weight: 500;
    border-radius: 4px;
    display: inline-flex;
    font-family: "IBM Plex Mono", monospace;
    font-weight: 500;
  }

  .lp-editor pre code {
    padding: 0;
    width: 100%;
    overflow: auto;
    display: block;
    font-size: 0.9rem;
    font-family: "IBM Plex Mono", monospace;
    font-weight: 500;
    line-height: 2;
    margin-bottom: -20px;
    letter-spacing: 0.3px;
  }

  .lp-editor table,
  .lp-editor td,
  .lp-editor th {
    border: 1px solid #ddd;
    text-align: left;
  }
  .lp-editor table {
    border-collapse: collapse;
    width: 100%;
  }
  .lp-editor th,
  .lp-editor td {
    padding: 15px;
  }
  .lp-editor p + ul,
  .lp-editor p + ol {
    margin-top: 1.2rem !important;
  }
  .lp-editor ul + p,
  .lp-editor ol + p {
    margin-top: 22px !important;
  }
  .lp-editor p + p {
    margin-top: 22px !important;
  }
`;

const ArticleHolder = styled.div`
  max-width: 768px;
  width: 100%;
  margin: auto;
`;
