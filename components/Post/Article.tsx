import React, { Component } from "react";
import moment from "moment";
import Disqus from "disqus-react";
import styled from "styled-components";
import { PostTitle, PostMeta, StyledTags } from "../../styled/common";
import { Link } from "react-router-dom";
import StyledAuthor from "../../styled/StyledAuthor";
import HeroImage from "../HeroImage";
import { Post } from "../../../../../__generated__/gqlTypes";
import { TypeSettings } from "../../../../types";
import config from "../../../../../config";

const StyledArticle = styled.article`
  position: relative;
  line-height: 1.8;
  word-wrap: break-word;
  word-break: break-word;
  flex: 1;
  hyphens: auto;
  img {
    display: block;
    width: 100%;
    margin: 2rem auto;
    object-fit: cover;
    max-width: 100%;
    box-shadow: 0px 0px 18px 8px rgba(0, 0, 0, 0.12);

    @media screen and (max-width: 800px) {
      box-shadow: none;
    }
  }

  blockquote {
    border-left: 5px solid rgba(var(--color-accent), 1);
  }
`;
const ArticleHolder = styled.div`
  max-width: 768px;
  width: 100%;
  margin: auto;
`;

interface IArticle {
  post: Post;
  settings: TypeSettings;
  adjacentPosts?: any;
}
export default class Article extends Component<IArticle> {
  render() {
    const tags: JSX.Element[] = [];
    const categories: JSX.Element[] = [];
    const { post } = this.props;
    const disqusShortname = this.props.settings.disqus_id.value;
    const disqusConfig = {
      url: post.slug,
      identifier: post.id.toString(),
      title: post.title,
    };

    post.taxonomies.forEach((taxonomy, i) => {
      if (!taxonomy) return;
      if (taxonomy.type === "post_category") {
        categories.push(
          <Link key={i} to={"/category/" + taxonomy.slug}>
            {taxonomy.name}
          </Link>,
        );
      } else {
        tags.push(
          <Link key={i} to={"/tag/" + taxonomy.slug}>
            #{taxonomy.name}
          </Link>,
        );
      }
    });

    const content = post.body;
    const displayAuthor = JSON.parse(
      this.props.settings.displayAuthorInfo.value,
    ); // convert "true" to true

    return (
      <section className="post-detail">
        <HeroImage
          image={config.baseName + post.cover_image}
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
              <StyledTags className="tags">{categories}</StyledTags>
            </PostMeta>
          </header>
          <StyledArticle className="post-content">
            <div
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </StyledArticle>
          {tags.length > 0 && <StyledTags className="tags">{tags}</StyledTags>}
          {displayAuthor && post.type == "post" && (
            <StyledAuthor className="author-info">
              <div className="author-avatar">
                <img src={config.baseName + post.author.avatar} />
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
