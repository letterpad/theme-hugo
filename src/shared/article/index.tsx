import { Container, PostMeta, PostTitle, StyledTags } from "./Article.css";
import { Post, TaxonomyTypes } from "../../../../../../__generated__/gqlTypes";
import React, { Component } from "react";

import Author from "./Author";
import Comments from "./Comments";
import { IHelpers } from "../../../../../helperProps";
import { Link } from "react-router-dom";
import { TypeSettings } from "../../../../../types";
import { getReadableDate } from "../../../../../../shared/date";
import styled from "styled-components";

interface IContent {
  post: Post;
  settings: TypeSettings;
  adjacentPosts?: any;
  displayAuthor: boolean;
  displayComments: boolean;
  helpers: IHelpers;
}

export default class Content extends Component<IContent> {
  renderTaxonomies = (type: TaxonomyTypes) => {
    const { post } = this.props;

    const taxonomies = post.taxonomies
      .filter(taxonomy => taxonomy.type === type)
      .map(taxonomy => {
        return (
          <Link key={taxonomy.slug} to={taxonomy.slug}>
            #{taxonomy.name}
          </Link>
        );
      });

    return taxonomies.length > 0 ? (
      <StyledTags className="tags">{taxonomies}</StyledTags>
    ) : null;
  };

  render() {
    const {
      post,
      displayAuthor,
      displayComments,
      settings,
      helpers,
    } = this.props;
    const disqusShortname = settings.disqus_id.value;
    const disqusConfig = {
      url: post.slug,
      identifier: post.id.toString(),
      title: post.title,
    };

    const content = helpers.setResponsiveImages(post.html);
    return (
      <Container>
        <header className="post-header">
          <PostTitle large className="post-title">
            {post.title}
          </PostTitle>
          <PostMeta className="post-meta">
            {this.props.post.author.fname} · {getReadableDate(post.createdAt)} ·{" "}
            {post.reading_time} ·{" "}
            {this.renderTaxonomies(TaxonomyTypes.PostCategory)}
          </PostMeta>
        </header>
        <StyledContent className="post-content">
          <div
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </StyledContent>

        {this.renderTaxonomies(TaxonomyTypes.PostTag)}
        {displayAuthor && <Author post={post} />}
        {/* {this.props.adjacsentPosts} */}

        {displayComments && (
          <Comments
            disqusConfig={disqusConfig}
            disqusShortname={disqusShortname}
          />
        )}
      </Container>
    );
  }
}

const StyledContent = styled.article``;
